
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Index from './pages/Index';
import Audit from './pages/Audit';
import NotFound from './pages/NotFound';
import { Toaster } from './components/ui/toaster';
import { AppSidebar } from './components/AppSidebar';
import ContactTypes from './pages/ContactTypes';
import Groups from './pages/Groups';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen">
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
      <Toaster />
    </Router>
  );
}

export default App;
