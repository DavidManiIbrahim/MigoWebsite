<script setup>
import migoMark from "../assets/migo-mark.png";
import migoWordmark from "../assets/migo-wordmark.png";
import migoWordmarkDark from "../assets/migo-wordmark-dark.png";
import googlePlayLogo from "../assets/Google Play Logo.png";
import locationPin from "../assets/Location pin.png";
import migoVan from "../assets/migo-van.svg";
import routeIllustration from "../assets/Illustration · Phone route.png";
import safetyIllustration from "../assets/Illustration · Safety shield.png";
import { Check, ReceiptText, UserRoundCheck, ShieldCheck } from "@lucide/vue";

defineProps({
  isDark: Boolean,
});

const emit = defineEmits(["toggle-theme", "open-waitlist"]);
</script>

<template>
  <div class="migo-live">
    <header class="migo-live-header">
      <a class="brand" href="/" aria-label="Migo Rides home" @click.prevent="emit('open-waitlist')">
        <span class="migo-logo-lockup" aria-hidden="true">
          <img class="migo-logo-mark" :src="migoMark" alt="" />
          <img class="migo-logo-wordmark" :src="isDark ? migoWordmarkDark : migoWordmark" alt="" />
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
          <span aria-hidden="true">{{ isDark ? "☀" : "☾" }}</span>
          <!-- <span class="theme-toggle-label">{{ isDark ? "" : "" }}</span> -->
        </button>
        <a class="migo-download-button" href="#download">Download app</a>
      </div>
    </header>

    <main>
      <section id="ride" class="migo-home-hero">
        <div class="migo-home-hero-inner">
          <div class="migo-home-copy">
            <h1>Get moving<br />with MIGO</h1>
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

          <figure class="migo-ride-image migo-hero-scene" role="img" aria-label="A MIGO car moving along a city street">
            <div class="migo-app-visual migo-hero-visual" aria-hidden="true">
              <div class="migo-app-city">
                <span></span><span></span><span></span><span></span><span></span><span></span>
                <span></span><span></span><span></span><span></span><span></span><span></span>
              </div>
              <img class="migo-app-pin" :src="locationPin" alt="" />
              <div class="migo-app-road">
                <img class="migo-app-car" :src="migoVan" alt="" />
              </div>
            </div>
          </figure>
        </div>
      </section>

      <section id="why-migo" class="migo-why">
        <div class="migo-why-inner section-wrap">
          <h2>Why MIGO</h2>
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
              <p>Request a ride, confirm your fare and driver, then pay securely in the app after the trip.</p>
            </div>
            <img :src="routeIllustration" alt="A route traced between two places on a phone" />
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
              <h3>Ride and pay in the app</h3>
              <p>Follow your trip live, then pay in the app after the ride. Drivers never take cash.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="faq" class="migo-faq">
        <div class="migo-faq-inner section-wrap">
          <h2>FAQ</h2>
          <p class="migo-faq-intro">Common questions about requesting a ride, payment and getting help.</p>
          <div class="migo-faq-grid">
            <article>
              <h3>How do I request a ride?</h3>
              <p>Open the app, search your destination, confirm your pickup location, and request a ride. You’ll see a fare estimate before you confirm.</p>
            </article>
            <article>
              <h3>How do I pay for my ride?</h3>
              <p>Pay in the app after your ride using our secure payment gateway. Drivers cannot accept cash, so show your receipt if asked.</p>
            </article>
            <article>
              <h3>Where can I see my fare estimate?</h3>
              <p>You can see a fare estimate before you request a ride, and the final trip details are available after the ride is complete.</p>
            </article>
            <article>
              <h3>How do I get trip help?</h3>
              <p>You can get trip help from inside the app after the ride is complete, or visit the help center for more support.</p>
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
              <span aria-hidden="true">✓</span>
              <h3>Check the plate and driver</h3>
              <p>Before you get in, confirm the driver’s name, vehicle details and plate match what the app shows.</p>
            </article>
            <article>
              <span aria-hidden="true">✓</span>
              <h3>Share your trip</h3>
              <p>Share trip details with a friend or family member so they can see where you are and where you’re headed.</p>
            </article>
            <article>
              <span aria-hidden="true">✓</span>
              <h3>Add an emergency contact</h3>
              <p>Save an emergency contact in the app so you can quickly get help if you need it during or after a trip.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="download" class="migo-app-cta">
        <div class="migo-app-cta-inner section-wrap">
          <div>
            <h2>Ready to go?<br /><span>Get the MIGO app.</span></h2>
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
          <div class="migo-app-visual" aria-hidden="true">
            <div class="migo-app-city">
              <span></span><span></span><span></span><span></span><span></span><span></span>
              <span></span><span></span><span></span><span></span><span></span><span></span>
            </div>
            <img class="migo-app-pin" :src="locationPin" alt="" />
            <div class="migo-app-road">
              <img class="migo-app-car" :src="migoVan" alt="" />
            </div>
          </div>
        </div>
      </section>

      <section id="drivers" class="migo-driver-panel section-wrap">
        <div class="driver-intro">
          <span class="driver-tag">FOR DRIVERS</span>
          <h2>Drive with MIGO</h2>
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
          <p>Get moving with MIGO.</p>
        </div>
        <div class="footer-links">
          <div><strong>Company</strong><a href="#help">About us</a><a href="#drivers">Careers</a><a href="#help">Blog</a></div>
          <div><strong>Product</strong><a href="#ride">Ride</a><a href="#drivers">Drive</a><a href="#safety">Safety</a></div>
          <div><strong>Support</strong><a href="mailto:hello@migoweb.com">Help center</a><a href="mailto:hello@migoweb.com">Contact us</a><a href="#help">Terms</a></div>
        </div>
        <div class="footer-legal"><span>© 2026 Migo Technologies Limited. All rights reserved.</span><span>Privacy · Terms</span></div>
      </div>
    </footer>
  </div>
</template>