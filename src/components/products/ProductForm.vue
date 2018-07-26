<template>
  <v-dialog
    v-if="product"
    v-model="product"
    :fullscreen="$vuetify.breakpoint.xs"
    persistent
    transition="dialog-bottom-transition"
    :max-width="$vuetify.breakpoint.smAndUp ? 560 : 600"
  >
    <v-card>
      <v-toolbar
        v-if="$vuetify.breakpoint.xs"
        dark
        color="primary"
      >
        <v-btn icon @click="close()">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title v-text="title"></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="valid && submit(product)">
          <v-icon>send</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-title
        v-if="$vuetify.breakpoint.smAndUp"
        class="headline lighten-2"
        v-text="title"
        primary-title
      ></v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="product.name"
            :rules="rules.name"
            label="Name"
            required
          ></v-text-field>
          <v-textarea
            v-model="product.introduction"
            :rules="rules.introduction"
            label="Introduction"
            rows="3"
            auto-grow
            required
          ></v-textarea>
          <v-text-field
            v-model="product.cost"
            :rules="rules.cost"
            label="Cost"
            type="number"
            required
          ></v-text-field>
          <v-text-field
            v-model="product.price"
            :rules="rules.price"
            label="Price"
            type="number"
            required
          ></v-text-field>
          <v-text-field
            v-model="product.storage"
            :rules="rules.count"
            label="Count"
            type="number"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions v-if="$vuetify.breakpoint.smAndUp">
        <v-spacer />
        <v-btn flat color="primary" @click="close()">
          Cancel
        </v-btn>
        <v-btn
          flat
          color="primary"
          @click="valid && submit(product)"
          v-text="submitText"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'product-form',
  props: {
    product: {
      type: Object
    },
    title: {
      type: String,
      default: "Product"
    },
    submitText: {
      type: String,
      default: "Submit"
    }
  },
  inject: ['close', 'submit'],
  data () {
    return {
      valid: false,
      rules: {
        name: [ v => !!v || 'Name is required' ],
        introduction: [ v => !!v || 'Introduction is required' ],
        cost: [ v => !!v || 'Cost is required' ],
        price: [ v => !!v || 'Price is required' ],
        count: [ v => !!v || 'Count is required' ]
      }
    }
  }
}
</script>
