<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <Header />
      <div class="container">
        <div class="pecas-container">
          <div v-for="(comando, index) in selectedPeca.comandos" :key="index">
            <OnOff
              v-if="comando.type === 'onoff'"
              :comando="comando"
              @clicked="sendCommand"
            />
            <Increment
              v-if="comando.type === 'incremento'"
              :comando="comando"
              @clicked="sendCommand"
            />
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage } from '@ionic/vue'
import { Storage } from '@ionic/storage'
import { BleClient } from '@capacitor-community/bluetooth-le'

import OnOff from '@/components/OnOff'
import Increment from '@/components/Increment'
import Header from '@/components/Header'

export default {
  name: 'Comandos',
  components: {
    IonContent,
    IonPage,
    Header,
    OnOff,
    Increment,
  },

  data() {
    return {
      device: '',
      pecas: [],
      status: false,
      selectedPeca: {
        comandos: [],
      },
    }
  },

  async ionViewDidEnter() {
    this.scan()

    const store = new Storage()
    await store.create()
    this.device = await store.get('device')
    this.pecas = await store.get('pecas')
    this.selectedPeca = this.pecas.find(
      (peca) => peca.id == this.$route.query.peca
    )
  },
  methods: {
    async scan() {
      try {
        this.devices = []
        await BleClient.initialize()
        const device = await BleClient.requestDevice({
          acceptAllDevices: true,
          optionalServices: ['35c9ee32-995d-11ec-b909-0242ac120002'],
        })
        await BleClient.connect(device.deviceId)
        const services = await BleClient.getServices(device.deviceId)

        if (services && services.length > 0) {
          this.select(device.deviceId)
        }
      } catch (error) {
        console.log(error)
      }
    },

    async select(deviceId) {
      this.device = deviceId
    },

    async sendCommand(comando) {
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

      const buffer = hexStringToByte(comando)

      await BleClient.writeWithoutResponse(
        this.device,
        '35c9ee32-995d-11ec-b909-0242ac120002',
        '41253cb4-995d-11ec-b909-0242ac120002',
        buffer
      )
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
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
</style>
