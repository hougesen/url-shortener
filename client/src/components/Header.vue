<template>
  <div>
    <h1>Login to keep track of your URLs</h1>
    <div class="button">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style lang="scss" scoped>
.buttons {
  margin: 1rem;
}
</style>
