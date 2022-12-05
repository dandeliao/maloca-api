const dataImagensComunitarias = require('../data/dataImagensComunitarias');
const path = require('path');
const fs = require('fs');

exports.getAlbunsComunitarios = async function (comunidadeId) {
	let objetoAlbuns = await dataImagensComunitarias.getAlbunsComunitarios(comunidadeId);
	return objetoAlbuns;
};

exports.postAlbumComunitario = async function (dados) {
	let objetoAlbum = await dataImagensComunitarias.postAlbumComunitario(dados.comunidade_id, dados.album_comunitario_id);
	return objetoAlbum;
};

exports.getImagensComunitarias = async function (comunidadeId) {
	let objetoImagens = await dataImagensComunitarias.getImagensComunitarias(comunidadeId);
	const sortedImagens = objetoImagens.rows.sort((a, b) => {
		return a.data_criacao - b.data_criacao;
	});
	return sortedImagens;
};

exports.getImagensAlbumComunitario = async function (comunidadeId, album) {
	let objetoImagens= await dataImagensComunitarias.getImagensAlbumComunitario(comunidadeId, album);
	const sortedImagens = objetoImagens.rows.sort((a, b) => {
		return a.data_criacao - b.data_criacao;
	});
	return sortedImagens;
};

exports.getImagemComunitaria = async function (comunidadeId, imagemId) {

	let objetoImagem = await dataImagensComunitarias.getImagemComunitaria(comunidadeId, imagemId);
	const album = objetoImagem.rows[0].album;
	const nomeArquivo = objetoImagem.rows[0].nome_arquivo;

	const caminho = path.join(path.resolve(__dirname, '../../../../static'), 'comunidades', `${comunidadeId}`, 'imagens', album, nomeArquivo);
	return caminho;
};

exports.getInfoImagemComunitaria = async function (pessoaId, imagemId) {
	let objetoImagem = await dataImagensComunitarias.getImagemComunitaria(pessoaId, imagemId);
	return objetoImagem.rows[0];
};


exports.postImagemComunitaria = async function (dados, dadosArquivo) {

	// falta verificar autorização (pessoas com habilidade 'participar')

	const caminhoTemp = dadosArquivo.path;
	const diretorioDestino = path.join(path.resolve(__dirname, '../../../../static'), 'comunidades', `${dados.comunidade_id}`, 'imagens', dados.album);
	const caminhoDestino = path.join(path.resolve(diretorioDestino, dadosArquivo.originalname));

	if (!fs.existsSync(diretorioDestino)){
		fs.mkdirSync(diretorioDestino);
	}	

	fs.rename(caminhoTemp, caminhoDestino, err => {
		if (err) throw err;
	});

	dados.nome_arquivo = dadosArquivo.originalname;

	const dataResponse = await dataImagensComunitarias.createImagemComunitaria(dados);

	return dataResponse.rows[0];
};

exports.editImagemComunitaria = async function (dados) {

	// falta verificar autorização (pessoa que subiu imagem & pessoas com habilidades 'editar' e 'moderar'?)

	const objetoImagem = await dataImagensComunitarias.editImagemComunitaria(dados);
	if (objetoImagem.rowCount === 0) throw new Error('imagem não encontrada');
	return objetoImagem.rows[0];

};

exports.deleteImagemComunitaria = async function (dados) {

	// falta verificar autorização (pessoa que subiu imagem & pessoas com habilidades 'moderar'?)

	const dataResponse = await dataImagensComunitarias.deleteImagemComunitaria(dados);
	const nomeArquivo = dataResponse.rows[0].nome_arquivo;
	const album = dataResponse.rows[0].album;
	const caminho = path.join(path.resolve(__dirname, '../../../../static'), 'comunidades', `${dados.comunidade_id}`, 'imagens', album, nomeArquivo);
	fs.unlink(caminho, (err) => {
		if (err) {
			if (err.code !== 'ENOENT') { // se o erro for 'arquivo não encontrado', não faz nada
				throw err;
			}
		}
	});
};