ENV["RAILS_ENV"] ||= "test"
require_relative "../config/environment"
require "rails/test_help"

module ActiveSupport
  class TestCase
    # Run tests in parallel with specified workers
    parallelize(workers: :number_of_processors)

    # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
    fixtures :all

    # Add more helper methods to be used by all tests here...
  end
end

# Module for controller tests that need authentication
module Devise::Test::ControllerHelpers
  def sign_in_responder
    @request.env["devise.mapping"] = Devise.mappings[:responder]
    sign_in responders(:one)
  end
end

# Module for integration tests that need authentication
module AuthenticationHelper
  def sign_in_as(responder)
    # For integration tests
    if respond_to?(:post)
      post responder_session_path, params: {
        responder: {
          email: responder.email,
          password: "password123"
        }
      }
    # For system tests
    else
      visit new_responder_session_path

      # The login page should have "Log in" text somewhere
      assert page.has_text?("Log in"), "Login page should have 'Log in' text"

      # Fill in the form
      fill_in "Email", with: responder.email
      fill_in "Password", with: "password123"

      # Click the login button
      click_on "Log in"

      # Give some time for the login process to complete
      sleep 1

      # Verify we're logged in by checking for the absence of login form
      assert_no_text "You need to sign in or sign up before continuing."
    end
  end
end

class ActionDispatch::IntegrationTest
  include AuthenticationHelper
end
