<template>
  <layout-main id="app">
    <router-view v-if="!$store.state.loading" />
  </layout-main>
</template>

<script>
import LayoutMain from './layout/main.vue'

export default {
  components: { LayoutMain },
  async mounted () {
    await this.$store.dispatch('init')
  }
}
</script>

