import React, { useState } from 'react';
import '../assets/styles/GradeCalculator.css';

function GradeCalculator() {
  const [grades, setGrades] = useState([
    { grade: '', percentage: '' },
    { grade: '', percentage: '' },
    { grade: '', percentage: '' }
  ]);
  const [average, setAverage] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (index, event) => {
    const values = [...grades];
    values[index][event.target.name] = event.target.value;
    setGrades(values);
  };

  const handleAddFields = () => {
    setGrades([...grades, { grade: '', percentage: '' }]);
  };

  const handleRemoveFields = (index) => {
    const values = [...grades];
    values.splice(index, 1);
    setGrades(values);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const totalPercentage = grades.reduce((acc, curr) => acc + parseFloat(curr.percentage), 0);
    if (totalPercentage !== 100) {
      setError('El porcentaje total debe ser exactamente 100%');
      return;
    }
    setError('');
    const total = grades.reduce((acc, curr) => acc + (parseFloat(curr.grade) * (parseFloat(curr.percentage) / 100)), 0);
    setAverage(total);
  };

  const getAverageClass = () => {
    if (average < 3.0) {
      return 'average-low';
    } else if (average >= 3.0 && average < 4.0) {
      return 'average-medium';
    } else if (average >= 4.0) {
      return 'average-high';
    }
    return '';
  };

  return (
    <div className='grade'>
      <div className='container'>
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
                required
              />
              <input
                type="number"
                name="percentage"
                className="percentage-input"
                value={grade.percentage}
                onChange={(event) => handleInputChange(index, event)}
                placeholder="%"
                required
              />
              <button className='add-button' type="button" onClick={handleAddFields}>+</button>
              <button className='delete-button' type="button" onClick={() => handleRemoveFields(index)}>-</button>
            </div>
          ))}
          <div className='total'> 
            <button className='submit-button' type="submit">Calcular Promedio</button>
          </div>
        </form>
        {error && <p>{error}</p>}
        {average !== null && <h3 className={getAverageClass()}>Promedio: {average}</h3>}
      </div>
    </div>
  );
}

export default GradeCalculator;