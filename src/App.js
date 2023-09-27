import React, {useState} from 'react'; 

const App = () => {
  
  const [newFile, setNewFile] = useState(null); 

  return (
    <div>
      <h1>Lecture de fichiers locaux - Entrainement backend n°7</h1>
      <input
        type="file"
        onChange={(e) => setNewFile(e.target.value)}
      />
    </div>
  )
}

export default App; 