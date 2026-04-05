import { test, expect } from '@playwright/test'

test('opens the demo dashboard from login and filters courses', async ({ page }) => {
  await page.goto('/login')

  await expect(
    page.getByRole('heading', {
      name: 'Connexion etudiante, mais avec une vraie priorisation.',
      level: 1,
    }),
  ).toBeVisible()

  await page.getByRole('link', { name: 'Creer un compte' }).click()
  await expect(
    page.getByRole('heading', {
      name: 'Onboarding plus propre que le DVL actuel.',
      level: 1,
    }),
  ).toBeVisible()

  await page.goto('/login')
  await page.getByRole('link', { name: 'Explorer la demo' }).click()

  await expect(
    page.getByRole('heading', { name: 'Bonjour, Jordi', level: 1 }),
  ).toBeVisible()

  await page.getByRole('link', { name: 'Voir le planning complet' }).click()
  await expect(
    page.getByRole('heading', { name: 'Calendrier', level: 1 }),
  ).toBeVisible()

  await page.getByRole('link', { name: 'Dashboard' }).click()
  await page.getByRole('link', { name: 'Reprendre le dernier cours' }).click()
  await expect(
    page.getByRole('heading', { name: 'Advanced Probability', level: 1 }),
  ).toBeVisible()

  await page.getByRole('link', { name: 'Cours' }).click()
  await page.getByRole('link', { name: /Blockchain Programming/i }).click()
  await expect(
    page.getByRole('heading', { name: 'Blockchain Programming', level: 1 }),
  ).toBeVisible()
  await expect(page.getByText('Priorite actuelle: TP smart contract feedback.')).toBeVisible()
  await expect(page.getByRole('link', { name: /Mar 10:15 Blockchain Programming - Lab innovation B108/i })).toBeVisible()
  await expect(page.getByRole('link', { name: /Feedback smart contract disponible/i })).toBeVisible()

  await page.getByRole('link', { name: 'Cours' }).click()
  await page.getByRole('link', { name: /Rust Programming/i }).click()
  await expect(
    page.getByRole('heading', { name: 'Rust Programming', level: 1 }),
  ).toBeVisible()

  await page.getByRole('link', { name: 'Notes' }).click()
  await expect(
    page.getByRole('heading', { name: 'Mes notes', level: 1 }),
  ).toBeVisible()
  await expect(page.getByTestId('grade-card')).toHaveCount(6)
  await page.getByTestId('grade-card').filter({ hasText: 'Blockchain Programming' }).click()
  await expect(
    page.getByRole('heading', { name: 'Blockchain Programming', level: 1 }),
  ).toBeVisible()
  await expect(page.getByText('Smart Contract TP')).toBeVisible()

  await page.getByRole('link', { name: 'Devoirs' }).click()
  await expect(
    page.getByRole('heading', { name: 'Devoirs', level: 1 }),
  ).toBeVisible()
  await expect(page.getByTestId('assignment-card')).toHaveCount(6)
  await page.getByTestId('assignment-card').filter({ hasText: 'TP Smart Contract Feedback' }).click()
  await expect(
    page.getByRole('heading', { name: 'TP Smart Contract Feedback', level: 1 }),
  ).toBeVisible()
  await expect(page.getByText('Feedback smart contract disponible')).toBeVisible()

  await page.getByRole('link', { name: 'Calendrier' }).click()
  await page.getByTestId('calendar-entry').first().click()
  await expect(
    page.getByRole('heading', { name: /Advanced Probability|Blockchain Programming|Point projet equipe|Machine Learning|Project Methodology|Public-key Cryptography|Rust Programming/, level: 1 }),
  ).toBeVisible()

  await page.getByRole('link', { name: 'Messages' }).click()
  await page.getByTestId('message-card').filter({ hasText: 'Machine Learning : changement de salle' }).click()
  await expect(
    page.getByRole('heading', { name: 'Machine Learning : changement de salle', level: 1 }),
  ).toBeVisible()

  await page.getByRole('link', { name: 'Dashboard' }).click()
  const searchField = page.getByPlaceholder('Rechercher un cours, un prof ou un rendu')
  await expect(searchField).toBeVisible()
  await searchField.fill('rust')

  await expect(
    page.getByRole('heading', { name: 'Rust Programming', level: 3 }),
  ).toBeVisible()
  await expect(page.getByTestId('course-card')).toHaveCount(1)

  await page.getByRole('link', { name: 'Calendrier' }).click()
  await expect(
    page.getByRole('heading', { name: 'Calendrier', level: 1 }),
  ).toBeVisible()
  await expect(page.getByTestId('calendar-entry')).toHaveCount(7)

  await page.getByRole('link', { name: 'Messages' }).click()
  await page.getByTestId('message-card').filter({ hasText: 'Blockchain Programming : feedback TP disponible' }).click()
  await expect(
    page.getByRole('heading', { name: 'Blockchain Programming : feedback TP disponible', level: 1 }),
  ).toBeVisible()
  await expect(page.getByText('Feedback smart contract disponible')).toBeVisible()

  await page.getByRole('link', { name: 'Messages' }).click()
  await expect(
    page.getByRole('heading', { name: 'Messages', level: 1 }),
  ).toBeVisible()
  await expect(page.getByTestId('message-card')).toHaveCount(7)

  await page.getByRole('link', { name: 'Annonces' }).click()
  await expect(
    page.getByRole('heading', { name: 'Annonces', level: 1 }),
  ).toBeVisible()
  await expect(page.getByTestId('announcement-card')).toHaveCount(8)
  await page.getByTestId('announcement-card').filter({ hasText: 'Erreur de salle corrigee' }).click()
  await expect(
    page.getByRole('heading', { name: 'Erreur de salle corrigee', level: 1 }),
  ).toBeVisible()

  await page.getByRole('link', { name: 'Dashboard' }).click()
  await page.getByTestId('announcement-link').filter({ hasText: 'Erreur de salle corrigee' }).click()
  await expect(
    page.getByRole('heading', { name: 'Erreur de salle corrigee', level: 1 }),
  ).toBeVisible()
  await expect(page.getByText('Conversations associees')).toBeVisible()

  await page.getByRole('link', { name: 'Calendrier' }).click()
  await page.getByRole('link', { name: /Feedback smart contract disponible/i }).click()
  await expect(
    page.getByRole('heading', { name: 'Feedback smart contract disponible', level: 1 }),
  ).toBeVisible()

  await page.getByTestId('profile-link').click()
  await expect(
    page.getByRole('heading', { name: 'Jordi', level: 1 }),
  ).toBeVisible()
  await expect(page.getByText('Cours a garder en vue')).toBeVisible()

  await page
    .getByRole('navigation', { name: 'Navigation principale' })
    .getByRole('link', { name: 'Admin', exact: true })
    .click()
  await expect(
    page.getByRole('heading', { name: 'Admin content studio', level: 1 }),
  ).toBeVisible()
  await expect(page.getByText('Collections')).toBeVisible()
})
