import { RefreshRates } from "src/models/refreshRates"

function loadRefreshRates(): RefreshRates {
    try {
        const parsed = JSON.parse(process.env.REFRESH_RATES ?? '{}')

        return {
            VIATURAS_REFRESH_INTERVAL_MS:Number(parsed.VIATURAS_REFRESH_INTERVAL_MS) || 300_000, /* 5 minutos */
            VIATURAS_PING_INTERVAL_MS: Number(parsed.VIATURAS_PING_INTERVAL_MS) || 30_000, /* 30 segundos */
            VIATURAS_RECOVERY_INTERVAL_MS: Number(parsed.VIATURAS_RECOVERY_INTERVAL_MS) || 3_600_000, /* 1 hora */
            MARITIME_SOS_REFRESH_INTERVAL_MS:Number(parsed.VIATURAS_REFRESH_INTERVAL_MS) || 300_000,
            MARITIME_SOS_PING_INTERVAL_MS: Number(parsed.VIATURAS_PING_INTERVAL_MS) || 30_000
        }
    } catch {
        console.warn('REFRESH_RATES inválido, usando defaults')

        return {
            VIATURAS_REFRESH_INTERVAL_MS: 300_000,
            VIATURAS_PING_INTERVAL_MS: 30_000,
            VIATURAS_RECOVERY_INTERVAL_MS: 3_600_000,
            MARITIME_SOS_REFRESH_INTERVAL_MS: 300_000,
            MARITIME_SOS_PING_INTERVAL_MS: 30_000
        }
    }
}

export const refreshRates = loadRefreshRates()

