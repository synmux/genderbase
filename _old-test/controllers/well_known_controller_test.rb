require "test_helper"

class WellKnownControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get well_known_index_url
    assert_response :success
  end

  test "should get webfinger" do
    get well_known_webfinger_url, params: { resource: "acct:dave@genderbase.com" }, as: :json
    assert_response :success
  end

  test "should get ai.txt" do
    get ai_url
    assert_response :success
  end

  test "should get ads.txt" do
    get ads_url
    assert_response :success
  end

  test "should get security.txt" do
    get well_known_security_url
    assert_response :success
  end

  test "should get humans.txt" do
    get humans_url
    assert_response :success
  end

  test "should get well-known robots.txt" do
    get robots_url
    assert_response :success
  end
end
