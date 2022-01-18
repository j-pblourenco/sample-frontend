<template>
  <div class="base-layout-container">
    <Topbar />
    <div class="base-layout-main">
      <slot name="main"></slot>
    </div>
  </div>
</template>

<script>
import Topbar from '@/layout/Topbar.vue'

export default {
  name: 'BaseLayout',
  props: {
  },
  components: {
    Topbar
  },
}
</script>

<style scoped>
.base-layout-main{
  margin-top: 80px;
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}
</style>
