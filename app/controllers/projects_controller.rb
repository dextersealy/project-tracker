class ProjectsController < ApplicationController
  before_action :require_login

  def index
    @projects = current_user.projects
  end

  def show
    @project = current_user.projects.find(params[:id])
  end

  def create
    @project = Project.new(project_params)
    do_action { save_and_set_owner(@project) }
  end

  def update
    @project = current_user.projects.find(params[:id])
    do_action { @project.update(project_params) } if allowed?
  end

  def destroy
    @project = current_user.projects.find(params[:id])
    do_action { @project.destroy } if allowed?
  end

  private

  def action_object
    @project
  end

  def allowed?
    return true if owner?(@project)
    render json: ["Permission denied"], status: :unprocessable_entity
    false
  end

  def owner?(project)
    return true unless project && project.persisted?
    project.owner?(current_user)
  end

  def save_and_set_owner(project)
    saved = false
    project.transaction do
      if project.save
        saved = true;
        Membership.create!({
          project: project,
          user: current_user,
          role: :owner
          })
      end
    end
    saved
  end

  def project_params
    result = params.require(:project).permit(:title)
    result[:title].strip! if result[:title]
    result
  end

end
