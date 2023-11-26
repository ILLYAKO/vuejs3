<template>
  <input type="checkbox" :checked="item.completed" />
  {{ item.title }}
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>