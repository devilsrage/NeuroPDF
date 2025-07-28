import React, { useState, useEffect } from 'react';
import { BookOpen, ChevronRight, ChevronDown } from 'lucide-react';

// Helper to nest flat outline into a tree
const nestOutline = (flatOutline) => {
  const tree = [];
  let currentH1 = null;
  let currentH2 = null;

  flatOutline.forEach((item) => {
    const newItem = { ...item, children: [] };

    if (item.level === 'H1') {
      tree.push(newItem);
      currentH1 = newItem;
      currentH2 = null;
    } else if (item.level === 'H2' && currentH1) {
      currentH1.children.push(newItem);
      currentH2 = newItem;
    } else if (item.level === 'H3' && currentH2) {
      currentH2.children.push(newItem);
    } else {
      tree.push(newItem); // fallback if structure is broken
    }
  });

  return tree;
};

const OutlineSidebar = ({ outline = [], onSectionClick, activePage }) => {
  const [expandedItems, setExpandedItems] = useState(new Set());

  useEffect(() => {
    // Expand all H1s by default
    const defaultExpanded = outline
      .filter((item) => item.level === 'H1')
      .map((item) => item.id);
    setExpandedItems(new Set(defaultExpanded));
  }, [outline]);

  const toggleExpand = (id) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const getIndentPadding = (level) => {
    return {
      H1: 16,
      H2: 32,
      H3: 48
    }[level] || 16;
  };

  const renderOutline = (items) => {
    return items.map((item) => {
      const isExpanded = expandedItems.has(item.id);
      const isActive = activePage === item.page;

      return (
        <div key={item.id}>
          <div
            className={`w-full flex items-center p-2 rounded-lg text-left transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-blue-100 text-blue-900 border-l-4 border-blue-500'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
            style={{ paddingLeft: `${getIndentPadding(item.level)}px` }}
            onClick={() => onSectionClick(item.page)}
          >
            {item.children && item.children.length > 0 ? (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpand(item.id);
                }}
                className="mr-2 p-1 rounded hover:bg-gray-200"
              >
                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </div>
            ) : (
              <div className="w-5 mr-2" /> // placeholder for alignment
            )}

            <div className="flex-1 min-w-0">
              <p
                className={`font-medium truncate ${
                  item.level === 'H1' ? 'text-base' : item.level === 'H2' ? 'text-sm' : 'text-xs'
                }`}
              >
                {item.text}
              </p>
              <p className="text-xs text-gray-500 mt-1">Page {item.page}</p>
            </div>
          </div>

          {/* Recursively render children */}
          {item.children && item.children.length > 0 && isExpanded && (
            <div className="ml-2">{renderOutline(item.children)}</div>
          )}
        </div>
      );
    });
  };

  const nestedOutline = nestOutline(outline);

  return (
    <div className="p-4 overflow-y-auto h-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <BookOpen className="w-5 h-5 mr-2" />
        Document Outline
      </h3>
      <div className="space-y-1">
        {nestedOutline.length > 0 ? (
          renderOutline(nestedOutline)
        ) : (
          <p className="text-sm text-gray-500">No outline available for this document.</p>
        )}
      </div>
    </div>
  );
};

export default OutlineSidebar;
