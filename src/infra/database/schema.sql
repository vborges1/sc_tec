CREATE TABLE IF NOT EXISTS empreendimentos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  responsavel TEXT NOT NULL,
  municipio TEXT NOT NULL,
  segmento TEXT NOT NULL CHECK (
    segmento IN ('Tecnologia','Comércio','Indústria','Serviços','Agronegócio')
  ),
  email TEXT NOT NULL,
  contato TEXT NOT NULL,
  status BOOLEAN NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS unique_email_not_deleted
ON empreendimentos(email)
WHERE deleted_at IS NULL;