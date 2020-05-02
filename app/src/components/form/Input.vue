<template>
  <div class="col">
      <div class="row mt-2">
        <p class="form-title"> 
          {{ name }} 
        </p>
      </div>
      <div :class="['row', isFormDirty && isDataEmpty ? 'form-error' : 'form']">
        <div class="flex-display">
          <input
            v-model="data"
            :type="typeNum ? 'number': 'text'"
            :class="
              ['form-control', 'field-length', 'form-content',
                isFormDirty && isDataEmpty ? 'form-border-error': 
                (errorMessage ? 'form-border-error' : (isFormDirty ? 'form-border' : 'form-initial-border'))
              ]"
            :placeholder="name + ' ...'"
            @focus="isFormDirty = true; error = null"
          >
          <slot></slot>
        </div>
      </div>
      <div class="row">
        <div v-if="isDataEmpty && isFormDirty" :key="showError">
          <p class="form-error animated fadeIn"> 
            {{ name }} cannot be empty.
          </p>
        </div>
      </div>
      <div v-if="typeCompanyID" class="row" :key="showError">
        <div v-if="error">
          <p class="form-error animated fadeIn"> 
            {{ error }}
          </p>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    showError: {
      type: Boolean,
      required: false
    },
    typeCompanyID: {
      type: Boolean,
      required: false
    },
    errorMessage: {
      type: String,
      required: false
    },
    typeNum: {
      type: Boolean,
      required: false
    }
  },
  data () {
    return {
      data: '',
      isFormDirty: false,
      error: ''
    }
  },
  computed: {
    isDataEmpty () {
      return this.data === ''
    }
  },
  watch: {
    showError (val) {
      if (val) {
        this.isFormDirty = true
      }
      if (this.errorMessage) {
        this.error = this.errorMessage
      }
      
    },
    errorMessage (val) {
      this.error = this.errorMessage
    }
  }
}
</script>

<style>
  @import '../../../static/css/input.css';
  @import '../../../static/css/transitions.css';
</style>