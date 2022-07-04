<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <Header />
      <div class="container">
        <h2>Peças disponíveis</h2>
        <div class="pecas-container">
          <div v-for="(peca, index) in pecas" :key="index">
            <Peca :peca="peca" @selected="selected" />
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage } from '@ionic/vue'
import { Storage } from '@ionic/storage'
import Peca from '@/components/Peca'
import Header from '@/components/Header'

export default {
  name: 'Pecas',
  components: {
    IonContent,
    IonPage,
    Header,
    Peca,
  },

  data() {
    return {
      pecas: [],
    }
  },

  async ionViewDidEnter() {
    const store = new Storage()
    await store.create()
    this.pecas = await store.get('pecas')
  },
  methods: {
    selected(peca) {
      this.$router.push(`/peca-aviso?peca=${peca}`)
    },
  },
}
</script>

<style scoped>
.container {
  background-color: #ebebeb !important;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pecas-container {
  width: 50%;
  display: grid;
  grid-row-gap: 50px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

h2 {
  color: black;
}
</style>
