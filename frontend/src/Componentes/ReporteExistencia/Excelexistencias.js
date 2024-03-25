import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ExcelJS from 'exceljs';
import logoImageBase64 from '../../assest/logo.png';
import '../ReporteDiario/Excel.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function Excelexistencias() {
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
  const [exporting, setExporting] = useState(false);
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
}
  const applyTitleStyle = (cell) => {
    // Aplicar estilos al texto del título
    cell.font = { bold: true, size: 14, color: { argb: '000000' } }; // Negrita, tamaño 14, color negro
  };


  const exportToExcel = async () => {
    try {
      setExporting(true);
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Existencias');

      navigate('/existencia')
      // Insertar imagen
      const logoImage = workbook.addImage({
        base64: logoImageBase64, // Aquí debes colocar los datos de la imagen en formato base64
        extension: 'png', // Extensión de la imagen
      });

      // Agregar la imagen a una celda específica
      worksheet.addImage(logoImage, {
        tl: { col: 0.2, row: 0.2 }, // Esquina superior izquierda de la celda donde se insertará la imagen
        ext: { width: 60, height: 60 }, // Tamaño de la imagen
      });
      // Agregar la fila del título
      const titleRow = worksheet.addRow(['', `REPORTE DE PRODUCCION DE EXISTENCIAS- ${selectedDate}`]);

      // Obtener la segunda celda de la fila (índice 2 porque la numeración de las celdas comienza desde 1)
      const secondCell = titleRow.getCell(2);

      // Aplicar estilos al título en la segunda celda
      applyTitleStyle(secondCell);
      
      worksheet.addRow([]);

      // Encabezado de la tabla SELECCION
      const headerRow7 = worksheet.addRow(['','', 'TON', 'P.E']);
      applyHeaderStyle(headerRow7);

      // Datos de SELECCION
      silos.forEach(product => {
        worksheet.addRow(['PT', 'SILO 1',product.silo1, product.pes1, ]);
        worksheet.addRow(['PT', 'SILO 2',product.silo2, product.pes2, ]);
        worksheet.addRow(['PT', 'SILO 3',product.silo3, product.pes3, ]);
        worksheet.addRow(['PT', 'SILO 4',product.silo4, product.pes4, ]);
        worksheet.addRow(['PT', 'SILO 5',product.silo5, product.pes5, ]);
      
       
      });

      const textRow = worksheet.addRow([]);

      // Asignar texto a las celdas de la fila
      textRow.getCell(6).value = '';
      // Encabezado de la tabla JIGS1
      const headerRow1 = worksheet.addRow(['','', 'TON', 'P.E']);
      applyHeaderStyle(headerRow1);

      // Datos de la tabla JIGS1
      mesas.forEach(product => {
        worksheet.addRow(['PP', 'CONCENTRADO',product.saldo, product.pe]);
        
      });

        // Agregar datos de 'otra_tabla'
      sec.forEach(item => {
      // Suponiendo que 'campo1' y 'campo2' son los campos que quieres agregar
      worksheet.addRow(['PP', 'CONCENTRADO JIG´SS CHINO SECUNDARIO', item.saldo, item.pe]);
    });
      medios46.forEach(item => {
      // Suponiendo que 'campo1' y 'campo2' son los campos que quieres agregar
      worksheet.addRow(['PP', 'MEDIOS DE CONCENTRADO 4.06-4.10', item.saldo46, item.pe46]);
    });
    medios4.forEach(item => {
      // Suponiendo que 'campo1' y 'campo2' son los campos que quieres agregar
      worksheet.addRow(['PP', 'MEDIOS DE CONCENTRADO 4.00-4.04', item.saldo, item.pe]);
    });
    medios3.forEach(item => {
      // Suponiendo que 'campo1' y 'campo2' son los campos que quieres agregar
      worksheet.addRow(['PP', 'MEDIOS DE CONCENTRADO 3.98', item.saldo, item.pe]);
    });
    granobandas.forEach(item => {
      // Suponiendo que 'campo1' y 'campo2' son los campos que quieres agregar
      worksheet.addRow(['PP', 'GRANO PARA BANDAS DE SELECCION', item.saldo, item.pesp]);
    });
    granopmoler.forEach(item => {
      // Suponiendo que 'campo1' y 'campo2' son los campos que quieres agregar
      worksheet.addRow(['PP', 'GRANO P/MOLIENDA', item.saldo, item.pe]);
    });
    granojigs.forEach(item => {
      // Suponiendo que 'campo1' y 'campo2' son los campos que quieres agregar
      worksheet.addRow(['PP', 'GRANO JIG´SS CHINO', item.saldo, item.pe]);
    });
    desensolvech.forEach(item => {
      // Suponiendo que 'campo1' y 'campo2' son los campos que quieres agregar
      worksheet.addRow(['PP', 'DESENSOLVE JIG´SS CHINO', item.saldo, item.pe]);
    });
    desensolve.forEach(item => {
      // Suponiendo que 'campo1' y 'campo2' son los campos que quieres agregar
      worksheet.addRow(['PP', 'DESENSOLVE 4.00-4.10', item.saldo, item.pe]);
    });
    desecho43.forEach(item => {
      // Suponiendo que 'campo1' y 'campo2' son los campos que quieres agregar
      worksheet.addRow(['PP', 'DESECHO GRANO DE SELECCION 4.30', item.saldo, item.pe]);
    });
    desecho39.forEach(item => {
      // Suponiendo que 'campo1' y 'campo2' son los campos que quieres agregar
      worksheet.addRow(['PP', 'DESECHO GRANO DE SELECCION 3.90-4.00', item.saldo, item.pe]);
    });
    baritron.forEach(item => {
      // Suponiendo que 'campo1' y 'campo2' son los campos que quieres agregar
      worksheet.addRow(['PP', 'BARITRON', item.saldo, item.pe]);
    });
    tolvasmolinos.forEach(item => {
      // Suponiendo que 'campo1' y 'campo2' son los campos que quieres agregar
      worksheet.addRow(['PP', 'TOLVAS DE MOLINOS', item.tolvamolinos, item.petm]);
      worksheet.addRow(['PP', 'MEZCLAS PARA MOLER', item.mezclasmoler, item.pememo]);
    });
    
      // Ajustar el ancho de las columnas
      worksheet.columns.forEach(column => {
        column.width = 40; // <-- Aquí puedes ajustar el ancho de las columnas
      });
      worksheet.addRow([]);

      // Encabezado de la tabla SELECCION
      const headerRow2 = worksheet.addRow(['','', 'TON', 'P.E']);
      applyHeaderStyle(headerRow2);

      // Datos de SELECCION
      mmlt.forEach(product => {
        worksheet.addRow(['MP', 'MINERAL MLT PARA MEZCLAS',product.saldo, product.pe, ]);
      });
      mmle.forEach(item => {
        worksheet.addRow(['MP', 'MINERAL MLE PARA MEZCLAS',item.saldo, item.pe, ]);
      });
      mpmlt.forEach(item => {
        worksheet.addRow(['MP', 'MINERAL EN PATIO MLT',item.saldo, item.pe, ]);
      });
      mpmle.forEach(item => {
        worksheet.addRow(['MP', 'MINERAL EN PATIO MLE',item.saldo, item.pe, ]);
      });
      tmlt.forEach(item => {
        worksheet.addRow(['MP', 'MINERAL TRITURADO MLE',item.saldo, item.pe, ]);
      });
      tmle.forEach(item => {
        worksheet.addRow(['MP', 'MINERAL TRITURADO MLT',item.saldo, item.pe, ]);
      });
      tolvag.forEach(item => {
        worksheet.addRow(['MP', 'MINERAL TOLVA HENERAL MLE',item.saldo, item.pe, ]);
      });

      worksheet.addRow([]);

      // Encabezado de la tabla SELECCION
      const headerRow3 = worksheet.addRow(['','', 'TON', 'P.E']);
      applyHeaderStyle(headerRow3);

      // Datos de SELECCION
      seleccion.forEach(product => {
        worksheet.addRow(['BS', 'BARITA SELECCION',product.saldo, product.pesp, ]);
      });
      granobari.forEach(item => {
        worksheet.addRow(['PT', 'GRANO PARA BARIBRIGHT',item.saldo, item.pe, ]);
      });
      concbari.forEach(item => {
        worksheet.addRow(['PT', 'CONCENTRADO PARA BARIBRIGHT',item.saldo, item.pe, ]);
      });
      
      worksheet.addRow([]);

      // Encabezado de la tabla SELECCION
      const headerRow4 = worksheet.addRow(['NOTAS','']);
      applyHeaderStyle(headerRow4);

      // Datos de SELECCION
      notas.forEach(product => {
        worksheet.addRow([product.totmedios, 'TONS DE MEDIOS PASARON A LAVAR A MESAS' ]);
        worksheet.addRow([product.totjigssec, 'TONS DE MEDIOS PASARON A LAVAR A JIGG´S SECUNDARIO' ]);
        worksheet.addRow([product.totdesensolve, 'TONS DE DESENSOLVE PASARON A LAVAR A MESAS' ]);
        worksheet.addRow([product.totcolas, 'TONS DE COLAS PASARON A LAVAR A MESAS' ]);
        worksheet.addRow([product.comentarios, '' ]);
      });
      // Generar el archivo de Excel
      const buffer = await workbook.xlsx.writeBuffer();

      // Crear un Blob que contiene el archivo de Excel
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      // Crear un enlace temporal y descargar el archivo de Excel
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Reporte_Diario_Existencias.xlsx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      setExporting(false);
    } catch (error) {
      console.error('Error al exportar a Excel:', error);
      setExporting(false);
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
    <div className="container">
    <div className='excel'>
    <h1>Descargar Reporte</h1>
    <div className="close-button" onClick={() => navigate('/existencia')}>
                 <FontAwesomeIcon icon={faTimes} />
             </div>
 <div className="date-picker-container">
   <DatePicker selected={selectedDate} onChange={handleDateChange} />
 </div>
 <div className="export-button-container">
   <button className="export-button" onClick={exportToExcel} disabled={exporting}>
     {exporting ? 'Exportando...' : 'Descargar Excel'}
   </button>
 </div>
</div>
</div>
  )
  }

export default Excelexistencias
