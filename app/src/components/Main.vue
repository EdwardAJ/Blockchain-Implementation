<template>
  <div>
    <p> {{ currentAddress }} </p>
  </div>
</template>

<script>

export default {
  name: 'Main',
  data () {
    return {
      currentAddress: ''
    }
  }
}
</script>
