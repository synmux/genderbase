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
end
