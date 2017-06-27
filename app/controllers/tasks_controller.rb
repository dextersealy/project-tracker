class TasksController < ApplicationController
  include StoriesHelper

  before_action :require_login

  def index
    @tasks = find_story(params[:story_id]).tasks
  end

  def create
    @task = Task.new(task_params)
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

  def action_object
    @task
  end

  def allowed?
    return true if can_edit?(@task)
    render json: ["Permission denied"], status: 422
    false
  end

  def can_edit?(task)
    return true unless task && task.persisted?
    task.project.member?(current_user)
  end

  def task_params
    result = params.require(:task).permit(:author_id, :title, :done)
    result[:title].strip!
    result
  end

end
