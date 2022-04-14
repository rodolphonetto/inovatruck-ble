<template>
  <div class="teste">
    <span>{{ comando.name }}</span>
    <vue-slider v-model="number" min="1" max="100"></vue-slider>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

export default {
  name: 'OnOff',
  components: {
    VueSlider,
  },
  data() {
    return {
      number: 1,
    }
  },

  props: {
    comando: {
      type: Object,
      required: true,
    },
  },

  methods: {
    clicked(comando) {
      this.status = !this.status
      this.$emit('clicked', comando)
    },
  },
}
</script>

<style scoped>
.teste {
  width: 200px;
}
</style>
