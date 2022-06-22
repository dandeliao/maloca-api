const controllerPessoas = require('../controllers/controllerPessoas');

exports.getPessoas = async function () {
	const objetoPessoas = await controllerPessoas.getPessoas();
	return objetoPessoas.rows;
};

exports.getPessoa = async function (pessoaId) {
	const objetoPessoa = await controllerPessoas.getPessoa(pessoaId);
	return objetoPessoa.rows[0];
};

exports.postPessoa = async function (pessoa) {
	const objetoPessoaId = await controllerPessoas.postPessoa(pessoa);
	return objetoPessoaId.rows[0];
};

exports.putPessoa = async function (pessoaId, pessoa) {
	const objetoPessoa = await controllerPessoas.putPessoa(pessoaId, pessoa);
	return objetoPessoa.rows[0];
};

exports.deletePessoa = async function (pessoaId) {
	const veredito = await controllerPessoas.deletePessoa(pessoaId);
	if (veredito.rowCount == 1) {
		return 'sucesso';
	} else {
		return 'fracasso';	
	}
};