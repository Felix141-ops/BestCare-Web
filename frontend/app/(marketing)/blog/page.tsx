'use client';

import React, { useState } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Badge, Input } from '@/components/ui';
import { motion } from 'framer-motion';

const articles = [
  {
    id: 1,
    title: '5 Tips for Maintaining a Healthy Heart',
    excerpt: 'Learn the essential habits and lifestyle changes to keep your cardiovascular system healthy.',
    category: 'Cardiology',
    author: 'Dr. Sarah Johnson',
    date: '2024-06-20',
    readTime: '5 min read',
    image: '❤️',
  },
  {
    id: 2,
    title: 'Understanding Diabetes: Prevention and Management',
    excerpt: 'A comprehensive guide to understanding diabetes, its prevention, and effective management strategies.',
    category: 'Endocrinology',
    author: 'Dr. Michael Chen',
    date: '2024-06-18',
    readTime: '8 min read',
    image: '💉',
  },
  {
    id: 3,
    title: 'The Importance of Regular Health Checkups',
    excerpt: 'Why regular health checkups are crucial for early detection of diseases and maintaining wellness.',
    category: 'General Health',
    author: 'Dr. Emily Rodriguez',
    date: '2024-06-15',
    readTime: '6 min read',
    image: '🩺',
  },
  {
    id: 4,
    title: 'Mental Health Awareness: Breaking the Stigma',
    excerpt: 'Understanding mental health and how to seek help. Breaking stigma and promoting wellness.',
    category: 'Mental Health',
    author: 'Dr. James Wilson',
    date: '2024-06-12',
    readTime: '7 min read',
    image: '🧠',
  },
  {
    id: 5,
    title: 'Nutrition Guide for Busy Professionals',
    excerpt: 'Practical nutrition tips and meal planning strategies for people with busy schedules.',
    category: 'Nutrition',
    author: 'Dr. Lisa Anderson',
    date: '2024-06-10',
    readTime: '6 min read',
    image: '🥗',
  },
  {
    id: 6,
    title: 'Exercise and Joint Health: A Complete Guide',
    excerpt: 'Everything you need to know about maintaining joint health through proper exercise.',
    category: 'Orthopedics',
    author: 'Dr. Robert Smith',
    date: '2024-06-08',
    readTime: '9 min read',
    image: '🏃',
  },
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...new Set(articles.map((a) => a.category))];

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      <Header isAuthenticated={false} />

      <main>
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-r from-blue-50 to-cyan-50">
          <div className="container-max">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold mb-4 text-gray-900">
                Health & Wellness Blog
              </h1>
              <p className="text-lg text-gray-600">
                Latest articles, tips, and insights from our healthcare experts
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="py-8 bg-white border-b border-gray-200">
          <div className="container-max">
            <div className="space-y-4 text-gray-700">
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                }
              />

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-medical-blue text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-12 bg-white">
          <div className="container-max">
            <div className="mb-8">
              <p className="text-gray-600">
                {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
              </p>
            </div>

            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer" hoverable>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between mb-3">
                          <div className="text-4xl">{article.image}</div>
                          <Badge variant="primary" size="sm">
                            {article.category}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg leading-tight">
                          {article.title}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <p className="text-sm text-gray-600">{article.excerpt}</p>

                        <div className="flex justify-between text-xs text-gray-500 pt-4 border-t border-gray-200">
                          <span>By {article.author}</span>
                          <span>{article.readTime}</span>
                        </div>

                        <div className="text-xs text-gray-400">
                          {new Date(article.date).toLocaleDateString()}
                        </div>

                        <button className="w-full mt-4 text-medical-blue font-semibold hover:text-dark-blue transition-colors">
                          Read Full Article →
                        </button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center py-12"
              >
                <p className="text-xl text-gray-600">No articles found matching your criteria.</p>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
