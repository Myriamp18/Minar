import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ExcelJS from 'exceljs';
import logoImageBase64 from '../../assest/logo.png';
import '../ReporteDiario/Excel.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import es from 'date-fns/locale/es';

function ExcelHorometros() {
    const navigate = useNavigate();
    const [criba, setCriba] = useState([]);
    const [hjigs, setHjigs] = useState([]);
    const [hmesa12, setHmesa12] = useState([]);
    const [hmesa34, setHmesa34] = useState([]);
    const [hmesa5, setHmesa5] = useState([]);
    const [hmesa6, setHmesa6] = useState([]);
    const [horno, setHorno] = useState([]);
    const [hrsmolinos, setHrsmolinos] = useState([]);
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

    const applyTitleStyle = (cell) => {
        // Aplicar estilos al texto del título
        cell.font = { bold: true, size: 14, color: { argb: '000000' } }; // Negrita, tamaño 14, color negro
    };

    const exportToExcel = async () => {
        try {
            setExporting(true);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Horometros');

            navigate('/horometros')
            // Insertar imagen
            const logoImage = workbook.addImage({
                base64: logoImageBase64, // Aquí debes colocar los datos de la imagen en formato base64
                extension: 'png', // Extensión de la imagen
            });

            // Agregar la imagen a una celda específica
            worksheet.addImage(logoImage, {
                tl: { col: 0.9, row: 1 }, // Esquina superior izquierda de la celda donde se insertará la imagen
                ext: { width: 60, height: 60 }, // Tamaño de la imagen
            });
            // Agregar la fila del título
            const titleRow = worksheet.addRow(['', `MINERALES Y ARCILLAS, S.A DE C.V - ${selectedDate}`]);

            // Obtener la segunda celda de la fila (índice 2 porque la numeración de las celdas comienza desde 1)
            const secondCell = titleRow.getCell(2);

            // Aplicar estilos al título en la segunda celda
            applyTitleStyle(secondCell);

            const textRow1 = worksheet.addRow([]);

            // Asignar texto a las celdas de la fila
            textRow1.getCell(2).value = 'PLANTA DE CONCENTRADO DE BARITA';


            // Encabezado de la tabla SELECCION
            const headerRow7 = worksheet.addRow(['OPERACION/EQUIO', 'HS.EFVAB', 'Turno']);
            applyHeaderStyle(headerRow7);

            // Datos de SELECCION
            criba.forEach(product => {
                worksheet.addRow(['TOLVA GENERAL', product.tolvageneral, product.turno]);
                worksheet.addRow(['CRIBA VIBARATORIA', product.cribav, product.turno]);
                worksheet.addRow(['MESAS WIFLEY', product.mesaswi, product.turno]);
                worksheet.addRow(['BOMBAS AGUA 5X4" FIMSA', product.bombafinsa, product.turno]);
                worksheet.addRow(['BOMBA AGUA 5X4" S/MCA', product.bombasmca, product.turno]);
                worksheet.addRow([]);
            });
            // Agregar datos de 'otra_tabla'
            hjigs.forEach(item => {
                // Suponiendo que 'campo1' y 'campo2' son los campos que quieres agregar
                worksheet.addRow(['JIGS NO.1', item.totalhrs, item.turno]);
                worksheet.addRow(['JIGS NO.2', item.totalhrsj2, item.turno]);
                worksheet.addRow([]);
            });
            hmesa12.forEach(item => {
                // Suponiendo que 'campo1' y 'campo2' son los campos que quieres agregar
                worksheet.addRow(['MESA 1Y2 ', item.totalhrs, item.turno]);

            });
            worksheet.addRow([]);
            hmesa34.forEach(item => {
                // Suponiendo que 'campo1' y 'campo2' son los campos que quieres agregar
                worksheet.addRow(['MESA 3Y4 ', item.totalhrs, item.turno]);
               
            });
            worksheet.addRow([]);
            hmesa5.forEach(item => {
                // Suponiendo que 'campo1' y 'campo2' son los campos que quieres agregar
                worksheet.addRow(['MESA 5 ', item.totalhrs, item.turno]);
              
            });
            worksheet.addRow([]);
            hmesa6.forEach(item => {
                // Suponiendo que 'campo1' y 'campo2' son los campos que quieres agregar
                worksheet.addRow(['MESA 6 ', item.totalhrs, item.turno]);
            
            });

            const textRow2 = worksheet.addRow([]);

            // Asignar texto a las celdas de la fila
            textRow2.getCell(6).value = '';
            
      

            // Encabezado de la tabla SELECCION
            const headerRow1 = worksheet.addRow(['OBSERVACIONES', 'Turno']);
            applyHeaderStyle(headerRow1);

            // Datos de SELECCION
            criba.forEach(product => {
                worksheet.addRow([product.notas, product.turno]);


            });
            worksheet.addRow([]);
            const textRow3 = worksheet.addRow([]);
            
      
            // Asignar texto a las celdas de la fila
            textRow3.getCell(2).value = 'PLANTA DE MOLIENDA BARITA';


            // Encabezado de la tabla SELECCION
            const headerRow2 = worksheet.addRow(['OPERACIONES/EQUIPO', 'HS.EFVAS', 'PROD.(TON)', 'TURNO']);
            applyHeaderStyle(headerRow2);

            // Datos de SELECCION
            horno.forEach(product => {
                worksheet.addRow(['QUEBRADORA', product.quebradora, '', product.turno]);
                worksheet.addRow(['HORNO ROTATORIO', product.hrotatorio, '', product.turno]);
                worksheet.addRow(['ELV. CANJ MOLINOS 1-2 ', product.elvmolinos, '', product.turno]);
                worksheet.addRow(['COLECTORES DE POLVO', product.colectoresp, '', product.turno]);
                worksheet.addRow(['ELV. CANJ ENSACADORA No', product.ensacadora, '', product.turno]);
                worksheet.addRow(['ENSACADORA No.1', product.ensacadora1, '', product.turno]);
                worksheet.addRow(['ELV. CANJ DE SILOS', product.elvsilos, '', product.turno]);
                worksheet.addRow(['GUSANO DE FINOS SILO 1', product.gusanof1, '', product.turno]);
                worksheet.addRow(['GUSANO DE FINOS SILO 5', product.gusanof5, '', product.turno]);
                worksheet.addRow(['QUEBRADORA PRIMARIA', product.quebradorapr, '', product.turno]);
                worksheet.addRow([]);
            });
            hrsmolinos.forEach(item => {
                // Suponiendo que 'campo1' y 'campo2' son los campos que quieres agregar
                worksheet.addRow(['MOLINO NO.1', item.hrsm1, item.prodm1, item.turno]);
                worksheet.addRow(['MOLINO NO.2', item.hrsm2, item.prodm2, item.turno]);
                worksheet.addRow([]);
            });
            const textRow4 = worksheet.addRow([]);
            
            // Asignar texto a las celdas de la fila
            textRow4.getCell(6).value = '';
           

            // Encabezado de la tabla SELECCION
            const headerRow3 = worksheet.addRow(['OBSERVACIONES', 'Turno']);
            applyHeaderStyle(headerRow3);

            // Datos de SELECCION
            horno.forEach(product => {
                worksheet.addRow([product.notas, product.turno]);


            });

            // Ajustar el ancho de las columnas
            worksheet.columns.forEach(column => {
                column.width = 30; // <-- Aquí puedes ajustar el ancho de las columnas
            });

            // Agregar datos de 'otra_tabla'

            // Generar el archivo de Excel
            const buffer = await workbook.xlsx.writeBuffer();

            // Crear un Blob que contiene el archivo de Excel
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

            // Crear un enlace temporal y descargar el archivo de Excel
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Reporte_Diario_Horometros.xlsx';
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
                <div className="close-button" onClick={() => navigate('/horometros')}>
                    <FontAwesomeIcon icon={faTimes} />
                </div>
                <div className="date-picker-container">
                    <DatePicker selected={selectedDate} onChange={handleDateChange}   dateFormat="yyyy-MM-dd"  locale={es}  timeZone="America/Mexico_City"/>
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

export default ExcelHorometros
