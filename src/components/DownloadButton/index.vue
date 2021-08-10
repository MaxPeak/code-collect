<template>
  <button
    class="download-button"
    :class="{ downloading: isDownload || progress > 0, done: progress === 100 }"
    :disabled="isDownload || progress > 0"
    @click="download"
  >
    <span>{{ text }}</span>
    <span class="progress">
      Downloaded
    </span>
  </button>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
const progress = ref(0)
const isDownload = ref(false)
const text = computed(() => isDownload.value ? 'Downloading' : 'Download')
const progressLeft = computed(() => `-${100 - progress.value}%`)
const progressTop = computed(() => progress.value < 100 ? 'calc(100% - 5px)' : '0px')
const download = () => {
  isDownload.value = true
  const intervalId = setInterval(() => {
    progress.value += 20
    if (progress.value >= 100) {
      clearInterval(intervalId)
      isDownload.value = false
      const timeoutId = setTimeout(() => {
        progress.value = 0
        clearTimeout(timeoutId)
      }, 1300)
    }
  }, 100)
}
</script>

<style>
.download-button {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  width: 130px;
  margin: 0;
  padding: 0 16px;
  border: 1px solid #BABACC;
  background-color: #fff;
  outline: none;
  color: #232333;
  font-size: 14px;
  white-space: nowrap;
  cursor: pointer;
  border-radius: 8px;
}
.download-button .progress {
  position: absolute;
  top: v-bind(progressTop);
  left: v-bind(progressLeft);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background: linear-gradient(to right, #8E54E9, #4776E6);
  color: #fff;
  transition: top linear 0.3s;
}
.download-button.done .progress {
  animation: done 0.3s linear forwards 1s;
}
.download-button.downloading {
  cursor: progress;
}
.download-button:disabled:not(.downloading) {
  cursor: not-allowed;
}
@keyframes done {
  100% {
    top: 100%;
  }
}
</style>