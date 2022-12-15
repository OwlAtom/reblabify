import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import ExampleTest from "./src/components/ExampleTest.vue";

describe("ExampleTest.vue", () => {
  it("renders correct style for error", () => {
    const type = "error";
    const wrapper = mount(ExampleTest, {
      props: { type },
    });
    expect(wrapper.classes()).toEqual(expect.arrayContaining(["notification--error"]));
  });

  it("renders correct style for success", () => {
    const type = "success";
    const wrapper = mount(ExampleTest, {
      props: { type },
    });
    expect(wrapper.classes()).toEqual(expect.arrayContaining(["notification--success"]));
  });

  it("renders correct style for info", () => {
    const type = "info";
    const wrapper = mount(ExampleTest, {
      props: { type },
    });
    expect(wrapper.classes()).toEqual(expect.arrayContaining(["notification--info"]));
  });

  it("slides down when message is not empty", () => {
    const message = "success";
    const wrapper = mount(ExampleTest, {
      props: { message },
    });
    expect(wrapper.classes()).toEqual(expect.arrayContaining(["notification--slide"]));
  });
  it("slides up when message is empty", () => {
    const message = "";
    const wrapper = mount(ExampleTest, {
      props: { message },
    });
    expect(wrapper.classes("notification--slide")).toBe(false);
  });
  it("emits event when close button is clicked", async () => {
    const wrapper = mount(ExampleTest, {
      data() {
        return {
          clicked: false,
        };
      },
    });
    const closeButton = wrapper.find("button");
    await closeButton.trigger("click");
    expect(wrapper.emitted()).toHaveProperty("clear-notification");
  });
  it("renders message when message is not empty", () => {
    const message = "Something happened, try again";
    const wrapper = mount(ExampleTest, {
      props: { message },
    });
    expect(wrapper.find("p").text()).toBe(message);
  });
});
