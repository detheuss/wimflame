<template>
  <section id="android-instructions">
    <Heading2>Great News! 🎉 </Heading2>
    <Paragraph>
      Wimflame can be installed on your device!
      <span class="font-bold text-primary">
        Just tap the install button below
      </span>
      to get started.
    </Paragraph>
    <Button size="lg" class="mt-4 w-full" @click="handleInstall">
      Install Now
    </Button>

    <Heading2>Why Isn't Wimflame on the Google Play Store?</Heading2>
    <Paragraph>
      Wimflame is a free, open-source project that meets the
      <span class="font-bold">Progressive Web App (PWA) requirements</span>,
      which allows it to be installed directly. I could publish it to Google
      Play, but as a solo developer with limited time, I’ve prioritized building
      the app itself.
    </Paragraph>

    <Heading2>Is Installing Wimflame Safe?</Heading2>
    <Paragraph>
      Yes — installing Wimflame from your browser is completely safe. It's an
      open-source project, meaning the entire codebase is publicly available and
      transparent. You can see it for yourself.
    </Paragraph>

    <a
      class="mt-4 block"
      href="https://github.com/detheuss/wimflame"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button size="lg" variant="outline" class="w-full" @click="handleInstall">
        Source Code on GitHub
      </Button>
    </a>
  </section>
</template>

<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import Heading2 from "@/components/ui/typography/Heading2.vue";
import Paragraph from "@/components/ui/typography/Paragraph.vue";

const emit = defineEmits(["onInstall"]);
const handleInstall = () => {
  emit("onInstall");
};
</script>

<style scoped></style>
