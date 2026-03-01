import { Router, Request, Response, NextFunction } from 'express'
import { empreendimentosRoutes } from './empreendimentos.routes'
import { AppError } from '../errors/error'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'Projeto SC Téc - Empreendimentos'
  })
})

router.use('/empreendimentos', empreendimentosRoutes)

router.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      error: error.message
    })

    return
  }

  res.status(500).json({
    success: false,
    error: 'Erro interno no servidor'
  })
})

export { router }