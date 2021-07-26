<template>
  <el-button :loading="loadingStatus" @click="handleClick" v-bind="$attrs">
    <slot />
  </el-button>
</template>

<script setup>
import { defineProps, ref } from "vue";

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
});
const loadingStatus = ref(false);
const handleClick = () => {
  if (props.loading) {
    loadingStatus.value = true;
  }
};
</script>

<style></style>
