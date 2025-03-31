<template>
  <div
    class="flex flex-col justify-center items-center rounded-lg border p-4 text-sm text-secondary-foreground"
  >
    <p class="text-center">
      Loving these tracks? Support my friend
      <ExternalLink href="https://pixabay.com/users/kalsstockmedia-13377274/">
        @kalsstockmedia</ExternalLink
      >, whose work makes projects like this possible.
    </p>
    <div class="mt-3 flex items-center justify-start gap-4">
      <ExternalLink
        v-for="social in KAL_SOCIALS"
        :href="social.url"
        class="flex items-center justify-center rounded-lg border p-2"
      >
        <component
          :is="social.icon"
          class="h-[38px] w-[38px] items-center justify-center"
        />
      </ExternalLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import ExternalLink from "@/components/ui/externalLink/ExternalLink.vue";
import Insta from "@/assets/icons/insta.svg";
import Xcom from "@/assets/icons/xcom.svg";
import Pixabay from "@/assets/icons/pixabay.svg";
import Coffee from "@/assets/icons/coffee.svg";

export type SocialLinkT = {
  icon: any;
  url: string;
};

const KAL_SOCIALS: SocialLinkT[] = [
  {
    icon: Insta,
    url: "https://www.instagram.com/kalsstockmedia/",
  },
  {
    icon: Xcom,
    url: "https://x.com/kalsstockmedia",
  },
  {
    icon: Pixabay,
    url: "https://pixabay.com/users/kalsstockmedia-13377274/",
  },
  {
    icon: Coffee,
    url: "https://buymeacoffee.com/kalsstockmedia",
  },
];
</script>

<style scoped></style>
