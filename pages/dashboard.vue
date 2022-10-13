<template>
  <div>
    <h1>Dashboard page</h1>
  </div>
</template>

<script>
export default {
  middleware: 'auth',

  head() {
    return {
      title: this.$t('pages.dashboard'),
    }
  },
}
</script>
