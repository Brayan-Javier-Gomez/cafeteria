process.env.PORT = process.env.PORT || 3000;




process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/*
===============================
Base De Datos
===============================
*/
let urlDB;

if (process.env.NODE_ENV === 'dev') {

    urlDB = 'mongodb://localhost:27017/cafeteria';


} else {
    urlDB = 'mongodb+srv://bryan_gomez:Brayangomez1986@cluster0.ievef.mongodb.net/cafe';
}


process.env.URLDB = urlDB;

//semilla del token
process.env.SEED = process.env.SEED || 'clave_de_desarrollo';