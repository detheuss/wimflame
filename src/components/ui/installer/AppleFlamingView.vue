<template>
  <section id="ios-instructions">
    <Heading2>🍎 iOS Installation</Heading2>
    <Paragraph>
      Unlike all other major platforms (including Android and Windows), Apple’s
      iOS does not support direct installation of Progressive Web Apps (PWAs)
      through a simple browser prompt.
    </Paragraph>
    <Paragraph>
      <span class="font-bold text-primary">You can still install Wimflame</span
      >, but some functionality offline may be limited.
    </Paragraph>
    <Paragraph>Here's how you do it: </Paragraph>
    <UList>
      <li>Tap the Share icon (the square with an arrow)</li>
      <li>Select “Add to Home Screen”</li>
    </UList>

    <Paragraph
      >⚠️ This doesn’t actually fully install the app on your iPhone like it
      does on Android or Windows. Again,
      <span class="font-bold">offline functionality may be limited.</span>
      I am trying to make it work, but it's a bit of a headache.
    </Paragraph>

    <Heading2>🧠 Knowledge Nugget: Why Apple Obstructs PWAs?</Heading2>
    <Paragraph>
      Because PWAs go around Apple services that Apple uses to overcharge small
      developers, like me, who want to build free, open source apps for
      everyone.
    </Paragraph>
    <UList>
      <li>
        Apple charges developers <span class="font-bold">$99/year</span> just to
        publish apps on the App Store. By comparison, Google charges a
        <span class="font-bold">$25 one-time fee</span>,
      </li>
      <li>
        Apple also takes a 15–30% cut of all revenue—including in-app purchases
        and most ads,
      </li>
      <li>
        Also, if you want to develop apps for iOS,
        <span class="font-bold">you must buy a Mac</span>. In contrast, Google
        and Microsoft not only allow Mac devs to build apps for their
        platforms—they actively support them,
      </li>
      <li>
        When developers push back, Apple responds with “free market” and a
        not-so-subtle “f*ck you, pay me”—which is fair enough, but...
      </li>
      <li>
        ...when developers sidestep Apple by building PWAs (like this one),
        <span class="font-bold">
          Apple goes out of its way to make the developer experience miserable,
        </span>
        just so they can keep charging—and so I have to charge you just to keep
        this running.
      </li>
    </UList>
    <Heading2>It All Comes Down To You</Heading2>

    <Paragraph>
      If you find this behavior toxic, you're not alone. And while class-action
      lawsuits are underway, change may take years—if it comes at all. In
      reality, it all boils down to <span class="font-bold">YOU</span>.
    </Paragraph>

    <Paragraph>
      Before you buy another iPhone, ask your local LLM to list Android phones
      better than the iPhone.
    </Paragraph>
  </section>
</template>

<script setup lang="ts">
import Heading2 from "@/components/ui/typography/Heading2.vue";
import Paragraph from "@/components/ui/typography/Paragraph.vue";
import UList from "@/components/ui/typography/UList.vue";
</script>

<style scoped></style>
