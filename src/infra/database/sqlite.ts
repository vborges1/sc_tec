import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'

const databasesDir = path.resolve(process.cwd(), 'src', 'databases')

if (!fs.existsSync(databasesDir)) {
  fs.mkdirSync(databasesDir, { recursive: true })
}

const dbPath = path.join(databasesDir, 'database.db')

const db = new Database(dbPath)

db.pragma('journal_mode = WAL')

export default db