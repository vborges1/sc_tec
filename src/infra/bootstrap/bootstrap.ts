import { ViaturasMonitorService } from '../service/viaturas-monitor.service'
import { connectProducer, disconnectProducer } from '../messaging/kafka/producer'
import { ViaturasRecoveryService } from '../service/viaturas-recovery.service'
import { MaritimeSosMonitorService } from '../service/maritime-sos-monitor.service'
import { refreshRates } from '../../config/refresh-rates'

const VIATURAS_REFRESH_INTERVAL_MS = refreshRates.VIATURAS_REFRESH_INTERVAL_MS
const MARITIME_SOS_REFRESH_INTERVAL_MS = refreshRates.MARITIME_SOS_REFRESH_INTERVAL_MS

export class Bootstrap {
  private refreshTimers: NodeJS.Timeout[] = []

  private viaturasMonitorService: ViaturasMonitorService
  private viaturasRecoveryService: ViaturasRecoveryService
  private maritimeSosMonitorService: MaritimeSosMonitorService

  private monitorServices: {
    name: string;
    service: {
      begin: () => Promise<void>;
      stopAll: () => void
    };
    interval: number
  }[]
  private recoveryServices: {
    start: () => void;
    stop: () => void
  }[]

  constructor(serverId: string = process.env.SERVER ?? '13') {
    this.viaturasMonitorService = new ViaturasMonitorService(serverId)
    this.viaturasRecoveryService = new ViaturasRecoveryService(serverId)
    this.maritimeSosMonitorService = new MaritimeSosMonitorService(serverId)

    this.monitorServices = [
      { name: 'viaturas', service: this.viaturasMonitorService, interval: VIATURAS_REFRESH_INTERVAL_MS },
      { name: 'SOS', service: this.maritimeSosMonitorService, interval: MARITIME_SOS_REFRESH_INTERVAL_MS }
    ]

    this.recoveryServices = [
      this.viaturasRecoveryService
    ]
  }

  async start(): Promise<void> {
    await connectProducer()

    await Promise.all(this.monitorServices.map(m => m.service.begin()))

    this.recoveryServices.forEach(r => r.start())
    this.refreshTimers = this.monitorServices.map(m =>
      this.startRefreshTimer(m.name, m.service, m.interval)
    )
  }

  async stop(): Promise<void> {
    this.refreshTimers.forEach(timer => clearInterval(timer))
    this.refreshTimers = []

    this.monitorServices.forEach(m => m.service.stopAll())
    this.recoveryServices.forEach(r => r.stop())

    await disconnectProducer()
  }

  private startRefreshTimer(
    serviceName: string,
    service: { begin: () => Promise<void> },
    intervalMs: number
  ): NodeJS.Timeout {
    return setInterval(() => {
      service.begin().catch(err =>
        console.error(`❌ Erro ao iniciar o monitoramento de ${serviceName}`, err)
      )
    }, intervalMs)
  }
}
