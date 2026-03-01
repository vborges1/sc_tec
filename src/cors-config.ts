import cors from 'cors'

const allowedOrigins = process.env.ALLOWED_CONNECTIONS
    ? process.env.ALLOWED_CONNECTIONS.split(',').map(o => o.trim().replace(/\/$/, ''))
    : []

export const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
        if (!origin) {
            return callback(null, true)
        }

        const cleanOrigin = origin.replace(/\/$/, '')

        if (allowedOrigins.includes(cleanOrigin)) {
            return callback(null, true)
        }

        return callback(new Error('Not allowed by CORS'))
    },
    credentials: true
}
