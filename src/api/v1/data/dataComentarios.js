const pool = require('../../../config/database');

function getComentario(comentarioId) {
	return pool.query(
		'SELECT * FROM comentarios WHERE comentario_id = $1',
		[comentarioId]
	);
}

function getComentariosComunidade(comunidadeId) {
	return pool.query(
		'SELECT * FROM comentarios WHERE comunidade_id = $1',
		[comunidadeId]
	);
}

function getComentariosPessoa(pessoaId) {
	return pool.query(
		'SELECT * FROM comentarios WHERE pessoa_id = $1',
		[pessoaId]
	);
}

function getComentariosTexto(textoId) {
	return pool.query(
		'SELECT * FROM comentarios INNER JOIN comentarios_textos_comunitarios ON comentarios.comentario_id = comentarios_textos_comunitarios.comentario_id WHERE comentarios_textos_comunitarios.texto_comunitario_id = $1',
		[textoId]
	);
}

function getComentariosImagem(imagemId) {
	return pool.query(
		'SELECT * FROM comentarios INNER JOIN comentarios_imagens_comunitarias ON comentarios.comentario_id = comentarios_imagens_comunitarias.comentario_id WHERE comentarios_imagens_comunitarias.imagem_comunitaria_id = $1',
		[imagemId]
	);
}

function createComentario(dados) {
	return pool.query(
		'INSERT INTO comentarios (pessoa_id, texto, sensivel, aviso_de_conteudo) VALUES ($1, $2, $3, $4) RETURNING *',
		[dados.pessoa_id, dados.texto, dados.sensivel, dados.aviso_de_conteudo]
	);
}

function createComentarioTexto(dados) {
	return pool.query(
		'INSERT INTO comentarios_textos_comunitarios (comentario_id, texto_comunitario_id) VALUES ($1, $2) RETURNING *',
		[dados.comentario_id, dados.texto_comunitario_id]
	);
}

function createComentarioImagem(dados) {
	return pool.query(
		'INSERT INTO comentarios_imagens_comunitarias (comentario_id, imagem_comunitaria_id) VALUES ($1, $2) RETURNING *',
		[dados.comentario_id, dados.imagem_comunitaria_id]
	);
}

function deleteComentario(comentarioId){
	return pool.query(
		'DELETE FROM comentarios WHERE comentario_id = $1 RETURNING *',
		[comentarioId]
	);
}

exports.getComentario = getComentario;
exports.getComentariosComunidade = getComentariosComunidade;
exports.getComentariosPessoa = getComentariosPessoa;
exports.getComentariosTexto = getComentariosTexto;
exports.getComentariosImagem = getComentariosImagem;
exports.createComentario = createComentario;
exports.createComentarioTexto = createComentarioTexto;
exports.createComentarioImagem = createComentarioImagem;
exports.deleteComentario = deleteComentario;