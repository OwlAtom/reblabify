// import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import DefaultHeader from "./src/components/DefaultHeader.vue";

describe("DefaultHeader", () => {
  it("exits", () => {
    expect(DefaultHeader).toBeTruthy();
  });

  //   const wrapper = mount(DefaultHeader);

  //   it("displays heading", () => {
  //     // expect(wrapper.find("h1").text()).toBe("{{ $route.meta.heading }}");
  //   });

  //   it("displays wave", () => {

  //   });
});
