import React from 'react';
import Card from '../common/Card';
import { schoolDocuments } from '../../data/documents';
import GovernanceIcon from '../icons/GovernanceIcon';
import AcademicIcon from '../icons/AcademicIcon';
import StudentManagementIcon from '../icons/StudentManagementIcon';
import HumanResourceIcon from '../icons/HumanResourceIcon';
import AccountingIcon from '../icons/AccountingIcon';
import FacilitiesIcon from '../icons/FacilitiesIcon';
import ICTIcon from '../icons/ICTIcon';
import MarketingIcon from '../icons/MarketingIcon';
import CommunityIcon from '../icons/CommunityIcon';
import StrategyIcon from '../icons/StrategyIcon';
import DocumentIcon from '../icons/DocumentIcon';
import DownloadIcon from '../icons/DownloadIcon';
import Button from '../common/Button';

const iconMap: { [key: string]: React.ReactNode } = {
  GovernanceIcon: <GovernanceIcon />,
  AcademicIcon: <AcademicIcon />,
  StudentManagementIcon: <StudentManagementIcon />,
  HumanResourceIcon: <HumanResourceIcon />,
  AccountingIcon: <AccountingIcon />,
  FacilitiesIcon: <FacilitiesIcon />,
  ICTIcon: <ICTIcon />,
  MarketingIcon: <MarketingIcon />,
  CommunityIcon: <CommunityIcon />,
  StrategyIcon: <StrategyIcon />,
};

const Documents: React.FC = () => {
  return (
    <div className="animate-fade-in-up pt-24 pb-16 bg-space-dark/95">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-white">School Documents & Policies</h1>
          <p className="mt-4 text-lg text-brand-cream-dark max-w-3xl mx-auto">A comprehensive overview of the official documents that govern our operations, academics, and community engagement.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <aside className="lg:w-1/4 lg:sticky lg:top-24 self-start">
            <Card className="p-4">
              <h3 className="font-orbitron text-xl font-bold text-white mb-4">Categories</h3>
              <ul className="space-y-1">
                {schoolDocuments.map(category => (
                  <li key={category.id}>
                    <a href={`#${category.id}`} className="block text-gray-300 hover:text-brand-green transition-colors font-semibold p-2 rounded-md hover:bg-space-dark/50">
                      {category.title}
                    </a>
                  </li>
                ))}
              </ul>
            </Card>
          </aside>

          <main className="lg:w-3/4 space-y-12">
            {schoolDocuments.map(category => (
              <section key={category.id} id={category.id} className="scroll-mt-24">
                <Card>
                  <div className="flex items-start gap-4 mb-6">
                    <div className="text-brand-green flex-shrink-0">{iconMap[category.icon]}</div>
                    <div>
                      <h2 className="text-2xl font-orbitron font-bold text-white">{category.title}</h2>
                      <p className="text-gray-400">{category.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-4">
                    {category.documents.map(doc => (
                      <li key={doc.id} className="p-4 bg-space-dark/50 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-l-4 border-brand-green/30">
                        <div className="flex items-start gap-4">
                            <div className="text-brand-green mt-1 flex-shrink-0"><DocumentIcon /></div>
                            <div>
                                <h4 className="font-bold text-white">{doc.name}</h4>
                                <p className="text-sm text-gray-500">{doc.description}</p>
                                <div className="text-xs text-gray-400 mt-1 flex items-center gap-4">
                                    <span>Type: <strong>{doc.type}</strong></span>
                                    <span>Size: <strong>{doc.size}</strong></span>
                                    <span>Modified: <strong>{doc.lastModified}</strong></span>
                                </div>
                            </div>
                        </div>
                        <a href={doc.url} download>
                            <Button variant="secondary" className="px-3 py-1 text-sm flex-shrink-0 w-full sm:w-auto">
                                <DownloadIcon /> Download
                            </Button>
                        </a>
                      </li>
                    ))}
                  </ul>
                </Card>
              </section>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Documents;