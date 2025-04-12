Rails.application.routes.draw do
  # https://guides.rubyonrails.org/routing.html

  # WellKnownController
  get "/.well-known", controller: :well_known, action: :index, as: :well_known
  get "/.well-known/security", controller: :well_known, action: :security, as: :security
  get "/.well-known/webfinger", controller: :well_known, action: :webfinger, as: :webfinger
  get "/ads", controller: :well_known, action: :ads, as: :ads
  get "/ai", controller: :well_known, action: :ai, as: :ai
  get "/humans", controller: :well_known, action: :humans, as: :humans
  get "/robots", controller: :well_known, action: :robots, as: :robots

  # HomeController
  get "/about", controller: :home, action: :about, as: :about
  get "/privacy", controller: :home, action: :privacy, as: :privacy
  get "/security", controller: :home, action: :security, as: :security
  get "/support", controller: :home, action: :support, as: :support
  get "/donate", controller: :home, action: :donate, as: :donate
  get "/team", controller: :home, action: :team, as: :team
  get "/volunteer", controller: :home, action: :volunteer, as: :volunteer

  # RESTful routes
  resources :terminologies
  resources :knowledges
  resources :answers
  resources :questions

  # Devise routes
  devise_for :responders

  # Status check
  # 200 if the app boots with no exceptions, otherwise 500.
  get "up" => "rails/health#show", as: :rails_health_check

  # PWA routes
  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Root route
  root to: "home#index", as: :root
end
