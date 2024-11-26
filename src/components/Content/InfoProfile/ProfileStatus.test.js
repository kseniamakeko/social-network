import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("profile status component", () => {
  test("status from props should be in the state", () => {
    const component = create(<ProfileStatus status={"You are not alone"} />);
    let instance = component.getInstance();
    expect(instance.state.status).toBe("You are not alone");
  });

  test("after creation <input> shouldn't be displayed", () => {
    const component = create(<ProfileStatus status={"You are not alone"} />);
    const root = component.root;
    expect(() => {
      let input = root.findByType("input");
    }).toThrow();
  });

  test("after creation <span> should be displayed with status", () => {
    const component = create(<ProfileStatus status={"You are not alone"} />);
    const root = component.root;
    let span = root.findByType("span");
    expect(span.children[0]).toBe("You are not alone");
  });

  test("input should be displayed in editmode instead of span", () => {
    const component = create(<ProfileStatus status={"You are not alone"} />);
    const root = component.root;
    let span = root.findByType("span");
    span.props.onDoubleClick();
    let input = root.findByType("input");
    expect(input.props.value).toBe("You are not alone");
  });

  test("callback should be called", () => {
    const mockCallback = jest.fn();
    const component = create(
      <ProfileStatus status={"You are not alone"} updateStatus={mockCallback} />
    );
    const instance = component.getInstance();
    instance.deactivaiteEditMode();
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
