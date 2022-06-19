CREATE DATABASE maloca

CREATE TABLE pessoas(
    pessoa_id       VARCHAR(32) PRIMARY KEY NOT NULL,
    nome            VARCHAR(64) NOT NULL,
    avatar          VARCHAR(255) DEFAULT 'avatar.jpg',
    fundo           VARCHAR(255) DEFAULT 'fundo.jpg',
    data_ingresso   TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    indicada_por    VARCHAR(32) REFERENCES pessoas(pessoa_id)
);

CREATE TABLE autenticacao(
    pessoa_id       VARCHAR(32) PRIMARY KEY REFERENCES pessoas(pessoa_id),
    email           VARCHAR UNIQUE NOT NULL,
    hash            VARCHAR NOT NULL,
    salt            VARCHAR NOT NULL
);

CREATE TABLE paginas_pessoais(
    pessoa_id           VARCHAR(32) REFERENCES pessoas(pessoa_id),
    pagina_pessoal_id   BIGSERIAL,
    arquivo_html        VARCHAR(255),
    nome                VARCHAR(64),
    publica             BOOLEAN DEFAULT false,
    criacao             TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(pessoa_id, pagina_pessoal_id)
);