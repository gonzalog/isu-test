Rails.application.routes.draw do
  root "home#index"

  resources :contact_types, only: [:index]
  resources :reservations, only: [:index, :create, :update, :show]
  resources :contacts, only: [:index, :create, :update, :show, :destroy]
end
