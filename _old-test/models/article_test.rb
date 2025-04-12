require "test_helper"

class ArticleTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end

  test "article can access responder through question" do
    article = articles(:one)
    assert_not_nil article.responder
    assert_equal responders(:one), article.responder
  end

  test "article's responder matches question's responder" do
    article = articles(:one)
    assert_equal article.question.responder, article.responder
  end
end
