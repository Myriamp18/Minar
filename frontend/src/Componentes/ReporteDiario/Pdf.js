import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './Pdj.css';
import Logo from'../../assest/logo.png'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Pdf() {
    const [products, setProducts] = useState([]);
    const [pdfGenerated, setPdfGenerated] = useState(false);
    const [otherTableData, setOtherTableData] = useState([]);
    const [tridTableData, setTridTableData] = useState([]);
    const [cuartTableData, setCuartTableData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        fetchData(selectedDate);
    }, [selectedDate]); // Agregar selectedDate como una dependencia

    const fetchData = async (date) => {
        try {
            const responseProducts = await fetch(`http://localhost:8081/getjigs?fecha=${date}`);
            const responseOtherTable = await fetch(`http://localhost:8081/getjch?fecha=${date}`);
            const responseTridTable = await fetch(`http://localhost:8081/getmesas?fecha=${date}`);
            const responseCuartTable = await fetch(`http://localhost:8081/getgrano?fecha=${date}`);

            if ( !responseCuartTable.ok||!responseProducts.ok || !responseOtherTable.ok || !responseTridTable.ok || !responseCuartTable.ok) {
                throw new Error('Error al obtener los datos');
            }

            const dataProducts = await responseProducts.json();
            const dataOtherTable = await responseOtherTable.json();
            const dataTridTable = await responseTridTable.json();
            const dataCuartTable = await responseCuartTable.json();

            setProducts(dataProducts);
            setOtherTableData(dataOtherTable);
            setTridTableData(dataTridTable);
            setCuartTableData(dataCuartTable);
        } catch (error) {
            console.log('Error:', error);
        }
    };


    const generatePDF = async () => {
        // Esperar a que los datos se actualicen completamente
        await fetchData(selectedDate);
    const doc = new jsPDF();

    // Configuración del título del documento
    doc.setFont("fontName");
    doc.text('REPORTE DIARIO DE PRODUCCION PLANTA', 50, 10);


    const imgData = Logo; // Asigna la imagen importada a una variable
    doc.addImage(imgData, 'PNG', 15, 5, 20, 15); // Agrega la imagen al PDF

  

    generatePrimTable(doc, cuartTableData.filter(item => item.turno === 1), 'Turno 1', 25);
    generatePrimdosTable(doc, cuartTableData.filter(item => item.turno === 2), 'Turno 2', 25)
    generatePrimtresTable(doc, cuartTableData.filter(item => item.turno === 3), 'Turno 3', 25)

    // Generar tabla para el turno 1
    generateTable(doc, products.filter(item => item.turno === 1), 'Turno 1', 50);

    // Generar tabla para el turno 2
    generateTable(doc, products.filter(item => item.turno === 2), 'Turno 2', 80);

    // Generar otra tabla para los datos de la otra tabla
    generateOtherTable(doc, otherTableData, 'Otra Tabla', 130);





    generateTridTableData(doc, tridTableData.filter(item => item.turno === 1), 'Turno 1', 120);
    generateTridTableData(doc, tridTableData.filter(item => item.turno === 2), 'Turno 2', 145);
    generateTridTableData(doc, tridTableData.filter(item => item.turno === 3), 'Turno 3', 170);

    generateCuartTableData(doc, cuartTableData, 'Otra Tabla', 195);

    let fileName = `reporte_diario.pdf`;


    // Descargar el PDF con el nombre de archivo generado
    doc.save(fileName);

    // Actualizar el estado para indicar que el PDF ha sido generado
    setPdfGenerated(true);
};

