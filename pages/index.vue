<template>
  <div>
    <h1>Hello</h1>
  </div>
</template>

<script>
export default {
  layout: 'default',

  middleware: 'guest',

  auth: 'guest'
}
</script>
