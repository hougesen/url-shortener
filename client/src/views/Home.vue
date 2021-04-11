<template>
  <div>
    <div class="nav">
      <div v-if="userInfo.userId != null">
        <button @click="logout">Log out</button>
      </div>
      <div v-else>
        <button @click="openModal">Login</button>
        <button @click="openModal">Sign up</button>
      </div>
    </div>

    <Generator @newLink="refreshLinks" />

    <UserLinks v-if="userInfo.userId != undefined" />

    <Modal v-if="modal" :modal="modal" @closeModal="catchCloseModal" />
  </div>
</template>

<script>
import Generator from "../components/Generator.vue";
import UserLinks from "../components/UserLinks.vue";

import Modal from "../components/Modal.vue";

export default {
  name: "Home",
  components: {
    Generator,
    UserLinks,
    Modal,
  },
  data() {
    return {
      modal: null,
      userInfo: null,
    };
  },
  beforeMount() {
    // checks if "userInfo" (user has logged in before) exists in localstorage
    localStorage.getItem("userInfo") != null
      ? (this.userInfo = JSON.parse(localStorage.getItem("userInfo")))
      : (this.userInfo = []);

    this.checkIfLoggedIn();
  },
  computed: {
    userLinks() {
      return this.$store.getters.getUserLinks;
    },
  },
  methods: {
    checkIfLoggedIn() {
      if (this.userInfo.auth) {
        this.$store.commit("setUserId", this.userInfo.userId);

        this.$store.dispatch("setUserLinks", this.userInfo.userId);
      }
    },

    openModal() {
      this.modal = true;
    },
    catchCloseModal() {
      this.modal = false;
      localStorage.getItem("userInfo") != null
        ? (this.userInfo = JSON.parse(localStorage.getItem("userInfo")))
        : (this.userInfo = []);
    },
    logout() {
      localStorage.removeItem("userInfo");
      this.userInfo = null;
      location.reload();
    },
    refreshLinks() {
      this.$store.dispatch("setUserLinks", this.userInfo.userId);
    },
  },
};
</script>

<style scoped lang="scss">
.nav {
  display: flex;
  justify-content: center;
}
button {
  font-size: 1.25rem;
  border: none;
  padding: 0.5rem;
  margin: 0 1rem;
}
</style>
