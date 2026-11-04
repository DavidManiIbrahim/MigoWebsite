<script setup>
import { nextTick, onMounted, onUnmounted } from "vue";
import migoMark from "../assets/migo-mark.webp";
import migoWordmark from "../assets/migo-wordmark.png";
import phone from "/migophone-nobg.png";
import migoWordmarkDark from "../assets/migo-wordmark-white.png";
import googlePlayLogo from "../assets/Google Play Logo.png";
import safetyIllustration from "../assets/Illustration · Safety shield.png";
import footerCar from "../assets/migo-car-nobg.png";
import { BadgeCheck, Check, Moon, PhoneCall, ReceiptText, Share2, ShieldCheck, Sun, UserRoundCheck } from "@lucide/vue";

defineProps({
  isDark: Boolean,
});

const emit = defineEmits(["toggle-theme", "open-waitlist", "open-privacy", "open-contact"]);

let scrollContext;
let stopArrowNav;
let footerAccordionQuery;

function syncFooterAccordions(query) {
  document.querySelectorAll(".migo-live .footer-links details").forEach((item) => {
    item.open = !query.matches;
  });
}

function initArrowNav(root) {
  let lockedUntil = 0;

  function onKeydown(event) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.key !== "ArrowDown" && event.key !== "ArrowRight"
      && event.key !== "ArrowUp" && event.key !== "ArrowLeft") return;

    const target = event.target;
    const tag = target instanceof HTMLElement ? target.tagName : "";
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(tag)) return;
    if (target instanceof HTMLElement && target.isContentEditable) return;

    const sections = [
      ...root.querySelectorAll("main > section"),
      root.querySelector(".migo-site-footer"),
    ].filter(Boolean);
    if (!sections.length) return;

    event.preventDefault();

    const now = performance.now();
    if (now < lockedUntil) return;

    const base = root.getBoundingClientRect().top;
    let index = 0;
    sections.forEach((section, i) => {
      if (section.getBoundingClientRect().top - base <= 2) index = i;
    });

    const forward = event.key === "ArrowDown" || event.key === "ArrowRight";
    const nextIndex = Math.min(Math.max(index + (forward ? 1 : -1), 0), sections.length - 1);

    lockedUntil = now + 700;
    sections[nextIndex].scrollIntoView({ behavior: "smooth", block: "start" });
  }

  window.addEventListener("keydown", onKeydown);
  return () => window.removeEventListener("keydown", onKeydown);
}

onMounted(async () => {
  await nextTick();
  const root = document.querySelector(".migo-live");
  if (!root) return;

  footerAccordionQuery = window.matchMedia("(max-width: 600px)");
  syncFooterAccordions(footerAccordionQuery);
  footerAccordionQuery.addEventListener("change", syncFooterAccordions);

  stopArrowNav = initArrowNav(root);

  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    document.visibilityState !== "visible"
  ) {
    return;
  }

  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
  ]);
  gsap.registerPlugin(ScrollTrigger);

  scrollContext = gsap.context(() => {
    root.querySelectorAll(
      ".migo-why-inner, .migo-process-inner, .migo-faq-inner, .migo-safety-inner, .migo-app-cta-inner, .migo-driver-panel",
    ).forEach((section) => {
      gsap.fromTo(
        section,
        { autoAlpha: 0, y: 28 },
        {
          immediateRender: false,
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: {
            scroller: root,
            trigger: section,
            start: "top 84%",
            once: true,
          },
        },
      );
    });

    const track = root.querySelector(".migo-footer-car-track");
    const car = root.querySelector(".migo-footer-car");
    if (track && car) {
      gsap.fromTo(
        car,
        { x: () => -car.offsetWidth - 32 },
        {
          x: () => track.clientWidth - car.offsetWidth,
          duration: 2.6,
          ease: "power2.inOut",
          invalidateOnRefresh: true,
          scrollTrigger: {
            scroller: root,
            trigger: ".migo-site-footer",
            start: "top 70%",
            once: true,
          },
        },
      );
    }
  }, root);

  ScrollTrigger.refresh();
});

