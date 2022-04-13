<template>
  <div>
    <h1 class="text-center text-white mb-4">
      <span class="bottomStyle">Tez Pets</span><sup style="background-color: #000; padding: 8px; border-radius: 100%; font-size: 0.7em; width: 2em; height: 2em;">v2</sup>
    </h1>
    <div class="row d-flex justify-content-center">
      <div class="col-4 col-sm-4 col-md-3 col-lg-2 d-flex justify-content-center aos-init aos-animate" data-aos="fade-up" data-aos-duration="2000">
        <div class="text-center"><img src="/static/media/_racoon_ egg-01.b8a7c76f.png" class="img-fluid" :class="{'vibrate-fx': minted3}" alt="">
          <button type="button" @click="buyToken(3)" class="btnStyle2">Mint</button>
        </div>
      </div>
      <div class="col-4 col-sm-4 col-md-3 col-lg-2 d-flex justify-content-center aos-init aos-animate" data-aos="fade-up" data-aos-duration="2000">
        <div class="text-center"><img src="/static/media/_rhino_ egg-01.d03d0269.png" class="img-fluid" :class="{'vibrate-fx': minted5}" alt="">
          <button type="button" @click="buyToken(5)" class="btnStyle2">Mint</button>
        </div>
      </div>
      <div class="col-4 col-sm-4 col-md-3 col-lg-2 d-flex justify-content-center aos-init aos-animate" data-aos="fade-up" data-aos-duration="2000">
        <div class="text-center"><img src="/static/media/_lizard_ egg-01.69b47719.png" class="img-fluid" :class="{'vibrate-fx': minted1}" alt="">
          <button type="button" @click="buyToken(1)" class="btnStyle2">Mint</button>
        </div>
      </div>
      <div class="col-4 col-sm-4 col-md-3 col-lg-2 d-flex justify-content-center aos-init aos-animate" data-aos="fade-up" data-aos-duration="2000">
        <div class="text-center"><img src="/static/media/_bird_ egg-01.678220f3.png" class="img-fluid" :class="{'vibrate-fx': minted2}" alt="">
          <button type="button" @click="buyToken(2)" class="btnStyle2">Mint</button>
        </div>
      </div>
      <div class="col-4 col-sm-4 col-md-3 col-lg-2 d-flex justify-content-center aos-init aos-animate" data-aos="fade-up" data-aos-duration="2000">
        <div class="text-center"><img src="/static/media/_monkey_ egg-01.461e19cc.png" class="img-fluid" :class="{'vibrate-fx': minted4}" alt="">
          <button type="button" @click="buyToken(4)" class="btnStyle2">Mint</button>
        </div>
      </div>
