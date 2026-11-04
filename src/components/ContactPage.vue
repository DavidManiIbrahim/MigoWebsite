<script setup>
import { reactive, ref } from "vue";
import migoMark from "../assets/migo-mark.webp";
import migoWordmark from "../assets/migo-wordmark.png";
import migoWordmarkDark from "../assets/migo-wordmark-white.png";
import { Mail, MapPin, Moon, Sun } from "@lucide/vue";

defineProps({ isDark: Boolean });
const emit = defineEmits(["toggle-theme", "open-live", "open-privacy"]);

const supportEmail = "migotechnologiesltd01@gmail.com";
const topics = ["Rider support", "Driver support", "Payments", "Privacy request", "Something else"];

const form = reactive({
  name: "",
  email: "",
  topic: topics[0],
  message: "",
});
const sent = ref(false);

function submit() {
  const subject = `[MIGO ${form.topic}] Message from ${form.name.trim()}`;
  const body = [
    `Name: ${form.name.trim()}`,
    `Email: ${form.email.trim()}`,
    `Topic: ${form.topic}`,
    "",
    form.message.trim(),
  ].join("\n");

  window.location.href = `mailto:${supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  sent.value = true;
}
</script>

<template>
  <div class="contact-page">
    <header class="contact-header">
      <a class="contact-brand" href="/live" aria-label="MIGO Rides home" @click.prevent="emit('open-live')">
        <img class="contact-brand-mark" :src="migoMark" alt="" />
        <img class="contact-brand-wordmark" :src="isDark ? migoWordmarkDark : migoWordmark" alt="MIGO" />
      </a>
      <div class="contact-header-actions">
        <a class="contact-back-link" href="/live" @click.prevent="emit('open-live')">Back to MIGO</a>
        <button
          class="contact-theme-toggle"
          type="button"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="emit('toggle-theme')"
        >
          <Sun v-if="isDark" :size="18" stroke-width="2" aria-hidden="true" />
          <Moon v-else :size="18" stroke-width="2" aria-hidden="true" />
        </button>
      </div>
    </header>

    <main class="contact-main">
      <p class="contact-eyebrow">SUPPORT · MIGO TECHNOLOGIES LIMITED</p>
      <h1>Contact us</h1>
      <p class="contact-intro">Questions about a ride, your driver account or a privacy request? Send us a message and the MIGO team will get back to you.</p>

      <div class="contact-methods">
        <article class="contact-card">
          <span class="contact-card-icon" aria-hidden="true"><Mail :size="18" stroke-width="2" /></span>
          <h2>Email us</h2>
          <p>For general questions, ride support and account help.</p>
          <a :href="`mailto:${supportEmail}`">{{ supportEmail }}</a>
        </article>
        <article class="contact-card">
          <span class="contact-card-icon" aria-hidden="true"><MapPin :size="18" stroke-width="2" /></span>
          <h2>Where we operate</h2>
          <p>MIGO is built and operated from Calabar, Cross River State, Nigeria.</p>
          <p class="contact-card-note">Serving riders and drivers across the city.</p>
        </article>
        <article class="contact-card">
          <span class="contact-card-icon" aria-hidden="true"><Sun :size="18" stroke-width="2" /></span>
          <h2>Response time</h2>
          <p>We reply to most messages within 1–2 business days.</p>
          <p class="contact-card-note">Safety concerns are prioritised.</p>
        </article>
      </div>

      <section class="contact-form-section">
        <h2>Send a message</h2>
        <p class="contact-form-intro">Tell us what you need help with. Submitting opens your email app with the details already filled in, so you can review before sending.</p>

        <form class="contact-form" @submit.prevent="submit">
          <div class="contact-field-row">
            <label class="contact-field">
              <span>Your name</span>
              <input v-model="form.name" type="text" name="name" autocomplete="name" required placeholder="Full name" />
            </label>
            <label class="contact-field">
              <span>Email address</span>
              <input v-model="form.email" type="email" name="email" autocomplete="email" required placeholder="you@example.com" />
            </label>
          </div>

          <label class="contact-field">
            <span>What is this about?</span>
            <select v-model="form.topic" name="topic">
              <option v-for="topic in topics" :key="topic" :value="topic">{{ topic }}</option>
            </select>
          </label>

          <label class="contact-field">
            <span>Message</span>
            <textarea v-model="form.message" name="message" rows="5" required placeholder="How can we help?"></textarea>
          </label>

          <button class="contact-submit" type="submit">Send message</button>
          <p v-if="sent" class="contact-sent" role="status">
            We opened your email app with the message ready to send. If nothing happened, email us directly at
            <a :href="`mailto:${supportEmail}`">{{ supportEmail }}</a>.
          </p>
        </form>
      </section>

      <p class="contact-privacy">
        Looking for how we handle your data? Read our
        <a href="/privacy" @click.prevent="emit('open-privacy')">Privacy Policy</a>.
      </p>
    </main>

    <footer class="contact-footer">
      <span>© 2026 Migo Technologies Limited. All rights reserved.</span>
      <a href="/live" @click.prevent="emit('open-live')">Return to MIGO</a>
    </footer>
  </div>
</template>

<style scoped>
.contact-page {
  min-height: 100vh;
  color: #252620;
  background: #f7f7f2;
  font: 15px/1.7 "DM Sans", sans-serif;
}
.contact-header {
  min-height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 12px max(24px, calc((100% - 1080px) / 2));
  border-bottom: 1px solid #e3e4dc;
}
.contact-brand,
.contact-header-actions {
  display: inline-flex;
  align-items: center;
}
.contact-brand { gap: 8px; text-decoration: none; }
.contact-brand-mark { width: 31px; height: 31px; object-fit: contain; }
.contact-brand-wordmark { width: 56px; height: auto; }
.contact-header-actions { gap: 18px; }
.contact-back-link,
.contact-footer a { color: inherit; text-decoration: none; }
.contact-back-link { font-size: 13px; font-weight: 700; }
.contact-theme-toggle {
  width: 38px;
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  border: 1px solid #dfe0d8;
  border-radius: 50%;
  color: inherit;
  background: transparent;
  font: inherit;
  cursor: pointer;
}
.contact-main {
  width: min(880px, calc(100% - 48px));
  margin: 0 auto;
  padding: 64px 0 80px;
}
.contact-eyebrow {
  margin: 0 0 12px;
  color: #787a70;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: .12em;
}
.contact-main h1 {
  margin: 0;
  color: #20211d;
  font: 600 42px/1.15 "Space Grotesk", sans-serif;
  letter-spacing: -.03em;
}
.contact-intro {
  max-width: 560px;
  margin: 16px 0 0;
  color: #686a61;
  font-size: 14px;
}
.contact-methods {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin: 40px 0 0;
}
.contact-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  border: 1px solid #e6e7df;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 8px 20px -18px rgb(30 32 24 / 45%);
}
.contact-card-icon {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  margin-bottom: 12px;
  border-radius: 50%;
  background: #ffd400;
  color: #111;
}
.contact-card h2 {
  margin: 0 0 6px;
  color: #20211d;
  font: 600 17px/1.25 "Space Grotesk", sans-serif;
}
.contact-card p {
  margin: 0 0 8px;
  color: #686a61;
  font-size: 13px;
}
.contact-card a {
  margin-top: auto;
  color: #6a5a00;
  font-size: 13px;
  font-weight: 700;
  overflow-wrap: anywhere;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
}
.contact-card-note { color: #8a8c81; font-size: 12px; }
.contact-form-section {
  margin-top: 52px;
  padding: 26px;
  border: 1px solid #e6e7df;
  border-radius: 18px;
  background: #fff;
}
.contact-form-section h2 {
  margin: 0 0 6px;
  color: #20211d;
  font: 600 26px/1.2 "Space Grotesk", sans-serif;
  letter-spacing: -.01em;
}
.contact-form-intro {
  max-width: 560px;
  margin: 0 0 22px;
  color: #787a70;
  font-size: 13px;
}
.contact-form {
  display: grid;
  gap: 16px;
}
.contact-field-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}
.contact-field {
  display: grid;
  gap: 7px;
  font-size: 12px;
  font-weight: 700;
  color: #4c4e45;
}
.contact-field input,
.contact-field select,
.contact-field textarea {
  width: 100%;
  padding: 11px 13px;
  border: 1px solid #e0e1d9;
  border-radius: 10px;
  background: #fbfbf7;
  color: #20211d;
  font: inherit;
  font-size: 14px;
  font-weight: 400;
}
.contact-field textarea { resize: vertical; }
.contact-field input:focus,
.contact-field select:focus,
.contact-field textarea:focus {
  border-color: #b9bbae;
  background: #fff;
  outline: 2px solid rgb(255 212 0 / 45%);
  outline-offset: 1px;
}
.contact-submit {
  justify-self: start;
  min-height: 44px;
  padding-inline: 24px;
  border: 0;
  border-radius: 999px;
  background: #ffd400;
  color: #111;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
  transition: transform 160ms ease, background 160ms ease;
}
.contact-submit:hover {
  background: #ffe24a;
  transform: translateY(-1px);
}
.contact-sent {
  margin: 0;
  color: #4a5d2a;
  font-size: 13px;
}
.contact-sent a,
.contact-privacy a {
  color: #6a5a00;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
}
.contact-privacy {
  margin: 28px 0 0;
  color: #787a70;
  font-size: 13px;
}
.contact-footer {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 22px max(24px, calc((100% - 1080px) / 2));
  border-top: 1px solid #e3e4dc;
  color: #77796f;
  font-size: 11px;
}
:global(:root[data-theme="dark"] .contact-page) {
  color: #e9e9e0;
  background: #171914;
}
:global(:root[data-theme="dark"] .contact-header),
:global(:root[data-theme="dark"] .contact-footer) {
  border-color: #33352f;
}
:global(:root[data-theme="dark"] .contact-main h1),
:global(:root[data-theme="dark"] .contact-card h2),
:global(:root[data-theme="dark"] .contact-form-section h2) {
  color: #f2f1e9;
}
:global(:root[data-theme="dark"] .contact-eyebrow),
:global(:root[data-theme="dark"] .contact-intro),
:global(:root[data-theme="dark"] .contact-card p),
:global(:root[data-theme="dark"] .contact-form-intro),
:global(:root[data-theme="dark"] .contact-privacy),
:global(:root[data-theme="dark"] .contact-footer) {
  color: #afb0a5;
}
:global(:root[data-theme="dark"] .contact-card),
:global(:root[data-theme="dark"] .contact-form-section) {
  border-color: #33352f;
  background: #1f211b;
}
:global(:root[data-theme="dark"] .contact-field) {
  color: #d5d6cc;
}
:global(:root[data-theme="dark"] .contact-field input),
:global(:root[data-theme="dark"] .contact-field select),
:global(:root[data-theme="dark"] .contact-field textarea) {
  border-color: #3a3c34;
  background: #24261f;
  color: #f2f1e9;
}
:global(:root[data-theme="dark"] .contact-field input:focus),
:global(:root[data-theme="dark"] .contact-field select:focus),
:global(:root[data-theme="dark"] .contact-field textarea:focus) {
  background: #282a23;
}
:global(:root[data-theme="dark"] .contact-theme-toggle) {
  border-color: #45473f;
}
:global(:root[data-theme="dark"] .contact-card a),
:global(:root[data-theme="dark"] .contact-sent a),
:global(:root[data-theme="dark"] .contact-privacy a) {
  color: #ffe15a;
}
:global(:root[data-theme="dark"] .contact-sent) {
  color: #bfcfa4;
}
@media (max-width: 980px) {
  .contact-methods { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 780px) {
  .contact-methods { grid-template-columns: 1fr; }
}
@media (max-width: 700px) {
  /* 16px keeps iOS Safari from zooming the page when a field is focused. */
  .contact-field input,
  .contact-field select,
  .contact-field textarea {
    font-size: 16px;
  }
}
@media (max-width: 600px) {
  .contact-header { min-height: 66px; padding-inline: 18px; }
  .contact-header-actions { gap: 12px; }
  .contact-back-link { font-size: 12px; }
  .contact-main { width: calc(100% - 40px); padding: 44px 0 56px; }
  .contact-main h1 { font-size: 34px; }
  .contact-intro { font-size: 13px; }
  .contact-methods { margin-top: 30px; }
  .contact-form-section { margin-top: 38px; padding: 20px; }
  .contact-form-section h2 { font-size: 22px; }
  .contact-field-row { grid-template-columns: 1fr; }
  .contact-footer { flex-direction: column; padding: 18px 20px; }
}
</style>
