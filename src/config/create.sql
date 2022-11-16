CREATE DATABASE maloca

CREATE TABLE pessoas(
    pessoa_id       VARCHAR(32) PRIMARY KEY NOT NULL,
    nome            VARCHAR(64) NOT NULL,
    descricao       VARCHAR(150),
    avatar          VARCHAR(255) DEFAULT 'avatar.jpg',
    fundo           VARCHAR(255) DEFAULT 'fundo.jpg',
    data_ingresso   TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE autenticacao(
    pessoa_id       VARCHAR(32) PRIMARY KEY REFERENCES pessoas(pessoa_id),
    email           VARCHAR UNIQUE NOT NULL,
    hash            VARCHAR NOT NULL,
    salt            VARCHAR NOT NULL
);

CREATE TABLE paginas_pessoais(
    pagina_pessoal_id   BIGSERIAL PRIMARY KEY NOT NULL,
    pessoa_id           VARCHAR(32) REFERENCES pessoas(pessoa_id) ON DELETE CASCADE,
    ordem               SERIAL NOT NULL,
    titulo              VARCHAR(64),
    publica             BOOLEAN DEFAULT false,
    criacao             TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE imagens_pessoais (
    imagem_pessoal_id   BIGSERIAL PRIMARY KEY NOT NULL,
    pessoa_id           VARCHAR(32) REFERENCES pessoas(pessoa_id) ON DELETE CASCADE,
    nome_arquivo        VARCHAR(255) NOT NULL,
    album               VARCHAR(32) NOT NULL,
    descricao           TEXT,
    sensivel            BOOLEAN DEFAULT false,
    aviso_de_conteudo   VARCHAR(64),
    data_criacao        TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE textos_pessoais (
    texto_pessoal_id    BIGSERIAL PRIMARY KEY NOT NULL,
    pessoa_id           VARCHAR(32) REFERENCES pessoas(pessoa_id) ON DELETE CASCADE,
    blog                VARCHAR(32) NOT NULL,
    titulo              VARCHAR(64),
    sensivel            BOOLEAN DEFAULT false,
    aviso_de_conteudo   VARCHAR(64),
    data_criacao        TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sessoes (
    sid VARCHAR COLLATE "default",
    sess json NOT NULL,
    expire timestamp(6) NOT NULL,
    CONSTRAINT "session_pkey" PRIMARY KEY ("sid")
);
CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON sessoes ("expire");

CREATE TABLE comunidades(
    comunidade_id   VARCHAR(32) PRIMARY KEY NOT NULL,
    nome            VARCHAR(64) NOT NULL,
    descricao       VARCHAR(150),
    avatar          VARCHAR(255) DEFAULT 'avatar_comum.jpg',
    fundo           VARCHAR(255) DEFAULT 'fundo_comum.jpg',
    aberta          BOOLEAN DEFAULT true,
    criacao         TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pessoas_comunidades(
    pessoa_id       VARCHAR(32) REFERENCES pessoas(pessoa_id) ON DELETE CASCADE,
    comunidade_id   VARCHAR(32) REFERENCES comunidades(comunidade_id) ON DELETE CASCADE,
    participar      BOOLEAN DEFAULT true,
    editar          BOOLEAN DEFAULT false,
    moderar         BOOLEAN DEFAULT false,
    cuidar          BOOLEAN DEFAULT false
);

CREATE TABLE paginas_comunitarias(
    pagina_comunitaria_id   SERIAL PRIMARY KEY NOT NULL,
    comunidade_id           VARCHAR(32) REFERENCES comunidades(comunidade_id) ON DELETE CASCADE,
    ordem                   SERIAL NOT NULL,
    titulo                  VARCHAR(64),
    publica                 BOOLEAN DEFAULT false,
    criacao                 TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE imagens_comunitarias (
    imagem_comunitaria_id   BIGSERIAL PRIMARY KEY NOT NULL,
    comunidade_id           VARCHAR(32) REFERENCES comunidades(comunidade_id) ON DELETE CASCADE,
    pessoa_id               VARCHAR(32) REFERENCES pessoas(pessoa_id) ON DELETE SET NULL,
    nome_arquivo            VARCHAR(255) NOT NULL,
    album                   VARCHAR(32) NOT NULL,
    descricao               TEXT,
    sensivel                BOOLEAN DEFAULT false,
    aviso_de_conteudo       VARCHAR(64),
    data_criacao            TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE textos_comunitarios (
    texto_comunitario_id    BIGSERIAL PRIMARY KEY NOT NULL,
    comunidade_id           VARCHAR(32) REFERENCES comunidades(comunidade_id) ON DELETE CASCADE,
    pessoa_id               VARCHAR(32) REFERENCES pessoas(pessoa_id) ON DELETE SET NULL,
    blog                    VARCHAR(32) NOT NULL,
    titulo                  VARCHAR(64),
    sensivel                BOOLEAN DEFAULT false,
    aviso_de_conteudo       VARCHAR(64),
    data_criacao            TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE blocos(
    bloco_id            VARCHAR(32) PRIMARY KEY NOT NULL,
    descricao           VARCHAR(500) NOT NULL,
    pessoal             BOOLEAN DEFAULT false,
    comunitario         BOOLEAN DEFAULT true,
    armazena_arquivos   BOOLEAN DEFAULT false,
    armazena_dados      BOOLEAN DEFAULT false,
    criacao             TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE blocos_paginas_pessoais(
    bloco_pagina_pessoal_id     SERIAL PRIMARY KEY,
    bloco_id                    VARCHAR(32) REFERENCES blocos(bloco_id) ON DELETE SET NULL,
    pagina_pessoal_id           SERIAL REFERENCES paginas_pessoais(pagina_pessoal_id) ON DELETE CASCADE
);

CREATE TABLE blocos_paginas_comunitarias(
    bloco_pagina_comunitaria_id     SERIAL PRIMARY KEY,
    bloco_id                        VARCHAR(32) REFERENCES blocos(bloco_id) ON DELETE SET NULL,
    pagina_comunitaria_id           SERIAL REFERENCES paginas_comunitarias(pagina_comunitaria_id) ON DELETE CASCADE
);