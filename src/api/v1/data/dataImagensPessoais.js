const pool = require('../../../config/database');

function getImagensPessoais(pessoaId) {
	return pool.query(
		'SELECT * FROM imagens_pessoais WHERE pessoa_id = $1',
		[pessoaId]
	);
}

function createImagemPessoal(dados) {
	return pool.query(
		'INSERT INTO imagens_pessoais (pessoa_id, nome_arquivo, descricao, album) VALUES ($1, $2, $3, $4) RETURNING *',
		[dados.pessoa_id, dados.nome_arquivo, dados.descricao, dados.album]
	);
}

function editImagemPessoal(dados){
	return pool.query(
		'UPDATE imagens_pessoais SET descricao = $1, album = $2 WHERE pessoa_id = $3 AND imagem_pessoal_id = $4 RETURNING *',
		[dados.descricao, dados.album, dados.pessoa_id, dados.imagem_pessoal_id]	
	);
}

function deleteImagemPessoal(dados){
	return pool.query(
		'DELETE FROM imagens_pessoais WHERE pessoa_id = $1 AND imagem_pessoal_id = $2 RETURNING *',
		[dados.pessoa_id, dados.imagem_pessoal_id]
	);
}

exports.getImagensPessoais = getImagensPessoais;
exports.createImagemPessoal = createImagemPessoal;
exports.editImagemPessoal = editImagemPessoal;
exports.deleteImagemPessoal = deleteImagemPessoal;