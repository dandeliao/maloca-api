const dataPessoas = require('../data/dataPessoas');
const dataAutenticacao = require('../data/dataAutenticacao');
const geraHashESalt = require('../../../utils/utilPassword').geraHashESalt;
const fs = require('fs');
const path = require('path');

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
	// cria pastas pessoais
	const pastaPessoal = path.join(path.resolve(__dirname, '../../../../static'), 'pessoas', `${dados.pessoa_id}`);
	if (!fs.existsSync(pastaPessoal)){
		fs.mkdirSync(pastaPessoal);
	}
	if (!fs.existsSync(path.join(pastaPessoal, 'imagens'))){
		fs.mkdirSync(path.join(pastaPessoal, 'imagens'));
	}
	if (!fs.existsSync(path.join(pastaPessoal, 'paginas'))){
		fs.mkdirSync(path.join(pastaPessoal, 'paginas'));
	}
	// copia avatar padrão para pasta pessoal / imagens
	const pastaDefault = path.join(path.resolve(__dirname, '../../../../static'), 'default');
	fs.copyFileSync(path.join(pastaDefault, 'avatar.jpg'), path.join(pastaPessoal, 'imagens', 'avatar.jpg'));
	return arrayNovaPessoa.rows[0];
};