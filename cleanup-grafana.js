const fs = require('fs');
const path = require('path');
const root = process.cwd();
const ignoreDirs = new Set(['.next', '.open-next', 'node_modules', '.git']);
const removePath = (relative) => {
  const full = path.join(root, relative);
  if (!fs.existsSync(full)) return;
  const stat = fs.statSync(full);
  if (stat.isDirectory()) {
    fs.rmSync(full, { recursive: true, force: true });
    console.log(`removed dir: ${relative}`);
  } else {
    fs.unlinkSync(full);
    console.log(`removed file: ${relative}`);
  }
};
removePath('instrumentation-client.ts');
removePath('.next');
removePath('.open-next');
removePath('package-lock.json');
removePath('node_modules');
removePath('tsconfig.tsbuildinfo');

const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignoreDirs.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
      continue;
    }
    if (!/\.(ts|tsx|js|jsx|md|env|json)$/.test(entry.name)) continue;
    let text = fs.readFileSync(full, 'utf8');
    const original = text;
    text = text.replace(/\s*data-faro-user-action-name=(?:"[^"]*"|\{`[^`]*`\})/g, '');
    text = text.replace(/import\("@\/instrumentation-client"\);?\s*\n?/g, '');
    text = text.replace(/@grafana\/[a-zA-Z0-9\-_/]+/g, '');
    if (text !== original) {
      fs.writeFileSync(full, text, 'utf8');
      console.log(`cleaned: ${path.relative(root, full)}`);
    }
  }
};
walk(root);

const readme = path.join(root, 'README.md');
if (fs.existsSync(readme)) {
  let text = fs.readFileSync(readme, 'utf8');
  const start = text.indexOf('## Grafana Frontend Observability');
  const end = text.indexOf('## SEO and social sharing');
  if (start !== -1 && end !== -1) {
    text = text.slice(0, start) + '## Telemetry removed\n\nGrafana Faro observability and related build-time configuration have been removed from this repository. No browser telemetry dependencies or Grafana source map upload settings are required.\n\n' + text.slice(end);
    fs.writeFileSync(readme, text, 'utf8');
    console.log('README cleaned');
  }
}

const envExample = path.join(root, '.env.example');
if (fs.existsSync(envExample)) {
  const lines = fs.readFileSync(envExample, 'utf8').split(/\r?\n/);
  const filtered = lines.filter((line) => !line.includes('NEXT_PUBLIC_GRAFANA_') && !line.includes('GRAFANA_FARO_'));
  fs.writeFileSync(envExample, filtered.join('\n').trimEnd() + '\n', 'utf8');
  console.log('.env.example cleaned');
}

console.log('cleanup script complete');
