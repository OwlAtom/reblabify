import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import NotificationItem from "./src/components/NotificationItem.vue";

describe("NotificationItem.vue", () => {
  // it("renders ", () => {
  //   const wrapper = mount(NotificationItem);
  //   expect(wrapper.exists()).toBe(true);
  // });
  //  ^ Ikke vigtig, men god at have her i starten
  it("renders", () => {
    const wrapper = mount(NotificationItem);
    expect(wrapper.find(".notification-types").exists()).toBe(true);
  });

  it("renders something", () => {
    const wrapper = mount(NotificationItem);
    expect(wrapper.find(".notification-type").text()).toEqual("check_circle");
  });

  // * Husk at der er defineret props
  //   todo: teste typen af props eg. at det er string og de ikke er tomme
  //   todo: teste at span har én af de fire classes
  //   todo: teste af hvis type = new-invite så får den green check og så videre
  //   todo: checke at icon passer
  //   fra notezy:
  // it("mounts props correctly", () => {
  //   expect(wrapper.props().list).toBe(todoObj);
  // });
  // it("renders an empty page when no props are passed", () => {
  //   const wrapper = mount(SimplifiedTodoList);
  //   expect(wrapper.props().list).toStrictEqual({ name: "", id: "", items: [] });
  // });
});
