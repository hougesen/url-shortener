<template>
  <div>
    <h1>Generate new link</h1>
    <form @submit.prevent="generateLink">
      <input type="url" id="link" name="link" v-model="link" placeholder="URL to shorten" />
      <button type="submit">Shorten</button>
    </form>
    <input type="text" v-model="generatedLink" placeholder="Shortened URL" id="generatedUrl" readonly />
    <button @click.prevent="copyUrl">Copy</button>
  </div>
</template>

<script>
import GeneratorService from "@/services/GeneratorService";

export default {
  name: "Generator",
  data() {
    return {
      link: "",
      generatedLink: null,
    };
  },
  computed: {
    getUserId() {
      return this.$store.getters.getUserId;
    },
  },
  methods: {
    async generateLink() {
      let request;
      if (this.getUserId != "") {
        request = await GeneratorService.generateLink(this.link, this.getUserId);
      } else {
        request = await GeneratorService.generateLink(this.link);
      }
      this.generatedLink = `https://houge.ninja/l/${request.shortCode}`;

      this.$emit("newLink");
    },

    copyUrl() {
      let url = this.$el.querySelector("#generatedUrl");

      url.setAttribute("type", "text");
      url.select();
      url.setSelectionRange(0, 99999);

      document.execCommand("copy");
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  margin-bottom: 1rem;
}
input {
  width: 90%;
  padding: 0.5rem 1rem;
  max-width: 350px;
}
button {
  margin-left: 0.5rem;
  width: 30%;
  padding: 0.5rem;
  max-width: 100px;
  background: #6874e8;
  color: white;
  border: 2px solid #6874e8;
}
</style>
