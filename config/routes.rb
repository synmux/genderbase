Rails.application.routes.draw do
  get "/.well-known", controller: :well_known, action: :index, as: :well_known_index
  get "/.well-known/security", controller: :well_known, action: :security, as: :well_known_security
  get "/.well-known/webfinger", controller: :well_known, action: :webfinger, as: :well_known_webfinger
  get "/about", controller: :home, action: :about, as: :home_about
  get "/ads", controller: :well_known, action: :ads, as: :ads
  get "/ai", controller: :well_known, action: :ai, as: :ai
  get "/humans", controller: :well_known, action: :humans, as: :humans
  get "/index", controller: :home, action: :index, as: :home_index
  get "/privacy", controller: :home, action: :privacy, as: :home_privacy
  get "/robots", controller: :well_known, action: :robots, as: :robots
  get "/security", controller: :home, action: :security, as: :home_security
  get "/team", controller: :home, action: :team, as: :home_team
  get "/volunteer", controller: :home, action: :volunteer, as: :home_volunteer

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  root to: "home#index", as: :root

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
end