const generatePrimTable = (doc, data, title, startY) => {


    // Crear tabla
    const tableColumn = ['', 'Turno', 'A', 'TON', 'P.E'];
    const tableRows = [];

    data.forEach((item) => {
        const rowData = [
            'MINA LE',
            item.turno,
            item.aminale,
            item.minale,
            item.pemle
        ];
        tableRows.push(rowData);
        const rowData1 = [
            'MINA LS',
            item.turno,
            item.aminals,
            item.minals,
            item.pemls
        ];
        tableRows.push(rowData1);
        const rowData2 = [
            'PATIO LE',
            item.turno,
            item.apatiole,
            item.patiols,
            item.peple,
        ];
        tableRows.push(rowData2);
        const rowData3 = [
            'PATIO LS',
            item.turno,
            item.apatiols,
            item.tolvageneral,
            item.pepls,
        ];
        tableRows.push(rowData3);
        const rowData4 = [
            'MEDIO 3 Y 4',
            item.turno,
            item.amedio34,
            item.medio3y4,
            item.psm34,
        ];
        tableRows.push(rowData4);
        const rowData5 = [
            'DESENSOLVE',
            item.turno,
            item.adesensolve,
            item.desensolve,
            item.pedese
        ];
        tableRows.push(rowData5);
        const rowData6 = [
            'COLAS',
            item.turno,
            item.acolas,
            item.colas,
            item.pecolas
        ];
        tableRows.push(rowData6);

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
        startY: firstTableHeight + 5,
        theme: 'grid',
        headStyles: {
            fillColor: [0, 128, 0] // Cambia el color del encabezado de la tabla a azul
        },
        ...tablePropsTurnos,
        setFontSize: 10

    });
};
const generatePrimdosTable = (doc, data, title, startY) => {


    // Crear tabla
    const tableColumn = ['Turno', 'TON', 'P.E'];
    const tableRows = [];

    data.forEach((item) => {
        const rowData = [

            item.turno,
            item.minale,
            item.pemle
        ];
        tableRows.push(rowData);
        const rowData1 = [

            item.turno,
            item.minals,
            item.pemls
        ];
        tableRows.push(rowData1);
        const rowData2 = [

            item.turno,
            item.patiols,
            item.peple,
        ];
        tableRows.push(rowData2);
        const rowData3 = [

            item.turno,
            item.tolvageneral,
            item.pepls,
        ];
        tableRows.push(rowData3);
        const rowData4 = [

            item.turno,
            item.medio3y4,
            item.psm34,
        ];
        tableRows.push(rowData4);
        const rowData5 = [

            item.turno,
            item.desensolve,
            item.pedese
        ];
        tableRows.push(rowData5);
        const rowData6 = [

            item.turno,
            item.colas,
            item.pecolas
        ];
        tableRows.push(rowData6);

    });
    const firstTableHeight = doc.autoTable.previous.finalY || startY;
    const tablePropsOtraTabla = {
        startY: 20,
        margin: { horizontal: 94 },
        tableWidth: 50
    };
    // Agregar tabla al documento
    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: firstTableHeight + 5,
        theme: 'grid',
        headStyles: {
            fillColor: [0, 128, 0] // Cambia el color del encabezado de la tabla a azul
        },
        ...tablePropsOtraTabla
    });
};
const generatePrimtresTable = (doc, data, title, startY) => {


    // Crear tabla
    const tableColumn = ['Turno', 'TON', 'P.E'];
    const tableRows = [];

    data.forEach((item) => {
        const rowData = [

            item.turno,
            item.minale,
            item.pemle
        ];
        tableRows.push(rowData);
        const rowData1 = [

            item.turno,
            item.minals,
            item.pemls
        ];
        tableRows.push(rowData1);
        const rowData2 = [

            item.turno,
            item.patiols,
            item.peple,
        ];
        tableRows.push(rowData2);
        const rowData3 = [

            item.turno,
            item.tolvageneral,
            item.pepls,
        ];
        tableRows.push(rowData3);
        const rowData4 = [

            item.turno,
            item.medio3y4,
            item.psm34,
        ];
        tableRows.push(rowData4);
        const rowData5 = [

            item.turno,
            item.desensolve,
            item.pedese
        ];
        tableRows.push(rowData5);
        const rowData6 = [

            item.turno,
            item.colas,
            item.pecolas
        ];
        tableRows.push(rowData6);

    });
    const firstTableHeight = doc.autoTable.previous.finalY || startY;
    const tablePropsOtraTabla = {
        startY: 20,
        margin: { horizontal: 144 },
        tableWidth: 50
    };
    // Agregar tabla al documento
    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: firstTableHeight + 5,
        theme: 'grid',
        headStyles: {
            fillColor: [0, 128, 0] // Cambia el color del encabezado de la tabla a azul
        },
        ...tablePropsOtraTabla
    });
};

