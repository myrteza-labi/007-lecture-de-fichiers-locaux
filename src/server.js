const express = require('express'); 
const cors = require('cors'); 
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose'); 
<<<<<<< HEAD
const db = mongoose.connection; 
const dbUri = "mongodb://localhost/readlocalfile"
const dbConfig = {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
}
const PORT = 5000; 
=======
>>>>>>> 64a37b9a2ae2f90e8cd7b71b9940955781be915e

const app = express(); 

app.use(cors()); 
app.use(bodyParser.json()); 

<<<<<<< HEAD
=======
const PORT = 5000; 

const db = mongoose.connection; 
const dbConfig = {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}
const dbUri = "mongodb://localhost/files2"; 

>>>>>>> 64a37b9a2ae2f90e8cd7b71b9940955781be915e
mongoose.connect(dbUri, dbConfig); 

db.once('open', () => {
    console.log('Connexion à mongoDB réussi'); 
}); 

db.once('close', () => {
<<<<<<< HEAD
    console.log("Déconnexion de mongoDB"); 
}); 

db.on('error', () => {
    console.log("Une erreur est survenu dans mongoDB"); 
}); 

const fileSchema = mongoose.Schema({
    name: String, 
=======
    console.log('Déconnexion de mongoDB'); 
}); 

db.on("error", () => {
    console.error("Erreur lors de la connexion à mongoDB"); 
}); 

const fileSchema = mongoose.Schema({
>>>>>>> 64a37b9a2ae2f90e8cd7b71b9940955781be915e
    content: String
})

const File = mongoose.model('File', fileSchema); 

<<<<<<< HEAD
app.post('/files', async (req,res) => {
    try {
        const file = new File(req.body); 
        const response = await file.save(); 
        res.status(201).json({
            message: "Fichier enregistré avec succès", 
            response: response
        });
    }
    catch(error){
        res.status(500).json({
            message: "Erreur lors de l'enregistrement du fichier", 
            error: error
        });
    };
});

app.delete('/deleteAll', async (req,res) => {
    try {
        const response = await File.deleteMany({}, () => {
            res.json(response); 
        }); 
        res.status(200).json({
            message: "Base de données vidée avec succes", 
            response: response
        });
    }
    catch(error) {
        res.status(500).json({
            message: "Erreur lors de la suppression de la base de données", 
            error: error
        });
    };
});

app.get('/files', async (req,res) => {
    try {
        const repsonse = await File.find(); 
        res.json(repsonse); 
    }
    catch(error){
        res.status(500).json({
            message: "Erreur lors de la récupération du fichier", 
            error: error
        });
    };
});

app.listen(PORT, () => {
    console.log(`Server en cours d'execution sur le port ${PORT}`);
});
=======
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
>>>>>>> 64a37b9a2ae2f90e8cd7b71b9940955781be915e
