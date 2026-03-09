<script>
export default {
  created() {
    this.setHeaders();
  },
  data: () => ({
    headers: [],
    items: [],
    meta: {},
    itemPerPage: 10,
    //itemPerPages: 3,
    itemPerPageOptions: [5, 10, 30],
    urlItems: "",
    urlDeleteItems: "",
    sortBy: "id",
    sortDesc: true,
    loading: {
      list: false,
      refresh: false,
      filter: false,
    },
    dialogDelete: {
      show: false,
    },
    pagination: {},
    selectedItem: false,
    _search: {},
    _sorts: {},
  }),
  watch: {
    pagination: {
      handler() {
        this.getItems();
      },
      deep: true,
    },
  },
  methods: {
    setHeaders() {
      this.headers = [];
    },
    refreshItems() {
      let self = this;
      this.loading.refresh = true;
      this.getItems()
        .then(() => {})
        .catch(() => {})
        .then(() => {
          self.loading.refresh = false;
        });
    },
    getItems() {
      let self = this;
      const { page, itemsPerPage } = this.pagination;
      // console.log(page);
      // console.log(itemsPerPage);
      let params = {
        page: page,
        size: itemsPerPage,
      };
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      return new Promise((resolve, reject) => {
        this.loading.list = true;
        //console.log("ls params", params);
        //console.log("Sorts", sortBy, sortDesc);
        self.$store
          .dispatch("request", {
            url: self.urlItems,
            params: params,
          })
          .then((response) => {
            let data = response.data;
            self.items = data.content;
            self.meta = { totalElements: data.totalElements };
            // console.log("meta", self.meta);
            resolve(response);
          })
          .catch((err) => {
            let message = this.$vuetify.lang.t("$vuetify.error_occured");
            if (err.response) {
              if (err.response.status === 400) {
                const fields = err.response.data;
                self.setFormErrors(fields);

                const firstField = Object.keys(fields)[0];

                if (firstField && Array.isArray(fields[firstField])) {
                  message = fields[firstField][0];
                }
              } else if (err.response.status === 403) {
                message = self.$vuetify.lang.t("$vuetify.error_denied");
              } else if (err.response.status === 500) {
                message = self.$vuetify.lang.t("$vuetify.error_server");
              }
            }
            self.$store.dispatch("showNotification", {
              status: true,
              text: message,
            });
            reject(err);
          })
          .then(() => {
            self.loading.list = false;
            resolve();
          });
      });
    },
    deleteItem(item) {
      this.urlDeleteItems = this.urlItems + "/" + item.id;
      this.dialogDelete.show = true;
    },
    getSorts(sortBy, sortDesc) {
      let sorts = {};
      if (this._.has(sortBy, "length") && this._.has(sortDesc, "length")) {
        if (sortBy.length > 0 && sortDesc.length > 0) {
          sortBy.forEach((s, k) => {
            sorts["_sorts[" + s + "]"] = sortDesc[k] ? "DESC" : "ASC";
          });
        }
      }
      return sorts;
    },
  },
};
</script>
