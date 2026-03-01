import { Router, Request, Response, NextFunction } from 'express'
import { empreendimentosRoutes } from './empreendimentos.routes'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'Projeto SC Téc - Empreendimentos'
  })
})

router.use('/empreendimentos', empreendimentosRoutes)

router.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error)

  res.status(500).json({
    message: error.message || 'Erro interno no servidor'
  })
})

export { router }