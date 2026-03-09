<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="5"
    class="elevation-1"
  >
    <!-- Custom image column template -->
    <template v-slot:[`item.image`]="{ item }">
      <v-img
        :src="item.imageUrl"
        max-width="100"
        max-height="100"
        contain
        @click="expandImage(item)"
      ></v-img>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "Name",
          value: "name",
        },
        {
          text: "Image",
          value: "image",
        },
      ],
      items: [
        {
          name: "Item 1",
          imageUrl: "/path/to/image1.jpg",
        },
        {
          name: "Item 2",
          imageUrl: "/path/to/image2.jpg",
        },
      ],
    };
  },
  methods: {
    expandImage(item) {
      // Handle image click
      console.log("Clicked image:", item.imageUrl);
    },
  },
};
</script>
