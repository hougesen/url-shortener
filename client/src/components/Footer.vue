<template>
  <footer>
    <p>
      Made by <a href="https://mhouge.dk">Mads Hougesen</a> using Vue.js, Node.js & MongoDB -
      <a href="https://github.com/Hougesen/url-shortener">Github</a>
    </p>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style lang="scss">
footer {
  position: fixed;
  bottom: 0;
  text-align: center;
  width: 100%;
}
</style>
