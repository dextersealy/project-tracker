class SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(
      user_params[:email],
      user_params[:password]
    )
    if @user
      login(@user)
      render '/users/show'
    else
      render json: ["Invalid email/password"], status: :unprocessable_entity
    end
  end

  def destroy
    logout
    render json: {}
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
