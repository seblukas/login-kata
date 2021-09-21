<template>
  <div class="container">
    <h1>Login to Area52</h1>
    <label>
      Enter Username/Email or Phone:
      <input type="text" name="username" v-model="username"  maxlength="20">
    </label>
    <label>
      Enter Password:
      <input type="password" name="password" v-model="password" maxlength="20">
    </label>
    <button type="submit" name="login" @click="onLoginClicked">Login</button>
  </div>
</template>

<script>


export default {
  name: "Login",
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onLoginClicked() {
      this.login(this.username, this.password);
    }
  }
}
</script>

<style scoped>

</style>
