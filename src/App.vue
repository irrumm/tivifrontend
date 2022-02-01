<template>
  <div id="app">
    <div
      class="container"
      style="background-color: white; padding: 1px; padding-bottom: 20px; border-radius: 25px"
    >
      <div id="view">
        <Step :currentComponent="this.currentComponent"></Step>
        <component :is="this.componentsArray[this.currentComponent]" @nextComponent=nextComponent() @skipComponent=skipComponent() @home=firstComponent()></component>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import UploadCandidates from "./components/UploadCandidates.vue"
import ViewCandidates from "./components/ViewCandidates.vue"
import RearrangeTies from "./components/RearrangeTies.vue"
import ChooseCouncil from "./components/ChooseCouncil.vue"
import ViewFinal from "./components/ViewFinal.vue"
import Step from "./components/Step.vue"

@Component({
  components: {
    UploadCandidates,
    ViewCandidates,
    RearrangeTies,
    ChooseCouncil,
    ViewFinal,
    Step
  }
})
export default class App extends Vue {
  @Prop() private currentComponent = 0;
  @Prop() private componentsArray = [UploadCandidates, ViewCandidates, RearrangeTies, ChooseCouncil, ViewFinal];

  nextComponent(): void  {
    this.currentComponent = this.currentComponent + 1;
  }
  skipComponent(): void {
    this.currentComponent = this.currentComponent + 2;
  }
  firstComponent(): void {
    this.currentComponent = 0;
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
