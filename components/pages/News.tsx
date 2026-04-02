// components/pages/News.tsx

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Page, navLinks } from '../../constants';
import { schoolName } from '../../data/schoolData';
import PageBanner from '../common/PageBanner';
import { articles } from '../../data/articles';
import { Link } from 'react-router-dom';

const News: React.FC = () => {
    const pageInfo = navLinks.find(link => link.href === Page.News);

    // Improved parsing for the articles string
    const parsedArticles = articles.split('- **Article').slice(1).map((article, index) => {
        const titleMatch = article.match(/\d: (.*?)\*\*/);
        const dateMatch = article.match(/Date:\*\* (.*?)\n/);
        const authorMatch = article.match(/Author:\*\* (.*?)\n/);
        const contentMatch = article.match(/Content:\*\*\n([\s\S]*)/);

        return {
            id: index + 1,
            title: titleMatch ? titleMatch[1].trim() : 'Untitled',
            date: dateMatch ? dateMatch[1].trim() : 'No Date',
            author: authorMatch ? authorMatch[1].trim() : 'No Author',
            excerpt: contentMatch ? contentMatch[1].trim().split('\n')[0].replace(/^"|"$/g, '').substring(0, 150) + '...' : 'No content available.',
        };
    });

    return (
        <div>
            <Helmet>
                <title>{`${pageInfo?.name} | ${schoolName}`}</title>
                <meta name="description" content={pageInfo?.metaDescription} />
            </Helmet>
            <PageBanner title="News & Updates" subtitle={`The latest stories, updates, and insights from ${schoolName}.`} />

            <div className="py-16 bg-brand-cream-light text-brand-blue-dark">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {parsedArticles.map(article => (
                            <div key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                                <div className="p-6 flex-grow">
                                    <p className="text-sm text-gray-500 mb-2">{article.date} | By {article.author}</p>
                                    <h3 className="text-xl font-orbitron font-bold text-brand-blue mb-4">{article.title}</h3>
                                    <p className="text-brand-blue-dark flex-grow">{article.excerpt}</p>
                                </div>
                                <div className="p-6 bg-gray-50 border-t">
                                    <Link to={`/news/${article.id}`} className="text-brand-green font-bold hover:underline">
                                        Read More &rarr;
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default News;
