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
  <li>Run Migration : <code>pnpm exec prisma migrate dev</code></li>
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
