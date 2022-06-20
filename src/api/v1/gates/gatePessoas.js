const pool = require('../../../config/database');
const { get } = require('../routes/routePessoas');

async function getPessoas() {
    const p = await pool.query(
        'SELECT * FROM pessoas'
    );
    return p.rows;
}

async function getPessoa(pessoaId) {
    const p = await pool.query(
        'SELECT * FROM pessoas WHERE pessoa_id = $1',
        [pessoaId]
    );
    return p.rows[0];
}

async function postPessoa(pessoa) {
    const p = await pool.query(
        'INSERT INTO pessoas (pessoa_id, nome) VALUES ($1, $2) RETURNING pessoa_id',
        [pessoa.pessoaId, pessoa.nome]
    );
    return p.rows[0];
}

function deletePessoa(pessoaId) {
    return pool.query(
        'DELETE FROM pessoas WHERE pessoa_id = $1',
        [pessoaId]
    );
}

exports.getPessoas = getPessoas;
exports.postPessoa = postPessoa;
exports.deletePessoa = deletePessoa;
exports.getPessoa = getPessoa;