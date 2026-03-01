import { AppError } from '../errors/error'
import { Empreendimento, SEGMENTOS } from '../../models/empreendimento'

export function validateSegmento(segmento?: string) {
    if (segmento && !SEGMENTOS.includes(segmento as any)) {
        throw new AppError(`Segmento inválido. Permitidos: ${SEGMENTOS.join(', ')}`, 400)
    }
}

export function validateEmpreendimento(data: Empreendimento) {
    const { nome, responsavel, municipio, segmento, contato, email } = data

    if (!nome || !responsavel || !municipio || !segmento || !contato || !email) {
        throw new AppError('Todos os campos são obrigatórios (nome, responsavel, municipio, segmento, contato, email)', 400)
    }

    validateSegmento(segmento)
}

export function validateEmailUniqueness(exists: boolean) {
    if (exists) {
        throw new AppError('E-mail já cadastrado no sistema', 409)
    }
}