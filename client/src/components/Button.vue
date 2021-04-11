<template>
  <button @click="clicked" class="button button-square" :class="buttonClass">
    <slot />
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    buttonClass: String,
  },

  methods: {
    clicked() {
      this.$emit("clicked");
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  cursor: pointer;
}
.button {
  margin: 0.5rem;
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
  color: white;
  background-color: #6874e8;
  border: 2px solid #6874e8;
}

.button-square--outline {
  color: #2c3e50;
  background-color: white;
}
</style>
