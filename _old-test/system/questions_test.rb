require "application_system_test_case"

class QuestionsTest < ApplicationSystemTestCase
  setup do
    @question = questions(:one)
  end

  test "visiting the index" do
    visit questions_url
    assert_selector "h1", text: "Community Questions"
  end

  test "should create question" do
    visit questions_url
    click_on "Ask a Question", match: :first

    check "Submit Anonymously" if @question.anonymous
    fill_in "Question Details", with: @question.content
    fill_in "Question Title", with: @question.title
    fill_in "Email Address", with: @question.email if @question.email.present?
    click_on "Submit Question"

    assert_text "Question was successfully created"
    click_on "Back to questions"
  end

  test "should update Question" do
    visit question_url(@question)
    click_on "Edit"

    check "Submit Anonymously" if @question.anonymous
    fill_in "Question Details", with: @question.content
    fill_in "Question Title", with: @question.title
    fill_in "Email Address", with: @question.email if @question.email.present?
    click_on "Submit Question"

    assert_text "Question was successfully updated"
    click_on "Back to questions"
  end

  test "should destroy Question" do
    visit question_url(@question)
    click_on "Delete"

    page.driver.browser.switch_to.alert.accept if page.driver.browser.respond_to?(:switch_to)

    assert_text "Question was successfully destroyed"
  end
end
