import React from 'react';
import { useApp, AppProvider } from './store/AppContext';
import { Toast } from './components/Toast';

// Auth & Onboarding
import { Onboarding } from './pages/student/Onboarding';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ForgotPassword } from './pages/auth/ForgotPassword';

// Student screens
import { Home } from './pages/student/Home';
import { FilterSearch } from './pages/student/FilterSearch';
import { SearchResults } from './pages/student/SearchResults';
import { ItemDetail } from './pages/student/ItemDetail';
import { ClaimForm } from './pages/student/ClaimForm';
import { ClaimSuccess } from './pages/student/ClaimSuccess';
import { ClaimStatus } from './pages/student/ClaimStatus';
import { Notifications } from './pages/student/Notifications';
import { ReportMenu } from './pages/student/ReportMenu';
import { LostItemForm } from './pages/student/LostItemForm';
import { LostReportSuccess } from './pages/student/LostReportSuccess';
import { FoundItemReport } from './pages/student/FoundItemReport';
import { FoundHandoffInstruction } from './pages/student/FoundHandoffInstruction';
import { Profile } from './pages/student/Profile';

// Officer screens
import { OfficerDashboard } from './pages/officer/Dashboard';
import { ItemManagement } from './pages/officer/ItemManagement';
import { AddFoundItem } from './pages/officer/AddFoundItem';
import { HiddenVerificationForm } from './pages/officer/HiddenVerificationForm';
import { OfficerItemDetail } from './pages/officer/OfficerItemDetail';
import { ClaimQueue } from './pages/officer/ClaimQueue';
import { OfficerClaimDetail } from './pages/officer/OfficerClaimDetail';
import { Stage1Verification } from './pages/officer/Stage1Verification';
import { Stage2Verification } from './pages/officer/Stage2Verification';
import { PickupConfirmation } from './pages/officer/PickupConfirmation';
import { OfficerProfile } from './pages/officer/OfficerProfile';

const AppContent: React.FC = () => {
  const { currentScreen } = useApp();

  const renderScreen = () => {
    switch (currentScreen) {
      // Public / Auth
      case 'onboarding':
      case 'onboarding-1':
      case 'onboarding-2':
      case 'onboarding-3':
        return <Onboarding />;
      case 'login':
        return <Login />;
      case 'register':
        return <Register />;
      case 'forgot-password':
        return <ForgotPassword />;

      // Student
      case 'home':
        return <Home />;
      case 'filter':
        return <FilterSearch />;
      case 'search':
      case 'search-results':
        return <SearchResults />;
      case 'item-detail':
        return <ItemDetail />;
      case 'claim-form':
        return <ClaimForm />;
      case 'claim-success':
        return <ClaimSuccess />;
      case 'claim-status':
      case 'claim-detail':
        return <ClaimStatus />;
      case 'notifications':
        return <Notifications />;
      case 'report-menu':
        return <ReportMenu />;
      case 'lost-report-form':
        return <LostItemForm />;
      case 'lost-report-success':
        return <LostReportSuccess />;
      case 'found-report-form':
        return <FoundItemReport />;
      case 'found-handoff-instruction':
        return <FoundHandoffInstruction />;
      case 'profile':
        return <Profile />;

      // Officer
      case 'officer-dashboard':
        return <OfficerDashboard />;
      case 'officer-items':
        return <ItemManagement />;
      case 'officer-add-item':
        return <AddFoundItem />;
      case 'officer-hidden-verification':
        return <HiddenVerificationForm />;
      case 'officer-item-detail':
        return <OfficerItemDetail />;
      case 'officer-claims':
        return <ClaimQueue />;
      case 'officer-claim-detail':
        return <OfficerClaimDetail />;
      case 'officer-stage1':
        return <Stage1Verification />;
      case 'officer-stage2':
        return <Stage2Verification />;
      case 'officer-pickup-confirmation':
        return <PickupConfirmation />;
      case 'officer-profile':
        return <OfficerProfile />;

      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900/5 sm:py-6 flex flex-col items-center justify-start antialiased selection:bg-primary/20">
      {/* Mobile viewport frame container */}
      <div className="w-full max-w-md bg-[#F7F9FC] sm:rounded-3xl sm:shadow-2xl sm:border sm:border-gray-200/90 overflow-hidden min-h-screen sm:min-h-[850px] relative transition-all">
        {/* Toast Notification Container (Terkunci di dalam Mobile Frame) */}
        <Toast />

        {renderScreen()}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