const generateTable = (doc, data, title, startY) => {


    // Crear tabla
    const tableColumn = ['', 'Turno', 'Alimentacion', 'P.E', 'Grano', 'P.E', 'Desensolve', 'P.E', 'Colas', 'P.E'];
    const tableRows = [];

    data.forEach((item) => {
        const rowData = [
            'JIGGS1',
            item.turno,
            item.alimj1,
            item.peaj1,
            item.granoj1,
            item.pegj1,
            item.desenj1,
            item.pedj1,
            item.colasj1,
            item.pecj1
        ];
        tableRows.push(rowData);

        const rowDataS = [
            'JIGGS2',
            item.turno,
            item.alimj2,
            item.peaj2,
            item.granoj2,
            item.pegj2,
            item.desenj2,
            item.pedj2,
            item.colasj2,
            item.pecj2
        ];
        tableRows.push(rowDataS);
    });

    const firstTableHeight = doc.autoTable.previous.finalY || startY;

    // Agregar tabla al documento
    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: firstTableHeight + 5,
        theme: 'grid',
        headStyles: {
            fillColor: [255, 0, 0] // Cambia el color del encabezado de la tabla a azul
        },
    });
};
const generateOtherTable = (doc, data, title, startY) => {
    const tableColumns1 = ['Turno', 'Alimentacion', 'P.E', 'Grano', 'P.E', 'Desensolve', 'P.E', 'Colas', 'P.E'];
    const tableRows1 = [];

    data.forEach((item) => {
        const rowData = [

            item.turno,
            item.alimjch,
            item.peajch,
            item.granojch,
            item.pegjch,
            item.desenjch,
            item.pedjch,
            item.colasjch,
            item.pecjch
        ];
        tableRows1.push(rowData);
    });


    const tableColumns2 = ['Turno', 'Alimentacion', 'P.E', 'Concentrado', 'Colas', 'P.E'];
    const tableRows2 = [];

    data.forEach((item) => {
        const rowData = [

            item.turno,
            item.alimjsec,
            item.peajsec,
            item.concjsec,
            item.pecojsec,
            item.colasjsec,
            item.pecjsec,

        ];
        tableRows2.push(rowData);
    });
    // Obtener la altura de la primera tabla

    doc.autoTable({
        head: [tableColumns1],
        body: tableRows1,
        startY: startY + 10,
        theme: 'grid',
        headStyles: {
            fillColor: [0, 0, 255] // Cambia el color del encabezado de la tabla a azul
        },
    });
    const firstTableHeight = doc.autoTable.previous.finalY || startY;
    // Agregar tabla al documento
    doc.autoTable({
        head: [tableColumns2],
        body: tableRows2,
        startY: firstTableHeight + 5,
        theme: 'grid',
        headStyles: {
            fillColor: [0, 0, 255] // Cambia el color del encabezado de la tabla a azul
        },
    });
};

const generateTridTableData = (doc, data, title, startY) => {
    const tableColumns3 = ['', 'Turno', 'Alimentacion', 'P.E', 'Concentrado', 'P.E', 'Medios', 'P.E', 'Colas', 'P.E'];
    const tableRows3 = [];

    data.forEach((item) => {
        const rowData = [

            'Mesa 1 y 2',
            item.turno,
            item.alimm12,
            item.peam12,
            item.conm12,
            item.pecnm12,
            item.mediom12,
            item.pemm12,
            item.colasm12,
            item.pecm12
        ];
        tableRows3.push(rowData);

        const rowData1 = [

            'Mesa 3 y 4',
            item.turno,
            item.alimm34,
            item.peam34,
            item.conm34,
            item.pecnm34,
            item.mediosm34,
            item.pemm34,
            item.colasm34,
            item.pecm34
        ];
        tableRows3.push(rowData1);
        const rowData2 = [

            'Mesa 5',
            item.turno,
            item.alimm5,
            item.peam5,
            item.conm5,
            item.pecnm5,
            item.mediosm5,
            item.pemm5,
            item.colasm5,
            item.pecm5
        ];
        tableRows3.push(rowData2);
        const rowData3 = [

            'Mesa 6',
            item.turno,
            item.alimm6,
            item.peam6,
            item.conm6,
            item.pecnm6,
            item.mediom6,
            item.pemm6,
            item.colasm6,
            item.pecm6
        ];
        tableRows3.push(rowData3);

    });

    const firstTableHeight = doc.autoTable.previous.finalY || startY;

    doc.autoTable({
        head: [tableColumns3],
        body: tableRows3,
        startY: firstTableHeight + 10,
        theme: 'grid',
        headStyles: {
            fillColor: [0, 0, 0] // Cambia el color del encabezado de la tabla a azul
        },
    });
};

const generateCuartTableData = (doc, data, title, startY) => {


    // Crear tabla
    const tableColumn = ['', 'Turno', 'Alimentacion', 'P.E', 'Concentrado', 'P.E', 'Colas', 'P.E', '', 'TON', 'P.E'];
    const tableRows = [];

    data.forEach((item) => {
        const rowData = [
            'GRANO',
            item.turno,
            item.alimgrano,
            item.peag,
            item.concgrano,
            item.pecng,
            item.colasgrano,
            item.pecg,
            'PIEDRA',
            item.tonpiedra,
            item.petp
        ];
        tableRows.push(rowData);


    });

    const firstTableHeight = doc.autoTable.previous.finalY || startY;

    // Agregar tabla al documento
    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: firstTableHeight + 10,
        theme: 'grid',
        headStyles: {
            fillColor: [0, 128, 0] // Cambia el color del encabezado de la tabla a azul
        },
    });
};

return (
    <div className="pdf-container">
    <h1>Descargar Reporte</h1>
            <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
            <button onClick={generatePDF}>Descargar PDF</button>
</div>
);
}

export default Pdf;
