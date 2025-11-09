
import React, { useEffect } from 'react';
import { DocumentItem } from '../../types';
import Card from '../common/Card';
import CloseIcon from '../icons/CloseIcon';
import Button from '../common/Button';
import DownloadIcon from '../icons/DownloadIcon';
import DocumentIcon from '../icons/DocumentIcon';

interface DocumentPreviewModalProps {
    doc: DocumentItem;
    onClose: () => void;
}

const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({ doc, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [onClose]);

    const isImage = ['PNG', 'JPG'].includes(doc.type.toUpperCase());
    const isPdf = doc.type.toUpperCase() === 'PDF';

    const renderPreview = () => {
        if (isImage) {
            return <img src={doc.url} alt={doc.name} className="w-full h-full object-contain" />;
        }
        if (isPdf) {
            return <iframe src={doc.url} title={doc.name} className="w-full h-full border-0" />;
        }
        return (
            <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-space-dark/50 rounded-lg">
                <div className="text-brand-green mb-4"><DocumentIcon /></div>
                <p className="text-xl text-white mb-2">Preview not available for {doc.type} files</p>
                <p className="text-gray-400 mb-4">You can download the file to view it on your device.</p>
                <a href={doc.url} download={doc.name}>
                    <Button variant="secondary"><DownloadIcon /> Download {doc.type}</Button>
                </a>
            </div>
        );
    };

    return (
        <div 
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in-up"
            onClick={onClose}
        >
            <Card className="p-4 w-full max-w-4xl h-[90vh] relative flex flex-col" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center pb-3 border-b border-brand-green/20 flex-shrink-0">
                    <div>
                        <h3 className="font-orbitron text-xl font-bold text-white truncate pr-4">{doc.name}</h3>
                        <p className="text-sm text-gray-400">{doc.description}</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-space-dark flex-shrink-0"><CloseIcon /></button>
                </div>
                <div className="flex-grow mt-4 overflow-hidden">
                    {renderPreview()}
                </div>
            </Card>
        </div>
    );
};

export default DocumentPreviewModal;
