import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { PhoneShell } from './components/draft/PhoneShell';
import { AiAdvisorModal } from './components/AiAdvisorModal';

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-slate-100/80 text-slate-900 flex flex-col justify-between">
        <PhoneShell />
        <AiAdvisorModal />
      </div>
    </AppProvider>
  );
}
