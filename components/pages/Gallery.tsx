// components/pages/Gallery.tsx

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Page, navLinks } from '../../constants';
import { schoolName } from '../../data/schoolData';
import PageBanner from '../common/PageBanner';
import { galleryImages } from '../../data/galleryData';

const Gallery: React.FC = () => {
    const pageInfo = navLinks.find(link => link.href === Page.Gallery);

    return (
        <div>
            <Helmet>
                <title>{`${pageInfo?.name} | ${schoolName}`}</title>
                <meta name="description" content={pageInfo?.metaDescription} />
            </Helmet>
            <PageBanner title="Gallery" subtitle={`A Glimpse into Life at ${schoolName}`} />

            <div className="py-16 bg-brand-cream-light">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {galleryImages.map((item, index) => (
                            <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg aspect-square">
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
