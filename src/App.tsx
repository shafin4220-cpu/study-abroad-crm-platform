import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Shell } from './components/Shell';
import { CommandPalette } from './components/CommandPalette';
import { QuickAddLeadDrawer } from './components/QuickAddLeadDrawer';
import { StudentProfileModal } from './components/StudentProfileModal';
import { AutoReminderModal } from './components/AutoReminderModal';

// Views
import { DashboardView } from './views/DashboardView';
import { LeadsView } from './views/LeadsView';
import { PipelineView } from './views/PipelineView';
import { DocumentChecklistView } from './views/DocumentChecklistView';
import { UniversityApplicationsView } from './views/UniversityApplicationsView';
import { VisaTrackerView } from './views/VisaTrackerView';
import { AppointmentsView } from './views/AppointmentsView';
import { WhatsAppInboxView } from './views/WhatsAppInboxView';
import { TasksView } from './views/TasksView';
import { ReportsView } from './views/ReportsView';
import { SettingsView } from './views/SettingsView';

const MainAppContent: React.FC = () => {
  const { activeTab } = useApp();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'leads':
      case 'students':
        return <LeadsView />;
      case 'pipeline':
        return <PipelineView />;
      case 'documents':
        return <DocumentChecklistView />;
      case 'applications':
        return <UniversityApplicationsView />;
      case 'visa':
        return <VisaTrackerView />;
      case 'appointments':
        return <AppointmentsView />;
      case 'whatsapp':
        return <WhatsAppInboxView />;
      case 'tasks':
        return <TasksView />;
      case 'reports':
        return <ReportsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <Shell>
      {renderActiveView()}
      <CommandPalette />
      <QuickAddLeadDrawer />
      <StudentProfileModal />
      <AutoReminderModal />
    </Shell>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
