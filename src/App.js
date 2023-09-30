import React, {useState, useEffect} from 'react'; 
import axios from 'axios'; 

const App = () => {

  const [file, setFile] = useState([]); 
  const [formatedFile, setFormatedFile] = useState({
    name: "", 
    content: ""
  }); 

  useEffect(() => {
    fetchFile(); 
  }, [file])

  const fetchFile = async () => {
    try {
      const response = await axios.get('http://localhost:5000/file'); 
      setFile(response.data); 
    } 
    catch(error) {
      console.error("Erreur lors de la récupération du fichier"); 
    }; 
  }; 

  const addFile = async () => {
    try {
      await axios.post('http://localhost:5000/file', formatedFile); 
      fetchFile(); 
    }
    catch (error) {
      console.error("Erreur lors de l'enregistrement du fichier"); 
    }
  }

  const deleteFile = async (fileId) => {
    try {
      await axios.delete(`http://localhost:5000/file`); 
      fetchFile(); 
      setFormatedFile({
        name: "", 
        content: ""
      })
    }
    catch (error) {
      console.error("Erreur lors de la suppression du fichier", fileId)
    }
  }

  const handleImport = (e) => {
    const file = e.target.files[0]; 
    setFormatedFile(formatedFile => ({...formatedFile, name: file.name}));
    const reader = new FileReader(); 
    reader.readAsText(file); 
    reader.onload = (event) => {
      const content = event.target.result; 
      setFormatedFile(formatedFile => ({...formatedFile, content: content})); 
    }
  }

  return (
    <div>
      <h1>Lecture de fichier locaux - Entrainement fullstack n°2</h1>
      <input
        type='file'
        accept="text/*"
        onChange={handleImport}
      />
      {
        formatedFile.name !== "" && 
        <div>
            <p>Nom du fichier : {formatedFile.name}</p>
            <p>Contenu du fichier : {formatedFile.content}</p>
            <button onClick={addFile}>Enregistrer le fichier en base de données</button>
        </div>
      }
      {
        file[0] && 
        <div>
            <p>Nom du fichier : {file[0].name}</p>
            <p>Contenu du fichier : {file[0].content}</p>
            <button onClick={() => deleteFile(file._id)}>Supprimer le fichier enregistré</button>
        </div>
      }
    </div>
  )
}

export default App; 