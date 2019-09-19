# babel-plugin-transform-jsx-params2

## Example

In
```js
<div></div>
function Foo() {
  return <div></div>
}
```

Out
```js
<div></div>;

function Foo(_, _2, _jsx) {
  return _jsx("div", null);
}
```
