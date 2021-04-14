<template>
  <div class="modal">
    <div class="modal-content">
      <div @click="closeModal">
        <svg viewBox="0 0 320 512" class="backButton">
          <path
            d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"
          ></path>
        </svg>
      </div>
      <div class="grid">
        <div><LoginForm @closeModal="closeModal" /></div>
        <div>
          <SignupForm @closeModal="closeModal" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from "./LoginForm.vue";
import SignupForm from "./SignupForm.vue";

export default {
  components: { SignupForm, LoginForm },
  name: "Modal",
  props: {
    modal: Boolean,
  },

  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  /* 
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%); */
  overflow: hidden;
  transition: all 1s;
  background-color: darken(#fff, 5%);
}
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}
.backButton {
  background: none;
  background-color: none;
  border: none;
  height: 24px;
  width: auto;
  display: block;
  margin: 1rem 0 0 1rem;
}
</style>
