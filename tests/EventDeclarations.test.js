import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import EventDeclarations from "./src/components/EventDeclarations.vue";

describe("EventDeclarations", () => {
  it("exits", () => {
    expect(EventDeclarations).toBeTruthy();
  });

  const wrapper = mount(EventDeclarations, {
    props: {
      declarations: 5,
      invitedTotal: 10,
    },
  });

  it("displays correct icon", () => {
    expect(wrapper.find("span").attributes("class")).toBe("material-icons");
    expect(wrapper.find("span").text()).toContain("group");
  });

  it("displays props correctly", () => {
    expect(wrapper.find("p").text()).toContain(5);
    expect(wrapper.find("p").text()).toContain(10);
    expect(wrapper.find("p").text()).toContain("5 af 10 tilkendegivelser");
  });
});
