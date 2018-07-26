<template>
  <div>
    <v-fab-transition>
      <v-btn
        v-if="fab"
        @click.stop="show()"
        fixed
        dark
        fab
        right
        bottom
        color="primary"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-fab-transition>
    <product-form
      :product="product"
      title="New Product"
      submit-text="Create"
    ></product-form>
  </div>
</template>

<script>
import ProductForm from '@/components/products/ProductForm'

export default {
  name: 'new-product',
  props: {
    artist: Object
  },
  inject: ['refreshProducts'],
  components: {
    ProductForm
  },
  data () {
    return {
      fab: false,
      product: null
    }
  },
  methods: {
    show () {
      this.product = {
        name: '',
        introduction: '',
        cost: null,
        price: null,
        storage: null,
        shelf: 0
      }
    },
    reset () {
      this.product = null
    },
    createProduct (product) {
      this.product = null
      this.ghshop.postProduct(this.artist, product).then(() => {
        this.refreshProducts()
      })
    }
  },
  provide () {
    return {
      close: this.reset,
      submit: this.createProduct
    }
  },
  mounted () {
    this.fab = true
  },
  beforeDestroy () {
    this.fab = false
  }
}
</script>

<style scoped>
.v-btn--bottom:not(.v-btn--absolute) {
  bottom: 53px;
}
</style>
