const pool = require('../../../config/database');

function getPessoasComunidade(comunidadeId) {
	return pool.query(
		'SELECT * FROM pessoas_comunidades WHERE comunidade_id = $1',
		[comunidadeId]
	);
}

function getPessoaComunidades(pessoaId) {
	return pool.query(
		'SELECT * FROM pessoas_comunidades WHERE pessoa_id = $1',
		[pessoaId]
	);
}

function getPessoaComunidade(pessoaId, comunidadeId) {
	return pool.query(
		'SELECT * FROM pessoas_comunidades WHERE pessoa_id = $1 AND comunidade_id = $2',
		[pessoaId, comunidadeId]
	);
}

function postPessoaComunidade(pessoaId, comunidadeId, habilidades) {
	return pool.query(
		'INSERT INTO pessoas_comunidades (pessoa_id, comunidade_id, ver, participar, editar, moderar, cuidar) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
		[pessoaId, comunidadeId, habilidades.ver, habilidades.participar, habilidades.editar, habilidades.moderar, habilidades.cuidar]
	);
}

function putPessoaComunidade(pessoaId, comunidadeId, habilidades) {
	return pool.query(
		'UPDATE pessoas_comunidades SET ver = $1, participar = $2, editar = $3, moderar = $4, cuidar = $5 WHERE pessoa_id = $6 AND comunidade_id = $7 RETURNING *',
		[habilidades.ver, habilidades.participar, habilidades.editar, habilidades.moderar, habilidades.cuidar, pessoaId, comunidadeId]
	);
}

function deletePessoaComunidade(pessoaId, comunidadeId) {
	return pool.query(
		'DELETE FROM pessoas_comunidades WHERE pessoa_id = $1 AND comunidade_id = $2',
		[pessoaId, comunidadeId]
	);
}

exports.getPessoasComunidade = getPessoasComunidade;
exports.getPessoaComunidades = getPessoaComunidades;
exports.getPessoaComunidade = getPessoaComunidade;
exports.postPessoaComunidade = postPessoaComunidade;
exports.deletePessoaComunidade = deletePessoaComunidade;
exports.putPessoaComunidade = putPessoaComunidade;