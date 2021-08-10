<template>
  <span class="ellipsis" :class="[className, { disabled }]">
    <slot/>
  </span>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
interface Props {
  line?: number
  disabled?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  line: 1,
  disabled: false
})
const className = computed(() => props.line > 1 ? 'multiple' : 'single')
</script>

<style>
.ellipsis:not(.disabled) {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
}
.ellipsis.single:not(.disabled) {
  width: 100%;
  white-space: nowrap;
  /* https://blog.csdn.net/iefreer/article/details/50421025 */
  vertical-align: bottom;
}
.ellipsis.multiple:not(.disabled) {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: v-bind(line);
}
</style>