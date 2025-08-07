// // password generator

// import bcrypt from 'bcryptjs';

// const plainPassword = '@Prakrish3210';

// bcrypt.hash(plainPassword, 10).then(hash => {
//     console.log('✅ Correct bcrypt hash for @Admin3210:', hash);
// });


// bcrypt password checker

import bcrypt from 'bcryptjs';

const inputPassword = '@New43219';
// const hashedPassword = '$2b$10$qJI7v8Rrq7sT0XGTFKNfj.cWdocrrbgFfa/UeemJMUfzDajtvuryC';
// const hashedPassword = '$2b$10$CwV7M4p5gPvucgQVgakbPebfJllfqdGOMQulQp/297cQiPMk4ftS6';
const hashedPassword = '$2b$10$vzycwVcotYHQ/QdbCG3GxuTa7KqOBZbwyJO7aAreNBKD90GNLhUsO';

bcrypt.compare(inputPassword, hashedPassword)
    .then(result => console.log('Match:', result))
    .catch(err => console.error(err));


