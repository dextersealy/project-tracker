class StoriesController < ApplicationController
  include StoriesHelper

  before_action :require_login
  after_action :push_mod_notification, only: [:create, :update]
  after_action :push_del_notification, only: [:destroy]
  after_action :push_prioritize_notification, only: [:prioritize]

  def index
    project = current_user.projects.find(params[:project_id])
    @stories = project.stories
  end

  def show
    @story = find_story(params[:id])
  end

  def create
    create_params, tasks = story_params
    do_action do
      @story = Story.new(create_params)
      @story.transaction do
        @story.priority = Story.maximum(:priority) + 1
        if @story.save
          tasks[:tasks].to_h.each do |_, task|
            Task.create!({
              story: @story, author: current_user,
              title: task[:title], done: task[:done]
              })
          end
        end
      end
    end
  end

  def update
    update_params, _ = story_params
    @story = find_story(params[:id])
    do_action { @story.update(update_params) } if allowed?
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
        @story.update(priority: new_p)
        @changes.append({ id: @story.id, priority: new_p,
          updated_at: @story.updated_at })
      end
    end
  end

  private

  def push_mod_notification
    return unless response.status == 200
    push_notification(@story.project_id, 'mod', {id: @story.id,
      at: @story.updated_at})
  end

  def push_del_notification
    return unless response.status == 200
    push_notification(@story.project_id, 'del', {id: @story.id})
  end

  def push_prioritize_notification
    return unless response.status == 200
    push_notification(@story.project_id, 'prioritize', {
      story: { id: @story.id, at: @story.updated_at},
      changes: @changes
    });
  end

  def allowed?
    return true if can_edit?(@story)
    render json: ["Permission denied"], status: :unprocessable_entity
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
    result = params.require(:story).permit(
      :project_id, :author_id, :owner_id, :assignee_id,
      :kind, :state, :points,
      :title, :description,
      tasks: {}
      )
    result[:title].strip! if result[:title]
    result[:description].strip! if result[:description]
    [result, result.extract!(:tasks)]
  end

end
