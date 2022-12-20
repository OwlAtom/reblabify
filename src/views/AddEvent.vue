<script setup>
import InviteIllustration from "../assets/illustrations/invite.svg";
import friendsIllustration from "../assets/illustrations/friendship.svg";
import welcomeIllustration from "../assets/illustrations/welcome.svg";
import DescriptionChips from "../components/DescriptionChips.vue";
</script>

<template>
  <div class="wrapper">
    <h1>Opret begivenhed</h1>

    <div class="flex flex-wrap gap-2">
      <DescriptionChips text="Lokation" emoji="📍" />
      <DescriptionChips text="Dresscode" emoji="👔" />
      <DescriptionChips text="Medorganisator" emoji="🤝" />
      <DescriptionChips text="Privathed" emoji="🔒" />
      <DescriptionChips text="Svar senest" emoji="🚩" />
    </div>

    <InviteIllustration />
    <a href="https://storyset.com/email">Email illustrations by Storyset</a>
    <friendsIllustration />
    <a href="https://storyset.com/people">People illustrations by Storyset</a>
    <welcomeIllustration />
    <a href="https://storyset.com/event">Event illustrations by Storyset</a>
  </div>
</template>

<style lang="scss" scoped></style>
