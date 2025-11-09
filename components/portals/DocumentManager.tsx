import React from 'react';
import Card from '../common/Card';
import { DocumentCategory, DocumentItem } from '../../types';
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
import PlusIcon from '../icons/PlusIcon';
import Button from '../common/Button';
import DownloadIcon from '../icons/DownloadIcon';
import EditIcon from '../icons/EditIcon';
import TrashIcon from '../icons/TrashIcon';

interface DocumentManagerProps {
    documentCategories: DocumentCategory[];
    readOnly?: boolean;
    onAdd?: (categoryId: string) => void;
    onEdit?: (doc: DocumentItem, categoryId: string) => void;
    onDelete?: (doc: DocumentItem, categoryId: string) => void;
    onPreview?: (doc: DocumentItem) => void;
}

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

const DocumentManager: React.FC<DocumentManagerProps> = ({ documentCategories, readOnly = false, onAdd, onEdit, onDelete, onPreview }) => {
  if (documentCategories.length === 0) {
    return (
        <Card>
            <h2 className="text-2xl font-orbitron font-bold text-white">Document Access</h2>
            <p className="text-gray-400 mt-2">You do not have permission to view any document categories. Please contact an administrator if you believe this is an error.</p>
        </Card>
    );
  }

  const handlePreview = (e: React.MouseEvent, doc: DocumentItem) => {
    e.preventDefault();
    if(onPreview) {
        onPreview(doc);
    } else {
        window.open(doc.url, '_blank');
    }
  };

  return (
    <div className="animate-fade-in-up">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <aside className="lg:w-1/4 lg:sticky lg:top-24 self-start">
            <Card className="p-4">
              <h3 className="font-orbitron text-xl font-bold text-white mb-4">Categories</h3>
              <ul className="space-y-1">
                {documentCategories.map(category => (
                  <li key={category.id}>
                    <a href={`#doc-cat-${category.id}`} className="block text-gray-300 hover:text-brand-green transition-colors font-semibold p-2 rounded-md hover:bg-space-dark/50">
                      {category.title}
                    </a>
                  </li>
                ))}
              </ul>
            </Card>
          </aside>

          <main className="lg:w-3/4 space-y-12">
            {documentCategories.map(category => (
              <section key={category.id} id={`doc-cat-${category.id}`} className="scroll-mt-24">
                <Card>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 mb-6">
                    <div className="flex items-start gap-4">
                        <div className="text-brand-green flex-shrink-0">{iconMap[category.icon]}</div>
                        <div>
                        <h2 className="text-2xl font-orbitron font-bold text-white">{category.title}</h2>
                        <p className="text-gray-400">{category.description}</p>
                        </div>
                    </div>
                    {!readOnly && onAdd && (
                        <Button onClick={() => onAdd(category.id)} className="px-3 py-1 text-sm flex-shrink-0"><PlusIcon/> Upload Document</Button>
                    )}
                  </div>
                  <ul className="space-y-4">
                    {category.documents.map(doc => (
                      <li key={doc.id} className="p-4 bg-space-dark/50 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-l-4 border-brand-green/30">
                        <div className="flex items-start gap-4 flex-grow">
                            <div className="text-brand-green mt-1 flex-shrink-0"><DocumentIcon /></div>
                            <div className="flex-grow">
                                <a href={doc.url} onClick={(e) => handlePreview(e, doc)} target="_blank" rel="noopener noreferrer" className="font-bold text-white hover:text-brand-green transition-colors">{doc.name}</a>
                                <p className="text-sm text-gray-500">{doc.description}</p>
                                <div className="text-xs text-gray-400 mt-1 flex items-center flex-wrap gap-x-4 gap-y-1">
                                    <span>Type: <strong>{doc.type}</strong></span>
                                    <span>Size: <strong>{doc.size}</strong></span>
                                    <span>Modified: <strong>{doc.lastModified}</strong></span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 self-start sm:self-center flex-shrink-0">
                            {readOnly ? (
                                <a href={doc.url} download><Button variant="secondary" className="px-3 py-1 text-sm"><DownloadIcon /> Download</Button></a>
                            ) : (
                                <>
                                 <button onClick={() => onEdit?.(doc, category.id)} className="text-yellow-400 hover:text-yellow-300 p-2" title="Edit"><EditIcon /></button>
                                 <button onClick={() => onDelete?.(doc, category.id)} className="text-red-500 hover:text-red-400 p-2" title="Delete"><TrashIcon /></button>
                                </>
                            )}
                        </div>
                      </li>
                    ))}
                    {category.documents.length === 0 && (
                        <p className="text-center text-gray-500 py-4">No documents in this category yet.</p>
                    )}
                  </ul>
                </Card>
              </section>
            ))}
          </main>
        </div>
    </div>
  );
};

export default DocumentManager;