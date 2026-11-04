<script setup>
import migoMark from "../assets/migo-mark.webp";
import migoWordmark from "../assets/migo-wordmark.png";
import migoWordmarkDark from "../assets/migo-wordmark-white.png";
import { Moon, Sun } from "@lucide/vue";

defineProps({ isDark: Boolean });
const emit = defineEmits(["toggle-theme", "open-live"]);
</script>

<template>
  <div class="privacy-page">
    <header class="privacy-header">
      <a class="privacy-brand" href="/live" aria-label="MIGO Rides home" @click.prevent="emit('open-live')">
        <img class="privacy-brand-mark" :src="migoMark" alt="" />
        <img class="privacy-brand-wordmark" :src="isDark ? migoWordmarkDark : migoWordmark" alt="MIGO" />
      </a>
      <div class="privacy-header-actions">
        <a class="privacy-back-link" href="/live" @click.prevent="emit('open-live')">Back to MIGO</a>
        <button
          class="privacy-theme-toggle"
          type="button"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="emit('toggle-theme')"
        >
          <Sun v-if="isDark" :size="18" stroke-width="2" aria-hidden="true" />
          <Moon v-else :size="18" stroke-width="2" aria-hidden="true" />
        </button>
      </div>
    </header>

    <main class="privacy-document">
      <p class="privacy-eyebrow">LEGAL · LAST UPDATED 28 OCTOBER 2026</p>
      <h1><img class="migo-heading-wordmark" :src="isDark ? migoWordmarkDark : migoWordmark" alt="MIGO" /> Privacy Policy</h1>
      <p class="privacy-dates"><strong>Effective date:</strong> 28 October 2026<br /><strong>Last updated:</strong> 28 October 2026</p>

      <section>
        <h2>1. Introduction</h2>
        <p>Migo ("we," "our," or "us") is a ride-hailing platform designed to connect passengers with independent drivers for transportation services. This Privacy Policy explains how Migo collects, uses, stores, protects, and shares personal information when you use the Migo mobile application, website, and related services.</p>
        <p>By using Migo, you acknowledge that you have read this Privacy Policy. Where consent is legally required, we will request it separately.</p>
      </section>

      <section>
        <h2>2. Information We Collect</h2>
        <p>Depending on whether you register as a passenger or driver, we may collect the following information.</p>
        <h3>A. Personal Information</h3>
        <ul>
          <li>Full name.</li>
          <li>Phone number.</li>
          <li>Email address, if provided.</li>
          <li>Account login and authentication information.</li>
          <li>Profile photograph, if provided.</li>
        </ul>
        <h3>B. Location Information</h3>
        <p>Migo may collect location information to provide transportation services, including:</p>
        <ul>
          <li>Passenger pickup locations.</li>
          <li>Ride destinations.</li>
          <li>Driver locations while available for rides or completing an active trip.</li>
          <li>Route and trip-location information.</li>
        </ul>
        <p>Location access will be requested through your device's permission settings. Background location access, if implemented, will be disclosed and requested only as necessary for supported features.</p>
        <h3>C. Driver Information</h3>
        <p>Drivers may be required to submit:</p>
        <ul>
          <li>Driver's licence information.</li>
          <li>Vehicle registration and identification details.</li>
          <li>Vehicle photographs.</li>
          <li>Driver profile photographs.</li>
          <li>Other documents reasonably necessary for driver verification and safety.</li>
        </ul>
        <p>Access to sensitive documents will be restricted to authorised personnel and service providers who need the information to perform their duties.</p>
        <h3>D. Ride and Transaction Information</h3>
        <p>We may collect:</p>
        <ul>
          <li>Ride requests and completed trip records.</li>
          <li>Pickup and destination details.</li>
          <li>Fare estimates and final fares.</li>
          <li>Trip dates and times.</li>
          <li>Driver and passenger ratings or feedback, if the feature is available.</li>
          <li>Payment-related records necessary to manage rides and resolve disputes.</li>
        </ul>
        <p>Migo is intended to allow passengers to pay drivers directly. We will collect payment information only to the extent necessary for the features actually provided.</p>
        <h3>E. Technical Information</h3>
        <p>We may collect limited technical information, such as:</p>
        <ul>
          <li>Device type and operating system.</li>
          <li>App version.</li>
          <li>IP address and diagnostic information.</li>
          <li>Crash reports and app performance data.</li>
        </ul>
        <p>The information collected will depend on the features and technical services used by the app.</p>
      </section>

      <section>
        <h2>3. How We Use Your Information</h2>
        <p>Migo may use personal information to:</p>
        <ol>
          <li>Create and manage user accounts.</li>
          <li>Connect passengers with available drivers.</li>
          <li>Display pickup locations, destinations, routes, and estimated fares.</li>
          <li>Help drivers navigate to passengers and destinations.</li>
          <li>Calculate and record fares.</li>
          <li>Verify driver identity and vehicle documentation.</li>
          <li>Communicate ride updates and service notifications.</li>
          <li>Investigate complaints, disputes, fraud, and safety incidents.</li>
          <li>Maintain, troubleshoot, and improve the application.</li>
          <li>Meet applicable legal and regulatory obligations.</li>
        </ol>
        <p>We will not use personal information for unrelated purposes without an appropriate legal basis or required consent.</p>
      </section>

      <section>
        <h2>4. When We Share Information</h2>
        <p>Migo may share relevant information in the following circumstances.</p>
        <h3>A. Between Passengers and Drivers</h3>
        <p>To facilitate a ride, passengers and their assigned drivers may receive relevant information, such as names, profile photographs where provided, pickup locations, destinations, contact details where necessary, and trip information.</p>
        <h3>B. Service Providers</h3>
        <p>We may share necessary information with service providers that help us operate Migo, including:</p>
        <ul>
          <li>Mapping and navigation providers.</li>
          <li>Cloud hosting and database providers.</li>
          <li>SMS, email, and authentication providers.</li>
          <li>Technical support and analytics providers.</li>
          <li>Payment service providers, if introduced.</li>
        </ul>
        <p>These providers should receive only the information necessary to perform their contracted services and must be subject to appropriate data-protection obligations.</p>
        <h3>C. Legal and Safety Requirements</h3>
        <p>We may disclose information when reasonably necessary to comply with applicable law, respond to lawful requests, protect users, investigate suspected fraud, or address urgent safety concerns.</p>
        <h3>D. Business Transfers</h3>
        <p>If Migo undergoes a merger, restructuring, acquisition, or transfer of business assets, relevant information may be transferred subject to applicable legal requirements and appropriate safeguards.</p>
        <p>Migo does not sell personal information as a business model.</p>
      </section>

      <section>
        <h2>5. Location Permissions</h2>
        <p>Location data is important to Migo's ride-hailing functions. Passengers may need to share their location to select a pickup point and request a ride. Drivers may need to share their location to receive ride requests and provide transportation services.</p>
        <p>You can manage location permissions through your device settings. However, disabling location access may prevent some ride-hailing features from functioning.</p>
        <p>If Migo supports background location tracking for drivers, the app will explain when and why it is needed before requesting the relevant permission.</p>
      </section>

      <section>
        <h2>6. Data Storage and Security</h2>
        <p>We use appropriate technical and organisational safeguards designed to protect personal information against unauthorised access, loss, alteration, disclosure, or misuse.</p>
        <p>Depending on the system implemented, these safeguards may include access controls, encryption, secure authentication, restricted administrative access, and security monitoring. No method of electronic storage or transmission can be guaranteed to be completely secure.</p>
      </section>

      <section>
        <h2>7. Data Retention</h2>
        <p>We retain personal information only for as long as reasonably necessary for the purposes described in this policy, including operating the service, maintaining relevant trip records, resolving disputes, preventing fraud, and meeting legal obligations.</p>
        <p>Retention periods may vary according to the type of information and applicable legal requirements.</p>
        <p>When information is no longer required, we will delete it or securely anonymise it where appropriate, subject to lawful retention obligations.</p>
      </section>

      <section>
        <h2>8. Account Deletion</h2>
        <p>Passengers and drivers may request deletion of their Migo accounts. Account deletion requests can be submitted through the account-deletion feature in the app, if available, or by contacting us using the details provided below.</p>
        <p>We will provide an accessible account-deletion process and delete associated personal information in accordance with applicable requirements, subject to information that must lawfully be retained.</p>
        <p>If certain records must be retained for legal, security, fraud-prevention, or dispute-resolution purposes, we will restrict their use to the relevant purposes and retain them only as permitted or required by law.</p>
      </section>

      <section>
        <h2>9. Your Privacy Rights</h2>
        <p>Subject to applicable law, you may have the right to:</p>
        <ul>
          <li>Request access to personal information we hold about you.</li>
          <li>Request correction of inaccurate information.</li>
          <li>Request deletion of personal information.</li>
          <li>Object to or restrict certain processing.</li>
          <li>Withdraw consent where processing relies on consent.</li>
          <li>Request information about how your data is used or shared.</li>
          <li>Submit a complaint to the relevant data-protection authority.</li>
        </ul>
        <p>To exercise these rights, contact Migo using the contact details below.</p>
      </section>

      <section>
        <h2>10. Children's Privacy</h2>
        <p>Migo is not intended for children who are below the minimum age legally permitted to use the service. We do not knowingly collect children's personal information in violation of applicable law. If we discover that we have collected such information unlawfully, we will take appropriate steps to address it.</p>
      </section>

      <section>
        <h2>11. Third-Party Services</h2>
        <p>Migo may rely on third-party services for mapping, hosting, authentication, communications, analytics, or other app functions. Those services may process information under their own privacy policies and contractual arrangements. We will identify relevant data-sharing practices and provide additional disclosures where required.</p>
      </section>

      <section>
        <h2>12. International Data Transfers</h2>
        <p>Some of our service providers may store or process information outside Nigeria. Where personal information is transferred across borders, Migo will apply the safeguards and comply with the legal requirements applicable to the transfer.</p>
      </section>

      <section>
        <h2>13. Changes to This Privacy Policy</h2>
        <p>We may update this Privacy Policy when our services, technology, or legal obligations change. The revised policy will be published with an updated effective date. Where required, we will notify users or obtain consent before implementing material changes.</p>
      </section>

      <section>
        <h2>14. Contact Us</h2>
        <p>For questions, privacy requests, or complaints concerning this Privacy Policy, contact:</p>
        <dl>
          <div><dt>Platform</dt><dd>Migo</dd></div>
          <div><dt>Operating location</dt><dd>Calabar, Cross River State, Nigeria</dd></div>
          <div><dt>Legal business name</dt><dd>Migo Technologies Limited</dd></div>
          <div><dt>Privacy contact email</dt><dd><a href="mailto:migotechnologiesltd01@gmail.com">migotechnologiesltd01@gmail.com</a></dd></div>
          <div><dt>Privacy Policy URL</dt><dd><a href="https://migotech.org/privacy">https://migotech.org/privacy</a></dd></div>
        </dl>
        <p>By using Migo, you can consult this policy to understand how your personal information is handled.</p>
      </section>
    </main>

    <footer class="privacy-footer">
      <span>© 2026 Migo Technologies Limited. All rights reserved.</span>
      <a href="/live" @click.prevent="emit('open-live')">Return to MIGO</a>
    </footer>
  </div>
