import { promises as fs } from 'fs';

export interface FileResult {
  path: string;
  success: boolean;
  data?: any;
  error?: string;
}

export class FileService {
  /**
   * Reads and processes multiple files asynchronously.
   * @param paths Array of file paths
   * @returns Promise resolving to an array of FileResult
   */
  async readFiles(paths: string[]): Promise<FileResult[]> {
    // Map each path to a processing Promise
    const promises = paths.map(async (path) => {
      try {
        const content = await fs.readFile(path, 'utf-8');

        let jsonData;
        try {
          jsonData = JSON.parse(content);
        } catch (err) {
          return {
            path,
            success: false,
            error: 'Invalid JSON',
          } as FileResult;
        }

        // Simulate processing delay (200–500 ms)
        const delay = 200 + Math.random() * 300;
        await new Promise((resolve) => setTimeout(resolve, delay));

        // Add processedAt timestamp
        jsonData.processedAt = new Date().toISOString();

        return {
          path,
          success: true,
          data: jsonData,
        } as FileResult;
      } catch (err: any) {
        return {
          path,
          success: false,
          error: err.message || 'Unknown error',
        } as FileResult;
      }
    });

    // Wait for all files to finish processing
    return Promise.all(promises);
  }
}


// usage this service
(async () => {
  const service = new FileService();
  const results = await service.readFiles(['file1.json', 'file2.json', 'file3.json']);
  console.log(results);
})();
