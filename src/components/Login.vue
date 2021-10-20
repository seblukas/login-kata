<template>
  <div class="container">
    <h1>Login to Area52</h1>
    <label>
      Enter Username/Email or Phone:
      <input type="text" name="username" v-model="username" maxlength="20">
    </label>
    <label>
      Enter Password:
      <input type="password" name="password" v-model="password" maxlength="20">
    </label>
    <div v-if="authError" class="auth-error">
      Authentication failed
    </div>
    <button type="submit" name="login" @click="onLoginClicked">Login</button>
  </div>
</template>

<script>


export default {
  name: "Login",
  data() {
    return {
      username: '',
      password: '',
      authError: false
    }
  },
  methods: {
    async onLoginClicked() {
      try {
        const result = await this.login(this.username, this.password);
        this.authError = !result.success;
      } catch (err) {
        this.authError = true;
      }
    }
  }
}
</script>

<style scoped>

</style>
