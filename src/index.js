// https://github.com/babel/babel/blob/master/packages/babel-plugin-transform-react-jsx/src/index.js
import { declare } from '@babel/helper-plugin-utils'
import jsx from '@babel/plugin-syntax-jsx'
import helper from '@babel/helper-builder-react-jsx'
import { types as t } from '@babel/core'

export default declare((api, options) => {
  const jsxVisitor = helper({
    // https://github.com/babel/babel/blob/v6.24.1/packages/babel-plugin-transform-react-jsx/src/index.js#L8-L14
    pre(state) {
      const tagName = state.tagName
      const args = state.args
      if (t.react.isCompatTag(tagName)) {
        args.push(t.stringLiteral(tagName))
      } else {
        args.push(state.tagExpr)
      }
    },

    post(state, pass) {
      state.callee = pass.getJSXIdentifier()
    },
  })

  const JSXSpreadChild = path => {
    path.replaceWith(t.spreadElement(path.node.expression))
  }

  const Function = (path, file) => {
    const { params } = path.node
    let jsxIdentifier = params[2]
    const getJSXIdentifier = () => {
      if (!jsxIdentifier) {
        jsxIdentifier = path.scope.generateUidIdentifier('jsx')
        params.push(
          ...Array.from({ length: 2 - params.length }).map((_, i) =>
            path.scope.generateUidIdentifier(i)
          )
        )
        params.push(jsxIdentifier)
      }
      return jsxIdentifier
    }
    path.traverse(jsxVisitor, { getJSXIdentifier, opts: file.opts })
  }

  return {
    inherits: jsx,
    visitor: {
      JSXSpreadChild,
      Function: { exit: Function }, // after JSXSpreadChild
    },
  }
})
