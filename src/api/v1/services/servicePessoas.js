const gatePessoas = require('../gates/gatePessoas');

function getPessoas() {
    return gatePessoas.getPessoas();
}

exports.getPessoas = getPessoas;