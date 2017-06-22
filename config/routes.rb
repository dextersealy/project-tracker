Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'static_pages#root'

  scope :api, defaults: { format: :json } do
    resources :users, only: [:create, :update]

    resource :session, only: [:create, :destroy]

    resources :projects, only: [:create, :update, :index, :destroy] do
      resources :stories, only: [:create, :index]
    end

    resources :memberships, only: [:create, :index]

    resources :stories, only: [:update, :destroy] do
      resources :comments, only: [:create, :index]
      resources :tasks, only: [:create, :index]
    end

    resources :comments, only: [:update, :destroy]

    resources :tasks, only: [:update, :destroy]

  end
end
