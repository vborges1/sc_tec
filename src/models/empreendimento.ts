export const SEGMENTOS = ['Tecnologia', 'Comércio', 'Indústria', 'Serviços', 'Agronegócio'] as const

export type Segmento = typeof SEGMENTOS[number]

export interface Empreendimento {
  id?: number
  nome: string
  responsavel: string
  municipio: string
  segmento: 'Tecnologia' | 'Comércio' | 'Indústria' | 'Serviços' | 'Agronegócio'
  email: string
  contato: string
  status: 'ativo' | 'inativo'
  created_at?: string
  updated_at?: string
}