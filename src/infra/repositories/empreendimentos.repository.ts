import db from '../database/sqlite'
import { Empreendimento } from '../../models/empreendimento'

export class EmpreendimentosRepository {
  
  findAll(): Empreendimento[] {
    const query = `SELECT * FROM empreendimentos WHERE deleted_at IS NULL`
    return db.prepare(query).all() as Empreendimento[]
  }

  findById(id: number): Empreendimento | undefined {
    const query = `SELECT * FROM empreendimentos WHERE id = ? AND deleted_at IS NULL`
    return db.prepare(query).get(id) as Empreendimento | undefined
  }

  create(data: Empreendimento): number {
    const query = `
      INSERT INTO empreendimentos
      (nome, responsavel, municipio, segmento, contato, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `
    const result = db.prepare(query).run(
      data.nome,
      data.responsavel,
      data.municipio,
      data.segmento,
      data.contato,
      data.status ? 1 : 0
    )
    return result.lastInsertRowid as number
  }

  update(id: number, data: Empreendimento): boolean {
    const query = `
      UPDATE empreendimentos
      SET nome = ?,
          responsavel = ?,
          municipio = ?,
          segmento = ?,
          contato = ?,
          status = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND deleted_at IS NULL
    `
    const result = db.prepare(query).run(
      data.nome,
      data.responsavel,
      data.municipio,
      data.segmento,
      data.contato,
      data.status ? 1 : 0,
      id
    )
    return result.changes > 0
  }

  delete(id: number): boolean {
    const query = `
      UPDATE empreendimentos
      SET deleted_at = CURRENT_TIMESTAMP
      WHERE id = ? AND deleted_at IS NULL
    `
    const result = db.prepare(query).run(id)
    return result.changes > 0
  }
}