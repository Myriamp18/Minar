import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ExcelJS from 'exceljs';

function Excel() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Aquí podrías tener lógica adicional si necesitas cargar datos al inicio
  }, []); // Esto ejecuta el efecto solo una vez, al montar el componente

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Aquí podrías añadir lógica adicional si necesitas cargar datos según la fecha seleccionada
  };
  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Productos');

    // Agregar datos a la hoja de Excel
    worksheet.addRow(['ID', 'Nombre', 'Cantidad']);
    worksheet.addRow([1, 'Producto A', 100]);
    worksheet.addRow([2, 'Producto B', 200]);

    // Generar un Blob que contiene el archivo de Excel
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Crear un enlace temporal y descargar el archivo de Excel
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exported_data.xlsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="container">
      {/* Selector de fecha */}
      <div className="date-picker-container">
        <DatePicker selected={selectedDate} onChange={handleDateChange} />
      </div>

      {/* Botón para exportar a Excel */}
      <div className="export-button-container">
        <button className="export-button" onClick={exportToExcel}>
          Exportar a Excel
        </button>
      </div>
    </div>
  );
}

export default Excel;
