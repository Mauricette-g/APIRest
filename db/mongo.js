


const mongoose = require('mongoose');
const connectDB = async () => {

  try {
    await mongoose.connect(process.env.URL_MONGO);
    console.log('MongoDB connecté');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;




/* const mongoose = require('mongoose');

const clientOptions = {
    dbName : 'API Node'
};
*/

/*
exports.initClientDbConnection = async () => {
    try {
        /* ATTENTION
        On essaie de se connecter à mongoDB en utilisant la variable d'environnement URL_MONGO
        Il faut donc ne pas oublier de l'ajouter au fichier .env
        URL_MONGO prend pour valeur la chaine de connexion de votre cluster mongoDB 
        */
       /*
       await mongoose.connect(process.env.URL_MONGO, clientOptions)
    } catch (error){
        console.log(error);
        throw error;
    }
}
*/