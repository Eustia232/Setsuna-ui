<template>
  <div class="background">
    <Transition mode="out-in" name="fade">
      <KeepAlive>
        <component :is="view" @switch="changeComponent"/>
      </KeepAlive>
    </Transition>

  </div>
</template>

<script setup>
import Login from "@/components/index/Login.vue";
import {shallowRef} from "vue";

const view = shallowRef( Login );

function changeComponent( component ) {
  view.value = component;
}

</script>

<style scoped>

.background {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("@/assets/images/login-background.png");
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease-in;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(60px) scale(1.2);
}

.fade-enter-to, .fade-leave-from {
  opacity: 1;
  transform: translateX(0) scale(1.2);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-60px) scale(1.2);
}


</style>

