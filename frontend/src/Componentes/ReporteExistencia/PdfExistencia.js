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

function PdfExistencia() {
  const navigate = useNavigate();
  const [silos, setSilos] = useState([]);
  const [mesas, setMesas] = useState([]);
  const [sec, setSec] = useState([]);
  const [medios46, setMedios46] = useState([]);
  const [medios4, setMedios4] = useState([]);
  const [medios3, setMedios3] = useState([]);
  const [granobandas, setGranoBandas] = useState([]);
  const [granopmoler, setGranoPMoler] = useState([]);
  const [granojigs, setGranoJigs] = useState([]);
  const [desensolvech, setDesensolveCh] = useState([]);
  const [desensolve, setDesensolve] = useState([]);
  const [desecho43, setDesecho43] = useState([]);
  const [desecho39, setDesecho39] = useState([]);
  const [baritron, setBaritron] = useState([]);
  const [mmlt, setMMLT] = useState([]);
  const [mmle, setMMLE] = useState([]);
  const [mpmlt, setMPMLT] = useState([]);
  const [mpmle, setMPMLE] = useState([]);
  const [tmlt, setTMLT] = useState([]);
  const [tmle, setTMLE] = useState([]);
  const [tolvag, setTolvaG] = useState([]);
  const [tolvasmolinos, setTolvasMolinos] = useState([]);
  const [seleccion, setSeleccion] = useState([]);
  const [granobari, setGranoBari] = useState([]);
  const [concbari, setConcBari] = useState([]);
  const [notas, setNotas] = useState([]);
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
      const responseMesas = await fetch(`http://localhost:8081/getconcmesas/${fecha}`);
      const responseSec = await fetch(`http://localhost:8081/getconcjigssec/${fecha}`);
      const responseMedios46 = await fetch(`http://localhost:8081/getmedios46/${fecha}`);
      const responseMedios4 = await fetch(`http://localhost:8081/getmedios4/${fecha}`);
      const responseMedios3 = await fetch(`http://localhost:8081/getmedios3/${fecha}`);
      const responseGranoBandas = await fetch(`http://localhost:8081/getgranobandas/${fecha}`);
      const responseGranoPMoler = await fetch(`http://localhost:8081/getgranopmoler/${fecha}`);
      const responseGranoJigs = await fetch(`http://localhost:8081/getgranojigs/${fecha}`);
      const responseDesensolveCh = await fetch(`http://localhost:8081/getdesensolvech/${fecha}`);
      const responseDesensolve = await fetch(`http://localhost:8081/getdesensolve/${fecha}`);
      const responseDesecho43 = await fetch(`http://localhost:8081/getdesecho43/${fecha}`);
      const responseDesecho39 = await fetch(`http://localhost:8081/getdesecho39/${fecha}`);
      const responseBaritron = await fetch(`http://localhost:8081/getbaritron/${fecha}`);
      const responseTolvasMolinos = await fetch(`http://localhost:8081/gettolvasmolinos/${fecha}`);
      const responseMMLT = await fetch(`http://localhost:8081/getmmlt/${fecha}`);
      const responseMMLE = await fetch(`http://localhost:8081/getmmle/${fecha}`);
      const responseMPMLT = await fetch(`http://localhost:8081/getmpmlt/${fecha}`);
      const responseMPMLE = await fetch(`http://localhost:8081/getmpmle/${fecha}`);
      const responseTMLT = await fetch(`http://localhost:8081/gettmlt/${fecha}`);
      const responseTMLE = await fetch(`http://localhost:8081/gettmle/${fecha}`);
      const responseTolvaG = await fetch(`http://localhost:8081/gettolvag/${fecha}`);
      const responseSeleccion = await fetch(`http://localhost:8081/getseleccion/${fecha}`);
      const responseGranoBari = await fetch(`http://localhost:8081/getgrabari/${fecha}`);
      const responseConcBari = await fetch(`http://localhost:8081/getconcbari/${fecha}`);
      const responseNotas = await fetch(`http://localhost:8081/getnotas/${fecha}`)





      if ( !responseSilos.ok||!responseMesas.ok || !responseSec.ok || !responseMedios46.ok|| !responseMedios4.ok|| 
        !responseMedios3|| !responseGranoBandas|| !responseGranoPMoler|| !responseGranoJigs.ok|| !responseDesensolveCh.ok|| !responseDesensolve||
         !responseDesecho43||!responseDesecho39|| !responseBaritron|| !responseTolvasMolinos||!responseMMLT.ok||!responseMMLE.ok||!responseMPMLT.ok||
         !responseMPMLE.ok||!responseTMLT.ok||!responseTMLE.ok||!responseTolvaG.ok||!responseSeleccion.ok|| !responseGranoBari.ok|| !responseConcBari.ok|| !responseNotas.ok) {
          throw new Error('Error al obtener los datos');
      }

      const dataSilos = await responseSilos.json();
      const dataMesas = await responseMesas.json();
      const dataSec = await responseSec.json();
      const dataMedios46 = await responseMedios46.json();
      const dataMedios4 = await responseMedios4.json();
      const dataMedios3 = await responseMedios3.json();
      const dataGranoBandas = await responseGranoBandas.json();
      const dataGranoPMoler = await responseGranoPMoler.json();
      const dataGranoJigs = await responseGranoJigs.json();
      const dataDesensolveCh = await responseDesensolveCh.json();
      const dataDesensolve = await responseDesensolve.json();
      const dataDesecho43 = await responseDesecho43.json();
      const dataDesecho39 = await responseDesecho39.json();
      const dataBaritron = await responseBaritron.json();
      const dataTolvasMolinos = await responseTolvasMolinos.json();
      const dataMMLT= await responseMMLT.json();
      const dataMMLE= await responseMMLE.json();
      const dataMPMLT= await responseMPMLT.json();
      const dataMPMLE= await responseMPMLE.json();
      const dataTMLT= await responseTMLT.json();
      const dataTMLE= await responseTMLE.json();
      const dataTolvaG= await responseTolvaG.json();
      const dataSeleccion = await responseSeleccion.json();
      const dataGranoBari = await responseGranoBari.json();
      const dataConcBari = await responseConcBari.json();
      const dataNotas = await responseNotas.json();
      

      setSilos(dataSilos);
      setMesas(dataMesas);
      setSec(dataSec);
      setMedios46(dataMedios46);
      setMedios4(dataMedios4);
      setMedios3(dataMedios3);
      setGranoBandas(dataGranoBandas);
      setGranoPMoler(dataGranoPMoler);
      setGranoJigs(dataGranoJigs);
      setDesensolveCh(dataDesensolveCh);
      setDesensolve(dataDesensolve);
      setDesecho43(dataDesecho43);
      setDesecho39(dataDesecho39);
      setBaritron(dataBaritron);
      setTolvasMolinos(dataTolvasMolinos);
      setMMLT(dataMMLT);
      setMMLE(dataMMLE);
      setMPMLT(dataMPMLT);
      setMPMLT(dataMPMLT);
      setMPMLE(dataMPMLE);
      setTMLT(dataTMLT);
      setTMLE(dataTMLE);
      setTolvaG(dataTolvaG);
      setSeleccion(dataSeleccion);
      setGranoBari(dataGranoBari);
      setConcBari(dataConcBari);
      setNotas(dataNotas);
     
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
      format:[216, 360], // Tamaño del papel: 'a4', 'letter', 'legal', etc.
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
doc.text('REPORTE DE PRODUCCION DE EXISTENCIAS', 50, 10);
doc.setFontSize(12);
doc.text(`Fecha: ${selectedDate}`, 150, 17); // Agrega el texto de la fecha en la posición deseada
const imgData = Logo; // Asigna la imagen importada a una variable
doc.addImage(imgData, 'PNG', 15, 5, 20, 15); // Agrega la imagen al PDF

generateSilos(doc, silos, 'Silos', 25);
// Llamada a la función generateCombinedTable
generateCombinedTable(doc, mesas, sec, medios46,medios4,medios3,granobandas,granopmoler,
                      granojigs,desensolvech,desensolve,desecho43,desecho39,baritron,tolvasmolinos,'Tabla Combinada', 50);

generateSecondCombinedTable(doc, mmlt,mmle,mpmlt,mpmle,tmlt,tmle,tolvag, 'Tabla 2 Combinada', 100);

generateTridCombinedTable(doc, seleccion, granobari, concbari, 'Tabla 2 Combinada', 100);
generateCuartCombinedTable(doc, notas, 'Tabla NOTAS', 150);


let fileName = `reporte_existencias.pdf`;


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
    fontSize: 12
  },
  tableRow: {
    fillColor: [255, 255, 255], // Color blanco para las filas de la tabla
    textColor: [0, 0, 0], // Color negro para el texto de las filas
    fontSize: 8
  }
};

