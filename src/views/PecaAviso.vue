<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <Header />
      <div class="container">
        <span>
          {{ selectedPeca.cable_advice }}
        </span>
        <div class="button" @click="handleClick(selectedPeca.id)">Continuar</div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage } from '@ionic/vue'
import { Storage } from '@ionic/storage'
import Header from '@/components/Header'

export default {
  name: 'PecaAviso',
  components: {
    IonContent,
    IonPage,
    Header,
  },

  data() {
    return {
      pecas: [],
      selectedPeca: '',
    }
  },

  async created() {
    const store = new Storage()
    await store.create()
    this.pecas = await store.get('pecas')
    this.selectedPeca = this.pecas.find(
      (peca) => peca.id == this.$route.query.peca
    )
  },

  methods: {
    handleClick(peca) {
      this.$router.push(`/comandos?peca=${peca}`)
    },
  },
}
</script>

<style scoped>
.container {
  background-color: #ebebeb;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

span {
  color: black;
  font-weight: bold;
  font-size: 34px;
}

.button {
  margin-top: 30px;
  color: green;
  border: 2px solid green;
  padding: 10px 20px;
  text-transform: uppercase;
  background-color: white;
  cursor: pointer;
}
</style>
