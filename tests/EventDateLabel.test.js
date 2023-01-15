import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import EventDateLabel from "./src/components/EventDateLabel.vue";

describe("EventDateLabel", () => {
  it("exits", () => {
    expect(EventDateLabel).toBeTruthy();
  });

  it("displays props correctly", () => {
    const wrapper = mount(EventDateLabel, {
      props: {
        month: "jan.",
        date: "1",
      },
    });

    expect(wrapper.find("h3").text().toLowerCase()).toContain("jan");
    expect(wrapper.find("h1").text()).toContain("1");
  });
});
