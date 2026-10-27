<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useHead, useSeoMeta } from "@unhead/vue";
import { ConvexClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";
import migoMark from "./assets/migo-mark.webp";
import migoWordmark from "./assets/migo-wordmark.png";
import migoWordmarkDark from "./assets/migo-wordmark-dark.png";
import LivePage from "./components/LivePage.vue";
import AdminPage from "./components/AdminPage.vue";

const defaultPage = "waitlist";
const rideType = ref("Rider");
const submitted = ref(false);
const isDark = ref(false);
const showSplash = ref(true);
const currentPage = ref(resolvePage(window.location.pathname));

const defaultSiteUrl = "https://migotech.org";
const siteUrl = (import.meta.env.VITE_SITE_URL || (typeof window !== "undefined" && window.location.origin && !window.location.origin.includes("localhost") ? window.location.origin : defaultSiteUrl)).replace(/\/$/, "");
const pageUrl = computed(() => `${siteUrl}${currentPage.value === "live" ? "/live" : currentPage.value === "admin" ? "/admin" : "/"}`);
const pageTitle = computed(() => currentPage.value === "live"
  ? "MIGO Rides | On-Demand Rideshare, Upfront Pricing & Verified Drivers"
  : currentPage.value === "admin"
    ? "MIGO Admin | Beta Signups"
    : "MIGO Rides | Smart On-Demand Rideshare - Join the Launch Waitlist");
const pageDescription = computed(() => currentPage.value === "live"
  ? "Get moving with MIGO. Request rides with upfront fare transparency, vetted drivers, and live GPS tracking. Drivers keep 100% of earnings on a simple subscription."
  : currentPage.value === "admin"
    ? "Private MIGO beta signup administration."
    : "MIGO is almost here. Join the waitlist for early access to upfront fare estimates, verified drivers, live trip tracking, and direct driver earnings.");

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  keywords: "MIGO rides, MIGO, rideshare app, upfront fare taxi, safe cab, driver subscription app, Kenya rideshare, book ride online",
  robots: computed(() => currentPage.value === "admin" ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"),
  googlebot: computed(() => currentPage.value === "admin" ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"),
  ogType: "website",
  ogSiteName: "MIGO Rides",
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogUrl: pageUrl,
  ogImage: `${siteUrl}/migoapps.jpg`,
  ogImageAlt: "MIGO Rides app",
  twitterCard: "summary_large_image",
  twitterTitle: pageTitle,
  twitterDescription: pageDescription,
  twitterImage: `${siteUrl}/migoapps.jpg`,
});

useHead({
  link: [{ rel: "canonical", href: pageUrl }],
});

// Waitlist form -> Convex. `npx convex dev` writes VITE_CONVEX_URL to .env.local.
const form = reactive({ name: "", email: "", phone: "", city: "" });
const submitting = ref(false);
const formError = ref("");
const convexUrl = import.meta.env.VITE_CONVEX_URL;
const convex = convexUrl ? new ConvexClient(convexUrl) : null;

function resolvePage(pathname) {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/live") return "live";
  if (path === "/admin") return "admin";
  if (path === "/waitlist") return "waitlist";
  return defaultPage;
}

function syncPage() {
  currentPage.value = resolvePage(window.location.pathname);
}

function navigateTo(path) {
  window.history.pushState({}, "", path);
  syncPage();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function applyTheme() {
  document.documentElement.dataset.theme = isDark.value ? "dark" : "light";
}

onMounted(() => {
  const savedTheme = window.localStorage.getItem("migo-theme");
  isDark.value = savedTheme
    ? savedTheme === "dark"
    : window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme();
  window.addEventListener("popstate", syncPage);
  const splashDuration = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? 1500
    : 3200;
  window.setTimeout(() => {
    showSplash.value = false;
  }, splashDuration);
});

function toggleTheme() {
  isDark.value = !isDark.value;
  applyTheme();
  window.localStorage.setItem("migo-theme", isDark.value ? "dark" : "light");
}

async function joinWaitlist() {
  formError.value = "";

  if (!convex) {
    console.warn(
      "[migo] VITE_CONVEX_URL is not set — run `npx convex dev` to connect the waitlist.",
    );
    formError.value = "The waitlist isn't connected yet. Please try again shortly.";
    return;
  }

  submitting.value = true;
  try {
    const result = await convex.mutation(api.waitlist.join, {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      city: form.city.trim(),
      role: rideType.value,
    });
    if (!result.ok) {
      formError.value = result.error;
      return;
    }
    submitted.value = true;
  } catch (error) {
    console.error(error);
    formError.value = "Something went wrong. Please try again.";
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <Transition name="splash-fade">
    <div
      v-if="showSplash"
      class="splash-screen"
      role="status"
      aria-label="Migo is getting ready"
    >
      <span class="splash-pulse" aria-hidden="true"></span>

      <div class="splash-brand">
        <span class="splash-logo-lockup" aria-hidden="true">
          <img class="splash-logo-mark" :src="migoMark" alt="" />
          <img class="splash-logo-wordmark" :src="isDark ? migoWordmarkDark : migoWordmark" alt="" />
        </span>
        <h1>Get moving with confidence.</h1>
        <div class="splash-dots" aria-hidden="true"><i></i><i></i><i></i></div>
      </div>

      <p class="splash-cityline">YOUR CITY. YOUR MOVE.</p>
    </div>
  </Transition>

  <AdminPage
    v-if="currentPage === 'admin'"
    :convex="convex"
  />

  <LivePage
    v-else-if="currentPage === 'live'"
    :is-dark="isDark"
    @toggle-theme="toggleTheme"
    @open-waitlist="navigateTo('/waitlist')"
  />

  <template v-else>
    <header class="site-header">
      <a class="brand" href="#home" aria-label="Migo Rides home">
          <img class="migo-logo-mark" :src="migoMark" alt="" />
        <img class="migo-logo-wordmark" :src="isDark ? migoWordmarkDark : migoWordmark" alt="" />
      </a>
      <!-- <a class="waitlist-nav-link" href="/live" @click.prevent="navigateTo('/live')">
        Preview live page <span aria-hidden="true">↗</span>
      </a> -->
      <button
        class="theme-toggle"
        type="button"
        :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        @click="toggleTheme"
      >
        <span aria-hidden="true">{{ isDark ? "☀" : "☾" }}</span>
        <span>{{ isDark ? "Light mode" : "Dark mode" }}</span>
      </button>
    </header>

    <main>
    <section id="home" class="hero section-wrap">
      <div class="hero-copy">
        <span class="eyebrow"
          ><span class="live-dot"></span> THE NEXT RIDE IS CLOSER</span
        >
        <h1>Be first<br />in <span>line.</span></h1>
        <p class="hero-intro">
          MIGO is almost here. Join the waitlist and we will let you know the moment it launches.
        </p>
        <ul class="benefit-list">
          <li>
            <span class="check">✓</span> First rides before the public launch
          </li>
          <li>
            <span class="check">✓</span> A little something for early joiners
          </li>
          <li><span class="check">✓</span> Updates that actually matter</li>
        </ul>
       
      </div>

      <aside id="waitlist" class="waitlist-shell">
        <div class="waitlist-card">
          <template v-if="!submitted">
            <span class="form-kicker">MIGO IS ALMOST HERE</span>
            <h2 class="waitlist-heading">Join the waitlist</h2>
            <p class="form-intro">
              Be among the first to ride. It only takes a minute.
            </p>
            <form class="waitlist-form" @submit.prevent="joinWaitlist">
              <fieldset class="ride-toggle">
                <legend>I’m joining as a</legend>
                <label :class="{ selected: rideType === 'Rider' }"
                  ><input
                    v-model="rideType"
                    type="radio"
                    name="ride-type"
                    value="Rider"
                  />Rider</label
                >
                <label :class="{ selected: rideType === 'Driver' }"
                  ><input
                    v-model="rideType"
                    type="radio"
                    name="ride-type"
                    value="Driver"
                  />Driver</label
                >
              </fieldset>
              <label class="field-label" for="full-name">Full name</label>
              <input
                id="full-name"
                v-model="form.name"
                name="name"
                autocomplete="name"
                placeholder="What should we call you?"
                required
              />
              <label class="field-label" for="email">Email address</label>
              <input
                id="email"
                v-model="form.email"
                name="email"
                type="email"
                autocomplete="email"
                placeholder="you@example.com"
                required
              />
              <label class="field-label" for="phone">Phone number</label>
              <input
                id="phone"
                v-model="form.phone"
                name="phone"
                type="tel"
                autocomplete="tel"
                placeholder="+254 700 000 000"
                required
              />
              <label class="field-label" for="city">Your city</label>
              <input
                id="city"
                v-model="form.city"
                name="city"
                autocomplete="address-level2"
                placeholder="Where do you ride?"
                required
              />
              <button class="submit-button" type="submit" :disabled="submitting">
                {{ submitting ? "Joining…" : "Join the waitlist" }}
                <span v-if="!submitting" aria-hidden="true">→</span>
              </button>
              <p v-if="formError" class="form-error" role="alert">{{ formError }}</p>
              <p class="privacy-note">
                No spam. Just a heads-up when Migo is ready.
              </p>
            </form>
          </template>
          <div v-else class="success-state" role="status" aria-live="polite">
            <span class="success-mark" aria-hidden="true">✓</span>
            <span class="form-kicker">YOU’RE ON THE LIST</span>
            <h2>Good things are moving.</h2>
            <p>
              Thanks for joining as a {{ rideType.toLowerCase() }}. We’ll be in
              touch when Migo is getting close to your city.
            </p>
            
          </div>
        </div>
      </aside>
    </section>

    

    
    
    
    </main>

    <footer class="site-footer section-wrap">
      <a class="brand" href="#home" aria-label="Migo Rides home">
          <img class="migo-logo-mark" :src="migoMark" alt="" />
        <img class="migo-logo-wordmark" :src="isDark ? migoWordmarkDark : migoWordmark" alt="" />
      </a>
      <p>Good rides. Good people. Coming soon.</p>
      <span class="copyright">© 2026 Migo Technologies Limited</span>
    </footer>
  </template>
</template>
