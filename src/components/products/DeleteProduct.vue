<template>
  <v-dialog
    v-if="product"
    v-model="product"
    max-width="290"
  >
    <v-card>
      <v-card-title class="headline">Delete {{product.name}}?</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          @click="onDeleteProduct()"
          flat
        >Cancel</v-btn>
        <v-btn
          color="error"
          @click="deleteProduct(product)"
          flat
        >Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'delete-product',
  props: ['product'],
  inject: [
    'refreshProducts',
    'onDeleteProduct'
  ],
  methods: {
    deleteProduct (product) {
      this.onDeleteProduct()
      this.ghshop.deleteProduct(product).then(() => {
        this.refreshProducts()
      })
    }
  }
}
</script>
