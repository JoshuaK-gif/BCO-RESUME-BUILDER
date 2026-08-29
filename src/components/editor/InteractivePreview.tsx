'use client';

import React, { useState } from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

interface InteractivePreviewProps {
  content: ResumeContent;
  design: DesignSettings;
  updateContent: (content: ResumeContent) => void;
  updateDesign: (design: DesignSettings) => void;
  children: React.ReactNode;
}

export function InteractivePreview({
  content,
  design,
  updateContent,
  updateDesign,
  children,
}: InteractivePreviewProps) {
  const fonts = ['Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins', 'Raleway', 'Merriweather', 'Georgia', 'Arial'];
  const [showControls, setShowControls] = useState(true);

  return (
    <div className="flex flex-col h-full">
      {/* Mobile Toggle */}
      <button
        onClick={() => setShowControls(!showControls)}
        className="md:hidden bg-white border-b border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 flex items-center justify-between"
      >
        <span>Design Controls</span>
        <span>{showControls ? '▲' : '▼'}</span>
      </button>

      {/* Quick Design Toolbar */}
      <div className={`bg-white border-b border-gray-200 ${showControls ? 'block' : 'hidden'} md:block`}>
        <div className="px-3 py-3 space-y-3 md:space-y-0 md:flex md:flex-wrap md:items-center md:gap-3">
          {/* Font Family */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-gray-500 whitespace-nowrap">Font:</label>
            <select
              value={design.font}
              onChange={(e) => updateDesign({ ...design, font: e.target.value })}
              className="flex-1 md:flex-none px-2 py-1.5 border border-gray-300 rounded text-sm min-w-0 md:w-[130px]"
            >
              {fonts.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          {/* Sliders - 2 per row on mobile */}
          <div className="grid grid-cols-2 gap-3 md:flex md:flex-wrap md:items-center md:gap-3">
            {/* Name Size */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium text-gray-500 whitespace-nowrap">Name:</label>
              <input
                type="range"
                min={18}
                max={40}
                value={design.nameSize || 28}
                onChange={(e) => updateDesign({ ...design, nameSize: parseInt(e.target.value) })}
                className="flex-1 min-w-0"
              />
              <span className="text-xs text-gray-700 w-8 text-right">{design.nameSize || 28}</span>
            </div>

            {/* Title Size */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium text-gray-500 whitespace-nowrap">Title:</label>
              <input
                type="range"
                min={10}
                max={24}
                value={design.subtitleSize || 16}
                onChange={(e) => updateDesign({ ...design, subtitleSize: parseInt(e.target.value) })}
                className="flex-1 min-w-0"
              />
              <span className="text-xs text-gray-700 w-8 text-right">{design.subtitleSize || 16}</span>
            </div>

            {/* Body Size */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium text-gray-500 whitespace-nowrap">Body:</label>
              <input
                type="range"
                min={8}
                max={16}
                step={0.5}
                value={design.fontSize}
                onChange={(e) => updateDesign({ ...design, fontSize: parseFloat(e.target.value) })}
                className="flex-1 min-w-0"
              />
              <span className="text-xs text-gray-700 w-8 text-right">{design.fontSize}</span>
            </div>

            {/* Heading Size */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium text-gray-500 whitespace-nowrap">Head:</label>
              <input
                type="range"
                min={10}
                max={20}
                value={design.headingSize}
                onChange={(e) => updateDesign({ ...design, headingSize: parseInt(e.target.value) })}
                className="flex-1 min-w-0"
              />
              <span className="text-xs text-gray-700 w-8 text-right">{design.headingSize}</span>
            </div>
          </div>

          {/* Accent Color */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-gray-500 whitespace-nowrap">Color:</label>
            <div className="flex gap-1.5">
              {['#1e40af', '#166534', '#991b1b', '#854d0e', '#581c87', '#0f766e', '#1e293b'].map((color) => (
                <button
                  key={color}
                  onClick={() => updateDesign({ ...design, accentColor: color })}
                  className="w-6 h-6 rounded-full border-2 transition-all"
                  style={{
                    backgroundColor: color,
                    borderColor: design.accentColor === color ? '#000' : 'transparent',
                    transform: design.accentColor === color ? 'scale(1.15)' : 'scale(1)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Resume Preview */}
      <div className="flex-1 overflow-auto bg-gray-200 flex justify-center p-3 md:p-6">
        <div
          className="bg-white shadow-2xl mx-auto"
          style={{
            width: '210mm',
            minHeight: '297mm',
            transform: 'scale(var(--preview-scale, 0.65))',
            transformOrigin: 'top center',
            fontFamily: design.font,
          }}
        >
          <style>{`
            @media (max-width: 768px) {
              .resume-preview-wrapper > div { --preview-scale: 0.45; }
            }
            @media (min-width: 769px) and (max-width: 1024px) {
              .resume-preview-wrapper > div { --preview-scale: 0.55; }
            }
          `}</style>
          <div className="resume-preview-wrapper">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
