import axios from "axios";
import * as M from "materialize-css";
import Vue from "vue";

new Vue({
  el: "#app",
  data() {
    return {
      message: "Hello Vues!",
      documents: "",
    };
  },
  methods: {
    loadDocuments() {
      axios
        .get("/search/search/list")
        .then((res: any) => {
          //this.isLoading = false;
          this.documents = res.data;
        })
        .catch((err: any) => {
          // tslint:disable-next-line:no-console
          console.log(err);
        });
    },
  },
  mounted() {
    return this.loadDocuments();
  },
});
