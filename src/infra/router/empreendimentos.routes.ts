import { Router, Request, Response } from 'express'
import { EmpreendimentosRepository } from '../repositories/empreendimentos.repository'
import { Empreendimento } from 'src/models/empreendimento'
import fs from 'fs'
import path from 'path'

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
    res.status(400).json({ success: false, message: 'ID inválido' })
    return
  } 
  
  const empreendimento = repository.findById(id)
  
  if (!empreendimento) {
    res.status(404).json({ success: false, message: 'Empreendimento não encontrado' })
    return
  }
  
  res.status(200).json({ success: true, data: empreendimento })
})

empreendimentosRoutes.post('/', (req: Request<{}, {}, Empreendimento>, res: Response) => {
  const id = repository.create(req.body)

  res.status(201).json({
    success: true,
    message: 'Empreendimento criado com sucesso'
  })
})

empreendimentosRoutes.put('/:id', (req: Request<{ id: string }, {}, Empreendimento>, res: Response) => {
  const id = Number(req.params.id)

  if (isNaN(id)) {
    res.status(400).json({ success: false, message: 'ID inválido' })
    return
  }

  const updated = repository.update(id, req.body)

  if (!updated) {
    res.status(404).json({ success: false, message: 'Empreendimento não encontrado' })
    return
  }
  
  res.status(200).json({ success: true, message: 'Empreendimento atualizado com sucesso' })
})

empreendimentosRoutes.delete('/:id', (req: Request<{ id: string }>, res: Response) => {
  const id = Number(req.params.id)
  
  if (isNaN(id)) {
    res.status(400).json({ success: false, message: 'ID inválido' })
    return
  } 
  
  const deleted = repository.delete(id)

  if (!deleted) {
    res.status(404).json({ success: false, message: 'Empreendimento não encontrado' })
    return
  }
  
  res.status(200).json({ success: true, message: 'Empreendimento removido com sucesso' })
})

empreendimentosRoutes.post('/mock', (req: Request, res: Response) => {
  const filePath = path.resolve(process.cwd(), 'src/json/dados.json')

  if (!fs.existsSync(filePath)) {
    res.status(500).json({ success: false, message: 'Arquivo de dados mocados não encontrado' })
    return
  }

  let mockedData: Empreendimento[] = []

  try {
    const jsonData = fs.readFileSync(filePath, 'utf-8')
    mockedData = JSON.parse(jsonData)
  } catch (err) {
    res.status(500).json({ success: false, message: 'Erro ao ler arquivo JSON' })
    return
  }

  if (!mockedData.length) {
    res.status(400).json({ success: false, message: 'Nenhum dado para inserir' })
    return
  }

  mockedData.forEach(item => {
    const id = repository.create(item)
  })

  res.status(201).json({
    success: true,
    message: 'Dados mocados inseridos com sucesso'
  })
})

export { empreendimentosRoutes }