# DVL Next

Projet de groupe realise dans le cadre du module WebDev a l'ESILV.

Notre objectif a ete de proposer une refonte plus claire et plus moderne de De Vinci Learning, en gardant les usages importants d'une plateforme etudiante tout en ameliorant l'experience utilisateur, la structure technique et la securite.

## Groupe

- Jordi Paris
- Armand Jurkowski

## Apercu

Le projet part du starter initial et le transforme en une application complete organisee autour de :

- un front Vue 3 avec routing, etat global et tests
- un back Fastify avec auth JWT par cookie, persistance MongoDB et endpoints metier
- un mode demo pour naviguer dans l'application meme sans back live
- un espace admin protege par autorisation `admin`

## Fonctionnalites

### Cote etudiant

- connexion, inscription et verification email
- dashboard avec cours, progression, alertes et reprise rapide
- pages dediees pour :
  - cours
  - calendrier hebdomadaire
  - messages
  - annonces
  - profil
  - notes
  - devoirs
- details cliquables pour chaque ressource importante

### Cote administration

- vue admin de gestion de contenu
- edition et creation de :
  - cours
  - calendrier
  - annonces
  - messages
  - notes
  - devoirs
- acces reserve aux utilisateurs ayant le role `admin`

### Securite

- mots de passe hashes avec `bcrypt`
- politique minimale de mot de passe fort a l'inscription
- rehash automatique des anciens hashes si le niveau de cout change
- JWT stocke en cookie `httpOnly`
- verification d'email avant connexion
- limitation anti brute-force sur la route de connexion
- distinction des roles `student` / `admin`
- routes admin et routes utilisateurs sensibles protegees cote serveur

## Architecture

```text
.
|-- client/   # application Vue 3
|-- server/   # API Fastify + MongoDB
|-- package.json
`-- turbo.json
```

### Front-end

Le client utilise :

- Vue 3
- Vue Router
- Pinia
- Vite
- Vitest
- Playwright

Le front sait fonctionner dans deux modes :

- `authenticated` : consommation de la vraie API
- `demo` : navigation complete avec donnees de demonstration

### Back-end

Le serveur utilise :

- Fastify
- Mongoose
- JWT via `@fastify/jwt`
- cookies via `@fastify/cookie`
- Nodemailer pour la verification email

Les routes principales sont :

- `/auth`
- `/users`
- `/dashboard`

## Installation

Depuis la racine :

```bash
npm install
```

## Configuration

Le serveur attend un fichier :

```text
server/.env.development.local
```

Base a partir de :

```text
server/.env-example
```

Variables importantes :

- `PORT`
- `NODE_ENV`
- `MONGODB_URI`
- `MONGO_CONNECT_TIMEOUT_MS`
- `MONGO_FALLBACK_TO_MEMORY`
- `FRONT_BASE_URL`
- `JWT_SECRET`
- `JWT_COOKIE_NAME`
- `BCRYPT_SALT_ROUNDS`
- `LOGIN_MAX_ATTEMPTS`
- `LOGIN_WINDOW_MS`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `MAIL_FROM`

## Lancement

Depuis la racine :

```bash
npm run dev
```

Lancement individuel :

```bash
cd client
npm run dev
```

```bash
cd server
npm run dev
```

## Scripts utiles

### Racine

```bash
npm run dev
npm run lint
npm run start
npm run check
npm run ci
```

### Client

```bash
npm run dev
npm run build
npm run test:unit -- --run
npm run test:e2e -- --project=chromium
npm run lint
```

### Server

```bash
npm run dev
npm run lint
npm run start
```

## Verification

Checks utilises pendant le developpement :

```bash
cd client
npm run test:unit -- --run
npm run build
npm run test:e2e -- --project=chromium
```

```bash
cd ..
npm run lint
```

Verification centralisee depuis la racine :

```bash
npm run check
```

Pipeline complete locale :

```bash
npm run ci
```

## Integration continue

Le projet inclut maintenant une pipeline GitHub Actions dans [`.github/workflows/ci.yml`](./.github/workflows/ci.yml).

Elle verifie automatiquement :

- le lint du monorepo
- les tests unitaires du client
- le build de production du client
- le test end-to-end Playwright sur Chromium

## Mode developpement sans Mongo local

Si aucun MongoDB local n'est disponible, le serveur peut maintenant demarrer automatiquement sur une base Mongo en memoire en developpement.

Cela permet :

- de lancer le projet plus vite sur une machine neuve
- de tester l'inscription et la connexion sans installer Mongo au prealable
- d'eviter le crash du plugin `mongoosePlugin` si `localhost:35115` ne repond pas

Variables associees :

- `MONGO_CONNECT_TIMEOUT_MS`
- `MONGO_FALLBACK_TO_MEMORY`
- `MONGO_MEMORY_SERVER_VERSION`
- `FASTIFY_PLUGIN_TIMEOUT_MS`

## Etat du projet

Le starter initial a ete etendu pour couvrir les points suivants :

- implementation des routes et services manquants
- structuration des echanges front/back
- validations cote serveur
- gestion d'erreurs de base
- authentification et autorisation
- tests front importants
- documentation du projet remplacee par une doc reelle

## Limites actuelles

- le mode demo est pleinement teste et navigable
- le back live depend d'une instance MongoDB accessible
- pour une validation finale de soutenance, il reste pertinent de rejouer un parcours complet live :
  - register
  - verify-email
  - login
  - admin save

## Auteur

Projet developpe par le groupe compose de Jordi Paris et Armand Jurkowski, a partir du starter `webdev-esilv-starter`, puis transforme en plateforme `DVL Next`.
