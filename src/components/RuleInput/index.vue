<template>
  <input class="rule-input" ref="input" v-model="value" v-bind="$attrs">
</template>

<script lang="ts" setup>
import { computed, ref } from "vue"
interface Props {
  modelValue: string
  rule?: RegExp
}
const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
const input = ref<HTMLInputElement>()
const changeValue = (value: string) => {
  input.value!.value = value
  emit('update:modelValue', value)
}
const value = computed({
  get: () => props.modelValue,
  set: value => {
    if (value === '') return changeValue(value)

    if (props.rule) {
      const res = props.rule.test(value)
      props.rule.lastIndex = 0
      if (!res) return changeValue(props.modelValue)
    }
    
    changeValue(value)
  }
})
</script>


<style>
.rule-input {
  display: inline-block;
  box-sizing: border-box;
  height: 25px;
  padding: 0 12px;
  border: 1px solid #BABACC;
  background-color: #fff;
  outline: none;
  color: #232333;
  border-radius: 8px;
}
.rule-input:hover, .rule-input:focus {
  border-color: #0E71EB;
}
</style>