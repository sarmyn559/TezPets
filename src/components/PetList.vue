<template>
    <transition-group name="fade" tag="div" class="row d-flex justify-content-center">
      <div v-for="item in grouped" :key="item.id" class="col-md-4 col-sm-6 col-12 m-4" style="width: 215px; height: 230px;">
        <pet-card :item="item" @special="onPetSpecial" @breed="onPetBreed" :breadable="breedable && item.breedable" />
      </div>
    </transition-group>
</template>

<script>
import PetCard from './PetCard.vue'
export default {
  components: { PetCard },
  name: "Pet-List",
  props: {
    items: Array
  },
  computed: {
    grouped () {
      const frozen = {}
      const ids = []
      this.items.forEach(it => {
        it.num = 1
        if (it.level === 0 && it.deadline.getTime() < Date.now()) {
          ids.push(it.id)
          if (!frozen[it.kind]) {
            it.num = 0
            frozen[it.kind] = it
          }
          frozen[it.kind].num = frozen[it.kind].num + 1
        }
      })
      return [ ...this.items.filter(it => !ids.includes(it.id)), ...Object.values(frozen) ]
    },
    breedable () {
      return this.items.filter(it => it.breedable).length > 1
    }
  },
  methods: {
    onPetSpecial (pet) {
      this.$emit('special', pet)
    },
    onPetBreed (petId) {
      this.$emit('breed', petId)
    }
  }
}
</script>
<style>
.fade-enter,
.fade-leave-to { opacity: 0; }
.fade-enter-active,
.fade-leave-active { transition: 0.5s; }
</style>