import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../ReporteDiario/Pdj.css';
import Logo from'../../assest/logo.png'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function PdfMolienda() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [pdfGenerated, setPdfGenerated] = useState(false);
    const [otherTableData, setOtherTableData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    useEffect(() => {
        // Verificar si selectedDate tiene un valor antes de llamar a fetchData
        if (selectedDate) {
            fetchData(selectedDate);
        }
    }, [selectedDate]);

    const fetchData = async (fecha) => {
        try {
            const responseProducts = await fetch(`http://localhost:8081/getmezclas/${fecha}`);
            const responseOtherTable = await fetch(`http://localhost:8081/getpromedios/${fecha}`);
           

            if ( !responseProducts.ok || !responseOtherTable.ok) {
                throw new Error('Error al obtener los datos');
            }

            const dataProducts = await responseProducts.json();
            const dataOtherTable = await responseOtherTable.json();
           

            setProducts(dataProducts);
            setOtherTableData(dataOtherTable);
            
        } catch (error) {
            console.log('Error:', error);
        }

    };

    const handleDateChange = (date) => {
        console.log(date);
        // Convertir la fecha al formato deseado antes de actualizar el estado
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
        navigate('/molienda')
        const doc = new jsPDF({
            orientation: 'l', // Orientación: 'p' para retrato, 'l' para paisaje
            unit: 'mm', // Unidad de medida: milímetros
            format: [168, 230], // Tamaño del papel: 'a4', 'letter', 'legal', etc.
            putOnlyUsedFonts: true,
            floatPrecision: 16,
            margins: { // Márgenes personalizados
                top: 20,
                bottom: 20,
                left: 15,
                right: 15
            }
          
        });

    // Configuración del título del documento
    doc.setFont("fontName");
    doc.text('MINERALES Y ARCILLAS, S.A. DE C.V', 60, 10);


    const imgData = Logo; // Asigna la imagen importada a una variable
    doc.addImage(imgData, 'PNG', 15, 5, 20, 15); // Agrega la imagen al PDF



    generateprimTable(doc, products.filter(item => item.turno === 1), 'Turno 1', 50);

    // Generar tabla para el turno 2
    generatesecTable(doc, products.filter(item => item.turno === 2), 'Turno 2', 80);

    generatetreTable(doc, products.filter(item => item.turno === 3), 'Turno 3', 110);

    generatecuartTable(doc, products.filter(item => item.turno === 1), 'Turno 1', 50);

    // Generar tabla para el turno 2
    generatequinTable(doc, products.filter(item => item.turno === 2), 'Turno 2', 80);

    generasexTable(doc, products.filter(item => item.turno === 3), 'Turno 3', 110);



    generateprimOtherTable(doc, otherTableData.filter(item => item.turno === 1), 'Turno 1', 140);
    generatesecOtherTable(doc, otherTableData.filter(item => item.turno === 2), 'Turno 2', 170);
    generatetreOtherTable(doc, otherTableData.filter(item => item.turno === 3), 'Turno 3', 200);


    // Generar otra tabla para los datos de la otra tabla
   
    let fileName = `Reporte_Molienda.pdf`;


    // Descargar el PDF con el nombre de archivo generado
    doc.save(fileName);

    // Actualizar el estado para indicar que el PDF ha sido generado
    setPdfGenerated(true);
    }

    const styles = {
        tableHeader: {
          fillColor:[255, 0, 0],
          textColor:[255, 255, 255], // Color blanco para el texto del encabezado
          fontStyle: 'bold', // Fuente en negrita para el encabezado
          fontSize: 10
        },
        tableRow: {
          fillColor: [255, 255, 255], // Color blanco para las filas de la tabla
          textColor: [0, 0, 0], // Color negro para el texto de las filas
          fontSize: 8
        }
      };

      const generateprimTable = (doc, data, title, startY) => {
        doc.setFontSize(14);
        doc.text('Molienda', 95,18);
    
      
    
        // Crear tabla
        const tableColumn = ['Mezclas', 'Turno',  'TON', 'P.Espc'];
        const tableRows = [];
    
        data.forEach((item) => {
            const rowData = [
                'Conc.Mesas',
                item.turno,
                item. concmesas,
                item.pecm,
               
            ];
            tableRows.push(rowData);
            const rowData1 = [
                'Medios',
                item.turno,
                item.medios,
                item.pem,
               
            ];
            tableRows.push(rowData1);
            const rowData2 = [
                'Conc.Jigs',
                item.turno,
                item.concjigs,
                item.pejig,
               
            ];
            tableRows.push(rowData2);
            const rowData3 = [
                'Desensolvez',
                item.turno,
                item.desenslovez,
                item.pedese,
                
            ];
            tableRows.push(rowData3);
            const rowData4 = [
                'Mezcla Total',
                item.turno,
                item.mezclatotal,
                item.pemt,
               
            ];
            tableRows.push(rowData4);
         
            
        });
        const firstTableHeight = doc.autoTable.previous.finalY || startY;
        const tablePropsTurnos = {
            startY: 20,
            margin: { horizontal: 14 },
            tableWidth: 80
        };
        // Agregar tabla al documento
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
    };
    const generatesecTable = (doc, data, title, startY) => {
       
    
    
        // Crear tabla
      
        const tableColumn = ['Turno', 'TON', 'P.E'];
        const tableRows = [];
    
        data.forEach((item) => {
            const rowData = [
    
                item.turno,
                item. concmesas,
                item.pecm,
            ];
            tableRows.push(rowData);
            const rowData1 = [
    
                item.turno,
                item.medios,
                item.pem,
            ];
            tableRows.push(rowData1);
            const rowData2 = [
    
                item.turno,
                item.concjigs,
                item.pejig,
            ];
            tableRows.push(rowData2);
            const rowData3 = [
    
                item.turno,
                item.desenslovez,
                item.pedese,
            ];
            tableRows.push(rowData3);
            const rowData4 = [
    
                item.turno,
                item.mezclatotal,
                item.pemt,
            ];
            tableRows.push(rowData4);
       
    
        });
        const firstTableHeight = doc.autoTable.previous.finalY || startY;
        const tablePropsOtraTabla = {
            startY: 20,
            margin: { horizontal: 94 },
            tableWidth: 60
        };
        // Agregar tabla al documento
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: firstTableHeight + 10,
            theme: 'grid',
            headStyles: {
                fillColor: [0, 128, 0] // Cambia el color del encabezado de la tabla a azul
            },
            ...tablePropsOtraTabla,
            headStyles: styles.tableHeader,
            bodyStyles: styles.tableRow
        });
    };
    const generatetreTable = (doc, data, title, startY) => {
    
    
        // Crear tabla
        const tableColumn = ['Turno', 'TON', 'P.E'];
        const tableRows = [];
    
        data.forEach((item) => {
            const rowData = [
    
                item.turno,
                item. concmesas,
                item.pecm,
            ];
            tableRows.push(rowData);
            const rowData1 = [
    
                item.turno,
                item.medios,
                item.pem,
            ];
            tableRows.push(rowData1);
            const rowData2 = [
    
                item.turno,
                item.concjigs,
                item.pejig,
            ];
            tableRows.push(rowData2);
            const rowData3 = [
    
                item.turno,
                item.desenslovez,
                item.pedese,
            ];
            tableRows.push(rowData3);
            const rowData4 = [
    
                item.turno,
                item.mezclatotal,
                item.pemt,
            ];
            tableRows.push(rowData4);
          
    
        });
        const firstTableHeight = doc.autoTable.previous.finalY || startY;
        const tablePropsOtraTabla = {
            startY: 20,
            margin: { horizontal: 154 },
            tableWidth: 60
        };
        // Agregar tabla al documento
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: firstTableHeight + 10,
            theme: 'grid',
            headStyles: {
                fillColor: [0, 128, 0] // Cambia el color del encabezado de la tabla a azul
            },
            ...tablePropsOtraTabla,
            headStyles: styles.tableHeader,
            bodyStyles: styles.tableRow,
        
    
        });
    };


    const generatecuartTable = (doc, data, title, startY) => {
    
    
        // Crear tabla
        const tableColumn = ['','Turno', 'Salidas'];
        const tableRows = [];
    
        data.forEach((item) => {
            const rowData = [
                'PMLT',
                item.turno,
                item.pmlt,
              
             
            ];
            tableRows.push(rowData);
            const rowData1 = [
                'PMLE',
                item.turno,
                item.pmle,
                
             
            ];
            tableRows.push(rowData1);
            const rowData2 = [
                'Otras Salidas',
                item.turno,
                item. otrassalidas,
             
            ];
            tableRows.push(rowData2);
        });
        const firstTableHeight = doc.autoTable.previous.finalY || startY;
        const tablePropsOtraTabla = {
            startY: 70,
            margin: { horizontal: 14 },
            tableWidth: 70
        };
        // Agregar tabla al documento
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: firstTableHeight + 10,
            theme: 'grid',
            headStyles: {
                fillColor: [0, 128, 0] // Cambia el color del encabezado de la tabla a azul
            },
            ...tablePropsOtraTabla,
            headStyles: styles.tableHeader,
            bodyStyles: styles.tableRow,
        
    
        });
    };
    const generatequinTable = (doc, data, title, startY) => {
    
    
        // Crear tabla
        const tableColumn = ['Turno', 'Salidas'];
        const tableRows = [];
    
        data.forEach((item) => {
            const rowData = [
    
                item.turno,
                item.pmlt,
             
            ];
            tableRows.push(rowData);
            const rowData1 = [
                
                item.turno,
                item.pmle,
              
             
            ];
            tableRows.push(rowData1);
            const rowData2 = [
                
                item.turno,
                item. otrassalidas,
             
            ];
            tableRows.push(rowData2);
        });
        const firstTableHeight = doc.autoTable.previous.finalY || startY;
        const tablePropsOtraTabla = {
            startY: 70,
            margin: { horizontal: 84},
            tableWidth: 70
        };
        // Agregar tabla al documento
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: firstTableHeight + 10,
            theme: 'grid',
            headStyles: {
                fillColor: [0, 128, 0] // Cambia el color del encabezado de la tabla a azul
            },
            ...tablePropsOtraTabla,
            headStyles: styles.tableHeader,
            bodyStyles: styles.tableRow,
        
    
        });
    };
    const generasexTable = (doc, data, title, startY) => {
    
    
        // Crear tabla
        const tableColumn = ['Turno', 'Salidas'];
        const tableRows = [];
    
        data.forEach((item) => {
            const rowData = [
    
                item.turno,
                item. otrassalidas,
             
            ];
            tableRows.push(rowData);
            const rowData1 = [
                
                item.turno,
                item.pmle,
              
             
            ];
            tableRows.push(rowData1);
            const rowData2 = [
                
                item.turno,
                item. otrassalidas,
             
            ];
            tableRows.push(rowData2);
          
        });
        const firstTableHeight = doc.autoTable.previous.finalY || startY;
        const tablePropsOtraTabla = {
            startY: 70,
            margin: { horizontal: 154},
            tableWidth: 60
        };
        // Agregar tabla al documento
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: firstTableHeight + 10,
            theme: 'grid',
            headStyles: {
                fillColor: [0, 128, 0] // Cambia el color del encabezado de la tabla a azul
            },
            ...tablePropsOtraTabla,
            headStyles: styles.tableHeader,
            bodyStyles: styles.tableRow,
        
    
        });
    };



    const generateprimOtherTable = (doc, data, title, startY) => {
        doc.setFontSize(14);
        doc.text('Promedios', 95,108);
    
      
    
        // Crear tabla
        const tableColumn = ['', 'Turno',  'Molino 1', 'Molino 2'];
        const tableRows = [];
    
        data.forEach((item) => {
            const rowData = [
                'P.Esp',
                item.turno,
                item. pemolino1,
                item.pemolino2,
               
            ];
            tableRows.push(rowData);
            const rowData1 = [
                '% Ret.Malla 200',
                item.turno,
                item.malla200mo1,
                item. malla200mo2,
               
            ];
            tableRows.push(rowData1);
            const rowData2 = [
                '% Ret.Malla 325',
                item.turno,
                item.malla325mo1,
                item.malla325mo2,
               
            ];
            tableRows.push(rowData2);
            const rowData3 = [
                'Calcios en P.P.M',
                item.turno,
                item.calciosmo1,
                item.calciosmo2,
                
            ];
            tableRows.push(rowData3);
            const rowData4 = [
                '% Humedad',
                item.turno,
                item.humedadmo1,
                item. humedadmo2,
               
            ];
            tableRows.push(rowData4);
          
            
        });
        const firstTableHeight = doc.autoTable.previous.finalY || startY;
        const tablePropsTurnos = {
            startY: 110,
            margin: { horizontal: 14 },
            tableWidth: 80
        };
        // Agregar tabla al documento
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
    };

    const generatesecOtherTable = (doc, data, title, startY) => {
       
    
    
        // Crear tabla
      
        const tableColumn = ['Turno',  'Molino 1', 'Molino 2'];
        const tableRows = [];
    
        data.forEach((item) => {
            const rowData = [
    
                item.turno,
                item. pemolino1,
                item.pemolino2,
            ];
            tableRows.push(rowData);
            const rowData1 = [
    
                item.turno,
                item.malla200mo1,
                item. malla200mo2,
            ];
            tableRows.push(rowData1);
            const rowData2 = [
    
                item.turno,
                item.malla325mo1,
                item.malla325mo2,
            ];
            tableRows.push(rowData2);
            const rowData3 = [
    
                item.turno,
                item.calciosmo1,
                item.calciosmo2,
            ];
            tableRows.push(rowData3);
            const rowData4 = [
    
                item.turno,
                item.humedadmo1,
                item. humedadmo2,
            ];
            tableRows.push(rowData4);
           
    
        });
        const firstTableHeight = doc.autoTable.previous.finalY || startY;
        const tablePropsOtraTabla = {
            startY: 110,
            margin: { horizontal: 94 },
            tableWidth: 60
        };
        // Agregar tabla al documento
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: firstTableHeight + 10,
            theme: 'grid',
            headStyles: {
                fillColor: [0, 128, 0] // Cambia el color del encabezado de la tabla a azul
            },
            ...tablePropsOtraTabla,
            headStyles: styles.tableHeader,
            bodyStyles: styles.tableRow
        });
    };
  
    const generatetreOtherTable = (doc, data, title, startY) => {
    
    
        // Crear tabla
        const tableColumn = ['Turno',  'Molino 1', 'Molino 2'];
        const tableRows = [];
    
        data.forEach((item) => {
            const rowData = [
    
                item.turno,
                item. pemolino1,
                item.pemolino2,
            ];
            tableRows.push(rowData);
            const rowData1 = [
    
                item.turno,
                item.malla200mo1,
                item. malla200mo2,
            ];
            tableRows.push(rowData1);
            const rowData2 = [
    
                item.turno,
                item.malla325mo1,
                item.malla325mo2,
            ];
            tableRows.push(rowData2);
            const rowData3 = [
    
                item.turno,
                item.calciosmo1,
                item.calciosmo2,
            ];
            tableRows.push(rowData3);
            const rowData4 = [
    
                item.turno,
                item.humedadmo1,
                item. humedadmo2,
            ];
            tableRows.push(rowData4)
    
        });
        const firstTableHeight = doc.autoTable.previous.finalY || startY;
        const tablePropsOtraTabla = {
            startY: 110,
            margin: { horizontal: 154 },
            tableWidth: 60
        };
        // Agregar tabla al documento
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: firstTableHeight + 10,
            theme: 'grid',
            headStyles: {
                fillColor: [0, 128, 0] // Cambia el color del encabezado de la tabla a azul
            },
            ...tablePropsOtraTabla,
            headStyles: styles.tableHeader,
            bodyStyles: styles.tableRow,
        
    
        });
    };


    
  return (
    
    <div className="pdf-container">
        <div className='pdfs'>
    <h1>Descargar Reporte</h1>
    <div className="close-button" onClick={() => navigate('/molienda')}>
        <FontAwesomeIcon icon={faTimes} />
      </div>
    <DatePicker selected={selectedDate} onChange={ handleDateChange} />
    <button onClick={generatePDF}>Descargar PDF</button>
</div>
</div>
  )
}

export default PdfMolienda
