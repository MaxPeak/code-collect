<template>
  <flex ref="container" justify-content="space-between">
    <flex ref="filters" gap="10px">
      <input type="text">
      <input type="text">
      <input type="text">
      <input type="text">
    </flex>
    <flex ref="handler" gap="10px">
      <flex ref="btns" gap="10px">
        <button>button1</button>
        <button>button2</button>
        <button>button3</button>
        <button>button4</button>
        <button>button5</button>
        <button>button6</button>
        <button>button7</button>
        <button>button8</button>
        <button>button9</button>
        <button>button10</button>
        <button>button11</button>
      </flex>
      <button v-if="btnList.length">icon</button>
    </flex>
  </flex>
  <div>{{btnList}}</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue'
import { Flex } from '@/components'

const container = ref<InstanceType<typeof Flex>>()
const filters = ref<InstanceType<typeof Flex>>()
const handler = ref<InstanceType<typeof Flex>>()
const btns = ref<InstanceType<typeof Flex>>()
const btnList = ref<{label:string, value: string}[]>([])
const index = ref(0)
const oldWidth = ref(-1)

const ro = new ResizeObserver(([{ contentRect }]) => {
  const isOverflow = () => {
    const { width: containerWidth } = container.value!.$el.getBoundingClientRect()
    const { width: filtersWidth } = filters.value!.$el.getBoundingClientRect()
    const { width: handlerWidth } = handler.value!.$el.getBoundingClientRect()
    const res = filtersWidth + handlerWidth - containerWidth
    return res
  }
  const btnsElement = [...btns.value!.$el.children]

  const hideBtn = () => {
    index.value--
    if (Math.abs(index.value) > btnsElement.length) return
    const displayList = btnsElement.slice(0, index.value)
    const hideList = btnsElement.slice(index.value)
    displayList.forEach(btn => (btn.style.display = 'inline-block'))
    hideList.forEach(btn => (btn.style.display = 'none'))
    const res = hideList.map(btn => ({ label: btn.textContent, value: btn.textContent }))
    btnList.value = res
  }

  if (oldWidth.value === -1) {
    oldWidth.value = contentRect.width
    while (isOverflow() > 0) {
      hideBtn()
    }
  }
  const isReduce = contentRect.width > oldWidth.value
  oldWidth.value = contentRect.width

  
  if (isOverflow() > 0) {
    hideBtn()
  }

  if (isReduce && !(isOverflow() > 0) &&  btnList.value.length) {
    const currentIndex = btnsElement.length + index.value - 1
    if (currentIndex > btnsElement.length - 1 || !(Math.abs(isOverflow()) > btnsElement[currentIndex].getBoundingClientRect().width + 10)) return
    index.value++
    const displayList = index.value === 0 ? btnsElement.slice(0) : btnsElement.slice(0, index.value)
    const hideList = index.value === 0 ? btnsElement.slice(0, 0) : btnsElement.slice(index.value)
    displayList.forEach(btn => (btn.style.display = 'inline-block'))
    hideList.forEach(btn => (btn.style.display = 'none'))
    const res = hideList.map(btn => ({ label: btn.textContent, value: btn.textContent }))
    btnList.value = res
  }
  
})

onMounted(() => {
  ro.observe(container.value!.$el)
})
</script>
