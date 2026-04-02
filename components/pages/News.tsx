import React from 'react';
import { Article } from '../../types';
import { articles } from '../../data/articles';
import { mockStaff, mockStudents } from '../../data/users';
import Card from '../common/Card';
import Button from '../common/Button';
import CalendarIcon from '../icons/CalendarIcon';
import AuthorIcon from '../icons/AuthorIcon';
import ChevronRightIcon from '../icons/ChevronRightIcon';

interface NewsProps {
    onSelectArticle: (id: string) => void;
}

const getAuthorDetails = (authorId: string) => {
    const staff = mockStaff.find(s => s.id === authorId);
    if (staff) return { name: staff.name, role: staff.role };

    const student = mockStudents.find(s => s.id === authorId);
    if (student) return { name: student.name, role: student.prefectRole || 'Student' };

    return { name: 'Anonymous', role: 'Contributor' };
}

const ArticleCard: React.FC<{ article: Article, onSelect: () => void }> = ({ article, onSelect }) => {
    const author = getAuthorDetails(article.authorId);
    return (
        <Card className="flex flex-col overflow-hidden p-0 h-full group cursor-pointer" onClick={onSelect}>
            <div className="overflow-hidden">
                <img src={article.image} alt={article.title} className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <p className="text-sm font-bold text-brand-green mb-2">{article.category}</p>
                <h3 className="font-orbitron text-xl font-bold text-white mb-3 flex-grow">{article.title}</h3>
                <p className="text-gray-400 mb-4 text-sm">{article.summary}</p>
                <div className="text-xs text-gray-500 mt-auto flex items-center justify-between">
                    <span className="flex items-center gap-2"><AuthorIcon /> {author.name}</span>
                    <span className="flex items-center gap-2"><CalendarIcon /> {new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
            </div>
        </Card>
    );
};

const News: React.FC<NewsProps> = ({ onSelectArticle }) => {

    const sortedArticles = [...articles].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const featuredArticle = sortedArticles[0];
    const otherArticles = sortedArticles.slice(1);
    const featuredAuthor = getAuthorDetails(featuredArticle.authorId);

    return (
        <div className="animate-fade-in-up pt-24 pb-16 bg-space-dark/95">
            <div className="container mx-auto px-6">

                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-white">News & <span className="text-brand-green">Blog</span></h1>
                    <p className="mt-4 text-lg text-brand-cream-dark max-w-3xl mx-auto">The latest stories, updates, and insights from Young Stars.</p>
                </div>

                {/* Featured Article */}
                {featuredArticle && (
                    <section className="mb-20">
                        <Card className="p-0 overflow-hidden lg:grid lg:grid-cols-2 lg:gap-0 items-center">
                            <div className="overflow-hidden">
                                <img src={featuredArticle.image} alt={featuredArticle.title} className="w-full h-64 lg:h-full object-cover"/>
                            </div>
                            <div className="p-8 md:p-12">
                                <p className="font-bold text-brand-green mb-2">Featured Article</p>
                                <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white mb-4">{featuredArticle.title}</h2>
                                <div className="text-sm text-gray-400 mb-4 flex flex-wrap gap-x-4 gap-y-2">
                                    <span className="flex items-center gap-2"><AuthorIcon /> <div>{featuredAuthor.name} <span className="text-gray-500">({featuredAuthor.role})</span></div></span>
                                    <span className="flex items-center gap-2"><CalendarIcon /> {new Date(featuredArticle.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                                <p className="text-gray-300 mb-6">{featuredArticle.summary}</p>
                                <Button onClick={() => onSelectArticle(featuredArticle.id)} size="lg">Read More <ChevronRightIcon/></Button>
                            </div>
                        </Card>
                    </section>
                )}

                {/* Latest Articles */}
                <section>
                    <h2 className="text-3xl font-orbitron text-center font-bold text-white mb-12">Latest Articles</h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {otherArticles.map(article => (
                           <ArticleCard key={article.id} article={article} onSelect={() => onSelectArticle(article.id)} />
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
};

export default News;
