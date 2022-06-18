CREATE DATABASE maloca

CREATE TABLE pessoas(
    pessoa_id       uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    arroba          VARCHAR(32) UNIQUE NOT NULL,
    nome            VARCHAR(64) NOT NULL,
    avatar          VARCHAR(255) DEFAULT 'avatar.jpg',
    fundo           VARCHAR(255) DEFAULT 'fundo.jpg',
    email           VARCHAR UNIQUE NOT NULL,
    data_ingresso   TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    indicada_por    uuid REFERENCES pessoas(pessoa_id)
);

CREATE TABLE senhas(
    pessoa_id       uuid PRIMARY KEY REFERENCES pessoas(pessoa_id),
    hash            VARCHAR NOT NULL,
    salt            VARCHAR NOT NULL
);

CREATE TABLE paginas_pessoais(
    pagina_pessoal_id   BIGSERIAL PRIMARY KEY,
    pessoa_id           uuid REFERENCES pessoas(pessoa_id),
    arquivo_html        VARCHAR(255),
    nome                VARCHAR(64),
    publica             BOOLEAN DEFAULT false,
    criacao             TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);