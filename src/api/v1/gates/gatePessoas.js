const pool = require('../../../config/database');

async function getPessoas() {
    return await pool.query(
        'SELECT * FROM pessoas'
    );
}

exports.getPessoas = getPessoas;