////////////TABLA SILOS////////////7
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
}
const generateCombinedTable = (doc, mesas, sec, medios46,medios4,medios3,granobandas,granopmoler, title, startY) => {
  const tableColumn = ['', '', 'TONS.', 'P.E'];
  const tableRows = [];

  // Agregar datos de la primera tabla
  mesas.forEach((item) => {
    const rowData = ['PP', 'CONCENTRADO',item.saldo, item.pe];
    tableRows.push(rowData);
  });

  // Agregar datos de la segunda tabla
  sec.forEach((item) => {
    const rowData = ['PP', 'CONCENTRADO JIG´SS CHINO SECUNDARIO', item.saldo, item.pe];
    tableRows.push(rowData);
  });

  // Agregar datos de la tercera tabla
  medios46.forEach((item) => {
    const rowData = ['PP', 'MEDIOS DE CONCENTRADO 4.06-4.10', item.saldo46, item.pe46];
    tableRows.push(rowData);
  });

  medios4.forEach((item) => {
    const rowData = ['PP', 'MEDIOS DE CONCENTRADO 4.00-4.04', item.saldo, item.pe];
    tableRows.push(rowData);
  });

  medios3.forEach((item) => {
    const rowData = ['PP', 'MEDIOS DE CONCENTRADO 3.98', item.saldo, item.pe];
    tableRows.push(rowData);
  });
  granobandas.forEach((item) => {
    const rowData = ['PP', 'GRANO PARA BANDAS DE SELECCION 4.25', item.saldo, item.pesp];
    tableRows.push(rowData);
  });
  granopmoler.forEach((item) => {
    const rowData = ['PP', 'GRANO P/MOLER', item.saldo, item.pe];
    tableRows.push(rowData);
  });
  granojigs.forEach((item) => {
    const rowData = ['PP', 'GRANO JIG´SS CHINO', item.saldo, item.pe];
    tableRows.push(rowData);
  });
  desensolvech.forEach((item) => {
    const rowData = ['PP', 'DESENSOLVE JIG´SS CHINO', item.saldo, item.pe];
    tableRows.push(rowData);
  });
  desensolve.forEach((item) => {
    const rowData = ['PP', 'DESENSOLVE 4.00-4.10', item.saldo, item.pe];
    tableRows.push(rowData);
  });
  desecho43.forEach((item) => {
    const rowData = ['PP', 'DESECHO GRANO DE SELECCION 4.30', item.saldo, item.pe];
    tableRows.push(rowData);
  });
  desecho39.forEach((item) => {
    const rowData = ['PP', 'DESECHO GRANO DE SELECCION 3.90-4.00', item.saldo, item.pe];
    tableRows.push(rowData);
  });
  baritron.forEach((item) => {
    const rowData = ['PP', 'BARITRON', item.saldo, item.pe];
    tableRows.push(rowData);
  });
  tolvasmolinos.forEach((item) => {
    const rowData = ['PP', 'TOLVAS DE MOLINOS', item.tolvamolinos, item.petm];
    const rowData1 =['PP', 'MEZCLAS PARA MOLER', item.mezclasmoler, item.pememo]
    tableRows.push(rowData);
    tableRows.push(rowData1);
  });
  const firstTableHeight = doc.autoTable.previous.finalY || startY;
  const tablePropsTurnos = {
    startY: 70,
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
    headStyles: styles.tableHeader,
    bodyStyles: styles.tableRow,
  });
};

