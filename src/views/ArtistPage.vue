<template>
  <div>
    <v-scale-transition origin="center center 0">
      <div v-if="artist">
        <v-list two-line>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title v-text="artist.name"></v-list-tile-title>
              <v-list-tile-sub-title v-text="artist.introduction"></v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click="edit()">
                <v-icon>edit</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
        <v-divider />
        <v-scale-transition origin="center center 0">
          <div v-if="products">
            <v-list two-line>
              <v-list-tile
                v-for="product in products"
                :key="product.id"
              >
                <v-list-tile-content>
                  <v-list-tile-title v-text="product.name"></v-list-tile-title>
                  <v-list-tile-sub-title v-text="product.introduction"></v-list-tile-sub-title>
                </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon @click="mode == 'edit' ? editProduct(product) : confirmDeleteProduct(product)">
                  <v-icon
                    :color="mode == 'delete' ? 'error' : undefined"
                    v-text="mode"
                  ></v-icon>
                </v-btn>
              </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </div>
        </v-scale-transition>
      </div>
    </v-scale-transition>
    <edit-artist :artist="artistToEdit" />
    <new-product
      v-if="artist"
      :artist="artist"
    />
    <edit-product :product="productToEdit" />
    <delete-product :product="productToDelete" />
  </div>
</template>

<script>
import EditArtist from '@/components/artists/EditArtist'
import NewProduct from '@/components/products/NewProduct'
import EditProduct from '@/components/products/EditProduct'
import DeleteProduct from '@/components/products/DeleteProduct'

const icons = {
  edit: 'edit',
  delete: 'delete'
}

export default {
  name: 'artist-page',
  props: ['id'],
  components: {
    EditArtist,
    NewProduct,
    EditProduct,
    DeleteProduct
  },
  data () {
    return {
      artist: null,
      artistToEdit: null,
      products: null,
      productToEdit: null,
      productToDelete: null,
      mode: 'edit'
    }
  },
  methods: {
    refresh () {
      this.products = null
      this.artist = null
      this.ghshop.getArtist(this.id).then(artist => {
        this.artist = artist
        this.refreshProducts()
      })
    },
    refreshProducts () {
      this.ghshop.getProducts(this.artist).then(products => {
        this.products = products
      })
    },
    edit () {
      this.artistToEdit = Object.assign({}, this.artist)
    },
    updated () {
      this.artistToEdit = null
    },
    editProduct (product) {
      this.productToEdit = Object.assign({}, product)
    },
    onUpdateProduct () {
      this.productToEdit = null
    },
    confirmDeleteProduct (product) {
      this.productToDelete = product
    },
    onDeleteProduct () {
      this.productToDelete = null
    }
  },
  provide () {
    return {
      refreshArtists: this.refresh,
      refreshProducts: this.refreshProducts,
      onUpdateArtist: this.updated,
      onUpdateProduct: this.onUpdateProduct,
      onDeleteProduct: this.onDeleteProduct
    }
  },
  created () {
    this.toolbar.pushNavigation()
    this.refresh()
    this.toolbar.addAction({
      name: 'refresh-artist',
      icon: 'refresh'
    }, () => {
      this.refresh()
    })
    this.toolbar.addAction({
      name: 'switch-artist-mode',
      icon: 'delete'
    }, action => {
      if (this.mode === 'edit') {
        this.mode = 'delete'
        action.icon = icons.edit
      }
      else {
        this.mode = 'edit'
        action.icon = icons.delete
      }
      this.toolbar.updateAction(action)
    })
  },
  beforeDestroy () {
    this.toolbar.removeAction({ name: 'refresh-artist' })
    this.toolbar.removeAction({ name: 'switch-artist-mode' })
  }
}
</script>

<style scoped>
.v-list {
  background: inherit;
}
</style>
