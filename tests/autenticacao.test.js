/* eslint-disable no-undef */
const axios = require('axios');
const serviceAutenticacao = require('../src/api/v1/services/serviceAutenticacao');
const servicePessoas = require('../src/api/v1/services/servicePessoas');
const { geraPessoa, geraSenha, geraEmail } = require('../src/utils/utilRandomGenerators');

function request(caminho, method, data) {
	let url = `http://localhost:4000${caminho}`;
	return axios({ url, method, data, validateStatus: false});
}

// rota registro

test('esperado: registra nova pessoa', async () => {

	const dadosPessoa = geraPessoa();
	dadosPessoa.senha = geraSenha();
	dadosPessoa.email = geraEmail();
	
	const response = await request('/autenticacao/registro', 'post', dadosPessoa);
	const pessoa = response.data;

	expect(response.status).toBe(201);
	expect(pessoa.pessoa_id).toBe(dadosPessoa.pessoa_id);
	expect(pessoa.nome).toBe(dadosPessoa.nome);
	await servicePessoas.deletePessoa(pessoa.pessoa_id);

});

test('esperado: não cria nova pessoa (409: conflito)', async () => {

	const dadosPessoa = geraPessoa();
	dadosPessoa.senha = geraSenha();
	dadosPessoa.email = geraEmail();
	
	await serviceAutenticacao.postRegistro(dadosPessoa);
	const response = await request('/autenticacao/registro', 'post', dadosPessoa);

	expect(response.status).toBe(409);
	await servicePessoas.deletePessoa(dadosPessoa.pessoa_id);

});

// rotas não permitidas sem autenticação

test('esperado: não obtém pessoas, acesso negado (401)', async () => {

	const pessoa = geraPessoa();
	pessoa.email = geraEmail();
	pessoa.senha = geraSenha();
	const p = await serviceAutenticacao.postRegistro(pessoa);

	const response = await request('/pessoas', 'get');

	expect(response.status).toBe(401);
	await servicePessoas.deletePessoa(p.pessoa_id);

});

test('esperado: não obtém pessoa específica, acesso negado (401)', async () => {

	const dados = geraPessoa();
	dados.email = geraEmail();
	dados.senha = geraSenha();
	const p = await serviceAutenticacao.postRegistro(dados);

	const response = await request(`/pessoas/${p.pessoa_id}`, 'get');

	expect(response.status).toBe(401);
	await servicePessoas.deletePessoa(p.pessoa_id);

});

test('esperado: não modifica pessoa, acesso negado (401)', async () => {

	const pessoa = geraPessoa();
	pessoa.email = geraEmail();
	pessoa.senha = geraSenha();
	const p = await serviceAutenticacao.postRegistro(pessoa);
	
	const novaPessoa = geraPessoa();
	const response = await request(`/pessoas/${p.pessoa_id}`, 'put', novaPessoa);
	
	expect(response.status).toBe(401);
	await servicePessoas.deletePessoa(p.pessoa_id);

});

test('esperado: não deleta pessoa, acesso negado (401)', async () => {

	const pessoa = geraPessoa();
	pessoa.email = geraEmail();
	pessoa.senha = geraSenha();
	const { pessoa_id } = await serviceAutenticacao.postRegistro(pessoa);

	const response = await request(`/pessoas/${pessoa_id}`, 'delete');
	
	expect(response.status).toBe(401);
	await servicePessoas.deletePessoa(pessoa_id);
	
});