<template>
  <span ref="ellipsis" class="ellipsis">
    <span ref="content" class="ellipsis_content">
      <slot/>
    </span>
    <span v-if="showSymbol" ref="symbol" class="ellipsis_symbol">
      <slot name="symbol">...</slot>
    </span>
  </span>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, onUnmounted, ref, useSlots, watch } from 'vue'
import { debounce } from '@/js/core'
interface Props {
  line?: number
  resize?: boolean
  disabled?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  line: 1,
  resize: true,
  disabled: false
})

const slots = useSlots()
const ellipsis = ref<HTMLSpanElement>()
const content = ref<HTMLDivElement>()
const symbol = ref<HTMLSpanElement>()
const text = ref('')
const offset = ref(0)
const showSymbol = ref(true)
  
const isClamped = computed(() => offset.value !== text.value.length)
const realText = computed(() => isClamped.value ? text.value.slice(0, offset.value) : text.value)

const getText = () => {
  const [content] = slots.default?.() || []
  if (!content || content.el?.nodeType !== 3) return
  return content.el?.textContent
}

const isOverflow = () => {
  const rects = content.value!.getClientRects()
  return rects.length > props.line
}

const clampAt = (value: number) => {
  offset.value = value
  changeValue()
}

const search = (from: number = 0, to: number = offset.value) => {
  if (to - from <= 1) {
    while (!isOverflow() && offset.value < text.value.length) {
      clampAt(offset.value + 1)
    }
    while (isOverflow() && offset.value > 0) {
      clampAt(offset.value - 1)
    }
    return
  }
  const target = Math.floor((to + from) / 2)
  clampAt(target)
  if (isOverflow()) {
    search(from, target)
  } else {
    search(target, to)
  }
}

const changeValue = () => {
  content.value!.textContent = realText.value
}

const mutationObserver = new MutationObserver(() => {
  run()
})

const run = debounce(() => {
  text.value = getText()
  offset.value = text.value.length
  changeValue()
  showSymbol.value = isOverflow()
  if (isOverflow() || isClamped.value) {
    content.value!.style.paddingRight = `${Math.ceil(symbol.value?.getBoundingClientRect().width!)}px`
    search()
  }
})

const init = () => {
  run()
  props.resize && window.addEventListener('resize', run)
  nextTick(() => {
    mutationObserver.observe(symbol.value!, {
      childList: true,
      attributes: true,
      characterData: true,
      subtree: true,
      attributeOldValue: true,
      characterDataOldValue: true
    })
  })
}

const destroy = () => {
  mutationObserver.disconnect()
  props.resize && window.removeEventListener('resize', run)
}

watch(() => props.disabled, value => {
  if (value) {
    text.value = getText()
    offset.value = text.value.length
    changeValue()
    destroy()
    return
  }
  init()
})


onMounted(() => {
  init()
})
onUnmounted(() => {
  destroy()
})
</script>

<style>
.ellipsis {
  position: relative;
  word-break: break-all;
  display: inline-block;
}
.ellipsis_symbol {
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>