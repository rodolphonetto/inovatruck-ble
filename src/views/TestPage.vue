<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div>Teste</div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage } from '@ionic/vue'
import { Storage } from '@ionic/storage'

import { BleClient } from '@capacitor-community/bluetooth-le'

const initialState = () => {
  return {}
}

export default {
  name: 'Login',
  components: {
    IonContent,
    IonPage,
  },

  async ionViewDidEnter() {
    const store = new Storage()
    await store.create()
    this.device = await store.get('device')

    function hexStringToByte(str) {
      if (!str) {
        return new Uint8Array()
      }

      var a = []
      for (var i = 0, len = str.length; i < len; i += 2) {
        a.push(parseInt(str.substr(i, 2), 16))
      }

      return new Uint8Array(a)
    }

    const buffer = hexStringToByte('5a180001')

    await BleClient.writeWithoutResponse(
      this.device,
      '35c9ee32-995d-11ec-b909-0242ac120002',
      '41253cb4-995d-11ec-b909-0242ac120002',
      buffer
    )
  },

  async ionViewDidLeave() {
    Object.assign(this.$data, initialState())
    await BleClient.disconnect(this.device)
  },

  data() {
    return initialState()
  },

  methods: {},
}
</script>

<style scoped></style>
