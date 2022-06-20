const gatePessoas = require('../gates/gatePessoas');

exports.getPessoas = function () {
    return gatePessoas.getPessoas();
}

exports.getPessoa = function (pessoaId) {
    return gatePessoas.getPessoa(pessoaId);
}

exports.postPessoa = function (pessoa) {
    return gatePessoas.postPessoa(pessoa);
}

exports.deletePessoa = function (pessoaId) {
    return gatePessoas.deletePessoa(pessoaId);
}