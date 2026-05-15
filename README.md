<div align="center">
  <img src="./docs/Comcamp-Logo.png" alt="ComCamp 37 Logo" width="200"/>

<h1> 🐰 ComCamp 37 - Backend 🦊</h1>

**The official RESTful API for the ComCamp 37 registration website.**

[![Node.js](https://img.shields.io/badge/Node.js-22-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)](https://pnpm.io/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![TypeORM](https://img.shields.io/badge/TypeORM-FE0902?style=for-the-badge)](https://typeorm.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Passport](https://img.shields.io/badge/Passport-34E27A?style=for-the-badge&logo=passport&logoColor=black)](https://www.passportjs.org/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Google OAuth](https://img.shields.io/badge/Google_OAuth-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://developers.google.com/identity/protocols/oauth2)
[![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](https://swagger.io/)
[![React Email](https://img.shields.io/badge/React_Email-000000?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.email/)
[![Nodemailer](https://img.shields.io/badge/Nodemailer-30B980?style=for-the-badge)](https://nodemailer.com/)
[![Resend](https://img.shields.io/badge/Resend-000000?style=for-the-badge)](https://resend.com/)
[![MinIO](https://img.shields.io/badge/MinIO-C72E49?style=for-the-badge&logo=minio&logoColor=white)](https://min.io/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Multer](https://img.shields.io/badge/Multer-FF6F00?style=for-the-badge)](https://github.com/expressjs/multer)
[![pdf-lib](https://img.shields.io/badge/pdf--lib-DC2626?style=for-the-badge)](https://pdf-lib.js.org/)
[![ExcelJS](https://img.shields.io/badge/ExcelJS-217346?style=for-the-badge)](https://github.com/exceljs/exceljs)
[![Biome](https://img.shields.io/badge/Biome-60A5FA?style=for-the-badge)](https://biomejs.dev/)
[![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)](https://prettier.io/)
[![Husky](https://img.shields.io/badge/Husky-000000?style=for-the-badge)](https://typicode.github.io/husky/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Docker Compose](https://img.shields.io/badge/Docker_Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docs.docker.com/compose/)
[![Traefik](https://img.shields.io/badge/Traefik-24A1C1?style=for-the-badge&logo=traefikproxy&logoColor=white)](https://traefik.io/traefik/)
[![Watchtower](https://img.shields.io/badge/Watchtower-4169E1?style=for-the-badge)](https://containrrr.dev/watchtower/)
[![GitHub Container Registry](https://img.shields.io/badge/GHCR-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/features/packages)
</div>


<h3>Stacks</h3>
<ul>
  <li>Node.js</li>
  <li>NestJS (base on Express.js)</li>
  <li>TypeScript</li>
  <li>Supabase (postgreSQL)</li>
  <li>Prisma</li>
  <li>JWT</li>
  <li>Docker</li>
  <li>Swagger</li>
  <li>Scalar</li>
  <li>Better Auth</li>
  <li>MinIO (S3 Compatible Object Storage)</li>
  <li>GitHub Container Registry (GHCR)</li>
</ul>



<h3>Prepare Project</h3>
<ul>
  <li>Clone this repository : <code>git clone https://github.com/cpe-kmutt-student/comcamp37-backend.git</code></li>
  <li>Install Dependencies : <code>pnpm install</code> (pnpm recommend)</li>
  <li>Config <code>.env</code> by rename or copy from <code>.env.example</code></li>
  <li>generate prisma client : <code>pnpm exec prisma generate</code></li>
</ul>



<h3>DB Migration</h3>
<ul>
  <li>Run Generate : <code>pnpm exec prisma generate</code></li>
  <li>Run Migration : <code>pnpm exec prisma migrate dev</code></li>
  <li>Reset and Re-run Migration : <code>pnpm exec prisma migrate reset</code></li>
</ul>


<h3>Commit rules</h3>
<ul>
  <li>feat – New feature</li>
  <li>fix – Bug fix</li>
  <li>perf – Performance improvement</li>
  <li>refactor – Code change without behavior change</li>
  <li>style – Code style only (no logic change)</li>
  <li>test – Add or update tests</li>
  <li>docs – Documentation only</li>
  <li>build – Build system or dependencies</li>
  <li>chore – Maintenance tasks</li>
  <li>ci – CI/CD configuration</li>
  <li>revert – Revert previous commit</li>
</ul>



<h3>Start Dev</h3>
<ul>
  <li>Run Dev Server : <code>pnpm exec dotenv -e .env.prod -- pnpm run start:dev</code></li>
</ul>



<h3>Start Prod</h3>
<ul>
  <li>Run Prod Project on docker (Build from source) : <code>docker compose up --build -d</code></li>
  <li>Run Prod Project on docker (Pull from GHCR + Scale (Recommended)) : <code>docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --scale client=3</code></li>
</ul>

<h3>DB-Diagram (Final)</h3>
<a href="https://dbdiagram.io/e/69ae7fb9cf54053b6f3980fa/69ae7fffcf54053b6f398582">Open on DB Diagram</a> <br/>
<a href="https://dbdiagram.io/e/69ae7fb9cf54053b6f3980fa/69ae7fffcf54053b6f398582" target="_blank">
  <img src="./docs/CC37-V3.png" alt="DB Diagram" />

<h3>API Flow Design (Prototype)</h3>
<a href="https://www.figma.com/board/ZO9E1iaCZasX5wwyK0D6g9/CC37-Backend-Routing-Flow?node-id=0-1&t=meCqyS4DR1seJfqG-1"><p>Open on Figma</p></a>


<h3>.env Field Explanation</h3>

```asciidoc
APP_PORT                  :: Application Port (e.g., 3000)
APP_ALLOW_ORIGIN          :: Allowed Origin for CORS (e.g., http://localhost:3000)
APP_FRONTEND_URL          :: Frontend URL (e.g., http://localhost:3000)

AUTH_JWT_SECRET           :: JWT Secret Key
AUTH_GOOGLE_CLIENT_ID     :: Google OAuth Client ID
AUTH_GOOGLE_CLIENT_SECRET :: Google OAuth Client Secret
AUTH_GOOGLE_CALLBACK_URL  :: Google OAuth Redirect URL (e.g., http://localhost:3000/auth/google/callback)

DATABASE_URL              :: PostgreSQL Database URL (e.g., postgresql://user:password@host:port/database)

S3_REGION                 :: S3 Region (e.g., us-east-1)
S3_ENDPOINT               :: S3 Endpoint URL (e.g., https://s3.amazonaws.com)
S3_ACCESS_KEY             :: S3 Access Key ID
S3_SECRET_KEY             :: S3 Secret Access Key
S3_BUCKET                 :: S3 Bucket Name
```

<h3>Connect with Frontend (Development)</h3>
<p>If you don't want to deploy on your own machine, you can use this proxy server for simulate server : <a href="https://github.com/imjustnon/cc37-dev-proxy">Clone this repository</a></p>
<p>*** <strong>Caution:</strong> Don't change the port cause i have set the Google Callback URL like this ***</p>
<p>*** <strong>Caution:</strong> Dont forget to add <code>/api/auth</code> ***</p>

```
BETTER_AUTH_BASE_PATH=http://localhost:3030/api/auth
```


<h3>Reference & Endpoint</h3>
<ul>
  <li>Dev Server : <code>http://dev-api.comcamp.io</code></li>
  <li>Prod Server : <code>http://api.comcamp.io</code></li>
  <li>Docs (Swagger) : <code>/docs</code></li>
  <li>Docs (Scalar) : <code>/reference</code></li>
  <li>Docs (Better Auth) : <code>/api/auth/reference</code></li>
</ul>

<h3>Object Storage Server (S3 Complatible)</h3>
<ul>
  <li>Endpoint : <code>https://storage.comcamp.io</code></li>
  <li>Console : <code>https://console-storage.comcamp.io</code></li>
</ul>

<h3>Cr.</h3>
<p>Made with 🧡 by ComCamp 37 Technical Team</p>