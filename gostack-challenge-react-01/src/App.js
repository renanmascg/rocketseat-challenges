import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      "url": "https://github.com/renanmascg/",
      "title": `Renan ${Date.now()}`,
      "techs": ["Node", "Express", "React"]
    });

    setRepositories([ ...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    console.log(response.status);

    const newRep = repositories.filter(rep => rep.id !== id);

    setRepositories([...newRep]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
          { repositories.map(rep => {
            return ( 
              <li key={rep.id}> 
                { rep.title} 
                <button onClick={() => handleRemoveRepository(rep.id)}>
                  Remover
                </button>
              </li>
            )
          })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
