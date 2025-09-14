"use client"

import { useState } from "react"
import "../assets/styles/Modal.css"

function Modal({ isOpen, onClose, onSave }) {
  const [minGrade, setMinGrade] = useState("")
  const [maxGrade, setMaxGrade] = useState("")
  const [passingGrade, setPassingGrade] = useState("")
  const [desiredGrade, setDesiredGrade] = useState("")

  if (!isOpen) return null

  const handleSave = () => {
    const config = {
      minGrade: Number.parseFloat(minGrade) || 0,
      maxGrade: Number.parseFloat(maxGrade) || 5,
      passingGrade: Number.parseFloat(passingGrade) || 3,
      desiredGrade: Number.parseFloat(desiredGrade) || 4,
    }
    onSave(config)
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Configuración de Notas</h2>
        <form>
          <input
            type="number"
            value={minGrade}
            onChange={(e) => setMinGrade(e.target.value)}
            placeholder="Nota Mínima (ej: 0)"
            step="0.1"
            min="0"
          />
          <input
            type="number"
            value={maxGrade}
            onChange={(e) => setMaxGrade(e.target.value)}
            placeholder="Nota Máxima (ej: 5)"
            step="0.1"
            min="0"
          />
          <input
            type="number"
            value={passingGrade}
            onChange={(e) => setPassingGrade(e.target.value)}
            placeholder="Nota mínima para aprobar (ej: 3)"
            step="0.1"
            min="0"
          />
          <input
            type="number"
            value={desiredGrade}
            onChange={(e) => setDesiredGrade(e.target.value)}
            placeholder="Nota Deseada (ej: 4)"
            step="0.1"
            min="0"
          />
          <button className="save-button" type="button" onClick={handleSave}>
            Guardar
          </button>
        </form>
      </div>
    </div>
  )
}

export default Modal
