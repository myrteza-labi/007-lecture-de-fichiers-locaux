import React, {useState, useEffect} from 'react';  
import axios from 'axios'; 

const App = () => {

  const [files, setFiles] = useState([]); 
  const [formatedFile, setFormatedFile] = useState({
    name: "", 
    content: ""
  })

  const fetchFile = async () => {
    try {
      const response = await axios.get('http://localhost:5000/files'); 
      console.log(response); 
      setFiles(response.data)
    }
    catch(error) {
      console.error("Erreur lors de la récupération du fichier"); 
    }; 
  }

  const addAndFetch = async () => {
    if (formatedFile.name !== "" && formatedFile.content !=="") {
      await addFile();
      await fetchFile();  
    };
  }

  useEffect(() => {
    addAndFetch(); 
  }, [formatedFile]);

  const setContent = (file) => {
    const reader = new FileReader(); 
    reader.onload = (event) => {
      const content = event.target.result; 
      setFormatedFile(formatedFile =>  ({...formatedFile, content: content})); 
    }
    reader.readAsText(file); 
  }

  const handleImport = (e) => {
    let file = e.target.files[0]; 
      setFormatedFile(formatedFile => ({...formatedFile, name: file.name})); 
      setContent(file);
  }; 

  const addFile = async () => {
    try {
      await axios.post('http://localhost:5000/files', formatedFile); 
    }
    catch(error) {
      console.error("Erreur lors de l'enregistrement du fichier", error)
    }
  } 

  const deleteAll = async () => {
    try {
      await axios.delete('http://localhost:5000/deleteAll'); 
      fetchFile(); 
    }
    catch(error) {
      console.error("Erreur lors de la suppression du fichier :", error); 
    }; 
  }; 

  return (
    <div>
      <h1>Lecture de fichier locaux</h1>
      {
        files.length === 0 && 
          <input
          type="file"
          accept="text/*"
          onChange={handleImport}
        />
      } 
      {
        files.length > 0 &&  files.map((file) => {
          return (
          <div key={file._id}>
            <p>Nom du fichier : {file.name}</p>
            <p> Contenu du fichier : {file.content}</p>
          </div>
        )})
      }
      {
        files.length > 0 && <button onClick={deleteAll}>Supprimer le fichier</button>
      }
    </div>
  )
}

export default App; 

