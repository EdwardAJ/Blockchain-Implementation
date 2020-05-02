<template>
  <div class="col">
      <div class="row mt-2">
        <p class="form-title"> 
          {{ name }} 
        </p>
      </div>
      <div :class="['row', isFormDirty && isDataEmpty ? 'form-error' : 'form']">
        <input
          v-model="data"
          type="text"
          :class="['form-control', 'field-length', 'form-content', isFormDirty && isDataEmpty ? 'form-border-error': (isFormDirty ? 'form-border' : 'form-initial-border')]"
          :placeholder="name + ' ...'"
          @focus="isFormDirty = true"
        >
      </div>
      <div class="row">
        <div v-if="isDataEmpty && isFormDirty" :key="showError">
          <p class="form-error animated fadeIn"> 
            {{ name }} cannot be empty.
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
    }
  },
  data () {
    return {
      data: '',
      isFormDirty: false
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
    }
  }
}
</script>

<style>
  @import '../../../static/css/input.css';
  @import '../../../static/css/transitions.css';
</style>