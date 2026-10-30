<script setup>
import { ref } from "vue";
import { api } from "../../convex/_generated/api.js";
import migoMark from "../assets/migo-mark.webp";
import migoWordmark from "../assets/migo-wordmark.png";

const props = defineProps({ convex: { type: Object, default: null } });
const username = ref("");
const password = ref("");
const entries = ref([]);
const loading = ref(false);
const authenticated = ref(false);
const errorMessage = ref("");

async function signIn() {
  errorMessage.value = "";
  loading.value = true;
  try {
    const result = await props.convex.action(api.waitlist.adminLogin, {
      username: username.value,
      password: password.value,
    });
    if (!result.ok) {
      errorMessage.value = result.error;
      return;
    }
    entries.value = result.entries;
    authenticated.value = true;
  } catch (error) {
    console.error(error);
    errorMessage.value = "Could not connect to beta signups. The admin action may need to be deployed to this Convex environment.";
  } finally {
    loading.value = false;
  }
}

function signOut() {
  authenticated.value = false;
  entries.value = [];
  username.value = "";
  password.value = "";
  errorMessage.value = "";
}

function formatDate(timestamp) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(timestamp));
}
</script>

<template>
  <main class="admin-page ph-no-capture">
    <a class="admin-brand" href="/" aria-label="MIGO Admin home">
      <span class="admin-logo-lockup"><img class="admin-brand-mark" :src="migoMark" alt="" /><img class="admin-brand-wordmark" :src="migoWordmark" alt="MIGO" /></span>
      <span class="admin-brand-label">ADMIN</span>
    </a>

    <section v-if="!authenticated" class="admin-login-card">
      <div class="admin-kicker"><span></span> PRIVATE PORTAL</div>
      <h1>Beta signups</h1>
      <p class="admin-subtitle">Sign in to view people who filled out the MIGO beta form.</p>
      <form class="admin-form" @submit.prevent="signIn">
        <label for="admin-username">Username</label>
        <input id="admin-username" v-model="username" autocomplete="username" required />
        <label for="admin-password">Password</label>
        <input id="admin-password" v-model="password" type="password" autocomplete="current-password" required />
        <p v-if="errorMessage" class="admin-error" role="alert">{{ errorMessage }}</p>
        <p v-if="!convex" class="admin-error" role="alert">The signup database is not connected yet.</p>
        <button class="admin-button" type="submit" :disabled="loading || !convex">
          {{ loading ? "Checking…" : "Sign in" }} <span aria-hidden="true">→</span>
        </button>
      </form>
      <a class="back-link" href="/">← Back to MIGO</a>
    </section>

    <section v-else class="admin-dashboard">
      <header class="dashboard-header">
        <div>
          <div class="admin-kicker"><span></span> BETA PROGRAM</div>
          <h1>Signups <span class="entry-count">{{ entries.length }}</span></h1>
          <p class="admin-subtitle">People who filled out the MIGO beta signup form.</p>
        </div>
        <div class="dashboard-actions">
          <button class="refresh-button" type="button" @click="signIn" :disabled="loading">↻ Refresh</button>
          <button class="signout-button" type="button" @click="signOut">Sign out</button>
        </div>
      </header>

      <div class="signup-table-wrap">
        <table class="signup-table">
          <thead><tr><th>Person</th><th>Contact</th><th>Location</th><th>Joining as</th><th>Submitted</th></tr></thead>
          <tbody>
            <tr v-for="person in entries" :key="person._id">
              <td><div class="person-cell"><span class="person-avatar">{{ person.name.trim().charAt(0).toUpperCase() || "?" }}</span><span class="person-name">{{ person.name }}</span></div></td>
              <td><a :href="'mailto:' + person.email">{{ person.email }}</a><span class="phone-number">{{ person.phone }}</span></td>
              <td>{{ person.city }}</td>
              <td><span class="role-pill" :class="person.role.toLowerCase()">{{ person.role }}</span></td>
              <td class="date-cell">{{ formatDate(person.createdAt) }}</td>
            </tr>
            <tr v-if="entries.length === 0"><td colspan="5" class="empty-state"><span class="empty-icon">✳</span><strong>No signups yet</strong><span>New beta form submissions will show up here.</span></td></tr>
          </tbody>
        </table>
      </div>
      <p v-if="errorMessage" class="admin-error dashboard-error" role="alert">{{ errorMessage }}</p>
      <p v-if="entries.length >= 500" class="list-limit-note">Showing the 500 most recent signups.</p>
    </section>
  </main>
</template>

