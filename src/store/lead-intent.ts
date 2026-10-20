"use client";

import { create } from "zustand";

interface LeadIntentState {
  /** Model id preselected for the test-drive form. */
  intentModel: string | null;
  setIntentModel: (modelId: string | null) => void;
}

/** Cross-component intent: model card "Test Drive" buttons preselect the model in the form. */
export const useLeadIntent = create<LeadIntentState>((set) => ({
  intentModel: null,
  setIntentModel: (modelId) => set({ intentModel: modelId }),
}));
