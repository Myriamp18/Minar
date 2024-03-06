import React from 'react';
import { saveAs } from 'file-saver';
import { extractDataFromPdf, formatDataForExcel, generateExcelFile } from './PdjExcel'; // Supongamos que tienes funciones utilitarias para estos pasos

function Excel({ pdfData }) {
  const handleExportToExcel = async () => {
    try {
      // Paso 1: Extraer datos del PDF
      const extractedData = await extractDataFromPdf(pdfData);

      // Paso 2: Formatear los datos para Excel
      const formattedData = formatDataForExcel(extractedData);

      // Paso 3: Generar el archivo Excel
      const excelFile = generateExcelFile(formattedData);

      // Paso 4: Descargar el archivo Excel
      saveAs(excelFile, 'documento.xlsx');
    } catch (error) {
      console.error('Error al exportar a Excel:', error);
    }
  };

  return (
    <div>
      <h2>Exportar a Excel desde PDF</h2>
      <button onClick={handleExportToExcel}>Exportar a Excel</button>
    </div>
  );
}

export default Excel;
