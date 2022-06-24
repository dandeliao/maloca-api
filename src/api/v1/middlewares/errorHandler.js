function errorHandler (erro, req, res, next) {
	if (erro.message === 'pessoa não encontrada') {
		res.status(404).send(erro.message);
		next();
	}
	if (erro.message === 'pessoa já existe') {
		res.status(409).send(erro.message);
		next();
	}
	res.status(500).send(erro.message);
	next();
}

module.exports = errorHandler;