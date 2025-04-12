require "application_system_test_case"

class TerminologiesTest < ApplicationSystemTestCase
  setup do
    @terminology = terminologies(:one)
  end

  test "visiting the index" do
    visit terminologies_url
    assert_selector "h1", text: "Terminologies"
  end

  test "should create terminology" do
    visit terminologies_url
    click_on "New terminology"

    fill_in "Definition", with: @terminology.definition
    fill_in "Info", with: @terminology.info
    fill_in "Responder", with: @terminology.responder_id
    fill_in "Word", with: @terminology.word
    click_on "Create Terminology"

    assert_text "Terminology was successfully created"
    click_on "Back"
  end

  test "should update Terminology" do
    visit terminology_url(@terminology)
    click_on "Edit this terminology", match: :first

    fill_in "Definition", with: @terminology.definition
    fill_in "Info", with: @terminology.info
    fill_in "Responder", with: @terminology.responder_id
    fill_in "Word", with: @terminology.word
    click_on "Update Terminology"

    assert_text "Terminology was successfully updated"
    click_on "Back"
  end

  test "should destroy Terminology" do
    visit terminology_url(@terminology)
    click_on "Destroy this terminology", match: :first

    assert_text "Terminology was successfully destroyed"
  end
end
