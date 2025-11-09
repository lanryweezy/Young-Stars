import React, { useState } from 'react';
import GalleryModal from '../common/GalleryModal';

const Gallery: React.FC = () => {
    const images = [
        { src: 'https://picsum.photos/seed/gallery1/800/600', alt: 'Students in a robotics class' },
        { src: 'https://picsum.photos/seed/gallery2/600/800', alt: 'Colorful artwork by students' },
        { src: 'https://picsum.photos/seed/gallery3/800/800', alt: 'Children playing in the futuristic playground' },
        { src: 'https://picsum.photos/seed/gallery4/800/600', alt: 'A teacher guiding a student on a tablet' },
        { src: 'https://picsum.photos/seed/gallery5/600/800', alt: 'School building with modern architecture' },
        { src: 'https://picsum.photos/seed/gallery6/800/600', alt: 'Students collaborating on a project' },
        { src: 'https://picsum.photos/seed/gallery7/800/800', alt: 'A science experiment in progress' },
        { src: 'https://picsum.photos/seed/gallery8/600/800', alt: 'A child smiling while painting' },
        { src: 'https://picsum.photos/seed/gallery9/800/600', alt: 'School assembly with a holographic display' },
    ];

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    const openModal = (index: number) => {
        setSelectedImageIndex(index);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedImageIndex(null);
    };

    const showNextImage = () => {
        if (selectedImageIndex !== null) {
            setSelectedImageIndex((prevIndex) => (prevIndex! + 1) % images.length);
        }
    };

    const showPrevImage = () => {
        if (selectedImageIndex !== null) {
            setSelectedImageIndex((prevIndex) => (prevIndex! - 1 + images.length) % images.length);
        }
    };


  return (
    <div className="animate-fade-in-up pt-24 pb-16 bg-space-dark/95">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-white">Gallery</h1>
          <p className="mt-4 text-lg text-brand-cream-dark max-w-3xl mx-auto">A Glimpse into Life at Young Stars.</p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {images.map((image, index) => (
                <div 
                    key={index} 
                    className="overflow-hidden rounded-2xl break-inside-avoid shadow-lg shadow-black/30 cursor-pointer"
                    onClick={() => openModal(index)}
                >
                    <img 
                        src={image.src} 
                        alt={image.alt}
                        className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-300" 
                    />
                </div>
            ))}
        </div>
        
      </div>
       {modalIsOpen && selectedImageIndex !== null && (
          <GalleryModal
              images={images}
              currentIndex={selectedImageIndex}
              onClose={closeModal}
              onNext={showNextImage}
              onPrev={showPrevImage}
          />
      )}
    </div>
  );
};

export default Gallery;