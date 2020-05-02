<template>
  <div class="row form-title-margin">
    <input
      v-model="data"
      type="text"
      :class="['form-control', 'field-length', 'form-content', isFormDirty && isDataEmpty ? 'form-border-error': 'form-border']"
      :placeholder="data + ' ...'"
      @focus="isFormDirty = true"
    >
    <div v-if="isDataEmpty && isFormDirty">
      <p class="form-error"> 
        {{ data }} cannot be empty.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
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
  }
}
</script>

<style>
  @import '../../../static/css/input.css';
</style>