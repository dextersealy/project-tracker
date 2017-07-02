require_relative '../../config/application'

class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_user, :logged_in?, :version

  def login(user)
    session[:session_token] = user.reset_session!
    @current_user = user
  end

  def logged_in?
    !!current_user
  end

  def logout
    return false unless logged_in?
    @current_user.end_session!(session[:session_token])
    session[:session_token] = nil
    @current_user = nil
    return true
  end

  def current_user
    return nil unless session[:session_token]
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def require_login
    render json: [], status: :bad_request unless logged_in?
  end

  def do_action(template = :show, &prc)
    begin
      if prc.call
        render template
      else
        render json: action_object.errors.full_messages, status: :unprocessable_entity
      end
    rescue ArgumentError => exception
      if exception.message.include? 'is not a valid'
        render json: [exception.message], status: :unprocessable_entity
      else
        raise
      end
    end
  end

  def push_notification(project_id, action, data)
    Pusher["private-project#{project_id}"].trigger(action, data)
  end

  def version
    ProjectTracker::Application::version
  end
end
