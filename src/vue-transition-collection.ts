// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find" ...

import * as Vue from "vue";

interface PluginOptions { }

interface Plugin {
  install: Vue.PluginFunction<PluginOptions>;
  generateComponents (Vue: Vue.VueConstructor<Vue.default>);
  applyDurationAndDelay: typeof applyDurationAndDelay;
}

interface DirectionDescription {
  enter: string;
  leave: string;
}

interface TransitionDescription {
  displayName: string;
  left?: DirectionDescription;
  right?: DirectionDescription;
  down?: DirectionDescription;
  up?: DirectionDescription;
  toggle?: DirectionDescription;
}

interface TransitionDescriptions {
  fade: TransitionDescription;
  fadeBig: TransitionDescription;
  zoom: TransitionDescription;
  bounce: TransitionDescription;
  flip: TransitionDescription;
  rotate: TransitionDescription;
  slide: TransitionDescription;
}

type Directions = "toggle" | "left" | "right" | "up" | "down";

const transitionDescriptions: TransitionDescriptions = {
  fade: {
    displayName: "Fade",
    toggle: {
      enter: "fadeIn",
      leave: "fadeOut"
    },
    left: {
      enter: "fadeInLeft",
      leave: "fadeOutRight"
    },
    right: {
      enter: "fadeInRight",
      leave: "fadeOutLeft"
    },
    down: {
      enter: "fadeInUp",
      leave: "fadeOutUp"
    },
    up: {
      enter: "fadeInDown",
      leave: "fadeOutDown"
    }
  },
  fadeBig: {
    displayName: "Fade",
    toggle: {
      enter: "fadeIn",
      leave: "fadeOut"
    },
    left: {
      enter: "fadeInLeftBig",
      leave: "fadeOutRightBig"
    },
    right: {
      enter: "fadeInRightBig",
      leave: "fadeOutLeftBig"
    },
    down: {
      enter: "fadeInUpBig",
      leave: "fadeOutUpBig"
    },
    up: {
      enter: "fadeInDownBig",
      leave: "fadeOutDownBig"
    }
  },
  zoom: {
    displayName: "Zoom",
    toggle: {
      enter: "zoomIn",
      leave: "zoomOut"
    },
    left: {
      enter: "zoomInLeft",
      leave: "zoomOutRight"
    },
    right: {
      enter: "zoomInRight",
      leave: "zoomOutLeft"
    },
    down: {
      enter: "zoomInUp",
      leave: "zoomOutUp"
    },
    up: {
      enter: "zoomInDown",
      leave: "zoomOutDown"
    }
  },
  bounce: {
    displayName: "Bounce",
    toggle: {
      enter: "bounceIn",
      leave: "bounceOut"
    },
    left: {
      enter: "bounceInLeft",
      leave: "bounceOutRight"
    },
    right: {
      enter: "bounceInRight",
      leave: "bounceOutLeft"
    },
    down: {
      enter: "bounceInUp",
      leave: "bounceOutUp"
    },
    up: {
      enter: "bounceInDown",
      leave: "bounceOutDown"
    }
  },
  flip: {
    displayName: "Flip",
    toggle: {
      enter: "flip",
      leave: "flip"
    },
    left: {
      enter: "flipInY",
      leave: "flipOutY"
    },
    right: {
      enter: "flipInY",
      leave: "flipOutY"
    },
    down: {
      enter: "flipInX",
      leave: "flipOutX"
    },
    up: {
      enter: "flipInX",
      leave: "flipOutX"
    }
  },
  rotate: {
    displayName: "Rotate",
    toggle: {
      enter: "rotateIn",
      leave: "rotateOut"
    },
    left: {
      enter: "rotateInDownLeft",
      leave: "rotateOutDownRight"
    },
    right: {
      enter: "rotateInDownRight",
      leave: "rotateOutDownLeft"
    },
    down: {
      enter: "rotateInUpRight",
      leave: "rotateOutUpRight"
    },
    up: {
      enter: "rotateInDownLeft",
      leave: "rotateOutDownLeft"
    }
  },
  slide: {
    displayName: "Slide",
    toggle: {
      enter: "fadeIn",
      leave: "fadeOut"
    },
    left: {
      enter: "slideInLeft",
      leave: "slideOutRight"
    },
    right: {
      enter: "slideInRight",
      leave: "slideOutLeft"
    },
    down: {
      enter: "slideInUp",
      leave: "slideOutUp"
    },
    up: {
      enter: "slideInDown",
      leave: "slideOutDown"
    }
  }
};

const applyDurationAndDelay = ({
  duration,
  delay
}: {
  duration: number | string
  delay: number | string
}) => (el: HTMLElement) => {
  el.style.animationDuration = duration + "ms";
  el.style.animationDelay = delay + "ms";
};

const createSimpleTransition = (
  vue: Vue.VueConstructor<Vue.default>,
  description: TransitionDescription
) => {
  return vue.extend({
    functional: true,
    name: description.displayName,
    props: {
      group: {
        type: Boolean,
        default: false
      },
      mode: {
        type: String,
        default: "in-out"
      },
      direction: {
        type: String,
        default: "toggle",
        validator: (d: string) => ["left", "right", "up", "down", "toggle"].indexOf(d) !== -1
      },
      inverse: {
        type: Boolean,
        default: false
      },
      delay: {
        type: [Number, String],
        default: 0
      },
      duration: {
        type: [Number, String],
        default: 1000
      }
    },
    render (h: Vue.CreateElement, { props, listeners, slots, data, children }): Vue.VNode {
      const tag = `transition${(props.group && "-group") || ""}`;
      const opposites = {
        up: "down",
        down: "up",
        left: "right",
        right: "left",
        toggle: "toggle"
      };
      let currentDirection = ((props.inverse && opposites[props.direction]) ||
        props.direction) as Directions;
      const transitionClasses = description[currentDirection] as DirectionDescription;
      const transitionProps: any = {
        props: {
          name,
          mode: props.mode,
          enterActiveClass: `animated ${transitionClasses.enter}`,
          leaveActiveClass: `animated ${transitionClasses.leave}`
        },
        on: {
          beforeLeave: applyDurationAndDelay({ duration: props.duration, delay: props.delay }),
          beforeEnter: applyDurationAndDelay({ duration: props.duration, delay: props.delay }),
          ...listeners
        }
      };
      return h(tag, transitionProps, children);
    }
  });
};

const VueTransitionCollection: Plugin = {
  generateComponents (vue: Vue.VueConstructor<Vue.default>) {
    return {
      fade: createSimpleTransition(vue, transitionDescriptions.fade),
      zoom: createSimpleTransition(vue, transitionDescriptions.zoom),
      bounce: createSimpleTransition(vue, transitionDescriptions.bounce),
      flip: createSimpleTransition(vue, transitionDescriptions.flip),
      fadeBig: createSimpleTransition(vue, transitionDescriptions.fadeBig),
      rotate: createSimpleTransition(vue, transitionDescriptions.rotate),
      slide: createSimpleTransition(vue, transitionDescriptions.slide)
    };
  },
  install (vue, args) {
    const components = this.generateComponents(vue);
    vue.component("vtc-fade", components.fade);
    vue.component("vtc-zoom", components.zoom);
    vue.component("vtc-bounce", components.bounce);
    vue.component("vtc-flip", components.flip);
    vue.component("vtc-fade-big", components.fadeBig);
    vue.component("vtc-rotate", components.rotate);
    vue.component("vtc-slide", components.slide);
  },
  applyDurationAndDelay
};

export default VueTransitionCollection;
