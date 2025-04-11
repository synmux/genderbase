require "test_helper"

class QuestionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end

  test "question can have a responder" do
    question = questions(:one)
    assert_not_nil question.responder
    assert_equal responders(:one), question.responder
  end

  test "question can exist without a responder" do
    question = Question.new(title: "Test", content: "Test content", status: "open", anonymous: false)
    assert question.valid?
  end

  test "question can have an optional email" do
    question_with_email = Question.new(title: "Test", content: "Test content", status: "open", anonymous: false, email: "test@example.com")
    question_without_email = Question.new(title: "Test", content: "Test content", status: "open", anonymous: false, email: nil)

    assert question_with_email.valid?
    assert question_without_email.valid?
    assert_equal "test@example.com", question_with_email.email
    assert_nil question_without_email.email
  end
end
