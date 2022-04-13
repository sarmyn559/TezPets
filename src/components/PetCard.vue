<template>
    <div class="divStyle">
        <div v-show="item.num > 1" style="position: absolute; top: 8px; right: 16px">{{ item.num }}</div>
        <div v-show="feedingsTillNextLevel" style="position: absolute; top: 8px; right: 16px; font-size: 20px">
          <transition-group name="fade">
            <span v-for="i in feedingsTillNextLevel" :key="i">🍆</span>
          </transition-group>
        </div>
        <div style="position: absolute; top: 8px; right: 16px"></div>
        <img :src="`/img/t${item.picture}.png`" alt="" width="160px" height="160px">
        <div v-if="feeding === item.fed" style="padding-top:32px;">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; display: block;" width="32px" height="32px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <g>
              <circle cx="60" cy="50" r="4" fill="#a976c3">
                <animate attributeName="cx" repeatCount="indefinite" dur="1s" values="95;35" keyTimes="0;1" begin="-0.67s"></animate>
                <animate attributeName="fill-opacity" repeatCount="indefinite" dur="1s" values="0;1;1" keyTimes="0;0.2;1" begin="-0.67s"></animate>
              </circle>
              <circle cx="60" cy="50" r="4" fill="#a976c3">
                <animate attributeName="cx" repeatCount="indefinite" dur="1s" values="95;35" keyTimes="0;1" begin="-0.33s"></animate>
                <animate attributeName="fill-opacity" repeatCount="indefinite" dur="1s" values="0;1;1" keyTimes="0;0.2;1" begin="-0.33s"></animate>
              </circle>
              <circle cx="60" cy="50" r="4" fill="#a976c3">
                <animate attributeName="cx" repeatCount="indefinite" dur="1s" values="95;35" keyTimes="0;1" begin="0s"></animate>
                <animate attributeName="fill-opacity" repeatCount="indefinite" dur="1s" values="0;1;1" keyTimes="0;0.2;1" begin="0s"></animate>
              </circle>
            </g>
            <g transform="translate(-15 0)">
              <path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="#5f2a62" transform="rotate(90 50 50)"></path>
              <path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="#5f2a62">
                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;45 50 50;0 50 50" keyTimes="0;0.5;1"></animateTransform>
              </path>
              <path d="M50 50L20 50A30 30 0 0 1 80 50Z" fill="#5f2a62">
                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;-45 50 50;0 50 50" keyTimes="0;0.5;1"></animateTransform>
              </path>
            </g>
          </svg>
        </div>
        <countdown v-else :end-time="item.nextFeed" :key="item.level">
        <template #process="{ timeObj }">
            <button disabled class="btnStyle2 mt-4">{{ timeObj.h }}:{{ timeObj.m }}:{{ timeObj.s }}</button>
        </template>
        <template #finish>
          <div v-if="item.level === 0">
            <button class="btnStyle2" @click="onFeed" style="margin-top: 26px">Hatch</button>
          </div>
            <countdown v-else :end-time="item.deadline">
              <template #process="{ timeObj }">
                  <div class="flex flex-row"><progress :value="timeObj.leftTime / (leeway  * 1000)" style="transition: all 0.5s; height: 16px!important; margin: 0 auto 4px;" /></div>
                  <button class="btnStyle2" @click="onFeed">Feed</button>
                  <button v-if="breadable" @click="onBreed" :disabled="item.loading" class="btnStyle2">Breed</button>
              </template>
              <template #finish>
                  <div v-if="mayBurn" style="margin-top: 26px">
                      <button class="btnStyle2" @click="onBurn">Burn</button>
                      <button v-if="mayMintSpecial" @click="onSpecial" :disabled="item.loading" class="btnStyle2">Mint</button>
                  </div>
                  <div v-else style="color: #FFF; margin: 22px">
                    Frozen
                  </div>
              </template>
            </countdown>
        </template>
        </countdown>
    </div>
</template>

<script>
import { mapState } from 'vuex'
const SPECIALS = [6,7,13,14,15]
export default {
  name: 'pet-card',
  props: {
    item: Object,
    breadable: Boolean,
  },
  data () {
    return {
      feeding: -1,
      burning: false
    }
  },
  computed: {
    ...mapState(['leeway', 'eggLeeway']),
    feedLabel () {
      return this.item.level > 0 ? 'Feed' : 'Hatch'
    },
    feedingsTillNextLevel () {
      return (SPECIALS.indexOf(this.item.kind) < 0 ? [
        0, // 0
        3, // 1
        2,
        1,
        3, // 2
        2,
        1,
        3, // 3
        2,
        1,
        3, // 4
        2,
        1,
        3, // 5
        2,
        1,
        0  // 6
      ]
      : [
        0, // 0
        6, // 1
        5,
        4,
        3, 
        2,
        1,
        6, // 2
        5,
        4,
        3, 
        2,
        1,
        6, // 3
        5,
        4,
        3, 
        2,
        1,
        6, // 4
        5,
        4,
        3, 
        2,
        1,
        6, // 5
        5,
        4,
        3, 
        2,
        1,
        0  // 6
      ])[this.item.fed]
    },
    mayBurn () {
      return this.item.level > 0
    },
    mayMintSpecial () {
      return this.item.kind < 15 // not Alien
    },
    isDead () {
      return this.item.level >= 6
    }
  },
  methods: {
    onFeed () {
      if (this.feeding === this.item.fed) return
      this.feeding = this.item.fed
      this.$store.dispatch('feed', this.item.id).then(result => {
        if (!result) this.feeding = -1
      })
      .catch((e) => {
        this.$toast.error(e?.data[1]?.with?.string || e.message)
        this.feeding = -1
      })
    },
    onBurn () {
      if (this.burning) return
      this.burning = true
      this.$store.dispatch('burn', { id: this.item.id, level: this.item.level })
      .catch(e => {
        this.$toast.error(e?.data[1]?.with?.string || e.message)
      })
    },
    onSpecial () {
      this.$emit('special', [this.item.id, this.item.kind])
    },
    onBreed () {
      this.$emit('breed', this.item.id)
    }
  }
}
</script>

<style>
.divStyle {
  position: relative;
    padding: 16px;
    background: #8500ff;
    border-radius: 12px;
    transition: all 600ms ease-in-out;
    text-align: center;
}
.divStyle:hover {
  transform: scale(1.1);
}
</style>
