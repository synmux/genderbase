require "test_helper"

class AnswersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @answer = answers(:one)
    @responder = responders(:one)
  end

  test "should get index" do
    sign_in_as(@responder)
    get answers_url
    assert_response :success
  end

  test "should get new" do
    sign_in_as(@responder)
    get new_answer_url
    assert_response :success
  end

  test "should create answer" do
    sign_in_as(@responder)
    assert_difference("Answer.count") do
      post answers_url, params: { answer: { body: @answer.body, question_id: @answer.question_id, responder_id: @answer.responder_id } }
    end

    assert_redirected_to question_url(Answer.last.question)
  end

  test "should show answer" do
    sign_in_as(@responder)
    get answer_url(@answer)
    assert_response :success
  end

  test "should get edit" do
    sign_in_as(@responder)
    get edit_answer_url(@answer)
    assert_response :success
  end

  test "should update answer" do
    sign_in_as(@responder)
    patch answer_url(@answer), params: { answer: { body: @answer.body, question_id: @answer.question_id, responder_id: @answer.responder_id } }
    assert_redirected_to question_url(@answer.question)
  end

  test "should destroy answer" do
    sign_in_as(@responder)
    assert_difference("Answer.count", -1) do
      delete answer_url(@answer)
    end

    assert_redirected_to question_url(@answer.question)
  end
end
