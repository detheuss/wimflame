<template>
  <main class="w-full max-w-lg h-[100dvh] mx-auto px-10 py-9 flex flex-col">
    <h1>
      <span class="font-black">Wimhales. </span>Free.
      <span class="font">Forever.</span>
    </h1>
    <Display
      >All the <span class="text-cyan-400">Love</span>—<br />
      all the <span class="text-cyan-400">Power</span>.
    </Display>

    <Drawer>
      <DrawerTrigger class="mt-auto border px-3 py-2 rounded-md"
        >Settings</DrawerTrigger
      >
      <DrawerContent class="w-full max-w-lg mx-auto flex flex-col">
        <DrawerHeader>
          <DrawerTitle>Session Settings</DrawerTitle>
          <DrawerDescription>Adjust Session Settings.</DrawerDescription>
        </DrawerHeader>
        <ul class="p-4">
          <li>
            <p class="font-bold">Breaths</p>
            <p class="">Speed</p>
            <p>Number</p>
          </li>
          <li></li>
          <li>Number of Breaths</li>
        </ul>
        <DrawerFooter class="flex flex-row">
          <DrawerClose class="w-full">
            <Button variant="outline" class="w-full"> Cancel </Button>
          </DrawerClose>
          <Button variant="default" class="w-full"> Save </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  </main>
</template>

<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import Display from "@/components/ui/typography/Display.vue";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Heading1 from "@/components/ui/typography/Heading1.vue";
</script>

<style scoped></style>