<!-- new -->
      <div class="col-4 col-sm-4 col-md-3 col-lg-2 d-flex justify-content-center aos-init aos-animate" data-aos="fade-up" data-aos-duration="2000">
        <div class="text-center"><img src="/img/t80.png" class="img-fluid" :class="{'vibrate-fx': minted3}" alt="">
          <button type="button" @click="buyToken(8)" class="btnStyle2">Mint</button>
        </div>
      </div>
      <div class="col-4 col-sm-4 col-md-3 col-lg-2 d-flex justify-content-center aos-init aos-animate" data-aos="fade-up" data-aos-duration="2000">
        <div class="text-center"><img src="/img/t90.png" class="img-fluid" :class="{'vibrate-fx': minted5}" alt="">
          <button type="button" @click="buyToken(9)" class="btnStyle2">Mint</button>
        </div>
      </div>
      <div class="col-4 col-sm-4 col-md-3 col-lg-2 d-flex justify-content-center aos-init aos-animate" data-aos="fade-up" data-aos-duration="2000">
        <div class="text-center"><img src="/img/t100.png" class="img-fluid" :class="{'vibrate-fx': minted1}" alt="">
          <button type="button" @click="buyToken(10)" class="btnStyle2">Mint</button>
        </div>
      </div>
      <div class="col-4 col-sm-4 col-md-3 col-lg-2 d-flex justify-content-center aos-init aos-animate" data-aos="fade-up" data-aos-duration="2000">
        <div class="text-center"><img src="/img/t110.png" class="img-fluid" :class="{'vibrate-fx': minted2}" alt="">
          <button type="button" @click="buyToken(11)" class="btnStyle2">Mint</button>
        </div>
      </div>
      <div class="col-4 col-sm-4 col-md-3 col-lg-2 d-flex justify-content-center aos-init aos-animate" data-aos="fade-up" data-aos-duration="2000">
        <div class="text-center"><img src="/img/t120.png" class="img-fluid" :class="{'vibrate-fx': minted4}" alt="">
          <button type="button" @click="buyToken(12)" class="btnStyle2">Mint</button>
        </div>
      </div>
    </div>
    <div v-if="hasPets" class="py-4">
      <h1 class="text-center text-white my-4">
        <span class="bottomStyle">Your Pets</span><button v-show="feedableIds.length > 1" @click="batchFeed" class="btnStyle2" style="margin-left: 20px;">FEED ALL</button>
      </h1>
      <pet-list :items="userPets" @special="onSpecialModal" @breed="onBreedModal" />
    </div>
    <div class="my-3 mb-5 text-white py-5">
      <h1 class="text-5xl font-medium mb-2">About</h1>
      <p class="pb-5">Cute little Tezos Pets that live on the blockchain.
        These Unique NFT’s are alive and need to be fed to stay alive and grow!
        Yes, grow! You will need to feed your pet 3 times in order for it to grow into the next stage of life.
        They will have 5 different stages of growth and will eventually reach the end of life… When your Tezpet reaches the end of life,
        you can burn your Tezpet for $ASH coin as a reward; or Mint your Tezpet for a special egg!
        You will be able to stake the $ASH coin for USDtz on Crunch farms! The Special egg will have 4X the $ASH reward.</p>
    </div>
    <div v-if="deadPetId" class="modal-overlay">
      <div class="modal-content">
        <h4 style="text-align:center">Special Pets</h4>
        <div class="modal-close" @click="deadPet = []">&times;</div>
        <div v-if="deadPetOrdinary" class="row">
          <div class="col-6 d-flex justify-content-center">
            <div class="text-center"><img src="/img/t60.png" class="img-fluid" alt="">
              <button type="button" @click="buyToken(6)" class="btnStyle2">Mint</button>
            </div>
          </div>
          <div class="col-6 d-flex justify-content-center">
            <div class="text-center"><img src="/img/t70.png" class="img-fluid" alt="">
              <button type="button" @click="buyToken(7)" class="btnStyle2">Mint</button>
            </div>
          </div>
          <div class="col-6 d-flex justify-content-center">
            <div class="text-center"><img src="/img/t130.png" class="img-fluid" alt="">
              <button type="button" @click="buyToken(13)" class="btnStyle2">Mint</button>
            </div>
          </div>
          <div class="col-6 d-flex justify-content-center">
            <div class="text-center"><img src="/img/t140.png" class="img-fluid" alt="">
              <button type="button" @click="buyToken(14)" class="btnStyle2">Mint</button>
            </div>
          </div>
        </div>
        <div v-else class="row">
          <div class="col-12 d-flex justify-content-center">
            <div class="text-center"><img src="/img/t150.png" class="img-fluid" alt="">
             <!-- This is a hack, lion, but we will get alien -->
              <button type="button" @click="buyToken(7)" class="btnStyle2">Mint</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="breedPetId" class="modal-overlay">
      <div class="modal-content">
        <h4 style="text-align:center">Breed Pets</h4>
        <div class="modal-close" @click="breedPetId = false">&times;</div>
        <div class="row">
          <div v-for="pet in breedablePets" :key="pet.id" class="d-flex justify-content-center" :class="`${breedablePets.length > 1 ? 'col-6' : 'col-12'}`">
            <div class="text-center"><img :src="`/img/t${pet.kind}${pet.level}.png`" class="img-fluid" alt="">
              <button type="button" @click="breedPets(pet.id)" class="btnStyle2">Breed</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="userAddress && minting === maxId" class="modal-overlay">
      <div class="modal-loader">
        <video src="/wait.mp4" loop autoplay muted style="width: 100%"></video>
      </div>
    </div>
    <div v-if="userAddress && burning === 'good'" class="modal-overlay">
      <div class="modal-loader">
        <video src="/win.mp4" loop autoplay muted style="width: 100%"></video>
      </div>
    </div>
    <div v-if="userAddress && burning === 'bad'" class="modal-overlay">
      <div class="modal-loader">
        <video src="/badburn.mp4" loop autoplay muted style="width: 100%"></video>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PetList from '../components/PetList.vue'
