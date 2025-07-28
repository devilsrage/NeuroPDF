import React, { useState, useEffect } from 'react';
import useAPI from './hooks/useAPI';

import Header from './components/Header';
import FileUpload from './components/FileUpload';
import PersonaSelector from './components/PersonaSelector';
import OutlineSidebar from './components/OutlineSidebar';
import InsightsPanel from './components/InsightsPanel';
import PDFViewer from './components/PDFViewer';
import StatusBar from './components/StatusBar';

import { Brain } from 'lucide-react';

const App = () => {
  const [currentFile, setCurrentFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [outline, setOutline] = useState([]);
  const [insights, setInsights] = useState([]);
  const [selectedPersona, setSelectedPersona] = useState('Student');
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [status, setStatus] = useState('');

  const { uploadPDF, getInsights, loading, error } = useAPI();

  const handleFileUpload = async (file) => {
    try {
      setCurrentFile(file);
      setStatus('Processing PDF...');
      const url = URL.createObjectURL(file);
      setPdfUrl(url);

      const uploadResult = await uploadPDF(file);
      console.log('Upload response:', uploadResult); // optional for debugging

      const outlineData = uploadResult.outline || [];
      const insightsData = await getInsights(selectedPersona);

      setOutline(outlineData);
      setInsights(insightsData);
      setStatus('PDF processed successfully!');
      setTimeout(() => setStatus(''), 3000);
    } catch (err) {
      console.error('Upload failed:', err);
      setStatus('Failed to process PDF');
    }
  };

  const handlePersonaChange = async (persona) => {
    setSelectedPersona(persona);
    if (currentFile) {
      const insightsData = await getInsights(persona);
      setInsights(insightsData);
    }
  };

  const handleSectionClick = (page) => {
    setCurrentPage(page);
    setSidebarOpen(false);
  };

  const handlePageJump = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      {/* Top Navigation Header */}
      <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-40 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
            lg:relative lg:translate-x-0 lg:z-0
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            flex flex-col`}
        >
          <div className="flex-1 overflow-y-auto">
            {!currentFile ? (
              <FileUpload onFileUpload={handleFileUpload} loading={loading} />
            ) : (
              <>
                <PersonaSelector
                  selectedPersona={selectedPersona}
                  onPersonaChange={handlePersonaChange}
                />
                <OutlineSidebar
                  outline={outline}
                  onSectionClick={handleSectionClick}
                  activePage={currentPage}
                />
                <InsightsPanel
                  insights={insights}
                  persona={selectedPersona}
                  onPageJump={handlePageJump}
                />
              </>
            )}
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 p-6 overflow-y-auto">
            {currentFile ? (
              <PDFViewer pdfUrl={pdfUrl} currentPage={currentPage} />
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center max-w-md mx-auto">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <Brain className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Welcome to NeuroPDF
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Transform your PDFs into interactive knowledge networks.
                    Upload a document to get started with AI-powered insights tailored to your persona and goals.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Status Bar */}
          <StatusBar status={status} error={error} />
        </div>
      </div>
    </div>
  );
};

export default App;
