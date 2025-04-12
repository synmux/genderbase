Rails.application.routes.draw do
  devise_for :responders
  get "/.well-known", controller: :well_known, action: :index, as: :well_known_index
  get "/.well-known/security", controller: :well_known, action: :security, as: :well_known_security
  get "/.well-known/webfinger", controller: :well_known, action: :webfinger, as: :well_known_webfinger
  get "/ads", controller: :well_known, action: :ads, as: :ads
  get "/ai", controller: :well_known, action: :ai, as: :ai
  get "/humans", controller: :well_known, action: :humans, as: :humans
  get "/robots", controller: :well_known, action: :robots, as: :robots
  get "/about", controller: :home, action: :about, as: :home_about
  get "/privacy", controller: :home, action: :privacy, as: :home_privacy
  get "/security", controller: :home, action: :security, as: :home_security
  get "/support", controller: :home, action: :support, as: :home_support
  get "/donate", controller: :home, action: :donate, as: :home_donate
  get "/team", controller: :home, action: :team, as: :home_team
  get "/volunteer", controller: :home, action: :volunteer, as: :home_volunteer
  get "/terminology", controller: :terminology, action: :index, as: :terminology_index
  resources :answers
  resources :articles
  resources :questions

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  root to: "home#index", as: :root

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
end
