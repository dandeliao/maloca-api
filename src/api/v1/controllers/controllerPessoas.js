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
		[pessoa.pessoaId, pessoa.nome]
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