import React, { useState } from 'react';
import GalleryModal from '../common/GalleryModal';
import { galleryImages as images } from '../../data/galleryData';

const Gallery: React.FC = () => {

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

const Gallery: React.FC = () => {
    const pageInfo = navLinks.find(link => link.href === Page.Gallery);

    return (
        <div>
            <Helmet>
                <title>{`${pageInfo?.name} | ${schoolName}`}</title>
                <meta name="description" content={pageInfo?.metaDescription} />
            </Helmet>
            <PageBanner title="Gallery" subtitle="A Glimpse into Life at lanrystars." />

            <div className="py-16 bg-brand-cream-light">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {galleryData.map((item, index) => (
                            <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg">
                                <img src={item.src} alt={item.alt} className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <p className="text-white text-center p-4">{item.alt}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gallery;
