<template>
  <div>
    Test
    {{ status }}
  </div>
</template>

<script>
import TestService from "@/services/TestService";
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      status: []
    };
  },
  mounted() {
    this.testStatus();
  },
  methods: {
    async testStatus() {
      const response = await TestService.testStatus();
      this.status = response.data;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
