require "test_helper"

class KnowledgeControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get knowledge_index_url
    assert_response :success
  end

  test "should get show" do
    get knowledge_show_url
    assert_response :success
  end
end
