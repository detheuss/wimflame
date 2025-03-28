<template>
  <section>
    <section id="ios-instructions" class="rounded-lg border p-6">
      <Heading2>🍎 iOS Installation</Heading2>
      <Paragraph>
        Apple makes things a bit more complicated — but don’t worry, I’ve got
        you covered.
      </Paragraph>
      <Button
        size="lg"
        class="mt-4 w-full"
        @click="scrollToElementById('ios-safari')"
      >
        Installing from Safari
      </Button>
      <Button
        size="lg"
        class="mt-4 w-full"
        @click="scrollToElementById('ios-other')"
      >
        Other browsers on iOS
      </Button>
    </section>
    <section id="ios-safari">
      <Heading2 class="!pt-6">
        Quickstart: Installation Guide (Safari)
      </Heading2>

      <OList class="pe-5">
        <li>
          Tap on the
          <span class="font-bold text-primary"> <ShareIcon /> Share</span> icon
          in the Browser.
        </li>
        <li>
          Pull up the list to reveal the
          <span class="font-bold text-primary">Add to Home Screen</span> option
        </li>
        <li>
          Select this option and confirm with
          <span class="font-bold text-primary">Add</span> button
        </li>
      </OList>
      <Paragraph>
        ⚠️ Offline mode on iOS may have some limitations, which will be resolved
        in future updates.
      </Paragraph>
    </section>
    <section id="ios-other">
      <Heading2 class="!pt-6"> Other Browsers</Heading2>
      <Paragraph>
        Apple only allows App installation through Safari. If you’re using
        another browser, switch to Safari and follow the install guide above.
      </Paragraph>
    </section>
  </section>
</template>

<script setup lang="ts">
import Heading2 from "@/components/ui/typography/Heading2.vue";
import Paragraph from "@/components/ui/typography/Paragraph.vue";
import Button from "@/components/ui/button/Button.vue";
import { scrollToElementById } from "@/utils/utils";
import ShareIcon from "@/components/ui/installer/ShareIcon.vue";
import OList from "@/components/ui/typography/OList.vue";
</script>

<style scoped></style>
