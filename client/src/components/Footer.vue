<template>
  <footer>
    <p>
      Made by <a href="https://mhouge.dk">Mads Hougesen</a> -
      <a href="https://github.com/Hougesen/url-shortener">Github</a>
    </p>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style lang="scss" scoped>
footer {
  z-index: 5;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  text-align: center;
  width: 100%;
}
a {
  color: #2c3e50;
}
</style>
