<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Users :settings="settings" />
  </div>
</template>

<script>
// @ is an alias to /src
import Users from '@/components/Users.vue'

export default {
  name: 'App',
  data() {
    return {
      settings: {
        url: 'http://127.0.0.1:8000'
      }
    }
  },
  components: {
    Users
  }
}
</script>
