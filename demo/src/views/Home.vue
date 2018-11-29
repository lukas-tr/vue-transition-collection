<template>
  <div class="home">
    <transition-preview />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import TransitionPreview from "../components/TransitionPreview.vue" // @ is an alias to /src

@Component({
  components: {
    TransitionPreview
  }
})
export default class Home extends Vue {}
</script>