import config from '../config'
const SPECIALS = [6,7,13,14,15]

export default {
  components: { PetList },
  name: 'Home',
  data () {
    return {
      publicSaleStarted: false,
      timer: null,
      userPets: [],
      deadPet: [],
      breedPetId: false,
      minting: false,
      maxId: 0,
      minted1: false,
      minted2: false,
      minted3: false,
      minted4: false,
      minted5: false
    }
  },
  mounted () {
    this.poll()
    this.$store.dispatch('onTransactionStream', (data) => {
      console.log('>>>>>>', data)
      if (data?.parameters?.entrypoint === 'mint') {
        const minted = `minted${data?.parameters?.value.int}`
        this[minted] = true
        const clear = function (it, param) {
          return () => { it[param] = false }
        }
        setTimeout(clear(this, minted), 1500)
      }
    })
  },
  computed: {
    ...mapState([
      'mintedTokens',
      'provenanceHash',
      'userAddress',
      'price',
      'specialPrice',
      'foodPrice',
      'levelDuration',
      'leeway',
      'fa2',
      'loading',
      'paused',
      'burning'
    ]),
    name () {
      return config.projectName
    },
    isTestnet () {
      return config.network !== 'mainnet'
    },
    deadPetId () {
      return this.deadPet[0]
    },
    deadPetOrdinary () {
      return SPECIALS.indexOf(this.deadPet[1]) < 0
    },
    contractLink () {
      return `https://better-call.dev/${config.network}/${this.fa2}`
    },
    hasPets () {
      return this.userAddress && this.userPets.length > 0
    },
    breedablePets () {
      return this.userPets.filter(it => it.breedable && it.id != this.breedPetId)
    },
    feedableIds () {
      const now = Date.now()

      return this.userPets.filter(it => {
        const feed = (new Date(it.nextFeed)).getTime()
        return (Number(it.level) > 0) && (Number(it.level) < 6) && (feed < now) && ((feed + this.leeway * 1000) > now)
      }).map(it => it.id)
    }
  },
  methods: {
    async buyToken (petType) {
      try {
        const id = this.deadPetId
        this.minting = this.maxId
        let amount = this.price
        if (id) {
          amount = this.deadPetOrdinary ? this.specialPrice : this.specialPrice * 2
        }
        this.deadPet = []
        const result = await this.$store.dispatch('buyToken', { petType, amount, id })
        if (!result) {
          this.minting = false
        }
      } catch (e) {
        this.$toast.error(e?.data[1]?.with?.string || e.message)
        this.minting = false
      }
    },
    async breedPets (id2) {
      try {
        const id1 = this.breedPetId
        this.breedPetId = false
        this.minting = this.maxId
        const result = await this.$store.dispatch('breed', { id1, id2 })
        if (!result) {
          this.minting = false
        }
      } catch (e) {
        const data = e.data?.find(it => !!it.with)
        console.log(data)
        this.$toast.error(data?.with?.string || e.message)
        this.minting = false
      }
    },
    async batchFeed () {
      const ids = this.feedableIds
      try {
        this.userPets.forEach(it => { it.loading = ids.includes(it.id) })
        await this.$store.dispatch('batchFeed', ids)
      } catch (e) {
        const data = e.data?.find(it => !!it.with)
        console.log(data)
        this.$toast.error(data?.with?.string || e.message)
      } finally {
        this.userPets.forEach(it => { if (ids.includes(it.id)) it.loading = false })
      }
    },
    async poll () {
      const pets = await this.$store.dispatch('listPets', { address: this.userAddress })
        .catch(e => console.log(e.message))
        .finally(() => this.$forceUpdate())
      if (pets) {
        this.$set(this, 'userPets', pets)
        this.maxId = pets.reduce((prev, { id }) => id > prev ? id : prev, 0)
      }
      setTimeout(this.poll, config.pollInterval)
    },
    onSpecialModal (pet) {
      this.deadPet = pet
    },
    onBreedModal (petId) {
      this.breedPetId = petId
    }
  }
}
</script>

