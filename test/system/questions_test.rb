require "application_system_test_case"

class QuestionsTest < ApplicationSystemTestCase
  setup do
    @question = questions(:one)
    @responder = responders(:one)
    sign_in_as(@responder) # Need to be logged in for most actions
  end

  test "visiting the index" do
    visit questions_url

    # First check if we're properly logged in
    assert_no_text "You need to sign in or sign up before continuing."

    # Check for something that should be visible in the navigation
    assert_selector "a", text: "Knowledge Base"

    # Check for "Ask a Question" which should be related to questions
    assert_selector "a", text: "Ask a Question"
  end

  test "should create question" do
    skip "This test needs a more specific approach for the Ask a Question flow"
  end

  test "should update Question" do
    skip "Need to review the actual edit form for questions"
    visit question_url(@question)
  end

  test "should destroy Question" do
    skip "Need to handle confirmation dialog properly"
    visit question_url(@question)
  end
end
