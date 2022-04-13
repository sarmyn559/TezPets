<template>
    <div v-if="userAddress" class="btn-group">
        <button class="btnStyle mt-5 mb-4" style="text-transform: none;" @click="unsync">{{ shortWallet }} &nbsp;&times;</button> 
    </div> 
    <button v-else type="button" class="btnStyle mt-5 mb-4" @click="sync">Connect</button>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState(['userAddress']),
    ...mapGetters(['shortWallet'])
  },
  methods: {
    async sync () {
      await this.$store.dispatch('connectWallet')
    },
    async unsync () {
      await this.$store.dispatch('disconnectWallet')
    }
  }
}
</script>
