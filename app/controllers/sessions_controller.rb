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
      render json: ["invalid credentials"], status: 422
    end
  end

  def destroy
    if logout
      render json: {}
    else
      render json: {}, status: 404
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
