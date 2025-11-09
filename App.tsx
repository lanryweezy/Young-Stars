
import React, { useState, useEffect, useRef } from 'react';
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
import Portals from './components/pages/Portals';
import StudentPortal from './components/pages/StudentPortal';
import ParentPortal from './components/pages/ParentPortal';
import StaffPortal from './components/pages/StaffPortal';
import AdminPortal from './components/pages/AdminPortal';
import { Page } from './types';
import WhatsAppButton from './components/common/WhatsAppButton';
import AnimatedBackground from './components/common/AnimatedBackground';
import { NAV_LINKS } from './constants';
import ArticleView from './components/pages/ArticleView';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const glowRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`;
        glowRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const renderPage = () => {
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
       case Page.Calendar:
        return <Calendar />;
      case Page.News:
        return selectedArticleId ? (
          <ArticleView
            articleId={selectedArticleId}
            onBack={() => setSelectedArticleId(null)}
            onSelectArticle={setSelectedArticleId}
            setCurrentPage={setCurrentPage}
          />
        ) : (
          <News
            onSelectArticle={setSelectedArticleId}
          />
        );
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
      case Page.Contact:
        return <Contact />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (currentPage !== Page.News) {
      setSelectedArticleId(null);
    }

    let pageMeta = NAV_LINKS.find(link => link.name === currentPage);
    if (!pageMeta) {
      for (const link of NAV_LINKS) {
        if ('dropdown' in link && link.dropdown) {
          const dropdownItem = link.dropdown.find(item => item.page === currentPage);
          if (dropdownItem) {
            pageMeta = { name: dropdownItem.page, metaDescription: dropdownItem.metaDescription, href: '#' };
            break;
          }
        }
      }
    }
    
    if (pageMeta) {
      document.title = `${pageMeta.name} | Young Stars International School`;
      const metaDescriptionTag = document.querySelector('meta[name="description"]');
      if (metaDescriptionTag) {
        metaDescriptionTag.setAttribute('content', pageMeta.metaDescription);
      }
    } else {
      document.title = 'Young Stars International School';
    }

  }, [currentPage]);

  return (
    <div className="bg-transparent text-brand-cream-dark font-nunito relative z-10">
      <AnimatedBackground />
      <div id="aurora-glow" ref={glowRef}></div>
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="min-h-screen">
        {renderPage()}
      </main>
      <Footer setCurrentPage={setCurrentPage} />
      <WhatsAppButton />
    </div>
  );
};

export default App;
