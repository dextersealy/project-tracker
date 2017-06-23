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
    do_action { @project.update(project_params) }
  end

  def destroy
    @project = current_user.projects.find(params[:id])
    do_action { @project.destroy }
  end

  private

  def require_login
    render json: [], status: 401 unless logged_in?
  end

  def do_action(&prc)
    if owner?(@project)
      if prc.call
        render :show
      else
        render json: @project.errors.full_messages, status: 422
      end
    else
      render json: ["Permission denied"], status: 422
    end
  end

  def owner?(project)
    return true unless project.persisted?
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
    params.require(:project).permit(:title)
  end

end
