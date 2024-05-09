import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ExcelJS from 'exceljs';
import { format } from 'date-fns';
import logoImageBase64 from '../../assest/logo.png';
import './R.M.css'


function ReporteM() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleStartDateChange = (date) => {
        const formattedDate = format(date, 'yyyy/MM/dd');
        setStartDate(formattedDate);
    };

    const handleEndDateChange = (date) => {
        const formattedDate = format(date, 'yyyy/MM/dd');
        setEndDate(formattedDate);
    };
    const convertObjectToArray = (data) => {
        return [data];


    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Realiza una solicitud POST al endpoint '/JIGSMES' con las fechas de inicio y fin
            const response1 = await fetch('http://localhost:8081/JIGSMES', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fechaInicio: startDate, fechaFin: endDate })
            });
    
            if (!response1.ok) {
                throw new Error('Error al obtener los datos del servidor');
            }
    
            // Convierte la respuesta a formato JSON
            const datos1 = await response1.json();
    
            // Llama a la función para exportar a Excel con los datos obtenidos
            exportToExcel(datos1);
            const response2 = await fetch('http://localhost:8081/MESASMES12', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fechaInicio: startDate, fechaFin: endDate })
            });
    
            if (!response2.ok) {
                throw new Error('Error al obtener los datos del servidor');
            }
    
            // Convierte la respuesta a formato JSON
            const datos2 = await response2.json();
    
            // Llama a la función para exportar a Excel con los datos obtenidos
            exportToExcel(datos2);
            
        } catch (error) {
            console.error('Error al enviar las fechas al servidor:', error);
            // Maneja el error adecuadamente (por ejemplo, muestra un mensaje de error al usuario)
        }
    };
    
    const applyTitleStyle = (cell) => {
        // Aplicar estilos al texto del título
        cell.font = { bold: true, size: 14, color: { argb: '000000' } }; // Negrita, tamaño 14, color negro
    };

    const exportToExcel = async (data) => {
        try {
            // Verifica si los datos son un objeto y los convierte a un array si es necesario
            const dataArray = Array.isArray(data) ? data : convertObjectToArray(data);

            // Imprime los datos en la consola para verificar la estructura
            console.log(data);

            // Resto del código para exportar a Excel

            // Crea un nuevo libro de trabajo
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Datos');
            const logoImage = workbook.addImage({
                base64: logoImageBase64, // Aquí debes colocar los datos de la imagen en formato base64
                extension: 'png', // Extensión de la imagen
            });

            // Agregar la imagen a una celda específica
            worksheet.addImage(logoImage, {
                tl: { col: 0.2, row: 0.2 }, // Esquina superior izquierda de la celda donde se insertará la imagen
                ext: { width: 70, height: 70 }, // Tamaño de la imagen
            });
            const formattedStartDate = startDate ? format(startDate, 'yyyy/MM/dd') : '';
            const formattedEndDate = endDate ? format(endDate, 'yyyy/MM/dd') : '';
            // Agregar la fila del título
            const titleRow = worksheet.addRow(['','', 'REPORTE SEMANAL DE PRODUCCION']);
            const dateRow = worksheet.addRow(['','',`Desde: ${formattedStartDate}`,'' ,`Hasta: ${formattedEndDate}`]);
            const desdeCell = dateRow.getCell(2);
            const hastaCell = dateRow.getCell(3);
            
            // Establecer el ancho de las celdas
            desdeCell.width = 50; // Ancho para la celda "Desde"
            hastaCell.width = 20; // Ancho para la celda "Hasta"
           
            // Obtener la segunda celda de la fila (índice 2 porque la numeración de las celdas comienza desde 1)
            const secondCell = titleRow.getCell(3);

            // Aplicar estilos al título en la segunda celda
            applyTitleStyle(secondCell);

            worksheet.addRow(['','','','JIG´SS']);




            // Agrega los encabezados de las columnas
            const headerRow1= worksheet.addRow(['', 'Alimentacion','P.E','Grano','P.E', 'Desensolve','P.E']);
            applyHeaderStyle(headerRow1);

            dataArray.forEach(row => {
                console.log('Fila completa:', row); // Imprime el objeto completo para verificar su estructura y contenido

                if (row !== null) {
                    worksheet.addRow([
                        'JIG´S 1',
                        row.totalAlmj1,
                        row.promedioPeaj1,
                        row.totalGranoj1,
                        row.promediogranoj1,
                        row.totalDesej1,
                        row.promediodesensolvej1

                    ]);
                    worksheet.addRow([
                        'JIG´S 2',
                        row.totalAlimj2,
                        row.promedioalimentacionj2,
                        row.totalGranoj2,
                        row.promediogranoj2,
                        row.totalDesej2,
                        row.promediodesensolvej2

                    ]);
                    
                } else {
                    console.error('Se encontró un objeto null en el array de datos.');
                }
            });
            worksheet.columns.forEach(column => {
                column.width = 20; // Puedes ajustar el valor según tus necesidades
            });

            console.log(dataArray); // Imprimir el array completo en la consola para depuración


            // Agrega los encabezados de las columnas
            const headerRow2= worksheet.addRow(['', 'Alimentacion','P.E','Concentrado','P.E', 'Medios','P.E']);
            applyHeaderStyle(headerRow2);

            dataArray.forEach(row => {
                console.log('Fila completa:', row); // Imprime el objeto completo para verificar su estructura y contenido

                if (row !== null) {
                    worksheet.addRow([
                        'MESAS 1Y2',
                        row.totalAlim12,
                        row.promedioPeam12,
                        row.totalconc12,
                        row.promedioPeconc12,
                        row.totalmedios12,
                        row.promedioPemedios12

                    ]);
                    
                } else {
                    console.error('Se encontró un objeto null en el array de datos.');
                }
            });
            worksheet.columns.forEach(column => {
                column.width = 20; // Puedes ajustar el valor según tus necesidades
            });

            console.log(dataArray); // Imprimir el array completo en la consola para depuración


         




            
            console.log(dataArray);
            // Genera el archivo de Excel
            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

            // Crea un enlace para descargar el archivo Excel
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'datos.xlsx';
            document.body.appendChild(link);

            // Simula un clic en el enlace para iniciar la descarga
            link.click();

            // Libera el objeto URL creado
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error al exportar a Excel:', error);
            // Maneja el error adecuadamente
        }
    };

    const applyHeaderStyle = (row) => {
        row.eachCell((cell) => {
          cell.font = { bold: true };
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFA500' } };
          cell.alignment = { horizontal: 'center', vertical: 'middle' };
        });
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
                <button type="button" onClick={handleSubmit}>Generar Informe</button>
            </form>
        </div>
    );
}

export default ReporteM;

