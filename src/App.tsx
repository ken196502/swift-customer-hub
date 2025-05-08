
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Index from './pages/Index';
import Audit from './pages/Audit';
import NotFound from './pages/NotFound';
import { Toaster } from './components/ui/toaster';
import { AppSidebar } from './components/AppSidebar';
import ContactTypes from './pages/ContactTypes';
import Groups from './pages/Groups';
import { SidebarProvider } from './components/ui/sidebar';

function App() {
  return (
    <Router>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/audit" element={<Audit />} />
              <Route path="/contact-types" element={<ContactTypes />} />
              <Route path="/groups" element={<Groups />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </SidebarProvider>
      <Toaster />
    </Router>
  );
}

export default App;
