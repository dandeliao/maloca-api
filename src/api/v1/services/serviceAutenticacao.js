const dataPessoas = require('../data/dataPessoas');
const dataAutenticacao = require('../data/dataAutenticacao');
const dataPessoasComunidades = require('../data/dataPessoasComunidades');
const servicePaginasPessoais = require('./servicePaginasPessoais');
const utilRandomGenerator = require('../../../utils/utilRandomGenerators');
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
	const pessoaId = arrayNovaPessoa.rows[0].pessoa_id;
	await dataAutenticacao.postSegredos(pessoaId, segredos);
	
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
	
	// sorteia e copia avatar padrão para pasta pessoal / imagens
	const pastaDefault = path.join(path.resolve(__dirname, '../../../../static'), 'default', 'avatarPessoas');
	const numArquivos = fs.readdirSync(pastaDefault).length;
	const sorteio = Math.floor(Math.random() * (numArquivos));
	fs.copyFileSync(path.join(pastaDefault, `${sorteio}.jpg`), path.join(pastaPessoal, 'imagens', 'avatar.jpg'));

	// sorteia e copia fundo padrão para pasta pessoal / imagens
	// >> a fazer <<

	// cria página pessoal padrão
	let benjor = utilRandomGenerator.geraBenJor();
	const dadosPaginaPadrao = {
		pessoa_id: pessoaId,
		titulo: 'página 1',
		publica: true,
		html: `
		<div id="container">


		<div>
		<h2>@${pessoaId}</h2>
		<img src="http://localhost:4000/pessoas/${pessoaId}/objetos/avatar">
		
		</div>
		
		<p>Oi! Acabei de chegar na maloca!</p>
		<br>
		</p><p>~~~</p>
		<br>
		<marquee>"${benjor}" - Jorge Ben Jor</marquee>
		</div>
		
		<style>
		* {
		font-family: monospace;
		}
		#container {
		display: block;
		max-width: 720px;
		margin: 0 auto;
		text-align: center;
		
		}
		
		</style>
		`
	};
	await servicePaginasPessoais.createPaginaPessoal(dadosPaginaPadrao);

	// cadastra pessoa na comunidade maloca
	await dataPessoasComunidades.postPessoaComunidade(arrayNovaPessoa.rows[0].pessoa_id, 'maloca', {ver: true, participar: true, editar: false, moderar: false, cuidar: false});

	return arrayNovaPessoa.rows[0];
};