const generateSecondCombinedTable = (doc, mmlt,mmle,mpmlt,mpmle,tmlt,tmle,tolvag, title, startY) => {
  const tableColumn = ['', '', 'TONS.', 'P.E'];
  const tableRows = [];

  // Agregar datos de la primera tabla
  mmlt.forEach((item) => {
    const rowData = ['MP', 'MINERAL MLT PARA MEZCLAS',item.saldo, item.pe];
    tableRows.push(rowData);
  });

  // Agregar datos de la segunda tabla
  mmle.forEach((item) => {
    const rowData = ['MP', 'MINERAL MLE PARA MEZCLAS', item.saldo, item.pe];
    tableRows.push(rowData);
  });

  // Agregar datos de la tercera tabla
  mpmlt.forEach((item) => {
    const rowData = ['MP', 'MINERAL EN PATIO MLT', item.saldo, item.pe];
    tableRows.push(rowData);
  });

  mpmle.forEach((item) => {
    const rowData = ['MP', 'MINERAL EN PATIO MLE', item.saldo, item.pe];
    tableRows.push(rowData);
  });

  tmle.forEach((item) => {
    const rowData = ['MP', 'MINERAL TRITURADO MLE', item.saldo, item.pe];
    tableRows.push(rowData);
  });
  
  tmlt.forEach((item) => {
    const rowData = ['MP', 'MINERAL TRITURADO  MLT', item.saldo, item.pe];
    tableRows.push(rowData);
  });
  tolvag.forEach((item) => {
    const rowData = ['MP', 'MINERAL TOLVA GENERAL MLE', item.saldo, item.pe];
    tableRows.push(rowData);
  });
 
  const firstTableHeight = doc.autoTable.previous.finalY || startY;
  const tablePropsTurnos = {
    startY: 190,
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
    headStyles: styles.tableHeader,
    bodyStyles: styles.tableRow,
  });
};
const generateTridCombinedTable = (doc, seleccion,granobari,concbari, title, startY) => {
  const tableColumn = ['', '', 'TONS.', 'P.E'];
  const tableRows = [];

  // Agregar datos de la primera tabla
  seleccion.forEach((item) => {
    const rowData = ['BS', 'BARITA SELECCION',item.saldo, item.pesp];
    tableRows.push(rowData);
  });

  // Agregar datos de la segunda tabla
  granobari.forEach((item) => {
    const rowData = ['PT', 'GRANO PARA BARIBRIGHT', item.saldo, item.pe];
    tableRows.push(rowData);
  });

  // Agregar datos de la tercera tabla
  concbari.forEach((item) => {
    const rowData = ['PT', 'CONCENTRADO PARA BARIBRIGHT', item.saldo, item.pe];
    tableRows.push(rowData);
  });

 
 
  const firstTableHeight = doc.autoTable.previous.finalY || startY;
  const tablePropsTurnos = {
    startY: 250,
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
    headStyles: styles.tableHeader,
    bodyStyles: styles.tableRow,
  });
};
const generateCuartCombinedTable = (doc, notas, title, startY) => {
  const tableColumn = ['NOTAS', ''];
  const tableRows = [];

  // Agregar datos de la primera tabla
  notas.forEach((item) => {
    const rowData = [item.totmedios, "TONS DE MEDIOS PASARON A LAVAR A MESAS "];
    tableRows.push(rowData);

    const rowData1 = [item.totjigssec , "TON DE MEDIOS PASARON A LAVAR A JIGG´S SECUNDARIO"];
    tableRows.push(rowData1);
    const rowData2 = [item.totdesensolve, "TON DE DESENSOLVE PASARON A LAVAR A MESAS"];
    tableRows.push(rowData2);

    const rowData3 = [item.totcolas, "TON DE COLAS PASARON A LAVAR A MESAS"];
    tableRows.push(rowData3);

    const rowData4 = [item.totjigssec , "TON DE MEDIOS PASARON A LAVAR A JIGG´S SECUNDARIO"];
    tableRows.push(rowData4);

    const rowData5 = [item.comentario];
    tableRows.push(rowData5);
  });

  // Agregar datos de la segunda tabla
  
  const firstTableHeight = doc.autoTable.previous.finalY || startY;
  const tablePropsTurnos = {
    startY: 290,
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
    headStyles: styles.tableHeader,
    bodyStyles: styles.tableRow,
  });
};



  return (
    <div className="pdf-container">
      <div className='pdfs'>
        <h1>Descargar Reporte</h1>
        <div className="close-button" onClick={() => navigate('/existencia')}>
        <FontAwesomeIcon icon={faTimes} />
      </div>
        <DatePicker selected={selectedDate} onChange={handleDateChange} />
        <button onClick={generatePDF}>Descargar PDF</button>
      </div>
    </div>
  )
}

export default PdfExistencia
