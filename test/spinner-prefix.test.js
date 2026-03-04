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
  ctx.window.loadly.spinner(undefined, true);
  assert.strictEqual(ctx.window.location.hash, '# ');
}

{
  const ctx = createContext();
  ctx.window.loadly.spinner('Build', true);
  assert.strictEqual(ctx.window.location.hash, '# Build ');
}

console.log('spinner prefix tests passed');
