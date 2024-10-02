<template>
  <v-container fluid>
    <particles />
    <div class="flex_col">
      <h1 class="title" :style="{color: titleColor}">Welcome To GameVerse</h1>
      <div class="flex_row" style="width: 100%; margin-top: 150px;">
        <div class="border1" style="margin-right: 15%;">
          <h2 style="margin-bottom: 40px;">Login</h2>

          <div class="flex_row">
            <p style="margin-right: 5px">username: </p>
            <v-text-field
              v-model="loginObj.username"
              outlined
              class="shrink"
              style="width: 200px"
              background-color="#acaeab"
              dense
              color="#000"
            ></v-text-field>
          </div>

          <div class="flex_row">
            <p style="margin-right: 8px">password: </p>
            <v-text-field
              type="password"
              v-model="loginObj.password"
              outlined
              class="shrink"
              style="width: 200px"
              background-color="#acaeab"
              dense
              color="#000"
            ></v-text-field>
          </div>

          <div class="flex_row" style="margin-top: 20px;">
            <v-btn @click="login" width="100px" class="Btn">Enter</v-btn>
          </div>
          <div class="flex_row" style="margin-top: 20px">
            <v-alert
              type="error"
              :value="!loginValid"
              dense
              style="color: white; background-color: #E53935;"
              >{{ loginErrorMessage }}</v-alert
            >
          </div>
        </div>

        <div class="border1">
          <h2 style="margin-bottom: 40px;">Signup</h2>

          <div class="flex_row">
            <p style="margin-right: 5px">username: </p>
            <v-text-field
              v-model="signupObj.username"
              outlined
              class="shrink"
              style="width: 200px"
              background-color="#acaeab"
              dense
              color="#000"
            ></v-text-field>
          </div>

          <div class="flex_row">
            <p style="margin-right: 8px">password: </p>
            <v-text-field
              type="password"
              v-model="signupObj.password"
              outlined
              class="shrink"
              style="width: 200px"
              background-color="#acaeab"
              dense
              color="#000"
            ></v-text-field>
          </div>

          <div class="flex_row" style="margin-top: 20px;">
            <v-btn @click="signup" width="100px" class="Btn">Register</v-btn>
          </div>
          <div class="flex_row" style="margin-top: 20px">
            <v-alert
              type="error"
              :value="!signupValid"
              dense
              style="color: white; background-color: #E53935;"
              >{{ signupErrorMessage }}</v-alert
            >
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import api from "@/api";

export default {
  name: 'LandingPage',
  components: {
    particles: () => import("@/components/particles"),
  },
  data() {
    return {
      loginObj: {
        username: null,
        password: null,
      },
      signupObj: {
        username: null,
        password: null,
      },
      loginValid: true,
      signupValid: true,
      loginErrorMessage: null,
      signupErrorMessage: null,
      colors: ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#4B0082', '#9400D3'],
      titleColor: '#FF0000',
      colorIndex: 0,
    }
  },
  async mounted() {
    let token = localStorage.getItem("token");
    if (token != null) {
      await api.auth.tokenVerify({ token: token }).then((res) => {
        this.$router.push({ path: "/games" });
      })
    }

    this.startTitleColor();
  },
  methods: {
    login() {
      if (![null, ""].includes(this.loginObj.username) && ![null, ""].includes(this.loginObj.password)) {
        api.auth.login(this.loginObj).then((response) => {
          this.loginValid = true
          localStorage.setItem('username', this.loginObj.username)
          localStorage.setItem('token', response.data.access)
          this.$router.push('/games')
        }).catch((error) => {
          this.loginValid = false
          this.loginErrorMessage = "username or password is wrong"

          setTimeout(() => {
            this.loginValid = true
          }, 3000);
        })
      }
      else {
        this.loginValid = false
        this.loginErrorMessage = "all fields must be filled"

        setTimeout(() => {
          this.loginValid = true
        }, 3000);
      }
    },
    async signup() {
      if (![null, ""].includes(this.signupObj.username) && ![null, ""].includes(this.signupObj.password)) {
        await api.auth.register(this.signupObj).then((response) => {
          this.signupValid = true
          localStorage.setItem('username', this.signupObj.username)
          localStorage.setItem('token', response.data)
          this.$router.push('/games')
        }).catch((error) => {
          this.signupValid = false
          this.signupErrorMessage = "username is already in use"

          setTimeout(() => {
          this.signupValid = true
        }, 3000);
        })
      }
      else {
        this.signupValid = false
        this.signupErrorMessage = "all fields must be filled"

        setTimeout(() => {
          this.signupValid = true
        }, 3000);
      }
    },
    startTitleColor() {
      this.colorInterval = setInterval(() => {
        this.titleColor = this.colors[this.colorIndex];
        this.colorIndex = (this.colorIndex + 1) % this.colors.length;
      }, 500);
    }
  },
  beforeDestroy() {
    clearInterval(this.colorInterval);
  },
}
</script>

<style scoped>
.title {
  margin-top: 20px;
  margin-bottom: 60px;
  font-size: 3em;
  transition: color 2s;
}
.border1 {
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  background-color: #78909C;
  padding: 20px;
  z-index: 100;
  border-radius: 20px;
  height: 310px;
}
.Btn {
  float: right;
  margin-top: 5px;
  background-color: rgba(40, 40, 40, 0.5) !important;
  color: #fff;
}
</style>