<template>
  <div>
    <h1 class="text-center text-white mb-4">
      <span class="bottomStyle">Tez Pets</span>
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
    </div>
    <div v-if="hasPets" class="py-4">
      <h1 class="text-center text-white my-4">
        <span class="bottomStyle">Your Pets</span>
      </h1>
      <pet-list :items="userPets" @special="onShowModal" />
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
        <div class="modal-close" @click="deadPetId = false">&times;</div>
        <div class="row">
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
        </div>
      </div>
    </div>
    <div v-if="userAddress && minting === maxId" class="modal-overlay">
      <div class="modal-loader">
        <video src="/wait.mp4" loop controls="false" autoplay muted style="width: 100%"></video>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PetList from '../components/PetList.vue'
import config from '../config'

export default {
  components: { PetList },
  name: 'Home',
  data () {
    return {
      publicSaleStarted: false,
      timer: null,
      userPets: [],
      deadPetId: false,
      minting: false,
      maxId: false,
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
      'paused'
    ]),
    name () {
      return config.projectName
    },
    isTestnet () {
      return config.network !== 'mainnet'
    },
    contractLink () {
      return `https://better-call.dev/${config.network}/${this.fa2}`
    },
    currentPrice () {
      return this.publicSaleStarted ? this.price : this.presalePrice
    },
    hasPets () {
      return this.userAddress && this.userPets.length > 0
    }
  },
  methods: {
    async buyToken (petType) {
      try {
        const id = this.deadPetId
        this.deadPetId = false
        this.minting = this.maxId
        const amount = petType < 6 ? this.price : this.specialPrice
        const result = await this.$store.dispatch('buyToken', { petType, amount, id })
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
    async poll () {
      console.log('userPets', this.userPets)
      const pets = await this.$store.dispatch('listPets', { address: this.userAddress })
        .catch(e => console.log(e.message))
        .finally(() => this.$forceUpdate())
      if (pets) {
        this.$set(this, 'userPets', pets)
        this.maxId = pets.reduce((prev, { id }) => id > prev ? id : prev, 0)
      }
      setTimeout(this.poll, config.pollInterval)
    },
    onShowModal (petId) {
      this.deadPetId = petId
    },
    onHideModal () {
      this.deadPetId = false
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