onUnmounted(() => {
  scrollContext?.revert();
  stopArrowNav?.();
  footerAccordionQuery?.removeEventListener("change", syncFooterAccordions);
});
</script>

<template>
  <div class="migo-live">
    <header class="migo-live-header">
      <a class="brand" href="/" aria-label="Migo Rides home" @click.prevent="emit('open-waitlist')">
        <span class="migo-logo-lockup" aria-hidden="true">
          <img class="migo-logo-mark" :src="migoMark" alt="" />
          <img class="migo-logo-wordmark" :src="isDark ? migoWordmarkDark : migoWordmark" alt="" />
          <!-- <img class="migo-logo-wordmark" :src="islight ? migoWordmarkDark : migoWordmark" alt="" /> -->
        </span>
      </a>
      <nav class="migo-live-nav" aria-label="Main navigation">
        <a href="#why-migo">Why</a>
        <a href="#drivers">Drive</a>
        <a href="#safety">Safety</a>
        <a href="#help">Help</a>
      </nav>
      <div class="migo-live-actions">
        <button
          class="theme-toggle"
          type="button"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="emit('toggle-theme')"
        >
          <Sun v-if="isDark" :size="18" stroke-width="2" aria-hidden="true" />
          <Moon v-else :size="18" stroke-width="2" aria-hidden="true" />
          <!-- <span class="theme-toggle-label">{{ isDark ? "" : "" }}</span> -->
        </button>
        <a class="migo-download-button" href="#download">Download app</a>
      </div>
    </header>

    <main>
      <section id="ride" class="migo-home-hero">
        <div class="migo-home-hero-inner">
          <div class="migo-home-copy">
            <h1>
              Get moving<br />with
              <img
                class="migo-hero-wordmark"
                :src="isDark ? migoWordmarkDark : migoWordmark"
                alt="MIGO"
              />
            </h1>
            <p>Request a ride in a few taps, see your driver and fare upfront, and track every trip.</p>
            <div class="play-card">
              <strong>Get the app</strong>
              <div class="store-badges">
                <a class="play-badge app-store-badge-link" href="#download" aria-label="Download the MIGO app on the App Store">
                  <img class="app-store-badge" src="/app-store-badge.svg" alt="Download on the App Store" />
                </a>
                <a class="play-badge" href="#download" aria-label="Get the MIGO app on Google Play"><img class="play-store-logo" :src="googlePlayLogo" alt="" /><span><small>GET IT ON</small><b>Google Play</b></span></a>
              </div>
              <small class="play-caption">Free on Android and iOS</small>
            </div>
          </div>

          <div class="migo-home-visual" aria-hidden="true">
            <img :src="phone" alt="" />
          </div>
        </div>
      </section>

      <section id="why-migo" class="migo-why">
        <div class="migo-why-inner section-wrap">
          <h2>Why <img class="migo-heading-wordmark" :src="isDark ? migoWordmarkDark : migoWordmark" alt="MIGO" /></h2>
          <p class="migo-why-intro">Clear pricing, driver details, and live tracking make every ride easier to request, follow, and finish.</p>
          <div class="migo-benefit-grid">
            <article class="benefit-card benefit-card-yellow">
              <h3>Know your fare</h3>
              <p>Get a fare estimate before you request, then track your ride live from pickup to drop-off.</p>
              <a href="#download" aria-label="Learn about fares"><ReceiptText :size="17" stroke-width="2" aria-hidden="true" /></a>
            </article>
            <article class="benefit-card benefit-card-black">
              <h3>Meet your driver</h3>
              <p>See your driver’s name, vehicle details and arrival time before they pull up.</p>
              <a href="#drivers" aria-label="Learn about MIGO drivers"><UserRoundCheck :size="17" stroke-width="2" aria-hidden="true" /></a>
            </article>
            <article class="benefit-card benefit-card-gray">
              <h3>Ride with confidence</h3>
              <p>Approved drivers, emergency contacts and safety support built into every trip.</p>
              <a href="#safety" aria-label="Learn about ride safety"><ShieldCheck :size="17" stroke-width="2" aria-hidden="true" /></a>
            </article>
          </div>
        </div>
      </section>

      <section id="how-it-works" class="migo-process">
        <div class="migo-process-inner section-wrap">
          <div class="migo-section-intro">
            <div>
              <h2>How it works</h2>
              <p>Request a ride, confirm your fare and driver, then pay your driver directly after the trip.</p>
            </div>
          </div>
          <div class="migo-step-grid">
            <article>
              <span>1</span>
              <h3>Set your destination</h3>
              <p>Search where you want to go and confirm your pickup location before you request.</p>
            </article>
            <article>
              <span>2</span>
              <h3>See your fare and driver</h3>
              <p>Get a fare estimate upfront, then inspect your driver’s name, rating, vehicle and plate before pickup.</p>
            </article>
            <article>
              <span>3</span>
              <h3>Ride and pay your driver</h3>
              <p>Follow your trip live, then pay your driver directly by transfer or cash after the ride.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="faq" class="migo-faq">
        <div class="migo-faq-inner section-wrap">
          <h2>Frequently asked questions</h2>
          <p class="migo-faq-intro">Common questions about requesting a ride, payment and getting help.</p>
          <div class="migo-faq-grid">
            <article>
              <details>
                <summary><h3>How do I request a ride?</h3></summary>
                <p>Open the app, search your destination, confirm your pickup location, and request a ride. You’ll see a fare estimate before you confirm.</p>
              </details>
            </article>
            <article>
              <details>
                <summary><h3>How do I pay for my ride?</h3></summary>
                <p>Pay your driver directly after your ride — by bank transfer or in cash. Your fare is shown before you confirm, so there are no surprises.</p>
              </details>
            </article>
            <article>
              <details>
                <summary><h3>Where can I see my fare estimate?</h3></summary>
                <p>You can see a fare estimate before you request a ride, and the final trip details are available after the ride is complete.</p>
              </details>
            </article>
            <article>
              <details>
                <summary><h3>How do I get trip help?</h3></summary>
                <p>You can get trip help from inside the app after the ride is complete, or visit the help center for more support.</p>
              </details>
            </article>
          </div>
        </div>
      </section>

      <section id="safety" class="migo-safety">
        <div class="migo-safety-inner section-wrap">
          <div class="migo-section-intro">
            <div>
              <h2>User safety</h2>
              <p>Use the app to verify your ride, share details with someone you trust, and get help when you need it.</p>
            </div>
            <img :src="safetyIllustration" alt="Shield with a checkmark" />
          </div>
          <div class="migo-safety-grid">
            <article>
              <span aria-hidden="true"><BadgeCheck :size="18" stroke-width="2" /></span>
              <h3>Check the plate and driver</h3>
              <p>Before you get in, confirm the driver’s name, vehicle details and plate match what the app shows.</p>
            </article>
            <article>
              <span aria-hidden="true"><Share2 :size="18" stroke-width="2" /></span>
              <h3>Share your trip</h3>
              <p>Share trip details with a friend or family member so they can see where you are and where you’re headed.</p>
            </article>
            <article>
              <span aria-hidden="true"><PhoneCall :size="18" stroke-width="2" /></span>
              <h3>Add an emergency contact</h3>
              <p>Save an emergency contact in the app so you can quickly get help if you need it during or after a trip.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="download" class="migo-app-cta">
        <div class="migo-app-cta-inner section-wrap">
          <div>
            <h2>Ready to go?<br /><span>Get the <img class="migo-heading-wordmark migo-heading-wordmark-tight" :src="migoWordmark" alt="MIGO" /> app.</span></h2>
            <p>Available now on the Google Play Store.</p>
            <div class="store-badges">

              <a class="play-badge app-store-badge-link" href="#download" aria-label="Download the MIGO app on the App Store">
                <img class="app-store-badge" src="/app-store-badge.svg" alt="Download on the App Store" />
              </a>
              <a class="play-badge play-badge-outline" href="#download" aria-label="Get the MIGO app on Google Play">
                <img class="play-store-logo" :src="googlePlayLogo" alt="" /><span><small>GET IT ON</small><b>Google Play</b></span>
              </a>
            </div>
          </div>
          <div class="migo-app-media" aria-hidden="true">
            <img src="/migoapps-nobg.png" alt="" />
          </div>
        </div>
      </section>

      <section id="drivers" class="migo-driver-panel section-wrap">
        <div class="driver-intro">
          <span class="driver-tag">FOR DRIVERS</span>
          <h2>Drive with <img class="migo-heading-wordmark" :src="isDark ? migoWordmarkDark : migoWordmark" alt="MIGO" /></h2>
          <p>Sign up, get approved, and start with a 7-day free trial. Passengers pay you directly for every ride.</p>
        </div>
        <div class="driver-benefits">
          <p><Check :size="18" stroke-width="2" aria-hidden="true" />7-day free trial for approved drivers</p>
          <p><Check :size="18" stroke-width="2" aria-hidden="true" />Passengers pay you directly</p>
          <p><Check :size="18" stroke-width="2" aria-hidden="true" />Simple subscription, renewed in the app</p>
          <p><Check :size="18" stroke-width="2" aria-hidden="true" />Get requests from riders nearby</p>
        </div>
      </section>

    </main>

    <footer id="help" class="migo-site-footer">
      <div class="migo-site-footer-inner section-wrap">
        <div class="footer-brand-block">
          <a class="brand" href="/" aria-label="Migo Rides home" @click.prevent="emit('open-waitlist')">
            <span class="migo-logo-lockup" aria-hidden="true">
              <img class="migo-logo-mark" :src="migoMark" alt="" />
              <img class="migo-logo-wordmark" :src="isDark ? migoWordmarkDark : migoWordmark" alt="" />
            </span>
          </a>
          <p>MIGO is an on-demand ride-hailing app built for everyday city trips — upfront fares, verified drivers and live trip tracking, all in one place.</p>
          <p class="footer-address">Calabar, Cross River State, Nigeria</p>
        </div>
        <div class="footer-links">
          <details class="footer-accordion">
            <summary><strong>Company</strong></summary>
            <div class="footer-accordion-panel">
              <a href="#help">About us</a>
              <a href="#drivers">Careers</a>
              <a href="#help">Blog</a>
            </div>
          </details>
          <details class="footer-accordion">
            <summary><strong>Product</strong></summary>
            <div class="footer-accordion-panel">
              <a href="#ride">Ride</a>
              <a href="#drivers">Drive</a>
              <a href="#safety">Safety</a>
            </div>
          </details>
          <details class="footer-accordion">
            <summary><strong>Support</strong></summary>
            <div class="footer-accordion-panel">
              <a href="#help">Help center</a>
              <a href="/contact" @click.prevent="emit('open-contact')">Contact us</a>
              <a href="#help">Terms</a>
            </div>
          </details>
          <details class="footer-accordion">
            <summary><strong>Get in touch</strong></summary>
            <div class="footer-accordion-panel">
              <a href="mailto:migotechnologiesltd01@gmail.com">Email us</a>
              <a href="/contact" @click.prevent="emit('open-contact')">Contact page</a>
            </div>
          </details>
        </div>
        <div class="migo-footer-car-track" aria-hidden="true">
          <img class="migo-footer-car" :src="footerCar" alt="" />
        </div>
        <div class="footer-legal">
          <span>© 2026 Migo Technologies Limited. All rights reserved.</span>
          <span><a href="/privacy" @click.prevent="emit('open-privacy')">Privacy policy</a> · <a href="#help">Terms</a></span>
        </div>
      </div>
    </footer>
  </div>
</template>