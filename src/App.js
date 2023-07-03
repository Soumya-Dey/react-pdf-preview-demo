import { useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import './App.css';

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.js',
//   import.meta.url
// ).toString();
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function App() {
  const [file, setFile] = useState(require('./Print.pdf'));
  // const [file, setFile] = useState('');
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onFileChange = (event) => {
    const { files } = event.target;

    if (files && files[0]) {
      setFile(files[0] || null);
    }
  };

  const onDocumentLoadSuccess = ({ numPages: nextNumPages }) => {
    setNumPages(nextNumPages);
  };

  const incPage = () => setPageNumber(Math.min(pageNumber + 1, numPages));
  const decPage = () => setPageNumber(Math.max(pageNumber - 1, 1));

  return (
    <div className='App'>
      <div className='pdf_conatiner'>
        <div className='pdf_input'>
          <input id='file' onChange={onFileChange} type='file' />

          {numPages && (
            <div className='page-controls'>
              <button type='button' onClick={decPage}>
                {'<'}
              </button>
              <span>
                {pageNumber} of {numPages}
              </span>
              <button type='button' onClick={incPage}>
                {'>'}
              </button>
            </div>
          )}
        </div>

        <div className='pdf_preview'>
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            <Page key={`page_${pageNumber}`} pageNumber={pageNumber} />
          </Document>
        </div>
      </div>
    </div>
  );
}

export default App;
