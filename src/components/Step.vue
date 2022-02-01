<template>
    <div class="all-steps" id="all-steps">
        <span class="step" :class="[{ active: this.currentComponent === 0}, { finish: this.currentComponent > 0}]"></span>
        <span class="step" :class="[{ active: this.currentComponent === 1}, { finish: this.currentComponent > 1}]"></span> 
        <span class="step" :class="[{ active: this.currentComponent === 2}, { finish: this.currentComponent > 2}]"></span> 
        <span class="step" :class="[{ active: this.currentComponent === 3}, { finish: this.currentComponent > 3}]"></span> 
        <span class="step" :class="{ active: this.currentComponent === 4}"></span>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Step extends Vue {
  @Prop() currentComponent = 0;
}
</script>

<style scoped>
.step {
     height: 15px;
     width: 15px;
     margin: 0 2px;
     background-color: #bbbbbb;
     border: none;
     border-radius: 50%;
     display: inline-block;
     opacity: 0.5
 }

 .step.active {
     opacity: 1
 }

 .step.finish {
     background-color: #4CAF50
 }

 .all-steps {
     text-align: center;
     margin-top: 30px;
     margin-bottom: 30px
 }
</style>