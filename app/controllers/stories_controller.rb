class StoriesController < ApplicationController
  before_action :require_login

  def index
    project = current_user.projects.find(params[:project_id])
    @stories = project.stories
  end

  def create
    @story = Story.new(story_params)
    do_action { @story.save }
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
    if can_edit?(@story)
      if prc.call
        render :show
      else
        render json: @story.errors.full_messages, status: 422
      end
    else
      render json: ["Permission denied"], status: 422
    end
  end

  def can_edit?(story)
    return true unless story.persisted?
    story.project.member?(current_user)
  end

  def story_params
    params.require(:story).permit(:project_id, :author_id, :owner_id,
      :title, :description, :kind, :state, :points, :priority)
  end

end
