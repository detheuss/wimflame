<template>
  <Drawer :handleOnly="true">
    <div class="flex w-full gap-2">
      <DrawerTrigger class="flex-1">
        <Button class="w-full" size="lg" :variant="triggerVariant ?? 'outline'">
          {{ triggerLabel }}
        </Button>
      </DrawerTrigger>
    </div>
    <DrawerContent class="mx-auto flex w-full max-w-lg flex-col border">
      <!-- <QuasiHandle @touchChange="handleWorkaround" /> -->
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
            <Button size="lg" variant="outline" class="w-full">
              {{ cancelCta ?? "Close" }}
            </Button>
          </DrawerClose>
        </div>
        <Button
          v-if="!isConfirmBtnHidden"
          size="lg"
          variant="default"
          class="w-full"
          @click="handleConfirmAction"
        >
          {{ confirmCta ?? "OK" }}
        </Button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>

<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import Drawer from "@/components/ui/drawer/Drawer.vue";
import DrawerContent from "@/components/ui/drawer/DrawerContent.vue";
import DrawerHeader from "@/components/ui/drawer/DrawerHeader.vue";
import DrawerTitle from "@/components/ui/drawer/DrawerTitle.vue";
import DrawerDescription from "@/components/ui/drawer/DrawerDescription.vue";
import DrawerFooter from "@/components/ui/drawer/DrawerFooter.vue";
import { DrawerClose, DrawerTrigger } from "vaul-vue";
// import QuasiHandle from "@/components/ui/quasihandle/QuasiHandle.vue";
// import { ref } from "vue";

export type ButtonVariantT =
  | "outline"
  | "default"
  | "destructive"
  | "secondary"
  | "ghost"
  | "link"
  | null
  | undefined;

defineProps<{
  triggerVariant?: ButtonVariantT;
  triggerLabel?: string;
  title?: string;
  description?: string;
  confirmCta?: string;
  cancelCta?: string;
  isConfirmBtnHidden?: boolean;
}>();

const emit = defineEmits(["onConfirmAction"]);

const handleConfirmAction = () => {
  emit("onConfirmAction");
};

// const handleWorkaround = (val: boolean) => {
//   isWorkaround.value = val;
//   console.log("touchChange", isWorkaround.value);
// };

// const isWorkaround = ref(true);
</script>

<style scoped></style>
