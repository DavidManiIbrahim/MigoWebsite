<script setup>
defineEmits(["decision"]);
</script>

<template>
  <aside class="consent-banner" role="region" aria-label="Analytics consent">
    <p class="consent-copy">
      We use PostHog to see how the site is used. Session replays mask everything you type.
    </p>
    <div class="consent-actions">
      <button class="consent-allow" type="button" @click="$emit('decision', true)">
        Allow analytics
      </button>
      <button class="consent-decline" type="button" @click="$emit('decision', false)">
        No thanks
      </button>
    </div>
  </aside>
</template>
