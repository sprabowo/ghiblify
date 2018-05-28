<template>
  <div>
    <span><strong>{{ item.title }}</strong> in {{ item.category }}</span>
  </div>
</template>

<script>
export default {
  props: {
    item: { required: true }
    // searchText: { required: true }
  }
}
</script>