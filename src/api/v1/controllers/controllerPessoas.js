const pool = require('../../../config/database');

function getPessoas() {
	return pool.query(
		'SELECT * FROM pessoas'
	);
}

function getPessoa(pessoaId) {
	return pool.query(
		'SELECT * FROM pessoas WHERE pessoa_id = $1',
		[pessoaId]
	);
}

function postPessoa(pessoa) {
	return pool.query(
		'INSERT INTO pessoas (pessoa_id, nome) VALUES ($1, $2) RETURNING pessoa_id',
		[pessoa.pessoa_id, pessoa.nome]
	);
}

function putPessoa(pessoaId, pessoa) {
	return pool.query(
		'UPDATE pessoas SET pessoa_id = $1, nome = $2 WHERE pessoa_id = $3 RETURNING *',
		[pessoa.pessoa_id, pessoa.nome, pessoaId]
	);
}

function deletePessoa(pessoaId) {
	return pool.query(
		'DELETE FROM pessoas WHERE pessoa_id = $1',
		[pessoaId]
	);
}

exports.getPessoas = getPessoas;
exports.postPessoa = postPessoa;
exports.deletePessoa = deletePessoa;
exports.getPessoa = getPessoa;
exports.putPessoa = putPessoa;