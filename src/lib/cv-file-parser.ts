/**
 * Client-side CV file parser.
 * Extracts text from PDF, DOCX, and TXT files using browser APIs.
 */

export async function parseCVFile(file: File): Promise<string> {
  const ext = file.name.split('.').pop()?.toLowerCase();

  if (ext === 'txt' || ext === 'text') {
    return await file.text();
  }

  if (ext === 'pdf') {
    return await parsePDF(file);
  }

  if (ext === 'docx') {
    return await parseDOCX(file);
  }

  throw new Error('Unsupported file format. Please upload a PDF, DOCX, or TXT file.');
}

async function parsePDF(file: File): Promise<string> {
  const pdfjsLib = await import('pdfjs-dist');

  // Set worker source to CDN to avoid 404 errors
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

  const pdf = await pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise;
  const textParts: string[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map((item: any) => item.str).join(' ');
    textParts.push(pageText);
  }

  return textParts.join('\n\n');
}

async function parseDOCX(file: File): Promise<string> {
  const mammoth = await import('mammoth');
  const arrayBuf = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer: arrayBuf });
  return result.value;
}
