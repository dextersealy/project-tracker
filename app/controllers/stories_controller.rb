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
      @story.transaction do
        @story.priority = Story.maximum(:priority) + 1
        @story.save
      end
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

  def prioritize
    @story = find_story(params[:story_id])

    new_p = params.require(:story).permit(:priority)[:priority].to_i
    old_p = @story.priority

    return unless allowed? && new_p != old_p

    do_action(:prioritize) do
      @story.transaction do
        if new_p > old_p
          stories = @story.project.stories.where(priority: (old_p + 1..new_p))
          @changes = stories.map{ |story| {id: story.id, priority: story.priority - 1} }
          stories.update_all('priority = priority - 1')
        elsif new_p < old_p
          stories = @story.project.stories.where(priority: (new_p...old_p))
          @changes = stories.map{ |story| {id: story.id, priority: story.priority + 1} }
          stories.update_all('priority = priority + 1')
        end
        @changes.append({ id: @story.id, priority: new_p })
        @story.update(priority: new_p)
      end
    end
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
      :title, :description, :kind, :state, :points)
    result[:title].strip! if result[:title]
    result[:description].strip! if result[:description]
    result
  end

end
