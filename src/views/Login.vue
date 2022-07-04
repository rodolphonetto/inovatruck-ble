<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <Header />
      <div class="container">
        <form class="login-form">
          <div class="input-container">
            <label for="login">E-mail:</label>
            <input type="text" v-model="user" />
          </div>
          <div class="input-container">
            <label for="password">Senha:</label>
            <input type="password" v-model="password" />
          </div>
          <div class="button" @click="login">Login</div>
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage, useBackButton } from '@ionic/vue'
import axios from 'axios'
import { Storage } from '@ionic/storage'

const store = new Storage()

import Header from '@/components/Header'
export default {
  name: 'Login',
  components: {
    IonContent,
    IonPage,
    Header,
  },

  data() {
    return {
      user: 'rodolpho',
      password: 'teste123',
      token: '',
    }
  },

  async ionViewDidEnter() {
    await store.create()

    useBackButton(10, async () => {
      this.$router.push('/home')
    })
  },

  methods: {
    async login() {
      try {
        const response = await axios.post(
          'https://api.inovatruck.com.br/auth/local',
          {
            identifier: this.user,
            password: this.password,
          }
        )

        if (response.status !== 200) {
          console.log('não logado')
        } else {
          this.token = await store.set('token', response.data.jwt)

          const userResponse = await axios.get(
            'https://api.inovatruck.com.br/users-permissions/user-infos',
            {
              headers: {
                Authorization: `Bearer ${this.token}`,
              },
            }
          )
          await store.set('pecas', userResponse.data.pecas)
          this.$router.push('/pecas')
        }
      } catch (error) {
        console.log(error)
      }
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
  justify-content: center;
}

span {
  font-size: 20px;
  margin-bottom: 10px;
  font-weight: bold;
  color: #fff;
  font-family: 'Quicksand', sans-serif;
}

.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.input-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.button {
  background-color: #5faffa;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  border: none;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

label {
  color: black;
  margin-right: 20px;
}

input {
  background: none;
  color: black;
  padding: 5px 5px;
  border-radius: 5px;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
  background-color: transparent;
}

/* Change the white to any color */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px #3e3d3d inset !important;
}
</style>
