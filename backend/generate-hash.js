const bcrypt = require('bcryptjs');

const password = 'admin123';

// Generar hash con bcrypt
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(password, salt);

console.log('Contraseña:', password);
console.log('Hash generado:', hash);
console.log('\nCopia este hash en tu SQL:');
console.log(hash);