import React, {useState, useEffect} from 'react'; 
import axios from 'axios'; 

const App = () => {

  const [importedFile, setImportedFile] = useState(null); 
  const [files, setFiles] = useState([]); 

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/files2');
      setFiles(response.data); 
    }
    catch (error) {
      console.error("Erreur lors de la récupération du contenu du fichier importé"); 
    }
  }

  useEffect(() => {
    createFile()
    fetchData()
  }, [importedFile]); 

  const createFile = async () => {
    try {
      if (importedFile) {
        const reader = new FileReader(); 

        reader.onload = async (event) => {
          const fileContent = event.target.result; 
          const file = {
            content : fileContent
          }
          const response = await axios.post('http://localhost:5000/files2', file); 
        }

        reader.readAsText(importedFile); 
      }
    }
    catch (error)  {
      console.error("Erreur lors de la création de l'enregistrement du fichier en base de données"); 
    }
  }

  const deleteAll = async () => {
    try {
      await axios.delete(`http://localhost:5000/files2`); 
    }
    catch(error) {
      console.error("Erreur lors de la suppression de toutes la base de données"); 
    }; 
  }; 

  return (
    <div>
      <h1>Lecture de fichiers textuel locaux - Entrainement fullstack n°2</h1>
      <input type="file" accept="text/*" onChange={(e) => setImportedFile(e.target.files[0])}/>
      <button onClick={fetchData}>Fetch data</button>
      <button onClick={() => console.log(files[0].content)}>Console log content</button>
      <button onClick={() => console.log(files)} >console.log files</button>
      <button onClick={deleteAll}>Delete all</button>
      <button onClick={() => console.log(importedFile)}>log imported file</button>
      {
        files.length > 0 && files.map((file) => (
          <p key={file._id}>{file.content}</p>
        ))
      }
    </div>
  )
}

export default App; 