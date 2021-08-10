<template>
  <div class="theme" title="moon" @click="changeTheme">
    <icon :icon="Icons[theme]"/>
  </div>
</template>

<script lang="ts" setup>
import Icon from '../Icon/index.vue'
import { ref } from "vue"
import { cookie } from '@/js/browser'
enum Icons {
  auto = 'computer',
  dark = 'sun',
  light = 'moon'
}
type IconKey = keyof typeof Icons
const themeList = Object.keys(Icons)
const setTheme = (theme: IconKey) => {
  const mode = themeList.includes(theme) ? theme : 'auto'
  cookie.set('theme', mode)
  return document.documentElement.dataset.theme = mode
}
const oldTheme = setTheme(cookie.get('theme') as IconKey)
const theme = ref<IconKey>(oldTheme)
let index = themeList.indexOf(oldTheme) > -1 ? themeList.indexOf(oldTheme) : 0
const changeTheme = () => {
  theme.value = themeList[++index % 3] as IconKey
  setTheme(theme.value)
}
</script>


<style>
.theme {
  font-size: 25px;
  cursor: pointer;
}

:root {
  --dark-bgc: #323232;
  --dark-color: #fff;

  --light-bgc: #f7f7fa;
  --light-color: #444;
}
:root {
  --bg-color: var(--light-bgc);
  --color: var(--light-color);
}
:root ::selection {
  background-color: var(--dark-bgc);
  color: var(--dark-color);
}
:root[data-theme="dark"] {
  --bg-color: var(--dark-bgc);
  --color: var(--dark-color);
}
:root[data-theme="dark"] ::selection {
  background-color: var(--light-bgc);
  color: var(--light-color);
}
@media (prefers-color-scheme: dark) {
  :root[data-theme="auto"] {
    --bg-color: var(--dark-bgc);
    --color: var(--dark-color);
  }
  :root[data-theme="auto"] ::selection {
    background-color: var(--light-bgc);
    color: var(--light-color);
  }
}
@media (prefers-color-scheme: light) {
  :root[data-theme="auto"] {
    --bg-color: var(--light-bgc);
    --color: var(--light-color);
  }
  :root[data-theme="auto"] ::selection {
    background-color: var(--dark-bgc);
    color: var(--dark-color);
  }
}
</style>