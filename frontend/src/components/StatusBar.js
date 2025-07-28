import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const StatusBar = ({ status, error }) => {
  if (!status && !error) return null;

  return (
    <div
      className={`px-4 py-2 text-sm flex items-center space-x-2 ${
        error
          ? 'bg-red-50 text-red-700 border-t border-red-200'
          : 'bg-green-50 text-green-700 border-t border-green-200'
      }`}
    >
      {error ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
      <span>{error || status}</span>
    </div>
  );
};

export default StatusBar;
