import React, { useEffect, useRef } from 'react';

const PDFViewer = ({ pdfUrl }) => {
  const viewerRef = useRef(null);
  const adobeDCViewRef = useRef(null);

  useEffect(() => {
    if (pdfUrl && window.AdobeDC) {
      const adobeDCView = new window.AdobeDC.View({
        clientId: 'ef87a254a23c404e979ad62420ca9a1e',
        divId: 'adobe-pdf-viewer',
      });

      adobeDCViewRef.current = adobeDCView;

      adobeDCView.previewFile(
        {
          content: {
            location: {
              url: pdfUrl,
            },
          },
          metaData: {
            fileName: 'Document.pdf',
          },
        },
        {
          embedMode: 'SIZED_CONTAINER',
          defaultViewMode: 'FIT_WIDTH',
          showPageControls: true,
        }
      );
    }
  }, [pdfUrl]);

  return (
    <div className="w-full bg-gray-100 rounded-lg p-2">
      {pdfUrl ? (
        <div
          id="adobe-pdf-viewer"
          ref={viewerRef}
          className="w-full rounded-lg"
          style={{ height: '600px', overflowY: 'auto' }}
        ></div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center text-gray-500 h-[600px]">
          <p className="text-xl font-medium mb-2">No PDF Loaded</p>
        </div>
      )}
    </div>
  );
};

export default PDFViewer;
