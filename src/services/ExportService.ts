import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

export class ExportService {
  static async exportToExcel(data: any[], columns: { header: string; key: string }[], fileName = 'dados.xlsx') {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Dados');
    worksheet.columns = columns;
    worksheet.addRows(data);
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), fileName);
  }

  static exportToCSV(data: any[], columns: { header: string; key: string }[], fileName = 'dados.csv') {
    const headers = columns.map(col => col.header).join(',');
    const rows = data.map(row => columns.map(col => row[col.key]).join(','));
    const csv = [headers, ...rows].join('\n');
    saveAs(new Blob([csv], { type: 'text/csv' }), fileName);
  }
}
