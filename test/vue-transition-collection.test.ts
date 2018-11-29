import * as Vue from "vue"
import VueTransitionCollection from "../src/vue-transition-collection"
import { mount, createLocalVue } from "@vue/test-utils"

const localVue = createLocalVue()

let components: any = {}

beforeAll(() => {
  components = VueTransitionCollection.generateComponents(Vue as any)
})

const testTransition = (transitionName: string) => {
  it("exists", () => {
    mount(components[transitionName], { localVue })
  })

  it("matches snapshot", () => {
    const wrapper = mount(components[transitionName], {
      localVue,
      slots: {
        default: ["<div>text</div>"]
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("uses props", () => {
    const wrapper = mount(components[transitionName], {
      localVue,
      propsData: {
        inverse: true,
        direction: "toggle",
        group: true
      },
      slots: {
        default: ["<div>text</div>"]
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
}

describe("Transitions", () => {
  ;["fade", "zoom", "bounce", "flip", "fadeBig", "rotate", "slide"].forEach(componentName => {
    describe(`Testing "${componentName}" transition`, () => {
      testTransition(componentName)
    })
  })
})

describe("Plugin", () => {
  test("install()", () => {
    localVue.use(VueTransitionCollection)
  })

  test("applyDurationAndDelay()", () => {
    const el = document.createElement("div")
    VueTransitionCollection.applyDurationAndDelay({ duration: 100, delay: 200 })(el)
    expect(el.style).toMatchObject({
      animationDuration: "100ms",
      animationDelay: "200ms"
    })
  })
})
