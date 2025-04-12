require "test_helper"

class TerminologiesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @terminology = terminologies(:one)
    @responder = responders(:one)
  end

  test "should get index" do
    get terminologies_url
    assert_response :success
  end

  test "should get new" do
    sign_in_as(@responder)
    get new_terminology_url
    assert_response :success
  end

  test "should create terminology" do
    sign_in_as(@responder)
    assert_difference("Terminology.count") do
      post terminologies_url, params: { terminology: { definition: @terminology.definition, info: @terminology.info, responder_id: @terminology.responder_id, term: @terminology.term } }
    end

    assert_redirected_to terminology_url(Terminology.last)
  end

  test "should show terminology" do
    get terminology_url(@terminology)
    assert_response :success
  end

  test "should get edit" do
    sign_in_as(@responder)
    get edit_terminology_url(@terminology)
    assert_response :success
  end

  test "should update terminology" do
    sign_in_as(@responder)
    patch terminology_url(@terminology), params: { terminology: { definition: @terminology.definition, info: @terminology.info, responder_id: @terminology.responder_id, term: @terminology.term } }
    assert_redirected_to terminology_url(@terminology)
  end

  test "should destroy terminology" do
    sign_in_as(@responder)
    assert_difference("Terminology.count", -1) do
      delete terminology_url(@terminology)
    end

    assert_redirected_to terminologies_url
  end
end
