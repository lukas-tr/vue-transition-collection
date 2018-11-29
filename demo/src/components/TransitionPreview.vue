<template>
  <div>
    <div class="container">
      <component
        :is="selectedTransition"
        :direction="direction"
        :inverse="reversed"
        :mode="selectedMode"
        :duration="duration"
        :delay="delay"
      >
        <div :key="key" class="card" :style="{backgroundColor: bgColor}">
          <button class="btn btn-up" @click="changeColor(); direction='up'">
            <i class="fas fa-angle-up"></i>
          </button>
          <button class="btn btn-down" @click="changeColor(); direction='down'">
            <i class="fas fa-angle-down"></i>
          </button>
          <button class="btn btn-left" @click="changeColor(); direction='left'">
            <i class="fas fa-angle-left"></i>
          </button>
          <button class="btn btn-right" @click="changeColor(); direction='right'">
            <i class="fas fa-angle-right"></i>
          </button>
          <button class="btn btn-toggle" @click="changeColor(); direction='toggle'">
            <i class="fas fa-circle"></i>
          </button>
        </div>
      </component>
    </div>
    <div class="margin-bottom">
      <label>
        Transition Name:
        <select v-model="selectedTransition">
          <option
            v-for="transition in transitions"
            :key="transition"
            :value="transition"
          >{{transition}}</option>
        </select>
      </label>
    </div>
    <div class="margin-bottom">
      <label>
        Mode:
        <select v-model="selectedMode">
          <option v-for="mode in modes" :key="mode" :value="mode">{{mode}}</option>
        </select>
      </label>
    </div>
    <div class="margin-bottom">
      <label>
        Duration:
        <input type="number" v-model="duration" min="0">
      </label>
    </div>
    <div class="margin-bottom">
      <label>
        Delay:
        <input type="number" v-model="delay" min="0">
      </label>
    </div>
    <div class="margin-bottom">
      <label>
        <input type="checkbox" v-model="reversed">
        Inverse
      </label>
    </div>
    <pre class="text-left" v-highlightjs="importCode"><code class="javascript"></code></pre>
    <pre class="text-left" v-highlightjs="templateCode"><code class="html"></code></pre>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component
export default class TransitionPreview extends Vue {
  private key = 0
  private delay = 0
  private duration = 1000
  private show = false
  private direction = "toggle"
  private colors = [
    "#EF9A9A",
    "#F48FB1",
    "#CE93D8",
    "#B39DDB",
    "#9FA8DA",
    "#90CAF9",
    "#81D4FA",
    "#80DEEA",
    "#80CBC4",
    "#A5D6A7",
    "#C5E1A5",
    "#E6EE9C",
    "#FFF59D",
    "#FFE082",
    "#FFCC80",
    "#FFAB91",
    "#BCAAA4",
    "#EEEEEE",
    "#B0BEC5"
  ]
  private transitions = [
    "vtc-fade",
    "vtc-zoom",
    "vtc-bounce",
    "vtc-flip",
    "vtc-fade-big",
    "vtc-rotate",
    "vtc-slide"
  ]
  private selectedTransition = this.transitions[0]
  private modes = ["out-in", "in-out"]
  private selectedMode = this.modes[0]
  private reversed = false
  private importCode = `import VueTransitionCollection from "vue-transition-collection";

Vue.use(VueTransitionCollection);`

  private bgColor = this.colors[0]

  changeColor() {
    this.key++
    this.bgColor = this.colors[this.key % this.colors.length]
  }

  get templateCode() {
    return `<${this.selectedTransition}${
      this.reversed ? " inverse" : ""
    } mode="${this.selectedMode}" direction="${this.direction}" duration="${this
      .duration || 0}" delay="${this.delay || 0}">
  <div :key="someKey">some content</div>
</${this.selectedTransition}>`
  }
}
</script>

<style lang="scss">
.container {
  height: 50vh;
  margin: 30px;
}

.card {
  margin: auto;
  background-color: #fcfcfc;
  color: #181818;
  display: block;
  border-radius: 3px;
  box-shadow: 0px 0px 5px 1px rgba(24, 24, 24, 0.596);
  width: 50vw;
  height: 50vh;
  position: absolute;
  left: 25%;
  @media only screen and (max-width: 700px) {
    width: 90vw;
    left: 5%;
  }
}

.text-left {
  text-align: left;
}

.btn {
  position: absolute;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  &.btn-right {
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
    height: 100%;
    width: 10%;
  }
  &.btn-left {
    left: 0;
    top: 50%;
    transform: translate(0, -50%);
    height: 100%;
    width: 10%;
  }
  &.btn-up {
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    width: 100%;
    height: 10%;
  }
  &.btn-down {
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
    width: 100%;
    height: 10%;
  }
  &.btn-toggle {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30%;
    height: 30%;
  }
}

input,
select {
  color: #6fafe4;
  background-color: #1e1e1e;
  border: 1px solid #6fafe4;
}

.margin-bottom {
  margin-bottom: 10px;
}
</style>


