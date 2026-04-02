
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Academics from './components/pages/Academics';
import Admissions from './components/pages/Admissions';
import Gallery from './components/pages/Gallery';
import News from './components/pages/News';
import Calendar from './components/pages/Calendar';
import Contact from './components/pages/Contact';
import Portals from './components/pages/Portals';
import StudentPortal from './components/pages/StudentPortal';
import ParentPortal from './components/pages/ParentPortal';
import StaffPortal from './components/pages/StaffPortal';
import AdminPortal from './components/pages/AdminPortal';
import { Page } from './constants';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path={Page.Home} element={<Home />} />
            <Route path={Page.About} element={<About />} />
            <Route path={Page.Academics} element={<Academics />} />
            <Route path={Page.Admissions} element={<Admissions />} />
            <Route path={Page.Gallery} element={<Gallery />} />
            <Route path={Page.News} element={<News />} />
            <Route path={Page.Calendar} element={<Calendar />} />
            <Route path={Page.Contact} element={<Contact />} />
            <Route path={Page.Portals} element={<Portals />} />
            <Route path={Page.StudentPortal} element={<StudentPortal />} />
            <Route path={Page.ParentPortal} element={<ParentPortal />} />
            <Route path={Page.StaffPortal} element={<StaffPortal />} />
            <Route path={Page.AdminPortal} element={<AdminPortal />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
