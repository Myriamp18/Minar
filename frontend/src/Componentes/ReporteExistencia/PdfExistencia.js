import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../ReporteDiario/Pdj.css';
import Logo from '../../assest/logo.png'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

function PdfExistencia() {
  const navigate = useNavigate();
  const [silos, setSilos] = useState([]);
  const [mesas, setMesas] = useState([]);
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
      const responseSilos = await fetch(`http://localhost:8081/getsilos/${fecha}`);
      const responseMesas = await fetch(`http://localhost:8081/getmesas/${fecha}`);

      if (!responseSilos.ok|| !responseMesas.ok) {
        throw new Error('Error al obtener los datos');
      }

      const dataSilos = await responseSilos.json();
      const dataMesas = await responseMesas.json();



      setSilos(dataSilos);
      setMesas(dataMesas)

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
    navigate('/existencia')
    const doc = new jsPDF({
      orientation: 'p', // Orientación: 'p' para retrato, 'l' para paisaje
      unit: 'mm', // Unidad de medida: milímetros
      format: [216, 356], // Tamaño del papel: 'a4', 'letter', 'legal', etc.
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
    doc.text('REPORTE DE PRODUCCION DE EXISTENCIAS', 50, 10);
    const imgData = Logo; // Asigna la imagen importada a una variable
    doc.addImage(imgData, 'PNG', 15, 5, 20, 15); // Agrega la imagen al PDF


    generateSilos(doc, silos, 'Tabla Silos', 25);
    generateMesas(doc, mesas, 'Tabla Mesas', 30);


    let fileName = `reporte_existencias.pdf`;


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
      fontSize: 12,
      alignment: 'center'
    },
    tableRow: {
      fillColor: [255, 255, 255], // Color blanco para las filas de la tabla
      textColor: [0, 0, 0], // Color negro para el texto de las filas
      fontSize: 10
    }
  };

  const generateSilos = (doc, data, title, startY) => {


    // Crear tabla
    const tableColumn = ['', '', 'TONS.', 'P.E'];
    const tableRows = [];

    data.forEach((item) => {
      const rowData = [
        'PT',
        'SILO 1',
        item.silo1,
        item.pes1,

      ];
      tableRows.push(rowData);
      const rowData1 = [
        'PT',
        'SILO 2',
        item.silo2,
        item.pes2,
      ];
      tableRows.push(rowData1);
      const rowData2 = [
        'PT',
        'SILO 3',
        item.silo3,
        item.pes3,
      ];
      tableRows.push(rowData2);
      const rowData3 = [
        'PT',
        'SILO 4',
        item.silo4,
        item.pes4,
      ];
      tableRows.push(rowData3);
      const rowData4 = [
        'PT',
        'SILO 5',
        item.silo5,
        item.pes5,
      ];
      tableRows.push(rowData4);


    });
    const firstTableHeight = doc.autoTable.previous.finalY || startY;
    const tablePropsTurnos = {
      startY: 20,
      margin: { horizontal: 14 },
      tableWidth: 190
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
    const generateMesas = (doc, data, title, startY) => {


      // Crear tabla
     
      data.forEach((item) => {
        const rowData = [
          'PT',
          'Concentrado',
          item.saldo,
          item.pe,
  
        ];
        tableRows.push(rowData);
      });
      const firstTableHeight = doc.autoTable.previous.finalY || startY;
      const tablePropsTurnos = {
        startY: 20,
        margin: { horizontal: 14 },
        tableWidth: 190
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
}
  return (
    <div className="pdf-container">
      <div className='pdfs'>
        <h1>Descargar Reporte</h1>
        <DatePicker selected={selectedDate} onChange={handleDateChange} />
        <button onClick={generatePDF}>Descargar PDF</button>
      </div>
    </div>
  )
}

export default PdfExistencia
