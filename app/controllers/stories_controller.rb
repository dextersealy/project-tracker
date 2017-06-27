class StoriesController < ApplicationController
  include StoriesHelper

  before_action :require_login

  def index
    project = current_user.projects.find(params[:project_id])
    @stories = project.stories
  end

  def show
    @story = find_story(params[:id])
  end

  def create
    do_action do
      @story = Story.new(story_params)
      @story.save
    end
  end

  def update
    @story = find_story(params[:id])
    do_action { @story.update(story_params) } if allowed?
  end

  def destroy
    @story = find_story(params[:id])
    do_action { @story.destroy } if allowed?
  end

  private

  def allowed?
    return true if can_edit?(@story)
    render json: ["Permission denied"], status: 422
    false
end

  def action_object
    @story
  end

  def can_edit?(story)
    return true unless story && story.persisted?
    story.project.member?(current_user)
  end

  def story_params
    result = params.require(:story).permit(:project_id, :author_id, :owner_id,
      :title, :description, :kind, :state, :points, :priority)
    result[:title].strip! if result[:title]
    result[:description].strip! if result[:description]
    result
  end

end
