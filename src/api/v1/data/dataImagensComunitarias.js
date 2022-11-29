const pool = require('../../../config/database');

function getImagensComunitarias(comunidadeId) {
	return pool.query(
		'SELECT * FROM imagens_comunitarias WHERE comunidade_id = $1',
		[comunidadeId]
	);
}

function getImagensAlbumComunitario(comunidadeId, album) {
	return pool.query(
		'SELECT * FROM imagens_comunitarias WHERE comunidade_id = $1 AND album = $2',
		[comunidadeId, album]
	);
}

function getImagemComunitaria(comunidadeId, imagemId) {
	return pool.query(
		'SELECT * FROM imagens_comunitarias WHERE comunidade_id = $1 AND imagem_comunitaria_id = $2',
		[comunidadeId, imagemId]
	);
}

function createImagemComunitaria(dados) {
	return pool.query(
		'INSERT INTO imagens_comunitarias (comunidade_id, pessoa_id, nome_arquivo, descricao, album) VALUES ($1, $2, $3, $4, $5) RETURNING *',
		[dados.comunidade_id, dados.pessoa_id, dados.nome_arquivo, dados.descricao, dados.album]
	);
}

function editImagemComunitaria(dados){
	return pool.query(
		'UPDATE imagens_comunitarias SET descricao = $1, album = $2 WHERE comunidade_id = $3 AND imagem_comunitaria_id = $4 RETURNING *',
		[dados.descricao, dados.album, dados.comunidade_id, dados.imagem_comunitaria_id]	
	);
}

function deleteImagemComunitaria(dados){
	return pool.query(
		'DELETE FROM imagens_comunitarias WHERE comunidade_id = $1 AND imagem_comunitaria_id = $2 RETURNING *',
		[dados.comunidade_id, dados.imagem_comunitaria_id]
	);
}

exports.getImagensComunitarias = getImagensComunitarias;
exports.getImagensAlbumComunitario = getImagensAlbumComunitario;
exports.getImagemComunitaria = getImagemComunitaria;
exports.createImagemComunitaria = createImagemComunitaria;
exports.editImagemComunitaria = editImagemComunitaria;
exports.deleteImagemComunitaria = deleteImagemComunitaria;