<template>
  <div>test</div>
</template>

<script>
export default {
  layout: 'auth',

  middleware: 'auth',

  head() {
    return {
      title: this.$t('pages.report_abuse'),
    }
  },
}
</script>
