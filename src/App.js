import React, {useState} from 'react'; 

const App = () => {

  const [fileContent, setFileContent] = useState(null); 

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; 

    if(selectedFile) {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        const content = event.target.result; 
        setFileContent(content); 
      }
      reader.readAsText(selectedFile)      
    }
  }

  return (
    <div>
      <h1>Lecture de fichiers locaux - Entrainement backend n°7</h1>
      <input
        type="file"
        accept="text/plain"
        onChange={(e) => handleFileChange(e)}
      />
      {
        fileContent &&
        <div>
          <p>Contenu du fichier</p>
          <pre>{fileContent}</pre>
        </div>
      }
    </div>
  )
}

export default App; 