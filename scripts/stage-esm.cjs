const fs = require('node:fs')
const path = require('node:path')
const ts = require('typescript')

const root = path.resolve('dist/src')
const target = path.resolve('esm-src')

function stage(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      stage(file)
      continue
    }
    if (!file.endsWith('.ts')) continue

    const text = fs.readFileSync(file, 'utf8')
    const source = ts.createSourceFile(file, text, ts.ScriptTarget.ESNext, true)
    const replacements = []

    function visit(node) {
      if (ts.isStringLiteral(node) && node.text.startsWith('.') && !node.text.includes('/node_modules/')) {
        const parent = node.parent
        const isImport =
          ((ts.isImportDeclaration(parent) || ts.isExportDeclaration(parent)) &&
            parent.moduleSpecifier === node) ||
          (ts.isCallExpression(parent) && parent.expression.kind === ts.SyntaxKind.ImportKeyword) ||
          (ts.isLiteralTypeNode(parent) && ts.isImportTypeNode(parent.parent))
        if (isImport) {
          const resolved = path.resolve(path.dirname(file), node.text)
          const suffix = fs.existsSync(resolved + '.ts') ? '.mjs' : '/index.mjs'
          if (!fs.existsSync(resolved + '.ts') && !fs.existsSync(path.join(resolved, 'index.ts')))
            throw new Error(`Cannot resolve ${node.text} in ${file}`)
          replacements.push([node.getEnd() - 1, suffix])
        }
      }
      ts.forEachChild(node, visit)
    }

    visit(source)
    let output = text
    for (const [offset, suffix] of replacements.reverse())
      output = output.slice(0, offset) + suffix + output.slice(offset)

    const destination = path.join(target, path.relative(root, file)).replace(/\.ts$/, '.mts')
    fs.mkdirSync(path.dirname(destination), { recursive: true })
    fs.writeFileSync(destination, output)
  }
}

stage(root)
