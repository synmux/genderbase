require "test_helper"

class KnowledgesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @knowledge = knowledges(:one)
    @responder = responders(:one)
  end

  test "should get index" do
    get knowledges_url
    assert_response :success
  end

  test "should get new" do
    sign_in_as(@responder)
    get new_knowledge_url
    assert_response :success
  end

  test "should create knowledge" do
    sign_in_as(@responder)
    assert_difference("Knowledge.count") do
      post knowledges_url, params: { knowledge: {
        body: @knowledge.body,
        category: @knowledge.category,
        description: @knowledge.description,
        question_id: @knowledge.question_id,
        responder_id: @knowledge.responder_id,
        title: @knowledge.title,
        slug: "unique-test-slug-#{Time.now.to_i}"
      } }
    end

    assert_redirected_to knowledge_url(Knowledge.last)
  end

  test "should show knowledge" do
    get knowledge_url(@knowledge)
    assert_response :success
  end

  test "should get edit" do
    sign_in_as(@responder)
    get edit_knowledge_url(@knowledge)
    assert_response :success
  end

  test "should update knowledge" do
    sign_in_as(@responder)
    patch knowledge_url(@knowledge), params: { knowledge: {
      body: @knowledge.body,
      category: @knowledge.category,
      description: @knowledge.description,
      question_id: @knowledge.question_id,
      responder_id: @knowledge.responder_id,
      title: @knowledge.title,
      slug: "unique-update-slug-#{Time.now.to_i}"
    } }
    assert_redirected_to knowledge_url(@knowledge)
  end

  test "should destroy knowledge" do
    sign_in_as(@responder)
    assert_difference("Knowledge.count", -1) do
      delete knowledge_url(@knowledge)
    end

    assert_redirected_to knowledges_url
  end
end
