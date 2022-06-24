/* eslint-disable no-undef */
const axios = require('axios');
const servicePessoas = require('../src/api/v1/services/servicePessoas');
const geraString = require('../src/api/v1/utils/utilGenString');

// ---
// auxiliares

function geraPessoa() {
	let pessoa_id = geraString(1, 32, 'simples');
	let nome = geraString(1, 64, 'completo');
	return { pessoa_id, nome };
}

function request(caminho, method, data) {
	let url = `http://localhost:4000${caminho}`;
	return axios({ url, method, data, validateStatus: false});
}

// ---
// testes

// rotas get

test('esperado: obtém pessoas', async () => {

	const pessoa1 = geraPessoa();
	const pessoa2 = geraPessoa();
	const pessoa3 = geraPessoa();
	const p1 = await servicePessoas.postPessoa(pessoa1);
	const p2 = await servicePessoas.postPessoa(pessoa2);
	const p3 = await servicePessoas.postPessoa(pessoa3);

	const response = await request('/pessoas', 'get');
	const pessoas = response.data;

	expect(response.status).toBe(200);
	expect(pessoas).toHaveLength(3);
	await servicePessoas.deletePessoa(p1.pessoa_id);
	await servicePessoas.deletePessoa(p2.pessoa_id);
	await servicePessoas.deletePessoa(p3.pessoa_id);

});

test('esperado: obtém pessoa específica', async () => {

	const dados = geraPessoa();
	const p = await servicePessoas.postPessoa(dados);

	const response = await request(`/pessoas/${p.pessoa_id}`, 'get');
	const pessoa = response.data;

	expect(response.status).toBe(200);
	expect(pessoa.pessoa_id).toBe(p.pessoa_id);
	await servicePessoas.deletePessoa(p.pessoa_id);

});

test('esperado: não obtém pessoa específica (404)', async () => {

	const pessoa = geraPessoa();

	const response = await request(`/pessoas/${pessoa.pessoa_id}`, 'get');

	expect(response.status).toBe(404);

});

// rotas post

test('esperado: cria nova pessoa', async () => {

	const dados = geraPessoa();
	
	const response = await request('/pessoas', 'post', dados);
	const pessoa = response.data;

	expect(response.status).toBe(201);
	expect(pessoa.pessoa_id).toBe(dados.pessoa_id);
	expect(pessoa.nome).toBe(dados.nome);
	await servicePessoas.deletePessoa(pessoa.pessoa_id);

});

test('esperado: não cria nova pessoa (409: conflito)', async () => {

	const dados = geraPessoa();
	
	await request('/pessoas', 'post', dados);
	const response = await request('/pessoas', 'post', dados);

	expect(response.status).toBe(409);
	await servicePessoas.deletePessoa(dados.pessoa_id);

});

// rotas put

test('esperado: modifica pessoa', async () => {

	/*
		falta testar put de avatar e fundo (como integrar conteúdo estático?)

		restringir/proibir put de pessoa_id 
		proibir put de data_criacao

	*/

	const pessoa = geraPessoa();
	const p = await servicePessoas.postPessoa(pessoa);
	
	const novaPessoa = geraPessoa();
	const response = await request(`/pessoas/${p.pessoa_id}`, 'put', novaPessoa);
	
	const pessoaAtualizada = await servicePessoas.getPessoa(novaPessoa.pessoa_id);
	expect(response.status).toBe(204);
	expect(pessoaAtualizada.pessoa_id).toBe(novaPessoa.pessoa_id);
	expect(pessoaAtualizada.nome).toBe(novaPessoa.nome);
	await servicePessoas.deletePessoa(pessoaAtualizada.pessoa_id);

});

test('esperado: não modifica pessoa (404)', async () => {

	const pessoa = geraPessoa();
	
	const response = await request(`/pessoas/${pessoa.pessoa_id}`, 'put', pessoa);
	
	expect(response.status).toBe(404);

});

// rotas delete

test('esperado: deleta pessoa', async () => {

	const pessoa = geraPessoa();
	const { pessoa_id } = await servicePessoas.postPessoa(pessoa);

	const response = await request(`/pessoas/${pessoa_id}`, 'delete');
	
	const pessoas = await servicePessoas.getPessoas();
	expect(pessoas).toHaveLength(0);
	expect(response.status).toBe(204);
	
});

test('esperado: não deleta pessoa (404)', async () => {

	const pessoa = geraPessoa();

	const response = await request(`/pessoas/${pessoa.pessoa_id}`, 'delete');

	expect(response.status).toBe(404);

});