</template>

<style scoped>
.privacy-page {
  min-height: 100vh;
  color: #252620;
  background: #f7f7f2;
  font: 15px/1.75 "DM Sans", sans-serif;
}
.privacy-header {
  min-height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 12px max(24px, calc((100% - 1080px) / 2));
  border-bottom: 1px solid #e3e4dc;
}
.privacy-brand,
.privacy-header-actions {
  display: inline-flex;
  align-items: center;
}
.privacy-brand { gap: 8px; text-decoration: none; }
.privacy-brand-mark { width: 31px; height: 31px; object-fit: contain; }
.privacy-brand-wordmark { width: 56px; height: auto; }
.privacy-header-actions { gap: 18px; }
.privacy-back-link,
.privacy-footer a { color: inherit; text-decoration: none; }
.privacy-back-link { font-size: 13px; font-weight: 700; }
.privacy-theme-toggle {
  width: 38px;
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  border: 1px solid #dfe0d8;
  border-radius: 50%;
  color: inherit;
  background: transparent;
  font: inherit;
  font-size: 17px;
  cursor: pointer;
}
.privacy-document { width: min(760px, calc(100% - 48px)); margin: 0 auto; padding: 64px 0 80px; }
.privacy-eyebrow { margin: 0 0 12px; color: #787a70; font-size: 10px; font-weight: 800; letter-spacing: .12em; }
.privacy-document h1 { margin: 0; color: #20211d; font: 600 42px/1.15 "Space Grotesk", sans-serif; letter-spacing: -.03em; }
.privacy-dates { margin: 17px 0 48px; color: #686a61; font-size: 13px; }
.privacy-document section { margin-top: 40px; }
.privacy-document h2 { margin: 0 0 14px; color: #252620; font: 600 24px/1.3 "Space Grotesk", sans-serif; letter-spacing: -.01em; }
.privacy-document h3 { margin: 25px 0 8px; color: #303129; font: 700 16px/1.4 "DM Sans", sans-serif; }
.privacy-document p { margin: 0 0 14px; }
.privacy-document ul,
.privacy-document ol { display: grid; gap: 7px; margin: 8px 0 18px; padding-left: 24px; }
.privacy-document li { padding-left: 3px; }
.privacy-document dl { display: grid; gap: 10px; margin: 20px 0; }
.privacy-document dl > div { display: grid; grid-template-columns: minmax(155px, .7fr) 1.3fr; gap: 12px; }
.privacy-document dt { font-weight: 700; }
.privacy-document dd { margin: 0; }
.privacy-document a { color: #6a5a00; text-decoration-thickness: 1px; text-underline-offset: 3px; }
.privacy-footer {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 22px max(24px, calc((100% - 1080px) / 2));
  border-top: 1px solid #e3e4dc;
  color: #77796f;
  font-size: 11px;
}
:global(:root[data-theme="dark"] .privacy-page) { color: #e9e9e0; background: #171914; }
:global(:root[data-theme="dark"] .privacy-header),
:global(:root[data-theme="dark"] .privacy-footer) { border-color: #33352f; }
:global(:root[data-theme="dark"] .privacy-document h1),
:global(:root[data-theme="dark"] .privacy-document h2),
:global(:root[data-theme="dark"] .privacy-document h3) { color: #f2f1e9; }
:global(:root[data-theme="dark"] .privacy-eyebrow),
:global(:root[data-theme="dark"] .privacy-dates) { color: #afb0a5; }
:global(:root[data-theme="dark"] .privacy-theme-toggle) { border-color: #45473f; }
:global(:root[data-theme="dark"] .privacy-document a) { color: #ffe15a; }
@media (max-width: 600px) {
  .privacy-header { min-height: 66px; padding-inline: 18px; }
  .privacy-header-actions { gap: 12px; }
  .privacy-back-link { font-size: 12px; }
  .privacy-document { width: calc(100% - 40px); padding: 44px 0 56px; font-size: 14px; }
  .privacy-document h1 { font-size: 34px; }
  .privacy-document h2 { font-size: 21px; }
  .privacy-dates { margin-bottom: 38px; }
  .privacy-document dl > div { grid-template-columns: 1fr; gap: 0; }
  .privacy-footer { flex-direction: column; padding: 18px 20px; }
}
</style>