<style scoped>
.admin-page { min-height: 100vh; padding: 32px clamp(20px, 5vw, 72px) 64px; color: #252620; background: #f7f7f2; font: 14px/1.5 "DM Sans", "Inter", sans-serif; }
.admin-brand { display: inline-flex; align-items: center; gap: 12px; color: #20211d; text-decoration: none; }
.admin-logo-lockup { display: inline-flex; align-items: center; gap: 8px; }
.admin-brand-mark { display: block; width: 34px; height: 34px; object-fit: contain; }
.admin-brand-wordmark { display: block; width: 56px; height: auto; object-fit: contain; }
.admin-brand-label { padding-left: 11px; border-left: 1px solid #d9dacf; color: #8b8c84; font-size: 10px; font-weight: 800; letter-spacing: .15em; }
.admin-login-card { width: min(100%, 430px); margin: clamp(64px, 13vh, 132px) auto 0; padding: 42px; border: 1px solid #e8e8e0; border-radius: 20px; background: #fff; box-shadow: 0 18px 56px rgb(39 40 30 / 7%); }
.admin-kicker { display: flex; align-items: center; gap: 8px; color: #7b7d74; font-size: 10px; font-weight: 800; letter-spacing: .15em; }
.admin-kicker > span { width: 7px; height: 7px; border-radius: 50%; background: #c1a300; box-shadow: 0 0 0 4px #fff6c9; }
h1 { display: flex; align-items: center; gap: 12px; margin: 15px 0 7px; color: #20211d; font-family: "Space Grotesk", "Inter", sans-serif; font-size: clamp(30px, 4vw, 42px); font-weight: 600; letter-spacing: -.05em; line-height: 1.1; }
.admin-subtitle { margin: 0; color: #77796f; font-size: 13px; }
.admin-form { display: grid; gap: 9px; margin-top: 30px; }
.admin-form label { margin-top: 7px; color: #404139; font-size: 12px; font-weight: 700; }
.admin-form input { width: 100%; height: 46px; box-sizing: border-box; padding: 0 13px; border: 1px solid #e1e2d9; border-radius: 9px; outline: none; color: #282923; background: #fff; font: inherit; }
.admin-form input:focus { border-color: #c0a400; box-shadow: 0 0 0 3px rgb(255 214 10 / 22%); }
.admin-button { display: flex; align-items: center; justify-content: space-between; min-height: 48px; margin-top: 10px; padding: 0 16px; border: 0; border-radius: 9px; color: #171811; background: #ffd60a; font: inherit; font-weight: 800; cursor: pointer; }
.admin-button:disabled,.refresh-button:disabled { opacity: .6; cursor: wait; }
.back-link { display: inline-block; margin-top: 26px; color: #77796f; font-size: 12px; text-decoration: none; }
.back-link:hover,.signup-table a:hover { color: #675900; }
.admin-error { margin: 4px 0 0; color: #b42318; font-size: 12px; }
.admin-dashboard { max-width: 1320px; margin: clamp(54px, 10vh, 100px) auto 0; }
.dashboard-header { display: flex; align-items: end; justify-content: space-between; gap: 20px; margin-bottom: 25px; }
.entry-count { display: inline-grid; min-width: 29px; height: 29px; padding: 0 7px; place-items: center; border-radius: 99px; color: #655700; background: #fff1a8; font: 700 13px/1 "DM Sans", sans-serif; letter-spacing: 0; }
.dashboard-actions { display: flex; gap: 9px; }
.refresh-button,.signout-button { min-height: 38px; padding: 0 13px; border: 1px solid #dedfd7; border-radius: 8px; color: #44463e; background: #fff; font: inherit; font-size: 12px; font-weight: 700; cursor: pointer; }
.signout-button { color: #77796f; }
.signup-table-wrap { overflow-x: auto; border: 1px solid #e5e6de; border-radius: 13px; background: #fff; box-shadow: 0 8px 32px rgb(39 40 30 / 4%); }
.signup-table { width: 100%; border-collapse: collapse; text-align: left; white-space: nowrap; }
.signup-table th { padding: 14px 17px; border-bottom: 1px solid #e9eae3; color: #82847a; background: #fbfbf8; font-size: 10px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }
.signup-table td { padding: 14px 17px; border-bottom: 1px solid #f0f0eb; color: #4d4f46; font-size: 12px; }
.signup-table tbody tr:last-child td { border-bottom: 0; }
.person-cell { display: flex; align-items: center; gap: 10px; }
.person-avatar { display: grid; width: 32px; height: 32px; flex: none; place-items: center; border-radius: 50%; color: #54500f; background: #fff3b4; font-weight: 800; }
.person-name { color: #282923; font-weight: 700; }
.signup-table a { display: block; color: #373931; text-decoration: none; }
.phone-number { display: block; margin-top: 3px; color: #92938c; font-size: 11px; }
.role-pill { display: inline-flex; padding: 4px 9px; border-radius: 99px; color: #575b33; background: #f0f2df; font-size: 10px; font-weight: 800; }
.role-pill.driver { color: #6c4f1b; background: #fff0d3; }
.date-cell { color: #82847a !important; font-variant-numeric: tabular-nums; }
.empty-state { height: 230px; color: #85877e !important; text-align: center; }
.empty-state > * { display: block; }
.empty-state strong { margin: 7px 0 3px; color: #404139; font-size: 13px; }
.empty-icon { color: #c4aa18; font-size: 26px; }
.list-limit-note { margin-top: 12px; color: #85877e; font-size: 11px; }
.dashboard-error { margin-top: 12px; }
@media (max-width: 640px) { .admin-page { padding: 24px 16px 40px; } .admin-login-card { margin-top: 54px; padding: 29px 23px; } .admin-dashboard { margin-top: 55px; } .dashboard-header { align-items: start; flex-direction: column; } .dashboard-actions { align-self: stretch; } .refresh-button,.signout-button { flex: 1; } .signup-table th,.signup-table td { padding-right: 13px; padding-left: 13px; } }
</style>
