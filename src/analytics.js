import posthog from "posthog-js";

// Session replay and autocapture only start after the visitor allows analytics
// in <ConsentBanner>. Nothing is loaded or sent before that decision.
const CONSENT_KEY = "migo-analytics-consent";
const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY;
const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST || "https://us.i.posthog.com";

let initialized = false;

/** "granted", "denied", or null when the visitor has not decided yet. */
export function getAnalyticsConsent() {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(CONSENT_KEY);
    return stored === "granted" || stored === "denied" ? stored : null;
  } catch {
    return null;
  }
}

function storeConsent(value) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Blocked storage (private mode) simply means analytics stays off.
  }
}

export function initAnalytics() {
  if (initialized || !POSTHOG_KEY || typeof window === "undefined") return;
  if (getAnalyticsConsent() !== "granted") return;

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    defaults: "2025-05-24",
    person_profiles: "identified_only",
    capture_pageview: "history_change",
    capture_pageleave: true,
    autocapture: true,
    // Session replay masks every input value by default. Text can be masked with the
    // `ph-mask` class and a region kept out of recordings with `ph-no-capture`.
    session_recording: {
      maskAllInputs: true,
      maskTextSelector: ".ph-mask",
      blockSelector: ".ph-no-capture",
    },
    mask_all_element_attributes: true,
    mask_all_text: false,
  });
  initialized = true;
}

export function setAnalyticsConsent(granted) {
  storeConsent(granted ? "granted" : "denied");
  if (granted) {
    initAnalytics();
    return;
  }
  if (initialized) {
    posthog.stopSessionRecording();
    posthog.opt_out_capturing();
  }
}

/** Capture a journey event. Values passed here must never contain personal data. */
export function track(event, properties) {
  if (!initialized || getAnalyticsConsent() !== "granted") return;
  posthog.capture(event, properties);
}
