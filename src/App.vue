<template>
  <div data-app style="height: 100vh;">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {

    }
  }
}
</script>


<style>
* {
  font-family: 'Inter', sans-serif;
  user-select: none;
}
body{
  background-color: #B0BEC5;
}
.flex_row {
  display: flex;
  justify-content: center;
  align-items: center;
}
.flex_col {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.v-text-field.v-text-field--enclosed .v-text-field__details {
  display: none;
}
</style>
