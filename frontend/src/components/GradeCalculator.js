"use client"

import { useState } from "react"
import "../assets/styles/GradeCalculator.css"

function GradeCalculator() {
  const [grades, setGrades] = useState([
    { grade: "", percentage: "" },
    { grade: "", percentage: "" },
    { grade: "", percentage: "" },
  ])
  const [average, setAverage] = useState(null)
  const [error, setError] = useState("")

  const handleInputChange = (index, event) => {
    const values = [...grades]
    values[index][event.target.name] = event.target.value
    setGrades(values)
  }

  const handleAddFields = () => {
    setGrades([...grades, { grade: "", percentage: "" }])
  }

  const handleRemoveFields = (index) => {
    const values = [...grades]
    values.splice(index, 1)
    setGrades(values)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const totalPercentage = grades.reduce((acc, curr) => acc + Number.parseFloat(curr.percentage || 0), 0)
    if (Math.abs(totalPercentage - 100) > 0.01) {
      setError("El porcentaje total debe ser exactamente 100%")
      return
    }
    setError("")
    const total = grades.reduce(
      (acc, curr) => acc + Number.parseFloat(curr.grade || 0) * (Number.parseFloat(curr.percentage || 0) / 100),
      0,
    )
    setAverage(total)
  }

  const getAverageClass = () => {
    if (average < 3.0) {
      return "average-low"
    } else if (average >= 3.0 && average < 4.0) {
      return "average-medium"
    } else if (average >= 4.0) {
      return "average-high"
    }
    return ""
  }

  const getAverageMessage = () => {
    if (average < 3.0) {
      return "¡No te desanimes! Todo es posible. 💪"
    } else if (average >= 3.0 && average < 4.0) {
      return "¡Buen trabajo! Aún es mejorable. 👍"
    } else if (average >= 4.0) {
      return "¡Felicidades! Excelente desempeño, sigue brillando. 🌟"
    }
    return ""
  }

  return (
    <div className="grade">
      <div className="container">
        <form onSubmit={handleSubmit}>
          {grades.map((grade, index) => (
            <div key={index}>
              <input
                type="number"
                name="grade"
                className="grade-input"
                value={grade.grade}
                onChange={(event) => handleInputChange(index, event)}
                placeholder="Nota"
                step="0.1"
                min="0"
                max="5"
              />
              <input
                type="number"
                name="percentage"
                className="percentage-input"
                value={grade.percentage}
                onChange={(event) => handleInputChange(index, event)}
                placeholder="%"
                step="1"
                min="0"
                max="100"
              />
              <button className="add-button" type="button" onClick={handleAddFields}>
                +
              </button>
              <button className="delete-button" type="button" onClick={() => handleRemoveFields(index)}>
                -
              </button>
            </div>
          ))}
          <div className="total">
            <button className="submit-button" type="submit">
              Calcular Promedio
            </button>
          </div>
        </form>
        {error && <p className="error-message">{error}</p>}
        {average !== null && (
          <div className="result-container">
            <h3 className={getAverageClass()}>Promedio: {average.toFixed(2)}</h3>
            <p className={`message ${getAverageClass()}`}>{getAverageMessage()}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default GradeCalculator
