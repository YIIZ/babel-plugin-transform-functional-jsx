import assert from 'assert'
import * as babel from '@babel/core'
import jsx from '../src'

const src = `
<div></div>
function App() {
  return <div>
    <a href="other.html">Link</a>
    <ul>
      {...[<li>Item A</li>, <li>Item B</li>]}
      <li>Item Last</li>
    </ul>
  </div>
}

function A(_jsx2) {
}
function B() {
  return <div></div>
}
function C(a, b, jsxx) {
  return <div></div>
}
function D() {
  function E() {
    return <div></div>
  }
  return <div></div>
}
`
const dist = `
<div></div>;

function App(_, _2, _jsx) {
  return _jsx("div", null, _jsx("a", {
    href: "other.html"
  }, "Link"), _jsx("ul", null, ...[_jsx("li", null, "Item A"), _jsx("li", null, "Item B")], _jsx("li", null, "Item Last")));
}

function A(_jsx2) {}

function B(_3, _4, _jsx3) {
  return _jsx3("div", null);
}

function C(a, b, jsxx) {
  return jsxx("div", null);
}

function D(_7, _8, _jsx5) {
  function E(_5, _6, _jsx4) {
    return _jsx4("div", null);
  }

  return _jsx5("div", null);
}
`

const out = babel.transform(src, {
  // presets: [presetEnv],
  plugins: [jsx],
})

assert.strictEqual(out.code, dist.trim())