<style>
.modal-overlay {
  z-index: 10;
  display: flex;
  background-color: rgba(0,0,0,0.33);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
}
.modal-content {
  position: relative;
  width: 100%;
  max-width: 360px;
  height: fit-content;
  padding: 32px 0;
  background-color: rgba(44,44,44,1);
  color: #fff;
  display: flex;
  border-radius: 12px;
}
.modal-close {
  position: absolute;
  top: 0px;
  right: 16px;
  color: #000;
  transition: all 0.4s;
  font-size: 32px;
  padding: 4px;
  cursor: pointer;
}
.modal-loader {
  width: 100%;
  overflow: hidden;
  max-width: 360px;
  height: fit-content;
  padding: 0;
  display: flex;
  border-radius: 20px;
}
.modal-close:hover {
  color: #fff;
}
/* Buzz Out */
@-webkit-keyframes vibrate-fx {
  10% {
    -webkit-transform: translateX(3px) rotate(2deg);
    transform: translateX(3px) rotate(2deg);
  }
  20% {
    -webkit-transform: translateX(-3px) rotate(-2deg);
    transform: translateX(-3px) rotate(-2deg);
  }
  30% {
    -webkit-transform: translateX(3px) rotate(2deg);
    transform: translateX(3px) rotate(2deg);
  }
  40% {
    -webkit-transform: translateX(-3px) rotate(-2deg);
    transform: translateX(-3px) rotate(-2deg);
  }
  50% {
    -webkit-transform: translateX(2px) rotate(1deg);
    transform: translateX(2px) rotate(1deg);
  }
  60% {
    -webkit-transform: translateX(-2px) rotate(-1deg);
    transform: translateX(-2px) rotate(-1deg);
  }
  70% {
    -webkit-transform: translateX(2px) rotate(1deg);
    transform: translateX(2px) rotate(1deg);
  }
  80% {
    -webkit-transform: translateX(-2px) rotate(-1deg);
    transform: translateX(-2px) rotate(-1deg);
  }
  90% {
    -webkit-transform: translateX(1px) rotate(0);
    transform: translateX(1px) rotate(0);
  }
  100% {
    -webkit-transform: translateX(-1px) rotate(0);
    transform: translateX(-1px) rotate(0);
  }
}
@keyframes vibrate-fx {
  10% {
    -webkit-transform: translateX(3px) rotate(2deg);
    transform: translateX(3px) rotate(2deg);
  }
  20% {
    -webkit-transform: translateX(-3px) rotate(-2deg);
    transform: translateX(-3px) rotate(-2deg);
  }
  30% {
    -webkit-transform: translateX(3px) rotate(2deg);
    transform: translateX(3px) rotate(2deg);
  }
  40% {
    -webkit-transform: translateX(-3px) rotate(-2deg);
    transform: translateX(-3px) rotate(-2deg);
  }
  50% {
    -webkit-transform: translateX(2px) rotate(1deg);
    transform: translateX(2px) rotate(1deg);
  }
  60% {
    -webkit-transform: translateX(-2px) rotate(-1deg);
    transform: translateX(-2px) rotate(-1deg);
  }
  70% {
    -webkit-transform: translateX(2px) rotate(1deg);
    transform: translateX(2px) rotate(1deg);
  }
  80% {
    -webkit-transform: translateX(-2px) rotate(-1deg);
    transform: translateX(-2px) rotate(-1deg);
  }
  90% {
    -webkit-transform: translateX(1px) rotate(0);
    transform: translateX(1px) rotate(0);
  }
  100% {
    -webkit-transform: translateX(-1px) rotate(0);
    transform: translateX(-1px) rotate(0);
  }
}
.vibrate-fx {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  ---box-shadow: 0 0 1px rgba(0, 0, 0, 0);
}
.vibrate-fx, .vibrate-fx:focus, .vibrate-fx:active {
  -webkit-animation-name: vibrate-fx;
  animation-name: vibrate-fx;
  -webkit-animation-duration: 0.75s;
  animation-duration: 0.75s;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
  -webkit-animation-iteration-count: 1;
  animation-iteration-count: 1;
}
</style>

