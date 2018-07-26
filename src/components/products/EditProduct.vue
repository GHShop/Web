<template>
  <product-form
    :product="product"
    title="Edit Product"
    submit-text="Update"
  ></product-form>
</template>

<script>
import ProductForm from '@/components/products/ProductForm'

export default {
  name: 'edit-product',
  props: ['product'],
  inject: [
    'refreshProducts',
    'onUpdateProduct'
  ],
  components: {
    ProductForm
  },
  methods: {
    updateProduct (product) {
      this.onUpdateProduct()
      this.ghshop.putProduct(product).then(() => {
        this.refreshProducts()
      })
    }
  },
  provide () {
    return {
      close: this.onUpdateProduct,
      submit: this.updateProduct
    }
  }
}
</script>
