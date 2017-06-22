require_relative '../../config/application'

class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_user, :logged_in?, :version

  def login(user)
    session[:session_token] = user.reset_session_token!
    @current_user = user
  end

  def logged_in?
    !!current_user
  end

  def logout
    return false unless logged_in?
    current_user.reset_session_token!
    session[:session_token] = nil
    @current_user = nil
    return true
  end

  def current_user
    return nil unless session[:session_token]
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def version
    ProjectTracker::Application::version
  end
end
