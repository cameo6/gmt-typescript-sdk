const fs = require('node:fs')
const path = require('node:path')
const ts = require('typescript')

const models = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'))
for (const { file, model, fields } of models) {
  const filename = path.join('src', 'resources', file + '.ts')
  const source = ts.createSourceFile(filename, fs.readFileSync(filename, 'utf8'), ts.ScriptTarget.Latest, true)
  const names = model.split('.')
  let scope = source
  for (const name of names.slice(0, -1)) {
    const namespace = scope.statements.find(node => ts.isModuleDeclaration(node) && node.name.text === name)
    if (!namespace || !namespace.body || !ts.isModuleBlock(namespace.body))
      throw new Error(`Missing SDK namespace ${name}`)
    scope = namespace.body
  }
  const declaration = scope.statements.find(node => ts.isInterfaceDeclaration(node) && node.name.text === names.at(-1))
  if (!declaration) throw new Error(`Missing SDK model ${model}`)
  const actual = declaration.members.map(member => member.name.getText(source)).sort()
  if (JSON.stringify(actual) !== JSON.stringify(fields))
    throw new Error(`${model}: expected ${fields.join(', ')}, found ${actual.join(', ')}`)
}
