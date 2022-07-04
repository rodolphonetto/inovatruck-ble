<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="container">
        <div class="pecas-container">
          <div class="infos-container">
            <img
              :src="`https://api.inovatruck.com.br${selectedPeca.image}`"
              alt=""
            />
            <span>
              {{ selectedPeca.name }}
            </span>
          </div>
          <div class="on-off-container">
            <div v-for="(comando, index) in selectedPeca.comandos" :key="index">
              <OnOff
                v-if="comando.type === 'onoff'"
                :comando="comando"
                @clicked="sendCommand"
              />
            </div>
          </div>
          <div class="adjustments-container">
            <div v-for="(comando, index) in selectedPeca.comandos" :key="index">
              <Increment
                v-if="comando.type === 'incremento'"
                :comando="comando"
                @clicked="sendCommand"
              />
            </div>
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

export default {
  name: 'Comandos',
  components: {
    IonContent,
    IonPage,
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
  background-color: #1b4f81 !important;
  height: 100%;
  display: flex;
  justify-content: center;
}

.pecas-container {
  width: 50%;
  margin-top: 30px;
  margin-left: 50px;
}

.on-off-container {
  background-color: #4b4b4d;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  border: 2px solid #f5f043;
  padding: 10px;
  margin-bottom: 40px;
  margin-top: 10px;
  border-radius: 25px;
  justify-content: space-between;
}

.adjustments-container {
  background-color: #4b4b4d;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  border: 2px solid #f5f043;
  padding: 10px;
  margin-top: 10px;
  border-radius: 25px;
}

img {
  margin-top: 30px;
  max-width: 450px;
  max-height: 450px;
  border-radius: 5px;
  box-shadow: 0px 3px 10px #00000046;
}

span {
  color: black;
  font-weight: bold;
}

.infos-container {
  display: flex;
  align-items: center;
}

.infos-container span {
  background-color: #363435;
  padding: 50px;
  color: white;
  margin: 0 auto;
  border: 2px solid #f5f043;
  border-radius: 25px;
}
</style>
