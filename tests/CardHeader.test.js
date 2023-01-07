import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import CardHeader from "./src/components/CardHeader.vue";

describe("CardHeader", () => {
  it("exits", () => {
    expect(CardHeader).toBeTruthy();
  });

  const wrapper = mount(CardHeader, {
    props: {
      title: "Fest",
      icon: "star",
    },
  });

  it("displays props correctly", () => {
    expect(wrapper.find("h3").text()).toContain("Fest");
  });

  it("should render icon", () => {
    expect(wrapper.find("span")).toBeTruthy;

    expect(wrapper.find("span").attributes("class")).toBe("material-icons");
    expect(wrapper.find("span").text()).toContain("star");
  });

  it("should not render span if no icon", () => {
    const wrapper = mount(CardHeader, {
      props: {
        icon: "",
      },
    });
    expect(wrapper.find("span").exists()).toBe(false);
  });
});
