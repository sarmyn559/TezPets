<template>
  <div style="background: rgb(13, 35, 58);">
      <div class="container">
        <div class="topdiv">
          <div style="padding-top:24px; font-size:20px">
            <span style="margin-right: 8px">Pooled: {{ newPool }} xtz</span>
        <!--    <a href="https://app.crunchy.network/#/farms?f=garden&q=ash" target="_blank" rel="noopener nofollow">Farming</a> -->
          </div>
          <div class="lg-only" style="padding-top:24px; font-size:20px">
            A Tezos Blockchain Game
          </div>
          <div>
            <sync-button />
          </div>
        </div>
        <slot />
      </div>
  </div>
</template>

<script>
import config from "../config.js"
import SyncButton from "../components/SyncButton.vue"
import { mapState } from "vuex"

export default {
  data () {
    return {
      menu: false,
      name: config.projectName
    }
  },
  computed: {
    ...mapState(['pool']),
    newPool () {
      return this.pool.toFixed(2)
    }
  },
  components: { SyncButton }
}
</script>

<style>
 .topdiv {
   display: flex;
   width: 100%;
   justify-content: space-between;
   align-items: center;
   color: #fff;
 }
 .lg-only {
   display: none;
 }
 @media screen and (min-width: 780px) {
  .lg-only {
    display: flex;
  }
}
</style>