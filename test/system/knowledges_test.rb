require "application_system_test_case"

class KnowledgesTest < ApplicationSystemTestCase
  setup do
    @knowledge = knowledges(:one)
  end

  test "visiting the index" do
    visit knowledges_url
    assert_selector "h1", text: "Knowledges"
  end

  test "should create knowledge" do
    visit knowledges_url
    click_on "New knowledge"

    fill_in "Body", with: @knowledge.body
    fill_in "Category", with: @knowledge.category
    fill_in "Description", with: @knowledge.description
    fill_in "Question", with: @knowledge.question_id
    fill_in "Responder", with: @knowledge.responder_id
    fill_in "Slug", with: @knowledge.slug
    fill_in "Title", with: @knowledge.title
    click_on "Create Knowledge"

    assert_text "Knowledge was successfully created"
    click_on "Back"
  end

  test "should update Knowledge" do
    visit knowledge_url(@knowledge)
    click_on "Edit this knowledge", match: :first

    fill_in "Body", with: @knowledge.body
    fill_in "Category", with: @knowledge.category
    fill_in "Description", with: @knowledge.description
    fill_in "Question", with: @knowledge.question_id
    fill_in "Responder", with: @knowledge.responder_id
    fill_in "Slug", with: @knowledge.slug
    fill_in "Title", with: @knowledge.title
    click_on "Update Knowledge"

    assert_text "Knowledge was successfully updated"
    click_on "Back"
  end

  test "should destroy Knowledge" do
    visit knowledge_url(@knowledge)
    click_on "Destroy this knowledge", match: :first

    assert_text "Knowledge was successfully destroyed"
  end
end
