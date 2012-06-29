require 'test_helper'

class FindersControllerTest < ActionController::TestCase
  setup do
    @finder = finders(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:finders)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create finder" do
    assert_difference('Finder.count') do
      post :create, finder: { gender: @finder.gender }
    end

    assert_redirected_to finder_path(assigns(:finder))
  end

  test "should show finder" do
    get :show, id: @finder
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @finder
    assert_response :success
  end

  test "should update finder" do
    put :update, id: @finder, finder: { gender: @finder.gender }
    assert_redirected_to finder_path(assigns(:finder))
  end

  test "should destroy finder" do
    assert_difference('Finder.count', -1) do
      delete :destroy, id: @finder
    end

    assert_redirected_to finders_path
  end
end
