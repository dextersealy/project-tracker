Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'static_pages#root'

  post 'pusher/auth', to: 'pusher#auth'

  scope :api, defaults: { format: :json } do
    resources :users, only: [:create, :update]

    resource :session, only: [:create, :destroy]

    resources :projects, only: [:index, :show, :create, :update, :destroy] do
      resources :stories, only: [:create, :index]
    end

    resources :memberships, only: [:create, :index]

    resources :stories, only: [:show, :update, :destroy] do
      resources :comments, only: [:create, :index]
      resources :tasks, only: [:create, :index]
      patch '/prioritize', to: 'stories#prioritize'
    end

    resources :comments, only: [:update, :destroy]

    resources :tasks, only: [:update, :destroy]

  end
end
