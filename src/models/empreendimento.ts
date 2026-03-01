export type Segmento =
  | 'Tecnologia'
  | 'Comércio'
  | 'Indústria'
  | 'Serviços'
  | 'Agronegócio'

export interface Empreendimento {
  id?: number
  nome: string
  responsavel: string
  municipio: string
  segmento: 'Tecnologia' | 'Comércio' | 'Indústria' | 'Serviços' | 'Agronegócio'
  contato: string
  status: 'ativo' | 'inativo'
  created_at?: string
  updated_at?: string
}