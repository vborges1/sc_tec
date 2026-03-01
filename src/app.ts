import express from "express"
import morgan from "morgan"
import cors from 'cors'
import helmet from 'helmet'
import dotenv from "dotenv"
import { corsOptions } from './cors-config'
import { printStartupBanner } from './infra/log/startup-banner'
import { router } from "./infra/router"
import db from "./infra/database/sqlite"
import { runMigrations } from './infra/database/migrations'

dotenv.config()

export class App {
  public app: express.Application
  public server!: ReturnType<express.Application['listen']>
  protected port: number

  constructor() {
    this.port = Number(process.env.PORT) || 3000
    this.app = express()
    this.config()
  }

  private config() {
    this.app.use(morgan('tiny'))
    this.app.use(express.json())
    this.app.use(helmet())
    this.app.use(cors(corsOptions))
    this.app.use(router)
  }

  public async start(): Promise<void> {
    runMigrations()

    this.server = this.app.listen(this.port, () => {
      const url = `http://localhost:${this.port}`
      printStartupBanner(url)
    })

    this.registerShutdown()
  }

  private registerShutdown(): void {
    const shutdown = async () => {
      console.log('\nEncerrando aplicação...')

      db.close()

      this.server.close(() => {
        console.log('Servidor encerrado')
        process.exit(0)
      })
    }

    process.on('SIGINT', shutdown)
    process.on('SIGTERM', shutdown)
  }
}