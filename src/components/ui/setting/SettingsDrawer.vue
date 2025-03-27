<template>
  <Drawer :handleOnly="true">
    <div class="flex w-full gap-2">
      <DrawerTrigger class="flex-1">
        <Button class="w-full" size="lg" variant="outline">
          {{ triggerLabel }}
        </Button>
      </DrawerTrigger>
    </div>
    <DrawerContent class="mx-auto flex w-full max-w-lg flex-col border">
      <DrawerHeader>
        <DrawerTitle class="text-lg">{{ title }}</DrawerTitle>
        <DrawerDescription>
          {{ description }}
        </DrawerDescription>
      </DrawerHeader>

      <div class="max-h-[60vh] overflow-y-auto border p-5">
        <slot />
      </div>

      <DrawerFooter class="flex w-full flex-col">
        <div class="flex items-center justify-center gap-2">
          <DrawerClose class="flex-1">
            <Button size="lg" variant="outline" class="w-full"> Cancel </Button>
          </DrawerClose>
        </div>
        <Button
          size="lg"
          variant="default"
          class="w-full"
          @click="handleSaveSettings"
        >
          Save
        </Button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import Button from "@/components/ui/button/Button.vue";
import Drawer from "@/components/ui/drawer/Drawer.vue";
import DrawerContent from "@/components/ui/drawer/DrawerContent.vue";
import DrawerHeader from "@/components/ui/drawer/DrawerHeader.vue";
import DrawerTitle from "@/components/ui/drawer/DrawerTitle.vue";
import DrawerDescription from "@/components/ui/drawer/DrawerDescription.vue";
import DrawerFooter from "@/components/ui/drawer/DrawerFooter.vue";
import { DrawerClose, DrawerTrigger } from "vaul-vue";

defineProps({
  triggerLabel: { type: String, default: "" },
  title: { type: String, default: "" },
  description: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["onSaveSettings"]);

const handleSaveSettings = () => {
  emit("onSaveSettings");
};
</script>

<style scoped></style>
