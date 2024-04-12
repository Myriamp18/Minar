import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ExcelJS from 'exceljs';
import logoImageBase64 from '../../assest/logo.png';
import '../ReporteDiario/Excel.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function Excelmolienda() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [exporting, setExporting] = useState(false);
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


            if (!responseProducts.ok || !responseOtherTable.ok) {
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
    const applyTitleStyle = (cell) => {
        // Aplicar estilos al texto del título
        cell.font = { bold: true, size: 14, color: { argb: '000000' } }; // Negrita, tamaño 14, color negro
    };

    const exportToExcel = async () => {
        try {
            setExporting(true);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Molienda');

            navigate('/molienda')
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
            const titleRow = worksheet.addRow(['', `MINERALES Y ARCILLAS, S.A DE C.V- ${selectedDate}`]);

            // Obtener la segunda celda de la fila (índice 2 porque la numeración de las celdas comienza desde 1)
            const secondCell = titleRow.getCell(2);

            // Aplicar estilos al título en la segunda celda
            applyTitleStyle(secondCell);

            worksheet.addRow([]);

            // Encabezado de la tabla SELECCION
            const headerRow7 = worksheet.addRow(['Mezclas', 'Fecha', 'Turno','TON', 'P.E']);
            applyHeaderStyle(headerRow7);

            // Datos de SELECCION
            products.forEach(product => {
                worksheet.addRow(['Conc.Mesas', product.fecha, product.turno, product.concmesas, product.pecm]);
                worksheet.addRow(['Grano', product.fecha, product.turno, product.medios, product.pem]);
                worksheet.addRow(['Conc.Jigs', product.fecha, product.turno, product.concjigs, product.pejig]);
                worksheet.addRow(['Desensolve', product.fecha, product.turno, product.desenslovez, product.pedese]);
                worksheet.addRow(['Mezcla Total', product.fecha, product.turno, product.mezclatotal, product.pemt]);
                worksheet.addRow(['PMLT', product.fecha, product.turno, product.pmlt]);
                worksheet.addRow(['PMLE', product.fecha, product.turno, product.pmle]);
                worksheet.addRow([]);
            });

            const textRow = worksheet.addRow([]);

            // Asignar texto a las celdas de la fila
            textRow.getCell(3).value = 'PROMEDIOS';
            // Encabezado de la tabla JIGS1
            const headerRow1 = worksheet.addRow(['', 'Fecha', 'Turno', 'Molino 1', 'Molino 2 ']);
            applyHeaderStyle(headerRow1);

            // Datos de la tabla JIGS1
            otherTableData.forEach(product => {
                worksheet.addRow(['P.Esp', product.fecha, product.turno, product.pemolino1, product.pemolino2]);
                worksheet.addRow(['% Ret.Malla 200', product.fecha, product.turno, product.malla200mo1, product.pemolino2]);
                worksheet.addRow(['% Ret.Malla 325', product.fecha, product.turno, product.malla325mo1, product.malla325mo2]);
                worksheet.addRow(['Calcios en P.P.M', product.fecha, product.turno, product.calciosmo1, product.calciosmo2]);
                worksheet.addRow(['% Humedad', product.fecha, product.turno, product.humedadmo1, product.humedadmo2]);
            });
            // Ajustar el ancho de las columnas
            worksheet.columns.forEach(column => {
                column.width = 22; // <-- Aquí puedes ajustar el ancho de las columnas
            });
            // Generar el archivo de Excel
            const buffer = await workbook.xlsx.writeBuffer();

            // Crear un Blob que contiene el archivo de Excel
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

            // Crear un enlace temporal y descargar el archivo de Excel
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Reporte_Molienda.xlsx';
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
           <div className="close-button" onClick={() => navigate('/molienda')}>
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

export default Excelmolienda
