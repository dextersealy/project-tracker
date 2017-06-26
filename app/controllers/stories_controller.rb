class StoriesController < ApplicationController
  before_action :require_login

  def index
    project = current_user.projects.find(params[:project_id])
    @stories = project.stories
  end

  def create
    do_action do
      @story = Story.new(story_params)
      @story.save
    end
  end

  def update
    @story = find_story(params[:id])
    do_action { @story.update(story_params) }
  end

  def destroy
    @story = find_story(params[:id])
    do_action { @story.destroy }
  end

  private

  def require_login
    render json: [], status: 401 unless logged_in?
  end

  def find_story(id)
    story = Story.includes(:project).find(id)
    raise ActiveRecord::RecordNotFound unless current_user.projects.include?(story.project)
    story
  end

  def do_action(&prc)
    render json: ["Permission denied"], status: 422 unless can_edit?(@story)
    begin
      if prc.call
        render :show
      else
        render json: @story.errors.full_messages, status: 422
      end
    rescue ArgumentError => exception
      if exception.message.include? 'is not a valid'
        render json: [exception.message], status: 422
      else
        raise
      end
    end
  end

  def can_edit?(story)
    return true unless story && story.persisted?
    story.project.member?(current_user)
  end

  def story_params
    result = params.require(:story).permit(:project_id, :author_id, :owner_id,
      :title, :description, :kind, :state, :points, :priority)
    result[:title].strip!
    result[:description].strip!
    result
  end

end
