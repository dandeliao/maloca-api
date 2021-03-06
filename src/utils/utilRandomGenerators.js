// retorna string aleatória com tamanho entre min e max.
//      tipo 'simples' => letras sem acentos, números, traço e underline
//      tipo 'completo' => + letras com acentos, números, ponto, espaços

function geraString(tamanhoMin, tamanhoMax, tipo) {
	let letras = '';
	let estringue = '';
	let tamanho = Math.floor(Math.random() * (tamanhoMax - tamanhoMin + 1)) + tamanhoMin;
    
	if (tipo === 'simples') {
		letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890-_';
	} else if (tipo === 'completo') {
		letras = 'AÁÂÃBCDEÉÊFGHIÍJKLMNÑOÓÔÕPQRSTUÚÜVWXYZaáâãbcdeéêfghiíjklmnñoóôõpqrstuúüvwxyz0123456789_-.         ';
	} else {
		console.log('tipo de string inexistente');
	}

	for (let i = 0; i < tamanho; i++) {
		estringue += letras.charAt(
			Math.floor(Math.random() * letras.length));
	}

	return estringue;

}

function geraPessoa() {
	let pessoa_id = geraString(1, 32, 'simples');
	let nome = geraString(1, 64, 'completo');
	return { pessoa_id, nome };
}

function geraSenha() {
	let senha = geraString(6, 15, 'simples');
	return senha;
}

function geraEmail() {
	let email = geraString(1, 10, 'simples') + '@' + geraString(3, 6, 'simples') + '.' + geraString(2, 3, 'simples');
	return email;
}

module.exports = {
	geraString,
	geraPessoa,
	geraSenha,
	geraEmail
};