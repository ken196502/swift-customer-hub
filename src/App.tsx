
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Index from './pages/Index';
import Audit from './pages/Audit';
import NotFound from './pages/NotFound';
import { Toaster } from './components/ui/toaster';
import { AppSidebar } from './components/AppSidebar';
import ContactTypes from './pages/ContactTypes';
import Groups from './pages/Groups';
import Permissions from './pages/Permissions';
import ServicePersonnelPage from './pages/ServicePersonnel';
import { SidebarProvider } from './components/ui/sidebar';
import { CustomerProvider } from './contexts/CustomerContext';
import { TooltipProvider } from './contexts/TooltipContext';

import { SidebarTrigger } from './components/ui/sidebar';

function App() {
  return (
    <Router>
      <CustomerProvider>
        <TooltipProvider>
          <SidebarProvider>
            <div className="flex min-h-screen w-full">
              <SidebarTrigger className="sm:hidden fixed top-4 left-4 z-50" />
              <AppSidebar />
              <main className="flex-1 w-full">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/audit" element={<Audit />} />
                  <Route path="/permissions" element={<Permissions />} />
                  <Route path="/service-personnel" element={<ServicePersonnelPage />} />
                  <Route path="/contact-types" element={<ContactTypes />} />
                  <Route path="/groups" element={<Groups />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </SidebarProvider>
          <Toaster />
        </TooltipProvider>
      </CustomerProvider>
    </Router>
  );
}

export default App;
