import React, { useEffect, useState } from 'react';
import CloseLargeIcon from '../icons/CloseLargeIcon';
import ChevronLeftLargeIcon from '../icons/ChevronLeftLargeIcon';
import ChevronRightLargeIcon from '../icons/ChevronRightLargeIcon';

interface GalleryModalProps {
    images: { src: string; alt: string; }[];
    currentIndex: number;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
}

const GalleryModal: React.FC<GalleryModalProps> = ({ images, currentIndex, onClose, onNext, onPrev }) => {
    const [touchStartX, setTouchStartX] = useState<number | null>(null);
    
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') onNext();
            if (e.key === 'ArrowLeft') onPrev();
        };

        window.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden'; // Prevent background scrolling

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto'; // Restore scrolling
        };
    }, [onClose, onNext, onPrev]);

    const image = images[currentIndex];

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX === null) {
            return;
        }

        const touchEndX = e.changedTouches[0].clientX;
        const diffX = touchStartX - touchEndX;
        const SWIPE_THRESHOLD = 50; // Minimum distance for a swipe

        if (diffX > SWIPE_THRESHOLD) {
            // Swiped left
            onNext();
        } else if (diffX < -SWIPE_THRESHOLD) {
            // Swiped right
            onPrev();
        }

        setTouchStartX(null);
    };

    return (
        <div 
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center animate-fade-in-up"
            onClick={onClose} // Close modal on backdrop click
        >
            <div 
                className="relative w-full max-w-4xl max-h-[90vh] p-4 flex flex-col items-center"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image/controls
            >
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute -top-2 -right-2 md:top-0 md:right-0 text-white bg-space-dark rounded-full p-2 hover:bg-brand-green/50 transition-colors z-10"
                    aria-label="Close image viewer"
                >
                    <CloseLargeIcon />
                </button>

                {/* Main Content */}
                <div className="relative w-full h-full flex items-center justify-center">
                    {/* Previous Button */}
                    <button 
                        onClick={onPrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 text-white bg-black/30 rounded-full p-2 hover:bg-brand-green transition-colors z-10 -translate-x-4 md:-translate-x-12"
                        aria-label="Previous image"
                    >
                        <ChevronLeftLargeIcon />
                    </button>

                    {/* Image */}
                    <div 
                        className="relative"
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                       <img 
                            key={image.src}
                            src={image.src} 
                            alt={image.alt}
                            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl shadow-black/50 animate-pop-in"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-lg">
                            <p className="text-white text-center text-sm md:text-base">{image.alt}</p>
                        </div>
                    </div>


                    {/* Next Button */}
                    <button 
                        onClick={onNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-white bg-black/30 rounded-full p-2 hover:bg-brand-green transition-colors z-10 translate-x-4 md:translate-x-12"
                        aria-label="Next image"
                    >
                        <ChevronRightLargeIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GalleryModal;