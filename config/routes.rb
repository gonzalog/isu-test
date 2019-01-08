Rails.application.routes.draw do
  root "home#index"

  resources :contact_types, only: [:index]

  resources :contacts, only: [:index, :create, :update, :show, :destroy]

  resources :reservations, only: [:index, :create, :update, :show]
  get 'sortings', to: "reservations#sortings"
end
