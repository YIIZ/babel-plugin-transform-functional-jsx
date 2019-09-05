// https://github.com/babel/babel/blob/master/packages/babel-plugin-transform-react-jsx/src/index.js
import { declare } from '@babel/helper-plugin-utils'
import jsx from '@babel/plugin-syntax-jsx'
import helper from '@babel/helper-builder-react-jsx'
import { types as t } from '@babel/core'

export default declare((api, options) => {
  const JSXSpreadChild = (path) => {
    path.replaceWith(
      t.spreadElement(path.node.expression)
    )
  }

  const visitor = helper({
    post(state, pass) {
      // TODO? @jsx-lowercase-create
      // https://github.com/babel/babel/blob/v6.24.1/packages/babel-plugin-transform-react-jsx/src/index.js#L19
      const { tagExpr } = state
      state.callee = tagExpr
    },
  })
  visitor.JSXSpreadChild = JSXSpreadChild

  return {
    inherits: jsx,
    visitor,
  }
})
