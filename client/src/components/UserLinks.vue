<template>
  <div>
    <h1>Generated links</h1>

    <table>
      <tr>
        <th>Short link</th>
        <th>Links to</th>
        <th>Times click</th>
      </tr>

      <tr v-for="(link, index) in userLinks" :key="index">
        <th>
          <a :href="prefixUrl(link.shortCode)"> https://houge.ninja/l/{{ link.shortCode }} </a>
        </th>

        <th>
          <a :href="link.link">{{ link.link }}</a>
        </th>

        <th>
          <p>{{ link.clickCount }}</p>
        </th>
      </tr>
    </table>

    <!--     <div v-for="(link, index) in userLinks" :key="index">
      <p>
        <a :href="prefixUrl(link.shortCode)"> https://houge.ninja/l/{{ link.shortCode }} </a> links to
        <a :href="link.link">{{ link.link }}</a
        >. It has been click {{ link.clickCount }} times.
      </p>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "UserLinks",
  data() {
    return {
      userInfo: null,
    };
  },

  computed: {
    userLinks() {
      return this.$store.getters.getUserLinks;
    },
  },
  methods: {
    prefixUrl(shortCode) {
      return `https://houge.ninja/l/${shortCode}`;
    },
  },
};
</script>

<style lang="scss" scoped>
table {
  margin: auto;

  text-align: left;

  th {
    padding: 0 1rem;
  }
}
</style>
