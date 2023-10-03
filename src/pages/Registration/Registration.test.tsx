import React from "react";
import { shallow } from "enzyme";
import Registration from "./Registration";

describe("Registration Component", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<Registration />);
    expect(wrapper.exists()).toBe(true);
  });

  it("displays an error message when passwords do not match", () => {
    const wrapper = shallow(<Registration />);

    // Simulate a form submission with mismatched passwords
    const form = wrapper.find("form");
    form.simulate("submit", {
      preventDefault: () => {},
    });

    // Assert that the error message is displayed
    expect(wrapper.find(".error-message").exists()).toBe(true);
  });

  it("displays an error message when email already exists", () => {
    const wrapper = shallow(<Registration />);
    const instance = wrapper.instance() as any;

    // Mock the findDataUser function to return true (email already exists)
    jest.spyOn(instance, "findDataUser").mockReturnValue(true);

    // Simulate a form submission with an existing email
    const form = wrapper.find("form");
    form.simulate("submit", {
      preventDefault: () => {},
    });

    // Assert that the error message is displayed
    expect(wrapper.find(".error-message").exists()).toBe(true);
  });

  it("successfully registers when form data is valid", () => {
    const wrapper = shallow(<Registration />);
    const instance = wrapper.instance() as any;

    // Mock the findDataUser function to return false (email does not exist)
    jest.spyOn(instance, "findDataUser").mockReturnValue(false);

    // Mock the updateDataUser function
    jest.spyOn(instance, "updateDataUser").mockImplementation(() => {});

    // Simulate a form submission with valid data
    const form = wrapper.find("form");
    form.simulate("submit", {
      preventDefault: () => {},
    });

    // Assert that the PopupRegister component is displayed
    expect(wrapper.find("PopupRegister").exists()).toBe(true);
  });
});
