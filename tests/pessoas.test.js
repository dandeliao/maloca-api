/* eslint-disable no-undef */
const axios = require('axios');
const servicePessoas = require('../src/api/v1/services/servicePessoas');
const serviceAutenticacao = require('../src/api/v1/services/serviceAutenticacao');
const { geraPessoa, geraEmail, geraSenha } = require('../src/utils/utilRandomGenerators');

function request(caminho, method, data) {
	let url = `http://localhost:4000${caminho}`;
	return axios({ url, method, data, validateStatus: false});
}

// ---
// testes

// rotas get

test('esperado: obtém pessoas', async () => {

	const pessoa1 = geraPessoa();
	pessoa1.email = geraEmail();
	pessoa1.senha = geraSenha();
	const pessoa2 = geraPessoa();
	pessoa2.email = geraEmail();
	pessoa2.senha = geraSenha();
	const pessoa3 = geraPessoa();
	pessoa3.email = geraEmail();
	pessoa3.senha = geraSenha();
	const p1 = await serviceAutenticacao.postRegistro(pessoa1);
	const p2 = await serviceAutenticacao.postRegistro(pessoa2);
	const p3 = await serviceAutenticacao.postRegistro(pessoa3);

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
	dados.email = geraEmail();
	dados.senha = geraSenha();
	const p = await serviceAutenticacao.postRegistro(dados);

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

// rotas put

test('esperado: modifica pessoa', async () => {

	/*
		falta testar put de avatar e fundo (como integrar conteúdo estático?)

		restringir ou proibir put de pessoa_id 
		proibir put de data_criacao

	*/

	const pessoa = geraPessoa();
	pessoa.email = geraEmail();
	pessoa.senha = geraSenha();
	const p = await serviceAutenticacao.postRegistro(pessoa);
	
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
	pessoa.email = geraEmail();
	pessoa.senha = geraSenha();
	const { pessoa_id } = await serviceAutenticacao.postRegistro(pessoa);

	const response = await request(`/pessoas/${pessoa_id}`, 'delete');
	
	const pessoas = await servicePessoas.getPessoas();
	expect(response.status).toBe(204);
	expect(pessoas).toHaveLength(0);
	
});

test('esperado: não deleta pessoa (404)', async () => {

	const pessoa = geraPessoa();

	const response = await request(`/pessoas/${pessoa.pessoa_id}`, 'delete');

	expect(response.status).toBe(404);

});