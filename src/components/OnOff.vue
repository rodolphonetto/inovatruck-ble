<template>
  <div class="container">
    <div class="comandos-container">
      <span>Teste</span>
      <Toggle v-model="status" on-label="On" off-label="Off"> </Toggle>
    </div>
  </div>
</template>

<script>
import Toggle from '@vueform/toggle'
export default {
  name: 'OnOff',

  components: {
    Toggle,
  },

  data() {
    return {
      status: true,
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
<style src="@vueform/toggle/themes/default.css"></style>

<style scoped>
.container {
  max-width: 200px;
  text-align: center;
}

span {
  color: #000;
  margin-top: 10px;
  font-weight: bold;
  padding: 20px 15px;
  border-radius: 5px;
}

.isOn {
  background-color: rgb(67, 160, 67);
}
.isOff {
  background-color: rgb(216, 62, 62);
}

.comandos-container {
  background-color: #4b4b4d;
  width: 500px;
  display: flex;
  justify-content: space-around;
}
</style>
