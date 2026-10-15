// Angular 16+ writes component inputs into the published .d.ts as `{ "alias": "x"; "required": false; }`.
// Angular 15's compiler only understands the older `"x"` string form and reports
// "Can't bind to 'x'" for every input, so rewrite them back after ng-packagr runs.
// Newer compilers accept both forms, so the rewrite is safe for Angular 22 consumers too.
const fs = require('fs');
const path = require('path');

const typesDir = path.join(__dirname, '..', 'dist', 'ngx-powerbi', 'types');

for (const file of fs.readdirSync(typesDir).filter((name) => name.endsWith('.d.ts'))) {
  const filePath = path.join(typesDir, file);
  const source = fs.readFileSync(filePath, 'utf8');

  // Required or signal inputs have no Angular 15 equivalent; stop instead of publishing wrong metadata.
  if (/"required": true|"isSignal": true/.test(source)) {
    throw new Error(`${file}: required/signal inputs cannot be expressed for Angular 15 consumers`);
  }

  const rewritten = source.replace(/\{ "alias": ("[^"]*"); "required": false; \}/g, '$1');
  if (rewritten !== source) {
    fs.writeFileSync(filePath, rewritten);
    console.log(`Rewrote input metadata in ${file} for Angular 15 compatibility`);
  }
}
