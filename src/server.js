const express = require('express'); 
const cors = require('cors'); 
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose'); 

const app = express(); 

app.use(cors()); 
app.use(bodyParser.json()); 

const PORT = 5000; 

const db = mongoose.connection; 
const dbConfig = {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}
const dbUri = "mongodb://localhost/files2"; 

mongoose.connect(dbUri, dbConfig); 

db.once('open', () => {
    console.log('Connexion à mongoDB réussi'); 
}); 

db.once('close', () => {
    console.log('Déconnexion de mongoDB'); 
}); 

db.on("error", () => {
    console.error("Erreur lors de la connexion à mongoDB"); 
}); 

const fileSchema = mongoose.Schema({
    content: String
})

const File = mongoose.model('File', fileSchema); 

app.get('/files2', async (req,res) => {
    try {
        const response = await File.find(); 
        res.json(response); 
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur lors de la récupération du contenu text du fichier", 
            error: error
        }) 
    }; 
}); 

app.post('/files2', async (req,res) => {
    try {
        const file = new File(req.body); 
        console.log(file)
        const response = await file.save(); 
        res.json(response); 
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur lors de la sauvegarde du fichier en base de données", 
            error: error
        })
    }
})

app.delete('/files2', async (req,res) => {
    try {
        const response = await File.deleteMany({}); 
        res.status(200).json({
            message: "Base de données vidé avec succès",
            response : response
        })
    }
    catch (error) {
        res.status(500).json({
            message: "Erreur lors de la suppression de toute la dbb", 
            error: error 
        })
    }
})

app.listen(PORT, () => {
    console.log(`Server en cours d'execution sur le port ${PORT}`); 
})