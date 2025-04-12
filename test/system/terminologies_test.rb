require "application_system_test_case"

class TerminologiesTest < ApplicationSystemTestCase
  setup do
    @terminology = terminologies(:one)
    @responder = responders(:one)
    sign_in_as(@responder) # Need to be logged in for most actions
  end

  test "visiting the index" do
    visit terminologies_url
    assert_selector "h1", text: "Gender Terminology"
  end

  test "should create terminology" do
    skip "Need to review the actual form UI for creating terminologies"
    visit terminologies_url
    # Further test implementation needs UI review
  end

  test "should update Terminology" do
    visit terminology_url(@terminology)
    click_on "Edit this terminology", match: :first

    fill_in "Term", with: "Updated Test Term"
    fill_in "Definition", with: @terminology.definition
    fill_in "Info", with: @terminology.info
    fill_in "Responder", with: @terminology.responder_id
    click_on "Update Terminology"

    assert_text "Terminology was successfully updated"
    click_on "Back to terminologies"
  end

  test "should destroy Terminology" do
    visit terminology_url(@terminology)

    # Using the button that appears in the view
    click_button "Destroy this terminology"

    assert_text "Terminology was successfully destroyed"
  end
end
