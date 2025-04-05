Rails.application.routes.draw do
  get "/index", controller: :home, action: :index, as: :home_index
  get "/about", controller: :home, action: :about, as: :home_about
  get "/team", controller: :home, action: :team, as: :home_team
  get "/privacy", controller: :home, action: :privacy, as: :home_privacy
  get "/volunteer", controller: :home, action: :volunteer, as: :home_volunteer
  get "/security", controller: :home, action: :security, as: :home_security
  get "/.well-known", controller: :well_known, action: :index,
                      defaults: { format: "txt" }, as: :well_known_index
  get "/.well-known/ads.txt", controller: :well_known, action: :ads,
                              defaults: { format: "txt" }, as: :well_known_ads
  get "/.well-known/ai.txt", controller: :well_known, action: :ai,
                              defaults: { format: "txt" }, as: :well_known_ai
  get "/.well-known/humans.txt", controller: :well_known, action: :humans,
                                defaults: { format: "txt" }, as: :well_known_humans
  get "/.well-known/robots.txt", controller: :well_known, action: :robots,
                                defaults: { format: "txt" }, as: :well_known_robots
  get "/.well-known/security.txt", controller: :well_known, action: :security,
                                  defaults: { format: "txt" }, as: :well_known_security
  get "/.well-known/webfinger", controller: :well_known, action: :webfinger,
                                defaults: { format: "txt" }, as: :well_known_webfinger
  get "/robots.txt",  controller: :well_known, action: :robots,
                      defaults: { format: "txt" }, as: :root_robots

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  root to: "home#index"

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
end
