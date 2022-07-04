<template>
  <div class="container" @click="selected(peca.id)">
    <img :src="`https://api.inovatruck.com.br${peca.image}`" alt="" />
    <span>
      {{ peca.name }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'Peca',

  props: {
    peca: {
      type: Object,
      required: true,
    },
  },

  methods: {
    selected(peca) {
      this.$emit('selected', peca)
    },
  },
}
</script>

<style scoped>
.container {
  max-width: 200px;
  text-align: center;
  cursor: pointer;
}

span {
  color: #000;
  margin-top: 10px;
  font-weight: bold;
}

img {
  box-shadow: 0px 3px 10px #00000046;
}
</style>
