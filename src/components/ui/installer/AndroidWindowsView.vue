<template>
  <section id="android-instructions">
    <div class="rounded-lg border p-6">
      <Heading2>Great News! 🎉 </Heading2>
      <Paragraph>
        Wimflame can be installed on your device!
        <span class="font-bold text-primary">
          Just tap the install button below
        </span>
        to get started.
      </Paragraph>
      <Button size="lg" class="mt-4 w-full" @click="emit('onInstall')">
        Install Now
      </Button>
    </div>

    <Heading2>Troubleshooting: Installation Did Not Start</Heading2>
    <Paragraph>
      If you're not using Google Chrome, please open this site in Chrome and try
      again. If you are using Chrome, simply refresh the page and try once more.
    </Paragraph>

    <Heading2>Is Wimflame on Google Play?</Heading2>
    <Paragraph>
      Wimflame is a modern, open-source project that meets the
      <span class="font-bold">Progressive Web App (PWA) requirements</span>,
      which allows it to be installed directly from the browser. I could publish it to Google
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
      <Button size="lg" variant="outline" class="w-full">
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
</script>

<style scoped></style>
