import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function Pdf() {
    const [products, setProducts] = useState([]);
    const [pdfGenerated, setPdfGenerated] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8081/reportediario');
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchProducts();
    }, []);

    const generatePDF = () => {
        const doc = new jsPDF();

        // Configuración del título del documento
        doc.text('REPORTE DIARIO DE PRODUCCION PLANTA', 50, 10);

        // Generar tabla para el turno 1
        generateTable(doc, products.filter(item => item.turno === 1), 'Turno 1', 25);

        // Generar tabla para el turno 2
        generateTable(doc, products.filter(item => item.turno === 2), 'Turno 2', 50);

        // Generar un nombre de archivo con el ID y la fecha de la base de datos
        let fileName = 'reporte_diario.pdf';

        // Descargar el PDF con el nombre de archivo generado
        doc.save(fileName);

        // Actualizar el estado para indicar que el PDF ha sido generado
        setPdfGenerated(true);
    };

    const generateTable = (doc, data, title, startY) => {
       

        // Crear tabla
        const tableColumn = ['','Turno', 'Alimentacion', 'P.E', 'Grano', 'P.E', 'Desensolve', 'P.E', 'Colas', 'P.E'];
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

      
        
        // Agregar tabla al documento
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: startY + 10,
            theme: 'grid',
            headStyles: {
                fillColor: [255, 0, 0] // Cambia el color del encabezado de la tabla a azul
            },
        });
    };

    return (
        <div>
            <h1>Descargar Reporte</h1>
            <button onClick={generatePDF}>Descargar PDF</button>
        </div>
    );
}

export default Pdf;
