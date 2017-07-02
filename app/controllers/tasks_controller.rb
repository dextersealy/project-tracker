class TasksController < ApplicationController
  include StoriesHelper

  before_action :require_login
  after_action :push_mod_notification, only: [:create, :update, :destroy]

  def index
    @tasks = find_story(params[:story_id]).tasks
  end

  def create
    @task = Task.new(task_params)
    @task[:story_id] = params[:story_id] if find_story(params[:story_id])
    do_action { @task.save }
  end

  def update
    @task = find_task(params[:id])
    do_action { @task.update(task_params )} if allowed?
  end

  def destroy
    @task = find_task(params[:id])
    do_action { @task.destroy } if allowed?
  end

  private

  def push_mod_notification
    story = @task.story
    push_notification(story.project_id, 'mod', {id: story.id, at: ''})
  end

  def find_task(task_id)
    task = Task.includes(:project).find(task_id)
    raise ActiveRecord::RecordNotFound unless current_user.projects.include?(task.project)
    task
  end

  def action_object
    @task
  end

  def allowed?
    return true if can_edit?(@task)
    render json: ["Permission denied"], status: :unprocessable_entity
    false
  end

  def can_edit?(task)
    return true unless task && task.persisted?
    task.project.member?(current_user)
  end

  def task_params
    result = params.require(:task).permit(:author_id, :title, :done)
    result[:title].strip! if result[:title]
    result
  end

end
