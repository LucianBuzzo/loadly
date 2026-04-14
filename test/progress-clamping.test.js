const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

const source = fs.readFileSync('./loadly.js', 'utf8');

function createContext() {
  const ctx = {
    window: { location: { hash: '' } },
    setInterval: () => 1,
    clearInterval: () => {}
  };
  vm.createContext(ctx);
  vm.runInContext(source, ctx);
  return ctx;
}

{
  const ctx = createContext();
  ctx.window.loadly.progress(25, 10, false);
  assert.ok(
    ctx.window.location.hash.startsWith('# ████████████████████ 25/10'),
    'progress should clamp to a full bar when complete > total'
  );
}

{
  const ctx = createContext();
  ctx.window.loadly.progress(-5, 10, false);
  assert.ok(
    ctx.window.location.hash.startsWith('# ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ -5/10'),
    'progress should clamp to an empty bar when complete is negative'
  );
}

console.log('progress clamping tests passed');
