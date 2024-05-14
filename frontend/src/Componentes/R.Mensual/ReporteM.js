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
    



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Realizar la solicitud POST para obtener los datos de los JIGs
            const response1 = await fetch('http://localhost:8081/JIGSMES', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fechaInicio: startDate, fechaFin: endDate })
            });

            if (!response1.ok) {
                throw new Error('Error al obtener los datos de los JIGs del servidor');
            }

            const jigsData = await response1.json();
            console.log("Datos recibidos de /JIGSMES:", jigsData);

            // Realizar la solicitud POST para obtener los datos de las mesas
            const response2 = await fetch('http://localhost:8081/MESASMES12', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fechaInicio: startDate, fechaFin: endDate })
            });

            if (!response2.ok) {
                throw new Error('Error al obtener los datos de las mesas del servidor');
            }

            const mesasData = await response2.json();
            console.log("Datos recibidos de /MESASMES12:", mesasData);

            const response3 = await fetch('http://localhost:8081/jigsec', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fechaInicio: startDate, fechaFin: endDate })
            });

            if (!response3.ok) {
                throw new Error('Error al obtener los datos de las mesas del servidor');
            }

            const chinoData = await response3.json();
            console.log("Datos recibidos de /jigsec:", chinoData);

            const jigsArray = [jigsData]; // Convertir el objeto de JIGs en un array
            const mesasArray = [mesasData]; // Convertir el objeto de mesas en un array
            const chinoArray = [chinoData];
            // Llamar a la función para exportar a Excel con los datos ajustados
            exportToExcel(jigsArray, mesasArray, chinoArray);
        } catch (error) {
            console.error('Error en el bloque try:', error);
        }
    };


    const applyTitleStyle = (cell) => {
        // Aplicar estilos al texto del título
        cell.font = { bold: true, size: 14, color: { argb: '000000' } }; // Negrita, tamaño 14, color negro
    };

    const exportToExcel = async (jigs, mesas, chino) => {
        try {
            // Crea un nuevo libro de trabajo
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Datos');

            // Agrega la imagen del logo si es necesario
            const logoImage = workbook.addImage({
                base64: logoImageBase64, // Datos de la imagen en formato base64
                extension: 'png', // Extensión de la imagen
            });
            worksheet.addImage(logoImage, {
                tl: { col: 0.2, row: 0.2 }, // Posición de la imagen en la hoja de cálculo
                ext: { width: 70, height: 70 }, // Tamaño de la imagen
            });

            // Agrega el título y las fechas
            const formattedStartDate = startDate ? format(startDate, 'yyyy/MM/dd') : '';
            const formattedEndDate = endDate ? format(endDate, 'yyyy/MM/dd') : '';
            const titleRow = worksheet.addRow(['', '', 'REPORTE SEMANAL DE PRODUCCION']);
            const dateRow = worksheet.addRow(['', '', `Desde: ${formattedStartDate}`, '', `Hasta: ${formattedEndDate}`]);
            const secondCell = titleRow.getCell(3);
            applyTitleStyle(secondCell);

            const headerRow1 = worksheet.addRow(['', 'Alimentacion', 'P.E', 'Grano', 'P.E', 'Desensolve', 'P.E']);
            applyHeaderStyle(headerRow1);
            
            if (jigs && Array.isArray(jigs)) {
                let sumaTotalGrano = 0;
                let sumatotalalim = 0;
                let sumatotaldesen = 0;
            
                // Definir los estilos para las celdas
                const estiloSumaTotal = {
                    font: { bold: true },
                    fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' } } // Rojo claro
                };
            
                const estiloNumero = {
                    font: { bold: true },
                    fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' } } // Rojo claro
                };
            
                jigs.forEach(row => {
                    // Sumar los valores de totalGranoj1 y totalGranoj2
                    const sumaGrano = row.totalGranoj1 + row.totalGranoj2;
                    sumaTotalGrano += sumaGrano;
            
                    // Sumar los valores de totalAlmj1 y totalAlimj2
                    const sumaAlimentacion = row.totalAlmj1 + row.totalAlimj2;
                    sumatotalalim += sumaAlimentacion;
            
                    // Sumar los valores de totalDesej1 y totalDesej2
                    const sumaDesensolve = row.totalDesej1 + row.totalDesej2;
                    sumatotaldesen += sumaDesensolve;
            
                    // Agrega los datos del JIG'S 1
                    const row1 = worksheet.addRow([
                        'JIG´S 1',
                        row.totalAlmj1,
                        row.promedioPeaj1,
                        row.totalGranoj1,
                        row.promediogranoj1,
                        row.totalDesej1,
                        row.promediodesensolvej1
                    ]);
            
                    // Aplicar estilos a las celdas individuales
                   
                    
                    
                    // Agrega los datos del JIG'S 2
                    const row2 = worksheet.addRow([
                        'JIG´S 2',
                        row.totalAlimj2,
                        row.promedioalimentacionj2,
                        row.totalGranoj2,
                        row.promediogranoj2,
                        row.totalDesej2,
                        row.promediodesensolvej2
                    ]);
            
                    // Aplicar estilos a las celdas individuales
                    
                   
                });
            
                // Agregar una fila con los datos de la suma total y aplicar estilos
                const totalRow = worksheet.addRow([
                    'Suma Total',
                    sumatotalalim,
                    '',
                    sumaTotalGrano,
                    '',
                    sumatotaldesen,
                    ''
                ]);
            
                totalRow.eachCell((cell, colNumber) => {
                    if (colNumber % 2 !== 0) { // Estilo para las celdas impares (números)
                        applyCellStyle(cell, estiloNumero);
                    } else { // Estilo para las celdas pares (texto)
                        applyCellStyle(cell, estiloSumaTotal);
                    }
                });
            }
            
            // Función para aplicar estilos a una celda
            function applyCellStyle(cell, style) {
                cell.style = style;
            }
            const textRow1 = worksheet.addRow([]);

            // Asignar texto a las celdas de la fila
            textRow1.getCell(4).value = 'TOTAL MESAS';

        

            // Agrega los encabezados y los datos de las mesas
            const headerRow2 = worksheet.addRow(['', 'Alimentacion', 'P.E', 'Conc-Seleccion', 'P.E', 'Conc-Perforacion', 'P.E', 'Medios', 'P.E']);
            applyHeaderStyle(headerRow2);

            if (mesas && Array.isArray(mesas)) {
                let sumaTotalAlimmesas = 0;
                let SumaTotalselec = 0;
                let sumatotalperf = 0;
                let totalmedios = 0;
            
                // Definir los estilos para las celdas
                const estiloSumaTotal = {
                    font: { bold: true },
                    fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' } } // Rojo claro
                };
            
                const estiloNumero = {
                    font: { bold: true },
                    fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' } } // Rojo claro
                };
                
                mesas.forEach(row => {


                    const sumaAlim = row.totalAlim12 + row.totalAlim34 + row.totalAlim5 + row.totalAlim6;
                    sumaTotalAlimmesas += sumaAlim;

                    const sumaselec = row.totalconc12SELEC + row.totalconc34SELEC + row.totalconc5SELEC + row.totalconc6SELEC;
                    SumaTotalselec += sumaselec;

                    const sumaperf = row.totalconc12PERF + row.totalconc34PERF + row.totalconc5PERF + row.totalconc6PERF;
                    sumatotalperf += sumaperf;

                    const sumamedios = row.totalmedios12 + row.totalmedios34 + row.totalmedios5 + row.totalmedios6;
                    totalmedios += sumamedios;
            
                    // Agrega los datos de las mesas
                    worksheet.addRow([
                        'MESAS 1Y2',
                        row.totalAlim12,
                        row.promedioPeam12,
                        row.totalconc12SELEC,
                        row.promedioPeconc12SELEC,
                        row.totalconc12PERF,
                        row.promedioPeconc12PERF,
                        row.totalmedios12,
                        row.promedioPemedios12
                    ]);
                    worksheet.addRow([
                        'MESAS 3y4',
                        row.totalAlim34,
                        row.promedioPeam34,
                        row.totalconc34SELEC,
                        row.promedioPeconc34SELEC,
                        row.totalconc34PERF,
                        row.promedioPeconc34PERF,
                        row.totalmedios34,
                        row.promedioPemedios34
                    ]);
                    worksheet.addRow([
                        'MESAS 5',
                        row.totalAlim5,
                        row.promedioPeam5,
                        row.totalconc5SELEC,
                        row.promedioPeconc5SELEC,
                        row.totalconc5PERF,
                        row.promedioPeconc5PERF,
                        row.totalmedios5,
                        row.promedioPemedios5
                    ]);
                    worksheet.addRow([
                        'MESAS 6',
                        row.totalAlim6,
                        row.promedioPeam6,
                        row.totalconc6SELEC,
                        row.promedioPeconc6SELEC,
                        row.totalconc6PERF,
                        row.promedioPeconc6PERF,
                        row.totalmedios6,
                        row.promedioPemedios6
                    ]);
                    const totalRow = worksheet.addRow([
                        'Suma Total',
                        sumaTotalAlimmesas,
                        '',
                        SumaTotalselec,
                        '',
                        sumatotalperf,
                        '',
                        totalmedios
                    ]);
                
                    totalRow.eachCell((cell, colNumber) => {
                        if (colNumber % 2 !== 0) { // Estilo para las celdas impares (números)
                            applyCellStyle(cell, estiloNumero);
                        } else { // Estilo para las celdas pares (texto)
                            applyCellStyle(cell, estiloSumaTotal);
                        }
                    });

                    // Función para aplicar estilos a una celda
                function applyCellStyle(cell, style) {
                    cell.style = style;
                }
                }

                )}

            // Ajusta el ancho de las columnas
            worksheet.columns.forEach(column => {
                column.width = 20;
            });

            const textRow2 = worksheet.addRow([]);

            // Asignar texto a las celdas de la fila
            textRow2.getCell(4).value = 'TOTAL JIG´S SECUNDARIO';

        

            const headerRow3 = worksheet.addRow(['','Alimentacion','P.E', 'Concentrado', 'P.E']);
            applyHeaderStyle(headerRow3);

            if (chino && Array.isArray(chino)) {
                chino.forEach(row => {

                    worksheet.addRow([
                        'JIG´S SECUNARIO',
                        row.TOTALALISEC,
                        row.promedioPeajSEC,
                        row.totalconcjsec,
                        row.promedioPeCONSEC
                        
                    ]);

            })
        }




            // Genera el archivo de Excel y lo descarga
            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'datos.xlsx';
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error al exportar a Excel:', error);
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

