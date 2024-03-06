// Importa las bibliotecas necesarias
import pdf from 'pdf-lib';
import * as XLSX from 'xlsx';
const pdfFilePath = './Pdf';
export const extractDataFromPdf = async (pdfFilePath) => {
    try {
        // Cargar el archivo PDF
        const pdfBytes = await fetch(pdfFilePath).then(res => res.arrayBuffer());
        const pdfDoc = await PDFDocument.load(pdfBytes);
        
        // Crear una variable para almacenar los datos extraídos del PDF
        const extractedData = [];

        // Iterar sobre las páginas del PDF
        for (let i = 0; i < pdfDoc.getPageCount(); i++) {
            const page = pdfDoc.getPage(i);
            // Extraer texto de la página actual
            const text = await page.getText();
            // Agregar el texto extraído al array de datos
            extractedData.push(text);
        }

        // Devolver los datos extraídos
        return extractedData;
    } catch (error) {
        console.error('Error al extraer datos del PDF:', error);
        return null;
    }
};

export const formatDataForExcel = (pdfData) => {
    // Verificar si se han extraído datos del PDF
    if (!pdfData || pdfData.length === 0) {
        console.error('No hay datos para formatear');
        return null;
    }

    try {
        // Aquí puedes realizar cualquier manipulación necesaria de los datos extraídos
        // Por ejemplo, separar el texto extraído en filas y columnas, procesar valores, etc.

        // Por simplicidad, en este ejemplo simplemente devolvemos los datos tal como están
        return pdfData;
    } catch (error) {
        console.error('Error al formatear datos para Excel:', error);
        return null;
    }
};

export const generateExcelFile = (formattedData, outputPath) => {
    // Verificar si se han proporcionado datos formateados
    if (!formattedData || formattedData.length === 0) {
        console.error('No hay datos para generar el archivo Excel');
        return;
    }

    try {
        // Crear un libro de trabajo de Excel
        const workbook = XLSX.utils.book_new();

        // Convertir los datos formateados en una hoja de cálculo de Excel
        const worksheet = XLSX.utils.aoa_to_sheet(formattedData);

        // Agregar la hoja de cálculo al libro de trabajo
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        // Escribir el libro de trabajo en un archivo Excel
        XLSX.writeFile(workbook, outputPath);

        console.log(`Archivo Excel generado correctamente en: ${outputPath}`);
    } catch (error) {
        console.error('Error al generar el archivo Excel:', error);
    }
};



