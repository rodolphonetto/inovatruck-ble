<template>
  <div class="container">
    <div class="comandos-container">
      <span v-if="!status" class="isOn" @click="clicked(comando.message_on)">
        {{ comando.name }}
        Ligar
      </span>
      <span v-else class="isOff" @click="clicked(comando.message_off)">
        {{ comando.name }}
        Desligar
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OnOff',

  data() {
    return {
      status: false,
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
.container {
  max-width: 200px;
  text-align: center;
}

span {
  color: #000;
  margin-top: 10px;
  font-weight: bold;
  padding: 20px 15px;
}

.isOn {
  background-color: green;
}
.isOff {
  background-color: red;
}

.comandos-container {
  width: 500px;
  display: flex;
  justify-content: space-around;
}
</style>
