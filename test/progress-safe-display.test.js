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
  ctx.window.loadly.progress(3, 0, false);
  assert.ok(
    ctx.window.location.hash.endsWith(' 3/1'),
    'progress should render safe totals when total is invalid'
  );
}

{
  const ctx = createContext();
  ctx.window.loadly.progress(undefined, 10, false);
  assert.ok(
    ctx.window.location.hash.endsWith(' 0/10'),
    'progress should render safe complete values when complete is invalid'
  );
}

console.log('progress safe display tests passed');
