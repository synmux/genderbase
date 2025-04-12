require "test_helper"

class WellKnownControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get well_known_index_url
    assert_response :success
  end

  test "should get webfinger" do
    get well_known_webfinger_url
    assert_response :success
  end

  test "should get ai" do
    get well_known_ai_url
    assert_response :success
  end

  test "should get ads" do
    get well_known_ads_url
    assert_response :success
  end

  test "should get security" do
    get well_known_security_url
    assert_response :success
  end

  test "should get humans" do
    get well_known_humans_url
    assert_response :success
  end

  test "should get robots" do
    get well_known_robots_url
    assert_response :success
  end
end
