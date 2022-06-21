/* eslint-disable no-undef */
const axios = require('axios');
const servicePessoas = require('../src/api/v1/services/servicePessoas');
const geraString = require('../src/api/v1/utils/utilGenString');

function geraPessoa() {
	let pessoaId = geraString(1, 32, 'simples');
	let nome = geraString(1, 64, 'completo');
	return { pessoaId, nome };
}

async function request(caminho, method, data) {
	let url = `http://localhost:4000${caminho}`;
	return await axios({ url, method, data });
}

test('esperado: get pessoas', async () => {

	const pessoa1 = geraPessoa();
	const pessoa2 = geraPessoa();
	const pessoa3 = geraPessoa();
	const p1 = await servicePessoas.postPessoa(pessoa1);
	const p2 = await servicePessoas.postPessoa(pessoa2);
	const p3 = await servicePessoas.postPessoa(pessoa3);

	const response = await request('/pessoas', 'get');
	const pessoas = response.data;
	console.log('pessoas:', pessoas);

	expect(pessoas).toHaveLength(3);
	await servicePessoas.deletePessoa(p1.pessoa_id);
	await servicePessoas.deletePessoa(p2.pessoa_id);
	await servicePessoas.deletePessoa(p3.pessoa_id);

});

test.only('esperado: get pessoa (específica)', async () => {

	const pessoa1 = geraPessoa();
	const p = await servicePessoas.postPessoa(pessoa1);
	console.log('p (1):', p);

	const response = await request(`/pessoas/${p.pessoa_id}`, 'get');
	const pessoa = response.data;
	console.log('pessoa:', pessoa);

	expect(pessoa.pessoa_id).toBe(p.pessoa_id);
	await servicePessoas.deletePessoa(p.pessoa_id);

});

test.only('esperado: cria nova pessoa', async () => {

	const dados = geraPessoa();
	
	const responsePost = await request('/pessoas', 'post', dados);
	const { pessoa_id } = responsePost.data;

	const responseGet = await request(`/pessoas/${pessoa_id}`, 'get');
	const pessoa = responseGet.data;
	console.log('pessoa:', pessoa);
	expect(pessoa.pessoa_id).toBe(dados.pessoaId);
	expect(pessoa.nome).toBe(dados.nome);
	await servicePessoas.deletePessoa(pessoa.pessoa_id);

});