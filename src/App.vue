<script setup>
import { onMounted, ref } from "vue";
import migoMark from "./assets/migo-mark.png";
import migoWordmark from "./assets/migo-wordmark.png";
import migoWordmarkDark from "./assets/migo-wordmark-dark.png";
import locationPin from "./assets/Location pin.png";
import LivePage from "./components/LivePage.vue";

const defaultPage = "waitlist";
const rideType = ref("Rider");
const submitted = ref(false);
const isDark = ref(false);
const showSplash = ref(true);
const currentPage = ref(resolvePage(window.location.pathname));

function resolvePage(pathname) {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/live") return "live";
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
    : 4800;
  window.setTimeout(() => {
    showSplash.value = false;
  }, splashDuration);
});

function toggleTheme() {
  isDark.value = !isDark.value;
  applyTheme();
  window.localStorage.setItem("migo-theme", isDark.value ? "dark" : "light");
}

function joinWaitlist() {
  submitted.value = true;
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
      <div class="splash-brand">
        <!-- <span class="splash-logo-lockup" aria-label="Migo"> -->
          <img class="splash-logo-mark" :src="migoMark" alt="" />
          <img class="splash-logo-wordmark" :src="isDark ? migoWordmarkDark : migoWordmark" alt="" />
        <!-- </span> -->
        <h1>Get moving with confidence.</h1>
        <div class="splash-dots" aria-hidden="true"><i></i><i></i><i></i></div>
        <p>YOUR CITY. YOUR MOVE.</p>
      </div>
      <div class="splash-city" aria-hidden="true">
        <span></span><span></span><span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span><span></span><span></span>
      </div>
      <div class="splash-road" aria-hidden="true">
        <div class="splash-car">
          <img class="splash-pin" :src="locationPin" alt="" />
          <span class="splash-car-cabin"></span>
          <span class="splash-car-body"></span>
          <i class="splash-wheel splash-wheel-front"></i>
          <i class="splash-wheel splash-wheel-back"></i>
        </div>
      </div>
    </div>
  </Transition>

  <LivePage
    v-if="currentPage === 'live'"
    :is-dark="isDark"
    @toggle-theme="toggleTheme"
    @open-waitlist="navigateTo('/waitlist')"
  />

  <template v-else>
    <header class="site-header">
      <a class="brand" href="#home" aria-label="Migo Rides home">
        <img class="brand-logo" :src="isDark ? migoWordmarkDark : migoWordmark" alt="" />
      </a>
      <a class="waitlist-nav-link" href="/live" @click.prevent="navigateTo('/live')">
        Preview live page <span aria-hidden="true">↗</span>
      </a>
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
                name="name"
                autocomplete="name"
                placeholder="What should we call you?"
                required
              />
              <label class="field-label" for="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                placeholder="you@example.com"
                required
              />
              <label class="field-label" for="phone">Phone number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autocomplete="tel"
                placeholder="+254 700 000 000"
                required
              />
              <label class="field-label" for="city">Your city</label>
              <input
                id="city"
                name="city"
                autocomplete="address-level2"
                placeholder="Where do you ride?"
                required
              />
              <button class="submit-button" type="submit">
                Join the waitlist <span aria-hidden="true">→</span>
              </button>
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
            <a href="#how-it-works"
              >Get to know Migo <span aria-hidden="true">→</span></a
            >
          </div>
        </div>
      </aside>
    </section>

    

    
    
    
    </main>

    <footer class="site-footer section-wrap">
      <a class="brand" href="#home" aria-label="Migo Rides home">
        <img class="brand-logo" :src="isDark ? migoWordmarkDark : migoWordmark" alt="" />
      </a>
      <p>Good rides. Good people. Coming soon.</p>
      <span class="copyright">© 2026 Migo</span>
    </footer>
  </template>
</template>
