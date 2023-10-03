import React from "react";
import { shallow } from "enzyme";
import Login from "./Login";

// Mock the useLocalStorage hook
jest.mock("@/api/layer/useLocaleStorage", () => ({
  useLocalStorage: jest.fn(),
}));

describe("Login Component", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.exists()).toBe(true);
  });

  it("displays an error message when login fails", () => {
    // Mock the useLocalStorage hook to return a mock function for checkDataUser
    const mockCheckDataUser = jest.fn(() => false);
    jest
      .requireMock("@/api/layer/useLocaleStorage")
      .useLocalStorage.mockReturnValue({
        checkDataUser: mockCheckDataUser,
      });

    const wrapper = shallow(<Login />);

    // Simulate a form submission
    const form = wrapper.find("form");
    form.simulate("submit", {
      preventDefault: () => {},
    });

    // Assert that the error message is displayed
    expect(wrapper.find(".error-message").exists()).toBe(true);
  });

  it("successfully logs in when checkDataUser returns true", () => {
    // Mock the useLocalStorage hook to return a mock function for checkDataUser
    const mockCheckDataUser = jest.fn(() => true);
    jest
      .requireMock("@/api/layer/useLocaleStorage")
      .useLocalStorage.mockReturnValue({
        checkDataUser: mockCheckDataUser,
      });

    const wrapper = shallow(<Login />);

    // Mock window.location.reload to avoid actually reloading the page
    const reloadSpy = jest.spyOn(global.window.location, "reload");

    // Simulate a form submission
    const form = wrapper.find("form");
    form.simulate("submit", {
      preventDefault: () => {},
    });

    // Assert that the page should be reloaded upon successful login
    expect(reloadSpy).toHaveBeenCalled();
  });
});
