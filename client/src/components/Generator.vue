<template>
  <div>
    <h1>Generate new link</h1>
    <form @submit.prevent="generateLink">
      <input type="text" id="link" name="link" v-model="link" placeholder="Shorten your link" />
      <button type="submit">Shorten</button>
    </form>
    <h2 v-if="generatedLink">
      Shortened link:
      <a :href="generatedLink">
        {{ generatedLink }}
      </a>
    </h2>
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
      this.link = this.addHttp(this.link);
      console.log(this.getUserId);
      let request;
      if (this.getUserId != "") {
        request = await GeneratorService.generateLink(this.link, this.getUserId);
      } else {
        request = await GeneratorService.generateLink(this.link);
      }
      console.log(request);
      this.generatedLink = `https://houge.ninja/l/${request.shortCode}`;

      this.$emit("newLink");
    },
    addHttp(url) {
      let re = new RegExp("^(http|https)://", "i");

      if (!re.test(url)) {
        url = "http://" + url;
      }

      return url;
    },
  },
};
</script>

<style lang="scss" scoped></style>
