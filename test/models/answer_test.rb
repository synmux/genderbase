require "test_helper"

class AnswerTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end

  test "answer can access responder through question" do
    answer = answers(:one)
    assert_not_nil answer.responder
    assert_equal responders(:one), answer.responder
  end

  test "answer's responder matches question's responder" do
    answer = answers(:one)
    assert_equal answer.question.responder, answer.responder
  end
end
