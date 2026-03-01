import db from '../database/sqlite'
import { Empreendimento } from '../../models/empreendimento'

export class EmpreendimentosRepository {
  
  private readonly SELECT_COLUMNS = `
    id,
    nome,
    responsavel,
    municipio,
    segmento,
    email,
    contato,
    CASE WHEN status = 1 THEN 'ativo' ELSE 'inativo' END AS status,
    created_at as criacao
  `;

  findAll(): Empreendimento[] {
    const query = `SELECT ${this.SELECT_COLUMNS} FROM empreendimentos  WHERE deleted_at IS NULL`

    return db.prepare(query).all() as Empreendimento[]
  }

  findById(id: number): Empreendimento | undefined {
    const query = `SELECT ${this.SELECT_COLUMNS} FROM empreendimentos WHERE id = ? AND deleted_at IS NULL`

    return db.prepare(query).get(id) as Empreendimento | undefined
  }

  create(data: Empreendimento): number {
    const query = `
      INSERT INTO empreendimentos
      (nome, responsavel, municipio, segmento, email, contato, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `

    const result = db.prepare(query).run(
      data.nome,
      data.responsavel,
      data.municipio,
      data.segmento,
      data.email,
      data.contato,
      data.status ? 0 : 1
    )
    return result.lastInsertRowid as number
  }

  update(id: number, data: Partial<Empreendimento>): boolean {
    const fields: string[] = []
    const values: any[] = []

    /* mapeia os campos que vieram no objeto 'data' */
    Object.keys(data).forEach((key) => {
      const value = (data as any)[key]
      
      if (value !== undefined) {
        if (key === 'status') {
          fields.push(`status = ?`)
          values.push(value === true ? 1 : 0)
        } else if (key !== 'id') {
          fields.push(`${key} = ?`)
          values.push(value)
        }
      }
    })

    if (fields.length === 0) {
      return false
    }

    fields.push(`updated_at = CURRENT_TIMESTAMP`)
    
    const query = `UPDATE empreendimentos SET ${fields.join(', ')} WHERE id = ? AND deleted_at IS NULL`
    const result = db.prepare(query).run(...values, id)

    return result.changes > 0
  }

  delete(id: number): boolean {
    const query = `UPDATE empreendimentos SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL`
    const result = db.prepare(query).run(id)

    return result.changes > 0
  }

  findByEmail(email: string): Empreendimento | undefined {
    const query = `SELECT id, email FROM empreendimentos WHERE email = ? AND deleted_at IS NULL`

    return db.prepare(query).get(email) as Empreendimento | undefined
  }
}