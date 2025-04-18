Rails.application.routes.draw do
  # https://guides.rubyonrails.org/routing.html

  # WellKnownController
  get "/.well-known", controller: :well_known, action: :index, as: :well_known_index
  get "/.well-known/security", controller: :well_known, action: :security, as: :well_known_security
  get "/.well-known/webfinger", controller: :well_known, action: :webfinger, as: :well_known_webfinger
  get "/ads", controller: :well_known, action: :ads, as: :well_known_ads
  get "/ai", controller: :well_known, action: :ai, as: :well_known_ai
  get "/humans", controller: :well_known, action: :humans, as: :well_known_humans
  get "/robots", controller: :well_known, action: :robots, as: :well_known_robots

  # HomeController
  get "/home", controller: :home, action: :index, as: :home_index
  get "/about", controller: :home, action: :about, as: :home_about
  get "/privacy", controller: :home, action: :privacy, as: :home_privacy
  get "/security", controller: :home, action: :security, as: :home_security
  get "/support", controller: :home, action: :support, as: :home_support
  get "/donate", controller: :home, action: :donate, as: :home_donate
  get "/team", controller: :home, action: :team, as: :home_team
  get "/volunteer", controller: :home, action: :volunteer, as: :home_volunteer
  get "/good-faith", controller: :home, action: :good_faith, as: :home_good_faith

  # RESTful routes
  resources :terminologies

  # Knowledge base routes
  resources :knowledges

  # Answer routes - includes conversion to knowledge base
  resources :answers

  # Question routes - includes token-based access and closing
  resources :questions do
    post "close", on: :member
    get "convert_to_knowledge", on: :member
  end
  get "/questions/token/:token", to: "questions#show_by_token", as: :question_token
  post "/questions/token/:token/answers", to: "answers#create", as: :question_token_answer

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
