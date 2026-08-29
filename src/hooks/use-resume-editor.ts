'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { ResumeContent, DesignSettings, DEFAULT_RESUME_CONTENT, DEFAULT_DESIGN_SETTINGS } from '@/types/resume';
import { createClient } from '@/lib/supabase-client';
import { debounce } from '@/utils/debounce';

interface HistoryEntry {
  content: ResumeContent;
  design: DesignSettings;
}

export const useResumeEditor = (initialData: any) => {
  const [content, setContent] = useState<ResumeContent>(
    initialData.content || DEFAULT_RESUME_CONTENT
  );
  const [design, setDesign] = useState<DesignSettings>(
    initialData.design_settings || DEFAULT_DESIGN_SETTINGS
  );
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Undo/Redo
  const historyRef = useRef<HistoryEntry[]>([]);
  const historyIndexRef = useRef<number>(0);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const pushHistory = useCallback((c: ResumeContent, d: DesignSettings) => {
    const history = historyRef.current;
    const idx = historyIndexRef.current;
    // Remove future history
    historyRef.current = history.slice(0, idx + 1);
    historyRef.current.push({ content: c, design: d });
    if (historyRef.current.length > 50) historyRef.current.shift();
    historyIndexRef.current = historyRef.current.length - 1;
    setCanUndo(historyRef.current.length > 1);
    setCanRedo(false);
  }, []);

  const undo = useCallback(() => {
    const idx = historyIndexRef.current;
    if (idx > 0) {
      historyIndexRef.current = idx - 1;
      const entry = historyRef.current[idx - 1];
      setContent(entry.content);
      setDesign(entry.design);
      setCanUndo(idx - 1 > 0);
      setCanRedo(true);
    }
  }, []);

  const redo = useCallback(() => {
    const idx = historyIndexRef.current;
    const history = historyRef.current;
    if (idx < history.length - 1) {
      historyIndexRef.current = idx + 1;
      const entry = history[idx + 1];
      setContent(entry.content);
      setDesign(entry.design);
      setCanUndo(true);
      setCanRedo(idx + 1 < history.length - 1);
    }
  }, []);

  // Initialize history
  useEffect(() => {
    historyRef.current = [{ content, design }];
    historyIndexRef.current = 0;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Save to Supabase
  const supabase = createClient();
  const saveToSupabase = useCallback(
    debounce(async (updatedContent: ResumeContent, updatedDesign: DesignSettings) => {
      setIsSaving(true);
      const { error } = await supabase
        .from('resumes')
        .update({
          content: updatedContent,
          design_settings: updatedDesign,
          updated_at: new Date().toISOString(),
        })
        .eq('id', initialData.id);

      if (error) console.error('Error saving resume:', error);
      setIsSaving(false);
      setLastSaved(new Date());
    }, 2000),
    [initialData.id, supabase]
  );

  const updateContent = (newContent: Partial<ResumeContent>) => {
    setContent((prev) => {
      const updated = { ...prev, ...newContent };
      pushHistory(updated, design);
      saveToSupabase(updated, design);
      return updated;
    });
  };

  const updateDesign = (newDesign: Partial<DesignSettings>) => {
    setDesign((prev) => {
      const updated = { ...prev, ...newDesign };
      pushHistory(content, updated);
      saveToSupabase(content, updated);
      return updated;
    });
  };

  return {
    content,
    design,
    isSaving,
    lastSaved,
    updateContent,
    updateDesign,
    undo,
    redo,
    canUndo,
    canRedo,
  };
};
