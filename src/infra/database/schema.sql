CREATE TABLE IF NOT EXISTS empreendimentos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  responsavel TEXT NOT NULL,
  municipio TEXT NOT NULL,
  segmento TEXT NOT NULL CHECK (
    segmento IN ('Tecnologia','Comércio','Indústria','Serviços','Agronegócio')
  ),
  contato TEXT NOT NULL,
  status BOOLEAN NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);