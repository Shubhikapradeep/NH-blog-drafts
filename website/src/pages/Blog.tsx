import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { BookOpen, Calendar, User, ArrowRight, Tag } from 'lucide-react';

const Blog = () => {
  const [email, setEmail] = React.useState('');
  const [subscribed, setSubscribed] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await addDoc(collection(db, 'newsletter_subscriptions'), {
        email,
        timestamp: new Date(),
        type: 'newsletter_subscription'
      });
      
      setSubscribed(true);
      setEmail('');
      
      setTimeout(() => {
        setSubscribed(false);
      }, 3000);
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      alert('There was an error subscribing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const blogPosts = [
    {
      title: 'Getting Started with PyTorch',
      author: 'Rithvik Matta',
      date: '15 Jan 2025',
      readTime: '8 min read',
      category: 'Tutorial',
      excerpt: 'A comprehensive guide to setting up PyTorch and building your first neural network from scratch.',
      tags: ['PyTorch', 'Deep Learning', 'Neural Networks', 'Python'],
      image: 'https://images.pexels.com/photos/7661980/pexels-photo-7661980.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
      slug: 'getting-started-with-pytorch'
    },
    {
      title: 'Intro to CTF Recon with BloodHound',
      author: 'Karthik Venkat',
      date: '10 Jan 2025',
      readTime: '12 min read',
      category: 'Security',
      excerpt: 'Learn reconnaissance techniques using BloodHound for cybersecurity competitions and ethical hacking.',
      tags: ['CTF', 'Security', 'BloodHound', 'Reconnaissance'],
      image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
      slug: 'intro-to-ctf-recon-with-bloodhound'
    },
    {
      title: 'Building a Secure SSL Chatroom in C',
      author: 'Ananya Sharma',
      date: '5 Jan 2025',
      readTime: '15 min read',
      category: 'Programming',
      excerpt: 'Deep dive into implementing secure client-server communication using SSL/TLS protocols in C.',
      tags: ['C Programming', 'SSL/TLS', 'Network Security', 'Socket Programming'],
      image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
      slug: 'building-secure-ssl-chatroom-in-c'
    },
    {
      title: 'Computer Vision for Beginners',
      author: 'Priya Nair',
      date: '28 Dec 2024',
      readTime: '10 min read',
      category: 'Tutorial',
      excerpt: 'Introduction to computer vision concepts, OpenCV basics, and practical image processing techniques.',
      tags: ['Computer Vision', 'OpenCV', 'Image Processing', 'Python'],
      image: 'https://images.pexels.com/photos/7048047/pexels-photo-7048047.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
      slug: 'computer-vision-for-beginners'
    },
    {
      title: 'Ethical AI: Building Responsible Systems',
      author: 'Shreya Patel',
      date: '20 Dec 2024',
      readTime: '6 min read',
      category: 'Ethics',
      excerpt: 'Exploring the importance of ethical considerations in AI development and deployment.',
      tags: ['AI Ethics', 'Responsible AI', 'Machine Learning', 'Society'],
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
      slug: 'ethical-ai-building-responsible-systems'
    },
    {
      title: 'Deploying ML Models with FastAPI',
      author: 'Arjun Reddy',
      date: '15 Dec 2024',
      readTime: '11 min read',
      category: 'DevOps',
      excerpt: 'Learn how to create production-ready APIs for your machine learning models using FastAPI.',
      tags: ['FastAPI', 'ML Deployment', 'Python', 'REST API'],
      image: 'https://images.pexels.com/photos/7662235/pexels-photo-7662235.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
      slug: 'deploying-ml-models-with-fastapi'
    }
  ];

  const categories = ['All', 'Tutorial', 'Security', 'Programming', 'Ethics', 'DevOps'];
  const [activeCategory, setActiveCategory] = React.useState('All');

  const filteredPosts = activeCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 neuron-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <BookOpen className="h-20 w-20 text-primary-accent mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-poppins font-bold mb-6 glow-text">
              Blog & Resources
            </h1>
            <p className="text-xl text-primary-gray-300 font-inter">
              Knowledge sharing from our community - tutorials, insights, and technical deep-dives
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6 glow-text">
              Featured Posts
            </h2>
            <p className="text-xl text-primary-gray-400 font-inter">
              Hand-picked articles from our technical contributors
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="glass-card glow-border overflow-hidden group hover:shadow-lg hover:shadow-primary-accent/20 transition-all duration-300 cursor-pointer"
              >
                <Link to={`/blog/${post.slug}`}>
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 bg-primary-magenta text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </div>
                    <div className="absolute top-4 right-4 bg-primary-accent text-primary-bg px-3 py-1 rounded-full text-sm font-semibold">
                      {post.category}
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <div className="flex items-center space-x-4 text-sm text-primary-gray-400 mb-4">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <span>{post.readTime}</span>
                    </div>
                    
                    <h3 className="text-2xl font-poppins font-bold mb-4 group-hover:text-primary-accent transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-primary-gray-300 font-inter mb-6 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-primary-accent/20 text-primary-accent text-sm rounded-full font-inter"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center text-primary-accent font-inter font-medium group-hover:translate-x-2 transition-transform">
                      <span>Read More</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-20 bg-primary-card/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6 glow-text">
              All Posts
            </h2>
            <p className="text-xl text-primary-gray-400 font-inter mb-8">
              Explore our complete collection of technical articles and tutorials
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-3 rounded-full font-inter font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-primary-accent text-primary-bg'
                      : 'bg-primary-card text-primary-gray-300 hover:bg-primary-accent/20 hover:text-primary-accent border border-primary-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={`${post.title}-${activeCategory}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="glass-card glow-border overflow-hidden group hover:shadow-lg hover:shadow-primary-accent/20 transition-all duration-300 cursor-pointer"
              >
                <Link to={`/blog/${post.slug}`}>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-primary-accent text-primary-bg px-3 py-1 rounded-full text-sm font-semibold">
                      {post.category}
                    </div>
                    {post.featured && (
                      <div className="absolute top-4 left-4 bg-primary-magenta text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Featured
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-xs text-primary-gray-400 mb-3">
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-poppins font-semibold mb-3 group-hover:text-primary-accent transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-primary-gray-400 font-inter text-sm mb-4 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-primary-accent/20 text-primary-accent text-xs rounded-full font-inter"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-primary-gray-500 text-xs">{post.readTime}</span>
                      <div className="flex items-center text-primary-accent text-sm font-medium group-hover:translate-x-1 transition-transform">
                        <span>Read</span>
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-card glow-border p-12"
          >
            <BookOpen className="h-16 w-16 text-primary-accent mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6 glow-text">
              Stay Updated
            </h2>
            <p className="text-xl text-primary-gray-300 mb-8 font-inter">
              Subscribe to get notified when we publish new technical articles and tutorials
            </p>
            
            {subscribed ? (
              <div className="text-center">
                <div className="inline-flex items-center space-x-2 text-primary-accent mb-4">
                  <BookOpen className="h-5 w-5" />
                  <span className="font-medium">Successfully subscribed!</span>
                </div>
                <p className="text-primary-gray-400">Thank you for joining our newsletter.</p>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-3 bg-primary-card border border-primary-gray-700 rounded-lg text-primary-gray-100 placeholder-primary-gray-500 focus:outline-none focus:border-primary-accent"
                />
                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;