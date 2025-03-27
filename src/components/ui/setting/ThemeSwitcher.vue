<template>
  <Button
    variant="outline"
    @click="toggleTheme"
    class="aspect-square h-12 w-12 p-2"
  >
    <img :src="isDark ? lightIconSrc : darkIconSrc" class="h-full w-full" />
  </Button>
</template>

<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import { onMounted, ref } from "vue";

const isDark = ref(true);

const lightIconSrc = "/icons/light-mode.svg";
const darkIconSrc = "/icons/dark-mode.svg";

const toggleTheme = () => {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle("dark");
};

onMounted(() => {
  isDark.value = document.documentElement.classList.contains("dark");
});
</script>

<style scoped lang="scss"></style>
