const express = require('express'); 
const cors = require('cors'); 
const bodyParser = require('body-parser');

const app = express(); 

app.use(cors()); 
app.use(bodyParser.json()); 

const mongoose = require('mongoose'); 

const dbUri = "mongodb://localhost/file"; 

const db = mongoose.connection; 
const dbConfig = {
    useNewUrlParser : true, 
    useUnifiedTopology: true
}

const PORT = 5000; 

mongoose.connect(dbUri, dbConfig); 

db.once('open', () => {
    console.log("Connexion à mongoDB réussi"); 
}); 

db.once('close', () => {
    console.log("Déconnexion de mongoDB"); 
}); 

db.on('error', () => {
    console.error("Une érreur lié à mongoDB est survenue"); 
}); 

const fileSchema = mongoose.Schema({
    name: String, 
    content: String, 
})

const File = mongoose.model('File', fileSchema); 

app.get('/file', async (req,res) => {
    try {
        const response = await File.find(); 
        res.json(response); 
    }
    catch(error) {
        res.status(500).json({
            message: "Erreur lors de la récupération fichier", 
            error: error
        })
    }
})

app.post('/file', async (req,res) => {
    try {
        const file = new File(req.body); 
        await file.save(); 
    }
    catch(error) {
        res.status(500).json({
            message: "Erreur lors de l'enregistrement du fichier", 
            error: error
        });
    };
});

app.delete('/file', async (req,res) => {
    try {
        const {fileId} = req.params; 
        const response = await File.deleteMany({}); 
        res.status(200).json({
            message: "Fichier supprimé avec succes", 
            response : response
        })
    }
    catch (error) {
        res.status(500).json({
            message : "Erreur lors de la suppression du fichier", 
            error: error
        })
    }
})


app.listen(PORT, () => {
    console.log(`Serveur en cours d'éxécution sur le port ${PORT}`)
})