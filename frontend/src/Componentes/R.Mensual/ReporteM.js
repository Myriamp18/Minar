import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './R.M.css'


function ReporteM() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes manejar la lógica para generar el informe con las fechas seleccionadas
        console.log('Fecha de inicio:', startDate);
        console.log('Fecha de fin:', endDate);
    };

  return (
    <div className="form-container">
      
      <form onSubmit={handleSubmit}>
      <h3>Reporte Mensual</h3>
            <div>
                <label htmlFor="startDate">Fecha de inicio:</label>
                <DatePicker
                    selected={startDate}
                    onChange={handleStartDateChange}
                    dateFormat="yyyy/MM/dd"
                    id="startDate"
                    name="startDate"
                    className="form-control"
                />
            </div>
            <div>
                <label htmlFor="endDate">Fecha de fin:</label>
                <DatePicker
                    selected={endDate}
                    onChange={handleEndDateChange}
                    dateFormat="yyyy/MM/dd"
                    id="endDate"
                    name="endDate"
                    className="form-control"
                />
            </div>
            <button type="submit">Generar Informe</button>
        </form>
    </div>
  )
}

export default ReporteM

