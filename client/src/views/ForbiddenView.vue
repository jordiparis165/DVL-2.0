<template>
  <main class="forbidden-shell">
    <section class="forbidden-card">
      <p class="eyebrow">
        Acces refuse
      </p>
      <h1>Cette page n est pas accessible avec ton role actuel.</h1>
      <p class="copy">
        L espace d administration est reserve aux comptes `admin`. Reviens au dashboard ou ouvre la demo si tu veux explorer l interface complete.
      </p>

      <div class="actions">
        <RouterLink class="primary-action" to="/dashboard">
          Retour au dashboard
        </RouterLink>
        <RouterLink class="secondary-action" to="/dashboard?demo=1">
          Ouvrir la demo
        </RouterLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
.forbidden-shell {
  min-height: 100vh;
  display: grid;
  place-items: center;
  width: min(100%, calc(100% - 32px));
  margin: 0 auto;
  padding: 24px 0;
}

.forbidden-card {
  width: min(760px, 100%);
  padding: 36px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 32px;
  background:
    radial-gradient(circle at top left, rgba(245, 158, 11, 0.18), transparent 30%),
    rgba(255, 255, 255, 0.88);
  box-shadow: 0 28px 64px rgba(148, 163, 184, 0.18);
}

.eyebrow {
  margin: 0 0 6px;
  color: #92400e;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2.2rem, 4.4vw, 4rem);
  line-height: 0.98;
}

.copy {
  margin: 18px 0 0;
  color: #475569;
  line-height: 1.7;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
}

.primary-action,
.secondary-action {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 14px 18px;
  border-radius: 16px;
  text-decoration: none;
  font-weight: 700;
}

.primary-action {
  background: #111827;
  color: #f8fafc;
  box-shadow: 0 18px 30px rgba(17, 24, 39, 0.18);
}

.secondary-action {
  background: rgba(255, 255, 255, 0.72);
  color: #111827;
  box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.08);
}

@media (max-width: 720px) {
  .forbidden-shell {
    width: min(100%, calc(100% - 24px));
    padding: 12px 0;
  }

  .forbidden-card {
    padding: 22px;
  }

  .actions {
    flex-direction: column;
  }
}
</style>
