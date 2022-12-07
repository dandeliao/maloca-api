const pool = require('../../../config/database');

exports.getForuns = function (comunidadeId) {
	return pool.query(
		'SELECT * FROM foruns WHERE comunidade_id = $1',
		[comunidadeId]
	);
};

exports.postForum = function (comunidadeId, forumId) {
	return pool.query(
		'INSERT INTO foruns (comunidade_id, forum_id) VALUES ($1, $2) RETURNING *',
		[comunidadeId, forumId]
	);
};

exports.getTopicos = function (forumId) {
	return pool.query(
		'SELECT * FROM topicos WHERE forum_id = $1',
		[forumId]
	);
};

exports.getTopico = function (topicoId) {
	return pool.query(
		'SELECT * FROM topicos WHERE topico_id = $1',
		[topicoId]
	);
};

exports.createTopico = function (dados) {
	return pool.query(
		'INSERT INTO topicos (pessoa_id, titulo, forum_id) VALUES ($1, $2, $3) RETURNING *',
		[dados.pessoa_id, dados.titulo, dados.forum_id]
	);
};

exports.editTopico = function (dados){
	return pool.query(
		'UPDATE topicos SET titulo = $1, forum_id = $2 WHERE topico_id = $3 RETURNING *',
		[dados.titulo, dados.forum_id, dados.topico_id]	
	);
};

exports.deleteTopico = function (topicoId){
	return pool.query(
		'DELETE FROM topicos WHERE topico_id = $1 RETURNING *',
		[topicoId]
	);
};