import React from 'react';
import { articles } from '../../data/articles';
import { Page } from '../../types';
import Card from '../common/Card';
import Button from '../common/Button';
import CalendarIcon from '../icons/CalendarIcon';
import AuthorIcon from '../icons/AuthorIcon';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';
import { mockStaff, mockStudents } from '../../data/users';

interface ArticleViewProps {
  articleId: string;
  onBack: () => void;
  onSelectArticle: (id: string) => void;
  setCurrentPage: (page: Page) => void;
}

const getAuthorDetails = (authorId: string) => {
    const staff = mockStaff.find(s => s.id === authorId);
    if (staff) return { name: staff.name, role: staff.role };

    const student = mockStudents.find(s => s.id === authorId);
    if (student) return { name: student.name, role: student.prefectRole || 'Student' };

    return { name: 'Anonymous', role: 'Contributor' };
}

// A simple component to render basic markdown
const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
    const lines = content.trim().split('\n');

    return (
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
            {lines.map((line, index) => {
                line = line.trim();
                if (line.startsWith('# ')) {
                    return <h1 key={index} className="text-white font-orbitron">{line.substring(2)}</h1>;
                }
                if (line.startsWith('## ')) {
                    return <h2 key={index} className="text-white font-orbitron">{line.substring(3)}</h2>;
                }
                if (line.startsWith('* ')) {
                    return <ul key={index} className="list-disc pl-6"><li>{line.substring(2)}</li></ul>;
                }
                if (line === '') {
                    return <br key={index} />;
                }
                return <p key={index}>{line}</p>;
            })}
        </div>
    );
};

const ArticleView: React.FC<ArticleViewProps> = ({ articleId, onBack, onSelectArticle, setCurrentPage }) => {
    const article = articles.find(a => a.id === articleId);

    if (!article) {
        return (
            <div className="animate-fade-in-up pt-24 pb-16 bg-space-dark/95 text-center">
                <h2 className="text-2xl font-bold text-white">Article not found.</h2>
                <Button onClick={onBack} className="mt-8">Go Back</Button>
            </div>
        );
    }
    
    const author = getAuthorDetails(article.authorId);
    const relatedArticles = articles.filter(a => a.id !== articleId).slice(0, 2);

    return (
        <div className="animate-fade-in-up pt-24 pb-16 bg-space-light/95">
            <div className="container mx-auto px-6">
                <div className="mb-8">
                    <Button onClick={onBack} variant="secondary">
                        <ArrowLeftIcon /> Back to News
                    </Button>
                </div>

                <div className="max-w-4xl mx-auto">
                    <Card className="p-0 overflow-hidden">
                        <img src={article.image} alt={article.title} className="w-full h-64 md:h-96 object-cover" />
                        <div className="p-8 md:p-12">
                            <p className="text-brand-green font-bold mb-2">{article.category}</p>
                            <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-white mb-4">{article.title}</h1>
                            <div className="text-sm text-gray-400 mb-8 flex items-center space-x-6">
                                <span className="flex items-center gap-2"><AuthorIcon /> <div>{author.name} <span className="text-gray-500">({author.role})</span></div></span>
                                <span className="flex items-center gap-2"><CalendarIcon /> {new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>

                            <article className="article-content">
                                <MarkdownRenderer content={article.content} />
                            </article>
                        </div>
                    </Card>
                    
                     {relatedArticles.length > 0 && (
                        <div className="mt-16">
                            <h3 className="text-2xl font-orbitron font-bold text-white text-center mb-8">You Might Also Like</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {relatedArticles.map(rel => (
                                    <Card key={rel.id} className="p-0 overflow-hidden cursor-pointer group" onClick={() => onSelectArticle(rel.id)}>
                                        <div className="overflow-hidden">
                                          <img src={rel.image} alt={rel.title} className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"/>
                                        </div>
                                        <div className="p-6">
                                            <p className="text-brand-green font-bold text-sm mb-2">{rel.category}</p>
                                            <h4 className="font-orbitron text-xl font-bold text-white">{rel.title}</h4>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ArticleView;
