require "test_helper"

class TerminologyControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get terminology_index_url
    assert_response :success
  end
end
