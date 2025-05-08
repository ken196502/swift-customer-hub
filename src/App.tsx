
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
import { SidebarProvider } from './components/ui/sidebar';
import { CustomerProvider } from './contexts/CustomerContext';

function App() {
  return (
    <Router>
      <CustomerProvider>
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <main className="flex-1" style={{ width: "120%" }}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/audit" element={<Audit />} />
                <Route path="/contact-types" element={<ContactTypes />} />
                <Route path="/groups" element={<Groups />} />
                <Route path="/permissions" element={<Permissions />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </SidebarProvider>
        <Toaster />
      </CustomerProvider>
    </Router>
  );
}

export default App;
