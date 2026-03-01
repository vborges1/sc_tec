import { Router, Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
import { EmpreendimentosRepository } from '../repositories/empreendimentos.repository'
import { Empreendimento } from '../../models/empreendimento'
import { AppError } from '../errors/error'
import { validateEmpreendimento, validateEmailUniqueness } from '../validations/empreendimento.validation'

const empreendimentosRoutes = Router()
const repository = new EmpreendimentosRepository()

empreendimentosRoutes.get('/', (req: Request, res: Response) => {
  const data: Empreendimento[] = repository.findAll()

  res.status(200).json({
    success: true,
    total: data.length,
    data
  })
})

empreendimentosRoutes.get('/:id', (req: Request<{ id: string }>, res: Response) => {
  const id = Number(req.params.id)
  
  if (isNaN(id)) {
    throw new AppError('ID inválido', 400)
  } 
  
  const empreendimento = repository.findById(id)
  
  if (!empreendimento) {
    throw new AppError('Empreendimento não encontrado', 404)
  }
  
  res.status(200).json({
    success: true,
    data: empreendimento
  })
})

empreendimentosRoutes.post('/', (req: Request<{}, {}, Empreendimento>, res: Response) => {
  validateEmpreendimento(req.body)

  const emailExists = repository.findByEmail(req.body.email)
  
  if (emailExists) {
    validateEmailUniqueness(!!emailExists)
  }

  repository.create(req.body)

  res.status(201).json({
    success: true,
    message: 'Empreendimento criado com sucesso'
  })
})

empreendimentosRoutes.patch('/:id', (req: Request<{ id: string }, {}, Partial<Empreendimento>>, res: Response) => {
  const id = Number(req.params.id)

  if (isNaN(id)) {
    throw new AppError('ID inválido', 400)
  }

  const currentEmpreendimento = repository.findById(id)
  if (!currentEmpreendimento) {
    throw new AppError('Empreendimento não encontrado', 404)
  }

  if (req.body.email) {
    const ownerOfEmail = repository.findByEmail(req.body.email)
    
    /* barra a edição se o e-mail existe E não pertence ao ID atual */
    if (ownerOfEmail && ownerOfEmail.id !== id) {
      throw new AppError('Este e-mail já está sendo utilizado por outro empreendimento', 409)
    }
  }

  if (req.body.segmento) {
    validateSegmento(req.body.segmento)
  }

  const updated = repository.update(id, req.body)

  if (!updated) {
    throw new AppError('Empreendimento não encontrado', 404)
  }
  
  res.status(200).json({
    success: true,
    message: 'Empreendimento atualizado com sucesso'
  })
})

empreendimentosRoutes.put('/:id', (req: Request<{ id: string }, {}, Empreendimento>, res: Response) => {
  const id = Number(req.params.id)

  if (isNaN(id)) {
    throw new AppError('ID inválido', 400)
  }

  validateEmpreendimento(req.body)

  const currentEmpreendimento = repository.findById(id)
  if (!currentEmpreendimento) {
    throw new AppError('Empreendimento não encontrado', 404)
  }

  /* valida quem é o dono do e-mail enviado */
  const ownerOfEmail = repository.findByEmail(req.body.email)

  /* barra a edição se o e-mail existe E não pertence ao ID atual */
  if (ownerOfEmail && ownerOfEmail.id !== id) {
    throw new AppError('Este e-mail já está sendo utilizado por outro empreendimento', 409)
  }

  const updated = repository.update(id, req.body)

  if (!updated) {
    throw new AppError('Erro ao atualizar empreendimento', 500)
  }
  
  res.status(200).json({
    success: true,
    message: 'Empreendimento atualizado com sucesso'
  })
})

empreendimentosRoutes.delete('/:id', (req: Request<{ id: string }>, res: Response) => {
  const id = Number(req.params.id)
  
  if (isNaN(id)) {
    throw new AppError('ID inválido', 400)
  } 
  
  const deleted = repository.delete(id)

  if (!deleted) {
    throw new AppError('Empreendimento não encontrado', 404)
  }
  
  res.status(200).json({
    success: true,
    message: 'Empreendimento removido com sucesso'
  })
})

empreendimentosRoutes.post('/mock', (req: Request, res: Response) => {
  const filePath = path.resolve(process.cwd(), 'src/json/dados.json')

  if (!fs.existsSync(filePath)) {
    throw new AppError('Arquivo de dados mocados não encontrado', 500)
  }

  let mockedData: Empreendimento[] = []

  try {
    const jsonData = fs.readFileSync(filePath, 'utf-8')
    mockedData = JSON.parse(jsonData)
  } catch (err) {
    throw new AppError('Erro ao ler arquivo JSON', 500)
  }

  if (!mockedData.length) {
    throw new AppError('Nenhum dado para inserir', 400)
  }

  mockedData.forEach(item => {
    repository.create(item)
  })

  res.status(201).json({
    success: true,
    message: 'Dados mocados inseridos com sucesso'
  })
})

export { empreendimentosRoutes }