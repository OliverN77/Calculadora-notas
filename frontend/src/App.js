import React, { useState } from 'react';
import GradeCalculator from './components/GradeCalculator';
import Modal from './components/Modal';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = (config) => {
    console.log('Configuración guardada:', config);
    setIsModalOpen(false); 
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Calculadora de Notas</h1>
        <button className='config-button' onClick={handleOpenModal}>Configuración de Notas</button>
        <GradeCalculator />
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSave} />
      </header>
    </div>
  );
}

export default App;