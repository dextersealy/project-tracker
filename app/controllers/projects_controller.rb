class ProjectsController < ApplicationController
  before_action :require_login

  def index
    @projects = current_user.projects
  end

  def create
    @project = Project.new(project_params)
    if save_and_set_owner(@project)
      render :show
    else
      render json: @project.errors.full_messages, status: 422
    end
  end

  def update
    @project = current_user.projects.find(params[:id])
    if @project.owners.include?(current_user)
      if @project.update(project_params)
        render :show
      else
        render json: @project.errors.full_messages, status: 422
      end
    else
      render json: ["not authorized"], status: 422
    end
  end

  private

  def require_login
    unless logged_in?
      render json: [], status: 401
    end
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
