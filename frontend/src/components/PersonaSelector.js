import React from 'react';
import { User } from 'lucide-react';
import { personas } from '../constants/mockData';

const PersonaSelector = ({ selectedPersona, onPersonaChange }) => {
  return (
    <div className="p-6 border-b border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <User className="w-5 h-5 mr-2" />
        Select Your Persona
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {personas.map((persona) => {
          const Icon = persona.icon;
          const isSelected = selectedPersona === persona.id;

          return (
            <button
              key={persona.id}
              onClick={() => onPersonaChange(persona.id)}
              className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                isSelected ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-6 h-6 ${isSelected ? 'text-blue-600' : 'text-gray-600'}`} />
                <div>
                  <p className={`font-medium ${isSelected ? 'text-blue-900' : 'text-gray-800'}`}>
                    {persona.label}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{persona.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PersonaSelector;
