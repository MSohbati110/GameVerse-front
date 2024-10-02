<template>

</template>

<script>
import api from '@/api'

export default {
  name: 'Tanktrouble',
  data() {
    return {

    }
  },
  async mounted() {
    let token = localStorage.getItem("token");
    await api.auth.tokenVerify({ token: token }).catch((error) => {
      this.$router.push({ path: "/" });
    })
  }
}
</script>

<style>
</style>