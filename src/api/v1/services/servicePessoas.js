const basePessoas = require('../controllers/controllerPessoas');

exports.getPessoas = function () {
	return basePessoas.getPessoas();
};

exports.getPessoa = function (pessoaId) {
	return basePessoas.getPessoa(pessoaId);
};

exports.postPessoa = function (pessoa) {
	return basePessoas.postPessoa(pessoa);
};

exports.deletePessoa = function (pessoaId) {
	return basePessoas.deletePessoa(pessoaId);
};