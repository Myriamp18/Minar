import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ExcelJS from 'exceljs';
import logoImageBase64 from '../../assest/logo.png';
import './Excel.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import { es } from 'date-fns/locale/es';
registerLocale('es', es)

const Excel = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [products, setProducts] = useState([]);
  const [exporting, setExporting] = useState(false);
  const [otherTableData, setOtherTableData] = useState([]);
  const [tridTableData, setTridTableData] = useState([]);
  const [cuartTableData, setCuartTableData] = useState([]);

  useEffect(() => {
    if (selectedDate) {
      fetchData(selectedDate);
    }
  }, [selectedDate]);

  const fetchData = async (fecha) => {
    try {
      const response = await fetch(`http://localhost:8081/getjigs/${fecha}`);
      const responseOtherTable = await fetch(`http://localhost:8081/getjch/${fecha}`);
      const responseTridTable = await fetch(`http://localhost:8081/getmesas/${fecha}`);
      const responseCuartTable = await fetch(`http://localhost:8081/getgrano/${fecha}`);

      if (!response.ok || !responseOtherTable.ok || !responseTridTable.ok || !responseCuartTable.ok) {
        throw new Error('Error al obtener los datos');
      }
      const dataProducts = await response.json();
      const dataOtherTable = await responseOtherTable.json();
      const dataTridTable = await responseTridTable.json();
      const dataCuartTable = await responseCuartTable.json();

      setProducts(dataProducts);
      setOtherTableData(dataOtherTable);
      setTridTableData(dataTridTable);
      setCuartTableData(dataCuartTable);

    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  };

  const handleDateChange = (date) => {
    console.log('Fecha recibida en DatePicker:', date);
    // Ajustar la fecha a la zona horaria local
    const adjustedDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    const formattedDate = formatDate(adjustedDate);
    setSelectedDate(formattedDate);
};

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  };

  const applyTitleStyle = (cell) => {
    // Aplicar estilos al texto del título
    cell.font = { bold: true, size: 14, color: { argb: '000000' } }; // Negrita, tamaño 14, color negro
  };


  const exportToExcel = async () => {
    try {
      setExporting(true);
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Producción JIGG´S');

      navigate('/diario')
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
      const titleRow = worksheet.addRow(['', `Reporte Diario de Producción - ${selectedDate}`]);

      // Obtener la segunda celda de la fila (índice 2 porque la numeración de las celdas comienza desde 1)
      const secondCell = titleRow.getCell(2);

      // Aplicar estilos al título en la segunda celda
      applyTitleStyle(secondCell);
      
      worksheet.addRow([]);

      // Encabezado de la tabla SELECCION
      const headerRow7 = worksheet.addRow(['DE', 'Fecha', 'Turno', 'A', 'TON', 'P.E']);
      applyHeaderStyle(headerRow7);

      // Datos de SELECCION
      cuartTableData.forEach(product => {
        worksheet.addRow(['MINA LE', product.fecha, product.turno, product.aminale, product.minale, product.pemle]);
        worksheet.addRow(['MINA LS', product.fecha, product.turno, product.aminals, product.minals, product.pemls]);
        worksheet.addRow(['PATIO LE', product.fecha, product.turno, product.apatiole, product.patiols, product.peple]);
        worksheet.addRow(['PATIO LS', product.fecha, product.turno, product.apatiols, product.tolvageneral, product.pepls]);
        worksheet.addRow(['MEDIOS 3 Y 4', product.fecha, product.turno, product.amedio34, product.medio3y4, product.psm34]);
        worksheet.addRow(['DESENSOLVE', product.fecha, product.turno, product.adesensolve, product.desensolve, product.pedese]);
        worksheet.addRow(['COLAS', product.fecha, product.turno, product.acolas, product.colas, product.pecolas]);
        worksheet.addRow([]);
      });

      const textRow = worksheet.addRow([]);

      // Asignar texto a las celdas de la fila
      textRow.getCell(6).value = 'PRODUCCION DE JIGG´S';
      // Encabezado de la tabla JIGS1
      const headerRow1 = worksheet.addRow(['', 'ID', 'Fecha', 'Turno', 'Alimentacion', 'P.E', 'Grano', 'P.E', 'Desensolve', 'P.E', 'Colas', 'P.E']);
      applyHeaderStyle(headerRow1);

      // Datos de la tabla JIGS1
      products.forEach(product => {
        worksheet.addRow(['JIGS1', product.id, product.fecha, product.turno, product.alimj1, product.peaj1, product.granoj1, product.pegj1, product.desenj1, product.pedj1, product.colasj1, product.pecj1]);
      });
      // Ajustar el ancho de las columnas
      worksheet.columns.forEach(column => {
        column.width = 13; // <-- Aquí puedes ajustar el ancho de las columnas
      });
      // Fila en blanco entre JIGS1 y JIGS2
      const textRow1 = worksheet.addRow([]);

      // Asignar texto a las celdas de la fila
      textRow1.getCell(6).value = 'PRODUCCION DE JIGG´S';

      // Encabezado de la tabla JIGS2
      const headerRow2 = worksheet.addRow(['', 'ID', 'Fecha', 'Turno', 'Alimentacion', 'P.E', 'Grano', 'P.E', 'Desensolve', 'P.E', 'Colas', 'P.E']);
      applyHeaderStyle(headerRow2);

      // Datos de la tabla JIGS2
      products.forEach(product => {
        worksheet.addRow(['JIGS2', product.id, product.fecha, product.turno, product.alimj2, product.peaj2, product.granoj2, product.pegj2, product.desenj2, product.pedj2, product.colasj2, product.pecj2]);
      });
      const textRow2 = worksheet.addRow([]);

      // Asignar texto a las celdas de la fila
      textRow2.getCell(6).value = 'PRODUCCION DE JIGG´S CHINO PRIMARIO';

      // Encabezado de la tabla JIGS CHINO PRIMARIO
      const headerRow3 = worksheet.addRow(['Horas', 'Fecha', 'Turno', 'Alimentacion', 'P.E', 'Grano', 'P.E', 'Desensolve', 'P.E', 'Colas', 'P.E']);
      applyHeaderStyle(headerRow3);

      // Datos de la tabla JIGS CHINO PRIMARIO
      otherTableData.forEach(product => {
        worksheet.addRow([product.horasjch, product.fecha, product.turno, product.alimjch, product.peajch, product.granojch, product.pegjch, product.desenjch, product.pedjch, product.colasjch, product.pecjch]);
      });
      const textRow3 = worksheet.addRow([]);

      // Asignar texto a las celdas de la fila
      textRow3.getCell(6).value = 'PRODUCCION DE JIGG´S CHINO SECUNDARIO';

      // Encabezado de la tabla JIGS CHINO SECUNDARIO
      const headerRow4 = worksheet.addRow(['Horas', 'Fecha', 'Turno', 'Alimentacion', 'P.E', 'Concentrado', 'P.E', 'Colas', 'P.E']);
      applyHeaderStyle(headerRow4);

      // Datos de la tabla JIGS CHINO SECUNDARIO
      otherTableData.forEach(product => {
        worksheet.addRow([product.horasec, product.fecha, product.turno, product.alimjsec, product.peajsec, product.concjsec, product.pecojsec, product.colasjsec, product.pecjsec]);
      });
      const textRow4 = worksheet.addRow([]);

      // Asignar texto a las celdas de la fila
      textRow4.getCell(6).value = 'PRODUCCION MESAS';
      // Encabezado de la tabla MESAS
      const headerRow5 = worksheet.addRow(['', 'Fecha', 'Turno', 'Alimentacion', 'P.E', 'Concentrado', 'P.E', 'Medios', 'P.E', 'Colas', 'P.E']);
      applyHeaderStyle(headerRow5);

      // Datos de la tabla MESAS
      tridTableData.forEach(product => {
        worksheet.addRow(['Mesa 1y2', product.fecha, product.turno, product.alimm12, product.peam12, product.conm12, product.pecnm12, product.mediom12, product.pemm12, product.colasm12, product.pecm12]);
        worksheet.addRow(['Mesa 3y4', product.fecha, product.turno, product.alimm34, product.peam34, product.conm34, product.pecnm34, product.mediom34, product.pemm34, product.colasm34, product.pecm34]);
        worksheet.addRow(['Mesa 5', product.fecha, product.turno, product.alimm5, product.peam5, product.conm5, product.pecnm5, product.mediom5, product.pemm5, product.colasm5, product.pecm5]);
        worksheet.addRow(['Mesa 6', product.fecha, product.turno, product.alimm6, product.peam6, product.conm6, product.pecnm6, product.mediom6, product.pemm6, product.colasm6, product.pecm6]);
        worksheet.addRow([]);
      });
      const textRow5 = worksheet.addRow([]);

      // Asignar texto a las celdas de la fila
      textRow5.getCell(6).value = 'PRODUCCION SELECCION';
      // Encabezado de la tabla SELECCION
      const headerRow6 = worksheet.addRow(['', 'Fecha', 'Turno', 'Alimentacion', 'P.E', 'Concentrado', 'P.E', 'Colas', 'P.E', '', 'TON', 'P.E']);
      applyHeaderStyle(headerRow6);

      // Datos de SELECCION
      cuartTableData.forEach(product => {
        worksheet.addRow(['GRANO', product.fecha, product.turno, product.alimgrano, product.peag, product.concgrano, product.pecng, product.colasgrano, product.pecg, 'PIEDRA', product.tonpiedra, product.petp]);
      });

      // Generar el archivo de Excel
      const buffer = await workbook.xlsx.writeBuffer();

      // Crear un Blob que contiene el archivo de Excel
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      // Crear un enlace temporal y descargar el archivo de Excel
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Reporte_Diario_Planta.xlsx';
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
       <div className="close-button" onClick={() => navigate('/diario')}>
                    <FontAwesomeIcon icon={faTimes} />
                </div>
    <div className="date-picker-container">
      <DatePicker locale="es" selected={selectedDate} onChange={handleDateChange} />
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
export default Excel