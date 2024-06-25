import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ExcelJS from 'exceljs';
import { format } from 'date-fns';
import logoImageBase64 from '../../assest/logo.png';
import './R.M.css'
import Graficos from './Graficos';


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
            ////////////////////////777
            const response4 = await fetch('http://localhost:8081/moliendasum', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fechaInicio: startDate, fechaFin: endDate })
            });

            if (!response4.ok) {
                throw new Error('Error al obtener los datos de las mesas del servidor');
            }

            const moliendaData = await response4.json();
            console.log("Datos recibidos de /moliendasum:", moliendaData);
            ////////////////////////////////
            const response5 = await fetch('http://localhost:8081/MESASMES12H', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fechaInicio: startDate, fechaFin: endDate })
            });

            if (!response5.ok) {
                throw new Error('Error al obtener los datos de las mesas del servidor');
            }

            const Hmes12Data = await response5.json();
            console.log("Datos recibidos de /MESASMES12H:", Hmes12Data);
            ////////////////////////////////7
            const response6 = await fetch('http://localhost:8081/MESASMES34H', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fechaInicio: startDate, fechaFin: endDate })
            });

            if (!response6.ok) {
                throw new Error('Error al obtener los datos de las mesas del servidor');
            }

            const Hmes34Data = await response6.json();
            console.log("Datos recibidos de /MESASMES34H:", Hmes34Data);
            ////////////////////////////////////7777
            const response7 = await fetch('http://localhost:8081/MESASMES5H', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fechaInicio: startDate, fechaFin: endDate })
            });

            if (!response7.ok) {
                throw new Error('Error al obtener los datos de las mesas del servidor');
            }

            const Hmes5Data = await response7.json();
            console.log("Datos recibidos de /MESASMES5H:", Hmes5Data);
            /////////////////////////////7777
            const response8 = await fetch('http://localhost:8081/MESASMES6H', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fechaInicio: startDate, fechaFin: endDate })
            });

            if (!response8.ok) {
                throw new Error('Error al obtener los datos de las mesas del servidor');
            }

            const Hmes6Data = await response8.json();
            console.log("Datos recibidos de /MESASMES6H:", Hmes6Data);
            ///////////////777777

            const response9 = await fetch('http://localhost:8081/MOLINOSMH', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fechaInicio: startDate, fechaFin: endDate })
            });

            if (!response9.ok) {
                throw new Error('Error al obtener los datos de las mesas del servidor');
            }

            const HmolinosData = await response9.json();
            console.log("Datos recibidos de /MOLINOSMH:", HmolinosData);

            //////////////////////////////////////////
            const response10 = await fetch('http://localhost:8081/jigssech', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fechaInicio: startDate, fechaFin: endDate })
            });

            if (!response10.ok) {
                throw new Error('Error al obtener los datos de las mesas del servidor');
            }

            const jissecData = await response10.json();
            console.log("Datos recibidos de /jigssech:", jissecData);


            /////////////////////////////
            const response11 = await fetch('http://localhost:8081/jigprimario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fechaInicio: startDate, fechaFin: endDate })
            });

            if (!response11.ok) {
                throw new Error('Error al obtener los datos de las mesas del servidor');
            }

            const jisprimData = await response11.json();
            console.log("Datos recibidos de /jigprimario:", jisprimData);
            //////////////////////////////////////////////////////77
            const response12 = await fetch('http://localhost:8081/seleccion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fechaInicio: startDate, fechaFin: endDate })
            });

            if (!response12.ok) {
                throw new Error('Error al obtener los datos de las mesas del servidor');
            }

            const seleccionData = await response12.json();
            console.log("Datos recibidos de /seleccion:", seleccionData);
           ////////////////////////////////////////77

           const response13 = await fetch('http://localhost:8081/SUMMLT', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fechaInicio: startDate, fechaFin: endDate })
        });

        if (!response13.ok) {
            throw new Error('Error al obtener los datos de las mltt del servidor');
        }

        const mltData = await response13.json();
        console.log("Datos recibidos de /SUMMLT:", mltData);

         //////////////////////////////////77

         const response14 = await fetch('http://localhost:8081/SUMMLE', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fechaInicio: startDate, fechaFin: endDate })
        });

        if (!response14.ok) {
            throw new Error('Error al obtener los datos de las mltt del servidor');
        }

        const mleData = await response14.json();
        console.log("Datos recibidos de /SUMMLE:", mleData);

            const jigsArray = [jigsData]; // Convertir el objeto de JIGs en un array
            const mesasArray = [mesasData]; // Convertir el objeto de mesas en un array
            const chinoArray = [chinoData];
            const moliendaArray = [moliendaData];
            const hmes12Array = [Hmes12Data];
            const hmes34Array = [Hmes34Data];
            const hmes5Array = [Hmes5Data];
            const hmes6Array = [Hmes6Data];
            const hmolinosArray = [HmolinosData];
            const jissecArray = [jissecData];
            const jisprimArray = [jisprimData];
            const seleccionArray = [seleccionData];
            const MLTArray = [mltData];
            const MLEArray = [mleData];



            // Llamar a la función para exportar a Excel con los datos ajustados
            exportToExcel(jigsArray, mesasArray, chinoArray, moliendaArray, hmes12Array, hmes34Array, hmes5Array, hmes6Array, hmolinosArray, jissecArray, jisprimArray, seleccionArray,MLTArray,MLEArray);
        } catch (error) {
            console.error('Error en el bloque try:', error);
        }
    };


    const applyTitleStyle = (cell) => {
        // Aplicar estilos al texto del título
        cell.font = { bold: true, size: 14, color: { argb: '000000' } }; // Negrita, tamaño 14, color negro
    };

    const exportToExcel = async (jigs, mesas, chino, molienda, hmes12, hmes34, hmes5, hmes6, hmolinos, jigssech, jigprimario, seleccion, mlt, mle) => {
        try {
            // Crea un nuevo libro de trabajo
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Produccion Diaria');

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


            const textRow8 = worksheet.addRow([]);

            // Asignar texto a las celdas de la fila
            textRow8.getCell(4).value = '';


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

            const textRow6 = worksheet.addRow([]);

            // Asignar texto a las celdas de la fila
            textRow6.getCell(4).value = '';
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

                )
            }

            // Ajusta el ancho de las columnas
            worksheet.columns.forEach(column => {
                column.width = 20;
            });

            const textRow7 = worksheet.addRow([]);

            // Asignar texto a las celdas de la fila
            textRow7.getCell(4).value = '';

            const textRow2 = worksheet.addRow([]);

            // Asignar texto a las celdas de la fila
            textRow2.getCell(4).value = 'TOTAL JIG´S SECUNDARIO';



            const headerRow3 = worksheet.addRow(['', 'Alimentacion', 'P.E', 'Concentrado', 'P.E']);
            applyHeaderStyle(headerRow3);

            if (chino && Array.isArray(chino)) {
                chino.forEach(row => {

                    worksheet.addRow([
                        'JIG´S SECUNDARIO',
                        row.TOTALALISEC,
                        row.promedioPeajSEC,
                        row.totalconcjsec,
                        row.promedioPeCONSEC

                    ]);

                })


            }

            const textRow11 = worksheet.addRow([]);

            // Asignar texto a las celdas de la fila
            textRow11.getCell(4).value = '';

            const textRow4 = worksheet.addRow([]);

            // Asignar texto a las celdas de la fila
            textRow4.getCell(4).value = 'TOTAL JIG´S PRIMARIO';



            const headerRow6 = worksheet.addRow(['', 'Alimentacion', 'P.E', 'Grano', 'P.E', 'Desensolve', 'P.E']);
            applyHeaderStyle(headerRow6);

            if (jigprimario && Array.isArray(jigprimario)) {
                jigprimario.forEach(row => {

                    worksheet.addRow([
                        'JIG´S PRIMARIO',
                        row.TOTALALIPRIM,
                        row.promedioPeajPRIM,
                        row.totalgranojprim,
                        row.promedioPeGRAPRIM,
                        row.totalDesejprim,
                        row.promediodesensolvejprim,

                    ]);

                })


            }
            // Asignar texto a las celdas de la fila
            textRow11.getCell(4).value = '';

            const textRow9 = worksheet.addRow([]);

            // Asignar texto a las celdas de la fila
            textRow9.getCell(4).value = 'TOTAL SELECCION';



            const headerRow7 = worksheet.addRow(['', 'Alimentacion', 'P.E', 'Concentrado', 'P.E', '', 'TON','P.E']);
            applyHeaderStyle(headerRow7);

            if (seleccion && Array.isArray(seleccion)) {
                seleccion.forEach(row => {

                    worksheet.addRow([
                        'GRANO',
                        row.TOTALALIgrano,
                        row.promedioPegrano,
                        row.totalconcgrano,
                        row.promedioPeGRno,
                        'PIEDRA',
                        row.totalton,
                        row.promedioPeton,

                    ]);

                })


            }

            const textRow5 = worksheet.addRow([]);

            // Asignar texto a las celdas de la fila
            textRow5.getCell(4).value = '';

            const textRow3 = worksheet.addRow([]);

            // Asignar texto a las celdas de la fila
            textRow3.getCell(4).value = 'TOTAL MOLIENDA';



            const headerRow4 = worksheet.addRow(['CONC.MESAS', 'GRANO', 'DESENSOLVE', 'CONJIGS', 'PMLT', 'PMLE', 'SUMA TOTAL', 'PESP']);
            applyHeaderStyle(headerRow4);

            if (molienda && Array.isArray(molienda)) {
                let sumaTotal = 0;
                let sumaTotal4 = 0;

                // Definir los estilos para las celdas

                molienda.forEach(row => {
                    const sumatotal = row.TOTACONCMESAS + row.TOTALMEDIOS + row.TOTALDESENSOLVE + row.TOTALCONJIGS + row.TOTALPMLT + row.TOTALPMLE;
                    sumaTotal += sumatotal;

                    const sumatotal4 = row.TOTACONCMESAS4 + row.TOTALMEDIOS4 + row.TOTALDESENSOLVE4 + row.TOTALCONJIGS4 + row.TOTALPMLT4 + row.TOTALPMLE4;
                    sumaTotal4 += sumatotal4;



                    worksheet.addRow([
                        row.TOTACONCMESAS,
                        row.TOTALMEDIOS,
                        row.TOTALDESENSOLVE,
                        row.TOTALCONJIGS,
                        row.TOTALPMLT,
                        row.TOTALPMLE,
                        sumaTotal,
                        '3.90'


                    ]);
                    worksheet.addRow([
                        row.TOTACONCMESAS4,
                        row.TOTALMEDIOS4,
                        row.TOTALDESENSOLVE4,
                        row.TOTALCONJIGS4,
                        row.TOTALPMLT4,
                        row.TOTALPMLE4,
                        sumaTotal4,
                        '4.10'


                    ]);

                })

                const textRow17 = worksheet.addRow([]);

                // Asignar texto a las celdas de la fila
                textRow17.getCell(4).value = '';

            const textRow15 = worksheet.addRow([]);

            // Asignar texto a las celdas de la fila
            textRow15.getCell(1).value = 'TOTAL MINERAL MINA LA TATIANA';



            const headerRow8 = worksheet.addRow(['TONS','P.E']);
            applyHeaderStyle(headerRow8);

            if (mlt && Array.isArray(mlt)) {
                mlt.forEach(row => {

                    worksheet.addRow([
                        
                        row.TOTALentradas,
                        row.promedioPeentradas,
                        

                    ]);

                })


            }
           

            const textRow16 = worksheet.addRow([]);

            // Asignar texto a las celdas de la fila
            textRow16.getCell(1).value = 'TOTAL MINERAL MINA LA ESCONDIDA';



            const headerRow9 = worksheet.addRow(['TONS','P.E']);
            applyHeaderStyle(headerRow9);

            if (mle && Array.isArray(mle)) {
                mle.forEach(row => {

                    worksheet.addRow([
                        
                        row.TOTALentradasE,
                        row.promedioPeentradasE,
                        

                    ]);

                })


            }

                const worksheet2 = workbook.addWorksheet('Horas Turnos');
                // Agrega la imagen del logo si es necesario
                const logoImage = workbook.addImage({
                    base64: logoImageBase64, // Datos de la imagen en formato base64
                    extension: 'png', // Extensión de la imagen
                });
                worksheet2.addImage(logoImage, {
                    tl: { col: 0.2, row: 0.2 }, // Posición de la imagen en la hoja de cálculo
                    ext: { width: 70, height: 70 }, // Tamaño de la imagen
                });

                // Agrega el título y las fechas
                const formattedStartDate = startDate ? format(startDate, 'yyyy/MM/dd') : '';
                const formattedEndDate = endDate ? format(endDate, 'yyyy/MM/dd') : '';
                const titleRow = worksheet2.addRow(['', '', 'REPORTE DE HORAS DE PRODUCCION']);
                const dateRow = worksheet2.addRow(['', '', `Desde: ${formattedStartDate}`, '', `Hasta: ${formattedEndDate}`]);
                const secondCell = titleRow.getCell(3);
                applyTitleStyle(secondCell);



                const textRow12 = worksheet2.addRow([]);
                const textRow9 = worksheet2.addRow([]);

                textRow9.getCell(2).value = 'HORAS TRABAJADAS MESAS';
                // Agrega encabezados a la nueva hoja
                const headerRow5 = worksheet2.addRow(['', 'HRS.TURNO1', 'HRS.TURNO2', 'TOTAL HRS']);
                applyHeaderStyle(headerRow5);

                // Agrega datos a la nueva hoja
                if (hmes12 && Array.isArray(hmes12)) {
                    // Definir los estilos para las celdas


                    hmes12.forEach(row => {
                        const newRow = worksheet2.addRow([
                            'MESA 1Y2',
                            row.TOTAHRS_TURNO_1,
                            row.TOTAHRS_TURNO_2,
                            row.TOTAHRS
                        ]);

                        // Aplicar estilo si es necesario


                    });

                    hmes34.forEach(row => {
                        const newRow = worksheet2.addRow([
                            'MESA 3y4',
                            row.TOTAHRS_TURNO_1,
                            row.TOTAHRS_TURNO_2,
                            row.TOTAHRS
                        ]);

                        // Aplicar estilo si es necesario


                    });
                    hmes5.forEach(row => {
                        const newRow = worksheet2.addRow([
                            'MESA 5',
                            row.TOTAHRS_TURNO_1,
                            row.TOTAHRS_TURNO_2,
                            row.TOTAHRS
                        ]);

                        // Aplicar estilo si es necesario


                    });
                    hmes6.forEach(row => {
                        const newRow = worksheet2.addRow([
                            'MESA 6',
                            row.TOTAHRS_TURNO_1,
                            row.TOTAHRS_TURNO_2,
                            row.TOTAHRS
                        ]);

                        // Aplicar estilo si es necesario


                    });








                }

                const textRow11 = worksheet2.addRow([]);
                const textRow10 = worksheet2.addRow([]);

                textRow10.getCell(2).value = 'HORAS TRABAJADAS MOLINOS';
                // Agrega encabezados a la nueva hoja
                const headerRow6 = worksheet2.addRow(['', 'HRS.TURNO1', 'HRS.TURNO2', 'TOTAL HRS', 'PROD.TURNO1', 'PROD.TURNO2', 'PROD.TOTAL']);
                applyHeaderStyle(headerRow6);

                // Agrega datos a la nueva hoja
                if (hmolinos && Array.isArray(hmolinos)) {
                    // Definir los estilos para las celdas


                    hmolinos.forEach(row => {
                        const newRow = worksheet2.addRow([
                            'MOLINO CHINO',
                            row.HRSM1_TURNO_1,
                            row.HRSM1_TURNO_2,
                            row.HRSM1_TOTAL,
                            row.PRODM1_TURNO_1,
                            row.PRODM1_TURNO_2,
                            row.PRODM1_TOTAL,

                        ]);



                    });
                    hmolinos.forEach(row => {
                        const newRow = worksheet2.addRow([
                            'MOLINO RAYMOND',
                            row.HRSM2_TURNO_1,
                            row.HRSM2_TURNO_2,
                            row.HRSM2_TOTAL,
                            row.PRODM2_TURNO_1,
                            row.PRODM2_TURNO_2,
                            row.PRODM2_TOTAL,

                        ]);



                    });

                }

                const textRow13 = worksheet2.addRow([]);
                const textRow14 = worksheet2.addRow([]);

                textRow14.getCell(2).value = 'HORAS TRABAJADAS JIG´S CHINOS';
                // Agrega encabezados a la nueva hoja
                const headerRow7 = worksheet2.addRow(['', 'HRS.TURNO1', 'HRS.TURNO2', 'TOTAL HRS']);
                applyHeaderStyle(headerRow7);

                // Agrega datos a la nueva hoja
                if (jigssech && Array.isArray(jigssech)) {
                    // Definir los estilos para las celdas


                    jigssech.forEach(row => {
                        const newRow = worksheet2.addRow([
                            'JIG´SS SECUNDARIO',
                            row.HORASSEC_TURNO_1,
                            row.HORASSEC_TURNO_2,
                            row.HORASSEC_TOTAL,

                        ]);




                    });

                    jigssech.forEach(row => {
                        const newRow = worksheet2.addRow([
                            'JIG´SS PRIMARIO',
                            row.HORASPRIM_TURNO_1,
                            row.HORASPRIM_TURNO_2,
                            row.HORASPRIM_TOTAL,

                        ]);




                    });


                }
                // Ajusta el ancho de las columnas de la nueva hoja
                worksheet2.columns.forEach(column => {
                    column.width = 20;
                });
            }

            // Genera el archivo de Excel y lo descarga
            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'Reporte Mensual.xlsx';
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

