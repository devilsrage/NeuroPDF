import React from 'react';
import { Lightbulb, Target, Star, Eye } from 'lucide-react';

const InsightsPanel = ({ insights, persona, onPageJump }) => {
  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
        AI Insights for {persona}
      </h3>
      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <h4 className="font-semibold text-gray-800 flex items-center">
                <Target className="w-4 h-4 mr-2 text-blue-600" />
                {insight.section_title}
              </h4>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium text-gray-600 ml-1">
                    {insight.importance_rank}
                  </span>
                </div>
                <button
                  onClick={() => onPageJump(insight.page_number)}
                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                  title={`Go to page ${insight.page_number}`}
                >
                  <Eye size={16} />
                </button>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed mb-3">
              {insight.refined_text}
            </p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Page {insight.page_number}</span>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Confidence: {Math.round(insight.confidence_score * 100)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightsPanel;
