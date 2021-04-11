<template>
  <div class="loginForm">
    <h1>Sign in</h1>
    <form @submit.prevent="loginToUser">
      <label for="email">Email</label>
      <input
        type="email"
        v-model="email"
        placeholder="email"
        autocomplete="email"
        required
      />

      <label for="password">Password</label>
      <input
        type="password"
        v-model="password"
        placeholder="password"
        autocomplete="current-password"
        required
      />

      {{ errorMsg }}
      <button type="submit" class="button-square">Sign in</button>
    </form>
  </div>
</template>

<script>
import UserService from "@/services/UserService";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      userInfo: null,
      errorMsg: null,
    };
  },
  beforeMount() {
    // checks if "userInfo" (user has logged in before) exists in localstorage
    localStorage.getItem("userInfo") != null
      ? (this.userInfo = JSON.parse(localStorage.getItem("userInfo")))
      : (this.userInfo = []);
  },
  methods: {
    async loginToUser() {
      let request = await UserService.loginToUser(this.email, this.password);
      console.log(request);
      if (request.auth) {
        this.userInfo = {
          auth: request.auth,
          userId: request.userId,
        };

        const jsonUserInfo = JSON.stringify(this.userInfo);

        localStorage.setItem("userInfo", jsonUserInfo);

        this.setUserId(request.userId);
        this.setAllUserLinks(request.userId);

        this.$emit("closeModal");
      } else {
        this.errorMsg = request.msg;
      }
    },
    setUserId(userId) {
      this.$store.commit("setUserId", userId);
    },
    setAllUserLinks(userId) {
      this.$store.dispatch("setUserLinks", userId);
    },
  },
};
</script>

<style lang="scss" scoped>
.loginForm {
  margin: 3rem;
}
form {
  display: flex;
  justify-content: center;
  flex-direction: column;
  label {
    margin: auto;
  }
  input {
    margin: auto;
    margin-bottom: 1rem;
    max-width: 300px;
    padding: 0.5rem 2rem;
  }
}

button {
  cursor: pointer;
}
.button-square {
  font-size: 20px;
  text-align: center;
  width: 100%;
  padding: 1rem;
  max-width: 200px;
  border-radius: 0;
  font-weight: bold;
  border: 2px solid;
  margin: 1rem auto;
  color: white;
  background-color: #6874e8;
}
</style>
