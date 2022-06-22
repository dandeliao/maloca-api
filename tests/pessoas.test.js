/* eslint-disable no-undef */
const axios = require('axios');
const servicePessoas = require('../src/api/v1/services/servicePessoas');
const geraString = require('../src/api/v1/utils/utilGenString');

function geraPessoa() {
	let pessoa_id = geraString(1, 32, 'simples');
	let nome = geraString(1, 64, 'completo');
	return { pessoa_id, nome };
}

async function request(caminho, method, data) {
	let url = `http://localhost:4000${caminho}`;
	return await axios({ url, method, data });
}

test('esperado: obtém (get) pessoas', async () => {

	const pessoa1 = geraPessoa();
	const pessoa2 = geraPessoa();
	const pessoa3 = geraPessoa();
	const p1 = await servicePessoas.postPessoa(pessoa1);
	const p2 = await servicePessoas.postPessoa(pessoa2);
	const p3 = await servicePessoas.postPessoa(pessoa3);

	const response = await request('/pessoas', 'get');
	const pessoas = response.data;

	expect(pessoas).toHaveLength(3);
	await servicePessoas.deletePessoa(p1.pessoa_id);
	await servicePessoas.deletePessoa(p2.pessoa_id);
	await servicePessoas.deletePessoa(p3.pessoa_id);

});

test('esperado: obtém (get) pessoa específica', async () => {

	const pessoa1 = geraPessoa();
	const p = await servicePessoas.postPessoa(pessoa1);

	const response = await request(`/pessoas/${p.pessoa_id}`, 'get');
	const pessoa = response.data;

	expect(pessoa.pessoa_id).toBe(p.pessoa_id);
	await servicePessoas.deletePessoa(p.pessoa_id);

});

test('esperado: cria (post) nova pessoa', async () => {

	const dados = geraPessoa();
	
	const responsePost = await request('/pessoas', 'post', dados);
	const { pessoa_id } = responsePost.data;

	const responseGet = await request(`/pessoas/${pessoa_id}`, 'get');
	const pessoa = responseGet.data;
	expect(pessoa.pessoa_id).toBe(dados.pessoa_id);
	expect(pessoa.nome).toBe(dados.nome);
	await servicePessoas.deletePessoa(pessoa.pessoa_id);

});

test('esperado: modifica (put) pessoa', async () => {
	const pessoa = geraPessoa();
	const p = await servicePessoas.postPessoa(pessoa);
	
	const novaPessoa = geraPessoa();
	await request(`/pessoas/${p.pessoa_id}`, 'put', novaPessoa);
	
	const pessoaAtualizada = await servicePessoas.getPessoa(novaPessoa.pessoa_id);
	expect(pessoaAtualizada.pessoa_id).toBe(novaPessoa.pessoa_id);
	expect(pessoaAtualizada.nome).toBe(novaPessoa.nome);
	await servicePessoas.deletePessoa(pessoaAtualizada.pessoa_id);

});

test('esperado: deleta pessoa', async () => {

	const pessoa = geraPessoa();
	const { pessoa_id } = await servicePessoas.postPessoa(pessoa);

	const response = await request(`/pessoas/${pessoa_id}`, 'delete');
	const pessoas = await servicePessoas.getPessoas();
	expect(pessoas).toHaveLength(0);
	expect(response.data).toBe('sucesso');
	
});