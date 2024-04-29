import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../ReporteDiario/Pdj.css';
import Logo from '../../assest/logo.png'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


function PdfHorometro() {
    const navigate = useNavigate();
    const [criba, setCriba] = useState([]);
    const [hjigs, setHjigs] = useState([]);
    const [hmesa12, setHmesa12] = useState([]);
    const [hmesa34, setHmesa34] = useState([]);
    const [hmesa5, setHmesa5] = useState([]);
    const [hmesa6, setHmesa6] = useState([]);
    const [horno, setHorno] = useState([]);
    const [hrsmolinos, setHrsmolinos] = useState([]);
    const [pdfGenerated, setPdfGenerated] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        // Verificar si selectedDate tiene un valor antes de llamar a fetchData
        if (selectedDate) {
            fetchData(selectedDate);
        }
    }, [selectedDate]);

    const fetchData = async (fecha) => {
        try {
            const responseCriba = await fetch(`http://localhost:8081/getcriba/${fecha}`);
            const responseHjigs = await fetch(`http://localhost:8081/gethjigs/${fecha}`);
            const responseMesa12 = await fetch(`http://localhost:8081/gethmesa12/${fecha}`);
            const responseMesa34 = await fetch(`http://localhost:8081/gethmesa34/${fecha}`);
            const responseMesa5 = await fetch(`http://localhost:8081/gethmesa5/${fecha}`);
            const responseMesa6 = await fetch(`http://localhost:8081/gethmesa6/${fecha}`);
            const responseHorno = await fetch(`http://localhost:8081/gethorno/${fecha}`);
            const responseHrsmolinos = await fetch(`http://localhost:8081/gethrsmolinos/${fecha}`);





            if (!responseCriba.ok || !responseHjigs.ok || !responseMesa12.ok || !responseMesa34.ok || !responseMesa5.ok ||
                !responseMesa6.ok || !responseHorno.ok || !responseHrsmolinos.ok) {
                throw new Error('Error al obtener los datos');
            }

            const dataCriba = await responseCriba.json();
            const dataHjigs = await responseHjigs.json();
            const dataMesa12 = await responseMesa12.json();
            const dataMesa34 = await responseMesa34.json();
            const dataMesa5 = await responseMesa5.json();
            const dataMesa6 = await responseMesa6.json();
            const dataHorno = await responseHorno.json();
            const dataHrsmolinos = await responseHrsmolinos.json();



            setCriba(dataCriba);
            setHjigs(dataHjigs);
            setHmesa12(dataMesa12);
            setHmesa34(dataMesa34);
            setHmesa5(dataMesa5);
            setHmesa6(dataMesa6);
            setHorno(dataHorno);
            setHrsmolinos(dataHrsmolinos);


        } catch (error) {
            console.log('Error:', error);
        }
    };

    const handleDateChange = (date) => {
        console.log('Fecha recibida en DatePicker:', date);
        
        // Ajustar la fecha a la zona horaria local
        const formattedDate = formatDate(date);
       
        setSelectedDate(formattedDate);
        
      };

    // Función para convertir la fecha al formato deseado
    const formatDate = (date) => {
        // Obtener los componentes de la fecha
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Los meses van de 0 a 11
        const day = date.getDate();

        // Formatear la fecha como desees (por ejemplo, YYYY-MM-DD)
        const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

        return formattedDate;
    };
    const generatePDF = async () => {
        // Esperar a que los datos se actualicen completamente
        await fetchData(selectedDate);
        navigate('/horometros')
        const doc = new jsPDF({
            orientation: 'p', // Orientación: 'p' para retrato, 'l' para paisaje
            unit: 'mm', // Unidad de medida: milímetros
            format: [216, 400], // Tamaño del papel: 'a4', 'letter', 'legal', etc.
            putOnlyUsedFonts: true,
            floatPrecision: 16,
            margins: { // Márgenes personalizados
                top: 20,
                bottom: 20,
                left: 15,
                right: 15

            }
        });



        // Agrega el texto de la fecha al PDF usando la fecha seleccionada

        // Configuración del título del documento
        doc.setFont("fontName");
        doc.setFontSize(18);
        doc.text('MINERALES Y ARCILLAS, S.A DE C.V', 50, 10);
        doc.setFontSize(12);
        doc.text(`Fecha: ${selectedDate}`, 150, 17); // Agrega el texto de la fecha en la posición deseada
        const imgData = Logo; // Asigna la imagen importada a una variable
        doc.addImage(imgData, 'PNG', 15, 5, 20, 15); // Agrega la imagen al PDF


        //////////////////CONCENTRADO///////////////7
        generateCombinedTable(
            doc,
            criba.filter(item => item.turno === 1),
            hjigs.filter(item => item.turno === 1),
            hmesa12.filter(item => item.turno === 1),
            hmesa34.filter(item => item.turno === 1),
            hmesa5.filter(item => item.turno === 1),
            hmesa6.filter(item => item.turno === 1),
            'Turno 1',
            20
        );
        generateCombinedTURNO2(
            doc,
            criba.filter(item => item.turno === 2),
            hjigs.filter(item => item.turno === 2),
            hmesa12.filter(item => item.turno === 2),
            hmesa34.filter(item => item.turno === 2),
            hmesa5.filter(item => item.turno === 2),
            hmesa6.filter(item => item.turno === 2),
            'Turno 2',
            90
        );
        generateCombinedTURNO3(
            doc,
            criba.filter(item => item.turno === 3),
            hjigs.filter(item => item.turno === 3),
            hmesa12.filter(item => item.turno === 3),
            hmesa34.filter(item => item.turno === 3),
            hmesa5.filter(item => item.turno === 3),
            hmesa6.filter(item => item.turno === 3),
            'Turno 3',
            90
        );
        ///////////////MOLIENDA//////////////
        generateCombinedTable2(
            doc,
            horno.filter(item => item.turno === 1),
            hrsmolinos.filter(item => item.turno === 1),

            'Turno 1',
            20
        );
        generateCombinedTable2TURNO(
            doc,
            horno.filter(item => item.turno === 2),
            hrsmolinos.filter(item => item.turno === 2),

            'Turno 1',
            20
        );
        generateCombinedTable2TURNO3(
            doc,
            horno.filter(item => item.turno === 3),
            hrsmolinos.filter(item => item.turno === 3),

            'Turno 1',
            20
        );
        ////////////NOTAS/////////
        generateNotas(doc, criba.filter(item => item.turno === 1),
            horno.filter(item => item.turno === 1),
            'Turno 1', 50);

        generateNotas2(doc, criba.filter(item => item.turno === 2),
            horno.filter(item => item.turno === 2),
            'Turno 1', 50);

        generateNotas3(doc, criba.filter(item => item.turno === 3),
            horno.filter(item => item.turno === 3),
            'Turno 1', 50);


        let fileName = `Reporte_Diario_Produccion.pdf`;


        // Descargar el PDF con el nombre de archivo generado
        doc.save(fileName);

        // Actualizar el estado para indicar que el PDF ha sido generado
        setPdfGenerated(true);
    }
    const styles = {
        tableHeader: {
            fillColor: [255, 0, 0],
            textColor: [255, 255, 255], // Color blanco para el texto del encabezado
            fontStyle: 'bold', // Fuente en negrita para el encabezado
            fontSize: 9
        },
        tableRow: {
            fillColor: [255, 255, 255], // Color blanco para las filas de la tabla
            textColor: [0, 0, 0], // Color negro para el texto de las filas
            fontSize: 8
        }
    };
    const generateCombinedTable = (doc, criba, hjigs, hmesa12, hmesa34, hmesa5, hmesa6, title, startY) => {
        const tableColumn = ['OPERACION/EQUIPO', 'HS.EFVAB', 'TURNO'];
        const tableRows = [];
        doc.setFontSize(12);
        doc.text('PLANTA DE CONCENTRADO DE BARITA', 18, 27);
        // Agregar datos de la primera tabla
        if (Array.isArray(criba)) {
            criba.forEach((item) => {

                const rowData = ['TOLVA GENERAL', item.tolvageneral, item.turno];
                tableRows.push(rowData);
                const rowData1 = ['CRIBA VIBRATORIA', item.cribav, item.turno];
                tableRows.push(rowData1);
                const rowData2 = ['MESAS WIFLEY', item.mesaswi, item.turno];
                tableRows.push(rowData2);
                const rowData3 = ['BOMBAS AGUA 5X4" FIMSA', item.bombafinsa, item.turno];
                tableRows.push(rowData3);
                const rowData4 = ['BOMBAS AGUA 5X4" S/MCA', item.bombasmca, item.turno];
                tableRows.push(rowData4);
            });
        }

        // Agregar datos de la segunda tabla
        if (Array.isArray(hjigs)) {
            hjigs.forEach((item) => {
                const rowData = ['JIGS No.1', item.totalhrs, item.turno];
                tableRows.push(rowData);
                const rowData1 = ['JIGS No.2', item.totalhrsj2, item.turno];
                tableRows.push(rowData1);
            });
        }

        if (Array.isArray(hmesa12)) {
            // Agregar datos de la tercera tabla
            hmesa12.forEach((item) => {
                const rowData = ['MESA 1Y2', item.totalhrs, item.turno];
                tableRows.push(rowData);
            });
        }
        if (Array.isArray(hmesa34)) {
            hmesa34.forEach((item) => {
                const rowData = ['MESA 3y4', item.totalhrs, item.turno];
                tableRows.push(rowData);
            });
        }
        if (Array.isArray(hmesa5)) {
            hmesa5.forEach((item) => {
                const rowData = ['MESA 5', item.totalhrs, item.turno];
                tableRows.push(rowData);
            });
        }
        if (Array.isArray(hmesa6)) {
            hmesa6.forEach((item) => {
                const rowData = ['MESA 6', item.totalhrs, item.turno];
                tableRows.push(rowData);
            });
        }
        // <-- Aquí cierra la función generateCombinedTable

        const firstTableHeight = doc.autoTable.previous.finalY || startY;
        const tablePropsTurnos = {
            startY: 30,
            margin: { horizontal: 14 },
            tableWidth: 85
        };

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: firstTableHeight + 10,
            theme: 'grid',
            headStyles: {
                fillColor: [0, 128, 0] // Cambia el color del encabezado de la tabla a azul
            },
            ...tablePropsTurnos,
            setFontSize: 10,
            headStyles: styles.tableHeader,
            bodyStyles: styles.tableRow,
        });
    }
    const generateCombinedTURNO2 = (doc, criba, hjigs, hmesa12, hmesa34, hmesa5, hmesa6, title, startY) => {
        const tableColumn = ['OPERACION/EQUIPO', 'HS.EFVAB', 'TURNO'];
        const tableRows = [];

        // Agregar datos de la primera tabla
        if (Array.isArray(criba)) {
            criba.forEach((item) => {

                const rowData = ['TOLVA GENERAL', item.tolvageneral, item.turno];
                tableRows.push(rowData);
                const rowData1 = ['CRIBA VIBRATORIA', item.cribav, item.turno];
                tableRows.push(rowData1);
                const rowData2 = ['MESAS WIFLEY', item.mesaswi, item.turno];
                tableRows.push(rowData2);
                const rowData3 = ['BOMBAS AGUA 5X4" FIMSA', item.bombafinsa, item.turno];
                tableRows.push(rowData3);
                const rowData4 = ['BOMBAS AGUA 5X4" S/MCA', item.bombasmca, item.turno];
                tableRows.push(rowData4);
            });
        }

        // Agregar datos de la segunda tabla
        if (Array.isArray(hjigs)) {
            hjigs.forEach((item) => {
                const rowData = ['JIGS No.1', item.totalhrs, item.turno];
                tableRows.push(rowData);
                const rowData1 = ['JIGS No.2', item.totalhrsj2, item.turno];
                tableRows.push(rowData1);
            });
        }

        if (Array.isArray(hmesa12)) {
            // Agregar datos de la tercera tabla
            hmesa12.forEach((item) => {
                const rowData = ['MESA 1Y2', item.totalhrs, item.turno];
                tableRows.push(rowData);
            });
        }
        if (Array.isArray(hmesa34)) {
            hmesa34.forEach((item) => {
                const rowData = ['MESA 3y4', item.totalhrs, item.turno];
                tableRows.push(rowData);
            });
        }
        if (Array.isArray(hmesa5)) {
            hmesa5.forEach((item) => {
                const rowData = ['MESA 5', item.totalhrs, item.turno];
                tableRows.push(rowData);
            });
        }
        if (Array.isArray(hmesa6)) {
            hmesa6.forEach((item) => {
                const rowData = ['MESA 6', item.totalhrs, item.turno];
                tableRows.push(rowData);
            });
        }
        // <-- Aquí cierra la función generateCombinedTable

        const firstTableHeight = doc.autoTable.previous.finalY || startY;
        const tablePropsTurnos = {
            startY: 150,
            margin: { horizontal: 14 },
            tableWidth: 85
        };

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: firstTableHeight + 10,
            theme: 'grid',
            headStyles: {
                fillColor: [0, 128, 0] // Cambia el color del encabezado de la tabla a azul
            },
            ...tablePropsTurnos,
            setFontSize: 10,
            headStyles: styles.tableHeader,
            bodyStyles: styles.tableRow,
        });
    }

    const generateCombinedTURNO3 = (doc, criba, hjigs, hmesa12, hmesa34, hmesa5, hmesa6, title, startY) => {
        const tableColumn = ['OPERACION/EQUIPO', 'HS.EFVAB', 'TURNO'];
        const tableRows = [];

        // Agregar datos de la primera tabla
        if (Array.isArray(criba)) {
            criba.forEach((item) => {

                const rowData = ['TOLVA GENERAL', item.tolvageneral, item.turno];
                tableRows.push(rowData);
                const rowData1 = ['CRIBA VIBRATORIA', item.cribav, item.turno];
                tableRows.push(rowData1);
                const rowData2 = ['MESAS WIFLEY', item.mesaswi, item.turno];
                tableRows.push(rowData2);
                const rowData3 = ['BOMBAS AGUA 5X4" FIMSA', item.bombafinsa, item.turno];
                tableRows.push(rowData3);
                const rowData4 = ['BOMBAS AGUA 5X4" S/MCA', item.bombasmca, item.turno];
                tableRows.push(rowData4);
            });
        }

        // Agregar datos de la segunda tabla
        if (Array.isArray(hjigs)) {
            hjigs.forEach((item) => {
                const rowData = ['JIGS No.1', item.totalhrs, item.turno];
                tableRows.push(rowData);
                const rowData1 = ['JIGS No.2', item.totalhrsj2, item.turno];
                tableRows.push(rowData1);
            });
        }

        if (Array.isArray(hmesa12)) {
            // Agregar datos de la tercera tabla
            hmesa12.forEach((item) => {
                const rowData = ['MESA 1Y2', item.totalhrs, item.turno];
                tableRows.push(rowData);
            });
        }
        if (Array.isArray(hmesa34)) {
            hmesa34.forEach((item) => {
                const rowData = ['MESA 3y4', item.totalhrs, item.turno];
                tableRows.push(rowData);
            });
        }
        if (Array.isArray(hmesa5)) {
            hmesa5.forEach((item) => {
                const rowData = ['MESA 5', item.totalhrs, item.turno];
                tableRows.push(rowData);
            });
        }
        if (Array.isArray(hmesa6)) {
            hmesa6.forEach((item) => {
                const rowData = ['MESA 6', item.totalhrs, item.turno];
                tableRows.push(rowData);
            });
        }
        // <-- Aquí cierra la función generateCombinedTable

        const firstTableHeight = doc.autoTable.previous.finalY || startY;
        const tablePropsTurnos = {
            startY: 270,
            margin: { horizontal: 14 },
            tableWidth: 85
        };

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: firstTableHeight + 10,
            theme: 'grid',
            headStyles: {
                fillColor: [0, 128, 0] // Cambia el color del encabezado de la tabla a azul
            },
            ...tablePropsTurnos,
            setFontSize: 10,
            headStyles: styles.tableHeader,
            bodyStyles: styles.tableRow,
        });
    }




    const generateCombinedTable2 = (doc, horno, hrsmolinos, title, startY) => {
        const tableColumn = ['OPERACION/EQUIPO', 'TURNO', 'HS.EFVAS', 'PROD.(TON)'];
        const tableRows = [];
        doc.setFontSize(12);
        doc.text('PLANTA DE MOLIENDA DE BARITA', 120, 27);
        // Agregar datos de la primera tabla
        if (Array.isArray(horno)) {
            horno.forEach((item) => {

                const rowData = ['QUEBRADORA', item.turno, item.quebradora];
                tableRows.push(rowData);
                const rowData1 = ['HORNO ROTATORIO', item.turno, item.hrotatorio];
                tableRows.push(rowData1);
                const rowData2 = ['ELV. CANJ MOLINOS 1-2', item.turno, item.elvmolinos];
                tableRows.push(rowData2);
                const rowData3 = ['COLECTORES DE POLVO', item.turno, item.colectoresp];
                tableRows.push(rowData3);
                const rowData4 = ['ELV. CANJ ENSACADORA No', item.turno, item.ensacadora];
                tableRows.push(rowData4);
                const rowData5 = ['ENSACADORA No.1', item.turno, item.ensacadora1];
                tableRows.push(rowData5);
                const rowData6 = ['ELV. CANJ DE SILOS', item.turno, item.elvsilos];
                tableRows.push(rowData6);
                const rowData7 = ['GUSANO DE FINOS SILO 1', item.turno, item.gusanof1];
                tableRows.push(rowData7);
                const rowData8 = ['GUSANO DE FINOS SILO 5', item.turno, item.gusanof5];
                tableRows.push(rowData8);
                const rowData9 = ['QUEBRADORA PRIMARIA', item.turno, item.quebradorapr];
                tableRows.push(rowData9);
            });
        }

        // Agregar datos de la segunda tabla
        if (Array.isArray(hrsmolinos)) {
            hrsmolinos.forEach((item) => {
                const rowData = ['MOLINO No.1', item.turno, item.hrsm1, item.prodm1];
                tableRows.push(rowData);
                const rowData1 = ['MOLINO No.2', item.turno, item.hrsm2, item.prodm2];
                tableRows.push(rowData1);
            });
        }

        const firstTableHeight = doc.autoTable.previous.finalY || startY;
        const tablePropsTurnos = {
            startY: 30,
            margin: { horizontal: 104 },
            tableWidth: 100
        };

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: firstTableHeight + 10,
            theme: 'grid',
            headStyles: {
                fillColor: [0, 128, 0] // Cambia el color del encabezado de la tabla a azul
            },
            ...tablePropsTurnos,
            setFontSize: 10,
            // Asegúrate de definir los estilos o pasarlos directamente como objetos
            headStyles: styles.tableHeader,
            bodyStyles: styles.tableRow,
        });

    }
    
    const generateCombinedTable2TURNO = (doc, horno, hrsmolinos, title, startY) => {
        const tableColumn = ['OPERACION/EQUIPO', 'TURNO', 'HS.EFVAS', 'PROD.(TON)'];
        const tableRows = [];
        doc.setFontSize(12);
        doc.text('TURNO 2', 100, 147);

        // Agregar datos de la primera tabla
        if (Array.isArray(horno)) {
            horno.forEach((item) => {

                const rowData = ['QUEBRADORA', item.turno, item.quebradora];
                tableRows.push(rowData);
                const rowData1 = ['HORNO ROTATORIO', item.turno, item.hrotatorio];
                tableRows.push(rowData1);
                const rowData2 = ['ELV. CANJ MOLINOS 1-2', item.turno, item.elvmolinos];
                tableRows.push(rowData2);
                const rowData3 = ['COLECTORES DE POLVO', item.turno, item.colectoresp];
                tableRows.push(rowData3);
                const rowData4 = ['ELV. CANJ ENSACADORA No', item.turno, item.ensacadora];
                tableRows.push(rowData4);
                const rowData5 = ['ENSACADORA No.1', item.turno, item.ensacadora1];
                tableRows.push(rowData5);
                const rowData6 = ['ELV. CANJ DE SILOS', item.turno, item.elvsilos];
                tableRows.push(rowData6);
                const rowData7 = ['GUSANO DE FINOS SILO 1', item.turno, item.gusanof1];
                tableRows.push(rowData7);
                const rowData8 = ['GUSANO DE FINOS SILO 5', item.turno, item.gusanof5];
                tableRows.push(rowData8);
                const rowData9 = ['QUEBRADORA PRIMARIA', item.turno, item.quebradorapr];
                tableRows.push(rowData9);
            });
        }

        // Agregar datos de la segunda tabla
        if (Array.isArray(hrsmolinos)) {
            hrsmolinos.forEach((item) => {
                const rowData = ['MOLINO No.1', item.turno, item.hrsm1, item.prodm1];
                tableRows.push(rowData);
                const rowData1 = ['MOLINO No.2', item.turno, item.hrsm2, item.prodm2];
                tableRows.push(rowData1);
            });
        }

        const firstTableHeight = doc.autoTable.previous.finalY || startY;
        const tablePropsTurnos = {
            startY: 150,
            margin: { horizontal: 104 },
            tableWidth: 100
        };

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: firstTableHeight + 10,
            theme: 'grid',
            headStyles: {
                fillColor: [0, 128, 0] // Cambia el color del encabezado de la tabla a azul
            },
            ...tablePropsTurnos,
            setFontSize: 10,
            // Asegúrate de definir los estilos o pasarlos directamente como objetos
            headStyles: styles.tableHeader,
            bodyStyles: styles.tableRow,
        });

    }
    const generateCombinedTable2TURNO3 = (doc, horno, hrsmolinos, title, startY) => {
        const tableColumn = ['OPERACION/EQUIPO', 'TURNO', 'HS.EFVAS', 'PROD.(TON)'];
        const tableRows = [];
        doc.setFontSize(12);
        doc.text('TURNO 3', 100, 267);

        // Agregar datos de la primera tabla
        if (Array.isArray(horno)) {
            horno.forEach((item) => {

                const rowData = ['QUEBRADORA', item.turno, item.quebradora];
                tableRows.push(rowData);
                const rowData1 = ['HORNO ROTATORIO', item.turno, item.hrotatorio];
                tableRows.push(rowData1);
                const rowData2 = ['ELV. CANJ MOLINOS 1-2', item.turno, item.elvmolinos];
                tableRows.push(rowData2);
                const rowData3 = ['COLECTORES DE POLVO', item.turno, item.colectoresp];
                tableRows.push(rowData3);
                const rowData4 = ['ELV. CANJ ENSACADORA No', item.turno, item.ensacadora];
                tableRows.push(rowData4);
                const rowData5 = ['ENSACADORA No.1', item.turno, item.ensacadora1];
                tableRows.push(rowData5);
                const rowData6 = ['ELV. CANJ DE SILOS', item.turno, item.elvsilos];
                tableRows.push(rowData6);
                const rowData7 = ['GUSANO DE FINOS SILO 1', item.turno, item.gusanof1];
                tableRows.push(rowData7);
                const rowData8 = ['GUSANO DE FINOS SILO 5', item.turno, item.gusanof5];
                tableRows.push(rowData8);
                const rowData9 = ['QUEBRADORA PRIMARIA', item.turno, item.quebradorapr];
                tableRows.push(rowData9);
            });
        }

        // Agregar datos de la segunda tabla
        if (Array.isArray(hrsmolinos)) {
            hrsmolinos.forEach((item) => {
                const rowData = ['MOLINO No.1', item.turno, item.hrsm1, item.prodm1];
                tableRows.push(rowData);
                const rowData1 = ['MOLINO No.2', item.turno, item.hrsm2, item.prodm2];
                tableRows.push(rowData1);
            });
        }

        const firstTableHeight = doc.autoTable.previous.finalY || startY;
        const tablePropsTurnos = {
            startY: 270,
            margin: { horizontal: 104 },
            tableWidth: 100
        };

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: firstTableHeight + 10,
            theme: 'grid',
            headStyles: {
                fillColor: [0, 128, 0] // Cambia el color del encabezado de la tabla a azul
            },
            ...tablePropsTurnos,
            setFontSize: 10,
            // Asegúrate de definir los estilos o pasarlos directamente como objetos
            headStyles: styles.tableHeader,
            bodyStyles: styles.tableRow,
        });

    }





    const generateNotas = (doc, criba, horno, title, startY) => {
        const tableColumn = ['OBSERVACIONES'];
        const tableRows = [];

        // Agregar datos de la primera tabla
        if (Array.isArray(criba)) {
            criba.forEach((item) => {

                const rowData = [item.notas];
                tableRows.push(rowData);

            });
        }
        if (Array.isArray(horno)) {
            horno.forEach((item) => {

                const rowData = [item.notas];
                tableRows.push(rowData);

            });
        }

        const firstTableHeight = doc.autoTable.previous.finalY || startY;
        const tablePropsTurnos = {
            startY: 120,
            margin: { horizontal: 14 },
            tableWidth: 190
        };

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: firstTableHeight + 10,
            theme: 'grid',
            headStyles: {
                fillColor: [0, 128, 0] // Cambia el color del encabezado de la tabla a azul
            },
            ...tablePropsTurnos,
            setFontSize: 10,
            // Asegúrate de definir los estilos o pasarlos directamente como objetos
            headStyles: styles.tableHeader,
            bodyStyles: styles.tableRow,
        });

    }
    const generateNotas2 = (doc, criba, horno, title, startY) => {
        const tableColumn = ['OBSERVACIONES'];
        const tableRows = [];

        // Agregar datos de la primera tabla
        if (Array.isArray(criba)) {
            criba.forEach((item) => {

                const rowData = [item.notas];
                tableRows.push(rowData);

            });
        }
        if (Array.isArray(horno)) {
            horno.forEach((item) => {

                const rowData = [item.notas];
                tableRows.push(rowData);

            });
        }

        const firstTableHeight = doc.autoTable.previous.finalY || startY;
        const tablePropsTurnos = {
            startY: 240,
            margin: { horizontal: 14 },
            tableWidth: 190
        };

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: firstTableHeight + 10,
            theme: 'grid',
            headStyles: {
                fillColor: [0, 128, 0] // Cambia el color del encabezado de la tabla a azul
            },
            ...tablePropsTurnos,
            setFontSize: 10,
            // Asegúrate de definir los estilos o pasarlos directamente como objetos
            headStyles: styles.tableHeader,
            bodyStyles: styles.tableRow,
        });
    }
    const generateNotas3 = (doc, criba, horno, title, startY) => {
        const tableColumn = ['OBSERVACIONES'];
        const tableRows = [];

        // Agregar datos de la primera tabla
        if (Array.isArray(criba)) {
            criba.forEach((item) => {

                const rowData = [item.notas];
                tableRows.push(rowData);

            });
        }
        if (Array.isArray(horno)) {
            horno.forEach((item) => {

                const rowData = [item.notas];
                tableRows.push(rowData);

            });
        }

        const firstTableHeight = doc.autoTable.previous.finalY || startY;
        const tablePropsTurnos = {
            startY: 360,
            margin: { horizontal: 14 },
            tableWidth: 190
        };

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: firstTableHeight + 10,
            theme: 'grid',
            headStyles: {
                fillColor: [0, 128, 0] // Cambia el color del encabezado de la tabla a azul
            },
            ...tablePropsTurnos,
            setFontSize: 10,
            // Asegúrate de definir los estilos o pasarlos directamente como objetos
            headStyles: styles.tableHeader,
            bodyStyles: styles.tableRow,
        });

    }
    return (
        <div className="pdf-container">
            <div className='pdfs'>
                <h1>Descargar Reporte</h1>
                <div className="close-button" onClick={() => navigate('/horometros')}>
                    <FontAwesomeIcon icon={faTimes} />
                </div>
                <DatePicker selected={selectedDate} onChange={handleDateChange} />
                <button onClick={generatePDF}>Descargar PDF</button>
            </div>
        </div>
    )
}

export default PdfHorometro
