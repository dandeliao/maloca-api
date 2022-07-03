const dataPessoas = require('../data/dataPessoas');
const dataAutenticacao = require('../data/dataAutenticacao');
const geraHashESalt = require('../../../utils/utilPassword').geraHashESalt;

exports.postRegistro = async function (dados) {
	const pessoaExistente = await dataPessoas.getPessoa(dados.pessoa_id);
	if (pessoaExistente.rowCount !== 0) throw new Error('pessoa já existe');
	const pessoa = {
		pessoa_id: dados.pessoa_id,
		nome: dados.nome
	};
	const saltHash = geraHashESalt(dados.senha);
	const segredos = {
		email: dados.email,
		hash: saltHash.hash,
		salt: saltHash.salt
	};
	const arrayNovaPessoa = await dataPessoas.postPessoa(pessoa);
	await dataAutenticacao.postSegredos(arrayNovaPessoa.rows[0].pessoa_id, segredos);
	return arrayNovaPessoa.rows[0];
};