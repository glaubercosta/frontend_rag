import { ExportService } from '../../src/services/ExportService';
import * as fileSaver from 'file-saver';

describe('ExportService', () => {
  it('should export data to Excel format', async () => {
    const data = [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 }
    ];
    const columns = [
      { header: 'Name', key: 'name' },
      { header: 'Age', key: 'age' }
    ];
    // Mock saveAs
    const saveAsMock = jest.spyOn(fileSaver, 'saveAs').mockImplementation(() => {});
    await ExportService.exportToExcel(data, columns, 'test.xlsx');
    expect(saveAsMock).toHaveBeenCalled();
    saveAsMock.mockRestore();
  });

  it('should export data to CSV format', () => {
    const data = [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 }
    ];
    const columns = [
      { header: 'Name', key: 'name' },
      { header: 'Age', key: 'age' }
    ];
    const saveAsMock = jest.spyOn(fileSaver, 'saveAs').mockImplementation(() => {});
    ExportService.exportToCSV(data, columns, 'test.csv');
    expect(saveAsMock).toHaveBeenCalled();
    saveAsMock.mockRestore();
  });
});
