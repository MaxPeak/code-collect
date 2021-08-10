<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="href"/>
  </svg>
</template>

<script lang="ts" setup>
import { computed } from "vue"
interface Props {
  icon: string
}
const props = defineProps<Props>()
const href = computed(() => `#cc-${props.icon}`)
const mountResource = () => {
  if(document.head.querySelector('[data-nickname=iconfont]')) return
  const script = document.createElement('script')
  script.src = '//at.alicdn.com/t/font_2707573_vtx8cmvkvh.js'
  script.defer = true
  script.dataset.nickname = 'iconfont'
  document.head.appendChild(script)
}
mountResource()
</script>


<style>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>