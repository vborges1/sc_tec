import db from './sqlite'
import fs from 'fs'
import path from 'path'

export function runMigrations() {
  const schemaPath = path.join(__dirname, 'schema.sql')
  const schema = fs.readFileSync(schemaPath, 'utf-8')

  db.exec(schema)

  console.log('Tabelas criadas e verificadas com sucesso')
}