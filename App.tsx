
import React, { useState, useEffect } from 'react';
import { Page } from './types';
import { NAV_LINKS } from './constants';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Academics from './components/pages/Academics';
import Admissions from './components/pages/Admissions';
import Gallery from './components/pages/Gallery';
import Contact from './components/pages/Contact';
import Calendar from './components/pages/Calendar';
import News from './components/pages/News';
import ArticleView from './components/pages/ArticleView';
import Portals from './components/pages/Portals';
import StudentPortal from './components/pages/StudentPortal';
import ParentPortal from './components/pages/ParentPortal';
import StaffPortal from './components/pages/StaffPortal';
import AdminPortal from './components/pages/AdminPortal';
import Documents from './components/pages/Documents';

import AnimatedBackground from './components/common/AnimatedBackground';
import WhatsAppButton from './components/common/WhatsAppButton';
import Chatbot from './components/chatbot/Chatbot';
import { ToastProvider } from './contexts/ToastContext';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  useEffect(() => {
    // Scroll to top on page change
    window.scrollTo(0, 0);

    // Update Meta Tags for SEO
    const updateMetaTags = () => {
      let pageData = NAV_LINKS.find(link => link.name === currentPage);

      // Handle nested portal links
      if (!pageData && currentPage.toString().toLowerCase().includes('portal')) {
        const portalsLink = NAV_LINKS.find(link => link.name === Page.Portals);
        if (portalsLink?.dropdown) {
          pageData = portalsLink.dropdown.find(d => d.page === currentPage) as any;
        }
      }

      const description = pageData?.metaDescription || "Young Stars International School - The best choice for nursery and primary education in Ado Ekiti.";
      const title = `Young Stars - ${currentPage}${selectedArticleId ? ' | Article' : ''}`;

      document.title = title;

      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description);

      // Update OpenGraph tags if they exist
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', title);

      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) ogDescription.setAttribute('content', description);
    };

    updateMetaTags();
  }, [currentPage, selectedArticleId]);

  const handleSelectArticle = (id: string) => {
    setSelectedArticleId(id);
  };

  const handleBackToNews = () => {
    setSelectedArticleId(null);
    setCurrentPage(Page.News);
  }

  const renderPage = () => {
    if (selectedArticleId) {
      return <ArticleView articleId={selectedArticleId} onBack={handleBackToNews} onSelectArticle={handleSelectArticle} setCurrentPage={setCurrentPage} />;
    }

    switch (currentPage) {
      case Page.Home:
        return <Home setCurrentPage={setCurrentPage} />;
      case Page.About:
        return <About />;
      case Page.Academics:
        return <Academics />;
      case Page.Admissions:
        return <Admissions />;
      case Page.Gallery:
        return <Gallery />;
      case Page.News:
        return <News onSelectArticle={handleSelectArticle} />;
      case Page.Contact:
        return <Contact />;
      case Page.Calendar:
        return <Calendar />;
      case Page.Portals:
        return <Portals setCurrentPage={setCurrentPage} />;
      case Page.StudentPortal:
        return <StudentPortal />;
      case Page.ParentPortal:
        return <ParentPortal />;
      case Page.StaffPortal:
        return <StaffPortal />;
      case Page.AdminPortal:
        return <AdminPortal />;
       case Page.Documents:
        return <Documents />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <ToastProvider>
      <div className="bg-space-dark text-brand-cream font-sans relative">
        <AnimatedBackground />
        <div className="relative z-10">
          <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <main>
            {renderPage()}
          </main>
          <Footer setCurrentPage={setCurrentPage} />
        </div>
        <WhatsAppButton />
        <Chatbot />
      </div>
    </ToastProvider>
  );
};

export default App;