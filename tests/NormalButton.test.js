import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import NormalButton from "./src/components/NormalButton.vue";

describe("NormalButton", () => {
  it("exits", () => {
    expect(NormalButton).toBeTruthy();
  });

  const wrapper = mount(NormalButton, {
    props: {
      text: "Opret",
      iconBefore: "add",
      iconAfter: "chevron_right",
    },
  });

  it("displays text prop correctly", () => {
    expect(wrapper.text()).toContain("Opret");
  });

  //   Icon before
  it("should render icon before", () => {
    const iconBeforeSpan = wrapper.find(".icon-before");

    expect(iconBeforeSpan).toBeTruthy;
    expect(iconBeforeSpan.attributes("class")).toContain("material-icons");
    expect(iconBeforeSpan.text()).toBe("add");
  });

  it("should not render span if no icon before", () => {
    const wrapper = mount(NormalButton, {
      props: {
        iconBefore: "",
      },
    });
    const iconBeforeSpan = wrapper.find(".icon-before");

    expect(iconBeforeSpan.exists()).toBe(false);
  });

  //   Icon after
  it("should render icon after", () => {
    const iconAfterSpan = wrapper.find(".icon-after");

    expect(iconAfterSpan).toBeTruthy;
    expect(iconAfterSpan.attributes("class")).toContain("material-icons");
    expect(iconAfterSpan.text()).toBe("chevron_right");
  });

  it("should not render span if no icon after", () => {
    const wrapper = mount(NormalButton, {
      props: {
        iconAfter: "",
      },
    });
    const iconAfterSpan = wrapper.find(".icon-after");

    expect(iconAfterSpan.exists()).toBe(false);
  });
});
