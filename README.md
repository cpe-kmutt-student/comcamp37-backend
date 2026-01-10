<h1>ComCamp 37 - Backend</h1>

<h3>Stacks</h3>
<ul>
  <li>Node.js</li>
  <li>NestJS (base on Express.js)</li>
  <li>TypeScript</li>
  <li>Supabase (postgreSQL)</li>
  <li>Prisma</li>
  <li>JWT</li>
  <li>Docker</li>
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
  <li>Run Dev Server : <code>pnpm run start:dev</code></li>
</ul>



<h3>Start Prod</h3>
<ul>
  <li>Run Prod Project on docker (recommended) : <code>docker compose up --build -d</code></li>
</ul>

<h3>DB-Diagram (Prototype)</h3>
<img src="./docs/CC37-DB-Diagram-2.png" alt="ER-Diagram" />

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




<h3>Cr.</h3>
<p>Made with 🧡 by ComCamp 37 Technic Team</p>