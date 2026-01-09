import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, Linkedin, Download, ChevronRight, Code, Palette, Smartphone, ChevronLeft, ExternalLink, Calendar, Briefcase } from 'lucide-react';
import { send } from '@emailjs/browser';


// Custom hook untuk scroll animations
const useInViewAnimation = (ref, options = {}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, {
            threshold: 0.1,
            ...options
        });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref, options]);

    return isVisible;
};

const Portfolio = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState('All');
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedCertificate, setSelectedCertificate] = useState(null);
    const [isZoomed, setIsZoomed] = useState(false);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    // Contact form state
    const [contactName, setContactName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactSubject, setContactSubject] = useState('');
    const [contactMessage, setContactMessage] = useState('');

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1500);
    }, []);
    const projects = [
        {
            id: 1,
            title: "E-Commerce Platform",
            category: "Web Development",
            description: "Full-stack e-commerce solution with payment integration",
            longDescription: "A comprehensive e-commerce platform built with React and Node.js, featuring real-time inventory management, secure payment processing, and an intuitive admin dashboard.",
            tech: ["React", "Node.js", "MongoDB", "Stripe"],
            image: "bg-gradient-to-br from-purple-500 to-pink-500",
            imageType: "gradient"
        },
        {
            id: 2,
            title: "KasirApp - EZ-PAY",
            category: "Mobile App",
            description: "Android-based POS system with transaction management",
            longDescription: "A comprehensive point-of-sale (POS) application built with Kotlin and Android Studio. Features include product management, transaction processing, receipt generation, and sales reporting. Designed for small to medium businesses to streamline their cashier operations.",
            tech: ["Kotlin", "Android Studio", "SQLite", "Material Design"],
            image: `${process.env.PUBLIC_URL}/kasirapp-logo.png`,
            imageType: "custom"
        },
        {
            id: 3,
            title: "Brand Identity Design",
            category: "Design",
            description: "Complete brand identity for tech startup",
            longDescription: "Comprehensive brand identity package including logo design, color palette, typography, and brand guidelines for a innovative tech startup.",
            tech: ["Figma", "Illustrator", "Photoshop"],
            image: "bg-gradient-to-br from-orange-500 to-red-500",
            imageType: "gradient"
        },
        {
            id: 4,
            title: "AI Dashboard",
            category: "Web Development",
            description: "Analytics dashboard with AI-powered insights",
            longDescription: "An intelligent dashboard that leverages machine learning to provide predictive analytics and actionable insights for business decision-making.",
            tech: ["Vue.js", "Python", "TensorFlow", "D3.js"],
            image: "bg-gradient-to-br from-green-500 to-teal-500",
            imageType: "gradient"
        },
        {
            id: 5,
            title: "Fitness Tracking App",
            category: "Mobile App",
            description: "Health and fitness tracking with social features",
            longDescription: "A comprehensive fitness application that tracks workouts, nutrition, and connects users with a community of fitness enthusiasts.",
            tech: ["Flutter", "Firebase", "Google Fit API"],
            image: "bg-gradient-to-br from-yellow-500 to-orange-500",
            imageType: "gradient"
        },
        {
            id: 6,
            title: "Portfolio Website Template",
            category: "Design",
            description: "Modern, responsive portfolio template",
            longDescription: "A beautifully crafted portfolio template with dark mode, smooth animations, and customizable components for creative professionals.",
            tech: ["HTML", "CSS", "JavaScript", "GSAP"],
            image: "bg-gradient-to-br from-indigo-500 to-purple-500",
            imageType: "gradient"
        }
    ];

    const certificates = [
  { id: 1, title: 'IBM Python for Data Science', image: `${process.env.PUBLIC_URL}/certificates/ibm_python_for_data_science.png` },
  { id: 2, title: 'Survey Kesadaran Keamanan Siber', image: `${process.env.PUBLIC_URL}/certificates/survey_keamanan_siber.png` },
  { id: 3, title: 'Pemrograman Berorientasi Objek', image: `${process.env.PUBLIC_URL}/certificates/pbo.png` },
  { id: 4, title: 'Pengantar Sistem Digital', image: `${process.env.PUBLIC_URL}/certificates/pengantar_sistem_digital.png` },
  { id: 5, title: 'Sistem Informasi', image: `${process.env.PUBLIC_URL}/certificates/sistem_informasi.png` },
  { id: 6, title: 'Jaringan Komputer', image: `${process.env.PUBLIC_URL}/certificates/jaringan_komputer.png` },
  { id: 7, title: 'Exam Cisco Essentials', image: `${process.env.PUBLIC_URL}/certificates/cisco_essentials.png` },
  { id: 8, title: 'Analisa Numerik', image: `${process.env.PUBLIC_URL}/certificates/sertifikat_tambahan.png` },
];

    const skills = [
        { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
        { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
        { name: "Kotlin", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
        { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    ];



    const services = [
        {
            icon: <Code className="w-8 h-8" />,
            title: "Web Development",
            description: "Custom web applications with modern technologies and best practices"
        },
        {
            icon: <Smartphone className="w-8 h-8" />,
            title: "Mobile Development",
            description: "Native and cross-platform mobile apps for iOS and Android"
        },
        {
            icon: <Palette className="w-8 h-8" />,
            title: "UI/UX Design",
            description: "Beautiful, intuitive interfaces that users love to interact with Smile"
        }
    ];

    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "CEO, TechCorp",
            content: "Exceptional work! The website exceeded our expectations in every way. Highly professional and creative.",
            avatar: "bg-gradient-to-br from-pink-400 to-purple-400"
        },
        {
            name: "Michael Chen",
            role: "Product Manager, StartupXYZ",
            content: "Outstanding developer who delivers on time and goes above and beyond. Our app is a huge success!",
            avatar: "bg-gradient-to-br from-blue-400 to-cyan-400"
        },
        {
            name: "Muhammad Rafi",
            role: "Marketing Director, BrandCo",
            content: "Creative genius! The design work was stunning and perfectly captured our brand identity.",
            avatar: "bg-gradient-to-br from-green-400 to-teal-400"
        }
    ];

    const experience = [
        {
            year: "Project Kampus",
            title: "Penjadwalan Praktikum",
            company: "Universitas",
            description: "Sistem penjadwalan praktikum menggunakan PHP & MySQL dengan database terpadu"
        },
        {
            year: "Project Kampus",
            title: "Prediksi Pengangguran",
            company: "Data Science",
            description: "Olah data prediksi pengangguran tingkat pendidikan di Indonesia menggunakan Logistic Regression dengan Python"
        },
        {
            year: "Project Kampus",
            title: "Aplikasi Kasir Android",
            company: "Android Development",
            description: "Membuat aplikasi mobile menggunakan Kotlin pada Android Studio"
        }
    ];

    const filteredProjects = activeFilter === 'All'
        ? projects
        : projects.filter(p => p.category === activeFilter);

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
    };

    const [isSending, setIsSending] = useState(false);
    const [sendSuccess, setSendSuccess] = useState(false);
    const [sendError, setSendError] = useState(null);

    // Refs untuk scroll animations
    const aboutRef = useRef(null);
    const projectsRef = useRef(null);
    const servicesRef = useRef(null);
    const certificatesRef = useRef(null);
    const contactRef = useRef(null);
    const projectCardsRef = useRef([]);
    const serviceCardsRef = useRef([]);

    // Intersection observer untuk setiap section
    const aboutVisible = useInViewAnimation(aboutRef);
    const projectsVisible = useInViewAnimation(projectsRef);
    const servicesVisible = useInViewAnimation(servicesRef);
    const certificatesVisible = useInViewAnimation(certificatesRef);
    const contactVisible = useInViewAnimation(contactRef);

    // Track project cards visibility
    const [visibleProjects, setVisibleProjects] = useState(new Set());
    const [visibleServices, setVisibleServices] = useState(new Set());

    // Intersection Observer untuk Project Cards
    useEffect(() => {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };

        const projectObservers = [];

        projectCardsRef.current.forEach((ref, index) => {
            if (!ref) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Add to visible set
                        setVisibleProjects(prev => {
                            const newSet = new Set(prev);
                            newSet.add(index);
                            return newSet;
                        });
                        // Stop observing once visible
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            observer.observe(ref);
            projectObservers.push(observer);
        });

        // Cleanup function
        return () => {
            projectObservers.forEach(observer => observer.disconnect());
        };
    }, [filteredProjects]); // Re-run when filtered projects change
    // Intersection Observer untuk Certificate Cards
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const certificateObservers = [];

        // Wait a bit for refs to be populated
        const timer = setTimeout(() => {
            // Get all certificate buttons
            const certificateElements = document.querySelectorAll('#certificates .project-card-item');

            certificateElements.forEach((element, index) => {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            // Add visible class with staggered delay
                            setTimeout(() => {
                                entry.target.classList.add('visible');
                            }, index * 100); // 100ms delay per card

                            observer.unobserve(entry.target);
                        }
                    });
                }, observerOptions);

                observer.observe(element);
                certificateObservers.push(observer);
            });
        }, 100);

        return () => {
            clearTimeout(timer);
            certificateObservers.forEach(observer => observer.disconnect());
        };
    }, [certificates, certificatesVisible]); // Re-run when certificates or section visibility changes
    // Intersection Observer untuk Service Cards
    useEffect(() => {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };

        const serviceObservers = [];

        serviceCardsRef.current.forEach((ref, index) => {
            if (!ref) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Add to visible set
                        setVisibleServices(prev => {
                            const newSet = new Set(prev);
                            newSet.add(index);
                            return newSet;
                        });
                        // Add visible class manually
                        entry.target.classList.add('visible');
                        // Stop observing once visible
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            observer.observe(ref);
            serviceObservers.push(observer);
        });

        // Cleanup function
        return () => {
            serviceObservers.forEach(observer => observer.disconnect());
        };
    }, [services]); // Re-run when services change

    // Fallback: Auto-show cards after short delay if observer fails
    useEffect(() => {
        const fallbackTimer = setTimeout(() => {
            // Check if cards are still not visible after 2 seconds
            if (visibleProjects.size === 0 && projectCardsRef.current.length > 0) {
                console.log('⚠️ Fallback: Auto-showing project cards');
                setVisibleProjects(new Set([0, 1, 2, 3, 4, 5, 6, 7, 8]));
            }
            if (visibleServices.size === 0 && serviceCardsRef.current.length > 0) {
                console.log('⚠️ Fallback: Auto-showing service cards');
                setVisibleServices(new Set([0, 1, 2]));
            }
        }, 2000);

        return () => clearTimeout(fallbackTimer);
    }, [visibleProjects, visibleServices]);

    // Debug logging (hapus setelah testing)
    useEffect(() => {
        console.log('🔍 Debug Info:');
        console.log('- Project Cards Refs:', projectCardsRef.current.length);
        console.log('- Visible Projects:', Array.from(visibleProjects));
        console.log('- Service Cards Refs:', serviceCardsRef.current.length);
        console.log('- Visible Services:', Array.from(visibleServices));
    }, [visibleProjects, visibleServices]);
    const handleSendMessage = async (e) => {
        e.preventDefault();
        setIsSending(true);
        setSendSuccess(false);
        setSendError(null);

        const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
        const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
        const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

        // Debug logging
        console.log('=== EMAIL JS DEBUG ===');
        console.log('Service ID:', serviceId ? '✓ Set' : '✗ Missing');
        console.log('Template ID:', templateId ? '✓ Set' : '✗ Missing');
        console.log('Public Key:', publicKey ? '✓ Set' : '✗ Missing');

        // Build template params with multiple common keys so they match whatever
        // variable names are used in the EmailJS template.
        const templateParams = {
            // name aliases
            from_name: contactName || 'Website Visitor',
            name: contactName || 'Website Visitor',
            user_name: contactName || 'Website Visitor',

            // email aliases
            from_email: contactEmail || '',
            user_email: contactEmail || '',
            email: contactEmail || '',
            reply_to: contactEmail || '',

            // subject
            subject: contactSubject || `Website Contact from ${contactName || contactEmail || 'Visitor'}`,

            // message/body (plain and html variants)
            message: contactMessage || '',
            body: contactMessage || '',
            text: contactMessage || '',
            plain_message: contactMessage || '',
            message_html: `<p>${(contactMessage || '').replace(/\n/g, '<br/>')}</p>`,

            // convenience fields for templates that expect all-in-one
            full_message: `From: ${contactName} <${contactEmail}>\nSubject: ${contactSubject}\n\n${contactMessage}`
        };

        console.log('Template Parameters:', templateParams);
        console.log('=====================');

        // Validasi input
        if (!contactName.trim()) {
            setSendError('Nama harus diisi');
            setIsSending(false);
            return;
        }
        if (!contactEmail.trim()) {
            setSendError('Email harus diisi');
            setIsSending(false);
            return;
        }
        if (!contactMessage.trim()) {
            setSendError('Pesan harus diisi');
            setIsSending(false);
            return;
        }

        if (serviceId && templateId && publicKey) {
            try {
                console.log('Mengirim email dengan EmailJS...');
                const response = await send(serviceId, templateId, templateParams, publicKey);
                console.log('✓ Email berhasil dikirim!', response);
                setSendSuccess(true);
                setContactName('');
                setContactEmail('');
                setContactSubject('');
                setContactMessage('');

                // Auto clear success message after 5 seconds
                setTimeout(() => setSendSuccess(false), 5000);
            } catch (err) {
                console.error('✗ Error mengirim email:', err);
                setSendError(`Gagal mengirim pesan: ${err.text || err.message}`);
            } finally {
                setIsSending(false);
            }
        } else {
            console.error('EmailJS tidak dikonfigurasi dengan benar');
            setSendError('Email service tidak dikonfigurasi. Silakan hubungi admin.');
            setIsSending(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white text-xl font-light">Loading Portfolio...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={isDarkMode ? 'dark' : ''}>
            <div className="min-h-screen bg-gray-50 dark:bg-portfolio-dark transition-colors duration-500">

                {/* Navigation */}
                <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-gray-200 dark:border-slate-700">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="text-2xl font-bold bg-gradient-to-r from-portfolio-accent to-portfolio-accentDark bg-clip-text text-transparent">
                                Portfolio
                            </div>

                            {/* Desktop Menu */}
                            <div className="hidden md:flex space-x-8">
                                {['Home', 'About', 'Projects', 'Services', 'Contact'].map((item) => (
                                    <button
                                        key={item}
                                        onClick={() => scrollToSection(item.toLowerCase())}
                                        className="text-gray-700 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
                                    >
                                        {item}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setIsDarkMode(!isDarkMode)}
                                    className="px-4 py-1 rounded-full bg-gradient-to-r from-portfolio-accent to-portfolio-accentDark text-gray-900 font-semibold text-sm hover:shadow-lg transition-all"
                                >
                                    {isDarkMode ? '☀️' : '🌙'}
                                </button>
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="md:hidden text-gray-700 dark:text-gray-300"
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <div className="md:hidden bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700">
                            <div className="px-4 py-4 space-y-3">
                                {['Home', 'About', 'Projects', 'Services', 'Contact'].map((item) => (
                                    <button
                                        key={item}
                                        onClick={() => scrollToSection(item.toLowerCase())}
                                        className="block w-full text-left text-gray-700 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400"
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </nav>

                {/* Hero Section */}
                <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 pt-16 sm:pt-20">
                    <div className="max-w-7xl mx-auto w-full text-center">
                        <div className="mb-6 sm:mb-8 inline-block animate-fade-in">
                            <div className="brush-frame animate-float">
                                <img
                                    src={`${process.env.PUBLIC_URL}/profile.jpg`}
                                    alt="Fadhlul Wafi"
                                    className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                                />

                            </div>  
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 animate-slide-up leading-tight">
                            Fadhlul Wafi
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 animate-slide-up">
                            Software Engineer & UI/UX Designer
                        </p>
                        <p className="text-sm sm:text-base md:text-lg text-gray-500 dark:text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto animate-slide-up leading-relaxed px-2">
                            Crafting beautiful digital experiences with code and design.
                            Passionate about building products that make a difference.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-slide-up px-2 w-full">
                            <a href="/The New CV of Fadhlul Wafi.pdf" download className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center text-sm sm:text-base">
                                <Download className="mr-2 w-4 sm:w-5 h-4 sm:h-5 group-hover:animate-bounce" />
                                Download CV
                            </a>
                            <button
                                onClick={() => scrollToSection('contact')}
                                className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-purple-500 dark:border-purple-400 text-purple-500 dark:text-purple-400 rounded-full font-semibold hover:bg-purple-500 hover:text-white transition-all duration-300 flex items-center justify-center text-sm sm:text-base"
                            >
                                Contact Me
                                <ChevronRight className="ml-2 w-4 sm:w-5 h-4 sm:h-5" />
                            </button>
                        </div>

                        {/* Social Links */}
                        <div className="flex justify-center gap-4 sm:gap-6 mt-8 sm:mt-12 animate-slide-up">
                            <a href="https://github.com/wafi14-art" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors">
                                <Github className="w-6 h-6" />
                            </a>
                            <a href="https://www.linkedin.com/in/fadhlul-wafi" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors">
                                <Linkedin className="w-6 h-6" />
                            </a>
                            <a href="https://wa.me/62895412231715" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors">
                                {/* WhatsApp SVG icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 12.1c0 5.4-4.4 9.8-9.8 9.8a9.7 9.7 0 0 1-5.2-1.5L3 21l1.6-3.9A9.8 9.8 0 0 1 2.8 12C2.8 6.6 7.2 2.2 12.6 2.2S22.4 6.6 22.4 12c0 .8-.1 1.6-.4 2.1z" />
                                    <path d="M17.2 14.2c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.2-.8.9-1 1.1-.2.2-.4.2-.7.1-.3-.1-1.1-.4-2.1-1.3-.8-.7-1.3-1.6-1.5-1.9-.2-.3 0-.5.1-.6.1-.1.3-.3.5-.5.1-.2.2-.3.3-.5.1-.2 0-.5 0-.6-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.5-.3.4-1 1-1 2.4s1 2.8 1.1 3c.1.2 1.8 3 4.4 4.2 3 .9 3.4.8 3.9.7.5-.1 1.6-.6 1.8-1.1.2-.5.2-1 .1-1.1-.1-.1-.4-.2-.7-.3z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" ref={aboutRef} className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
                    <div className={`max-w-7xl mx-auto scroll-fade-in ${aboutVisible ? 'visible' : ''}`}>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-8 sm:mb-12 md:mb-16">
                            About Me
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 mb-8 sm:mb-12 md:mb-16">
                            <div className={`backdrop-blur-lg bg-white/10 dark:bg-white/5 p-6 sm:p-8 rounded-3xl border border-white/20 slide-in-left ${aboutVisible ? 'visible' : ''}`}>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Who I Am</h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                                    Passionate Software Engineer graduate with strong expertise in developing
                                    innovative technology solutions. Skilled in multiple programming languages
                                    including JavaScript, Python, PHP, and Java, backed by solid foundations in
                                    data structures and algorithms. Despite being at the start of my professional
                                    journey, I have successfully delivered various personal and academic projects
                                    showcasing strong problem-solving skills and rapid learning ability. Certified
                                    in multiple IT domains, validating my technical proficiency. Enthusiastic about
                                    contributing to dynamic development teams and enhancing my expertise through
                                    challenging real-world projects.
                                </p>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    When I'm not coding, you'll find me exploring new technologies, contributing to
                                    open-source projects, or sharing knowledge with the developer community.
                                </p>
                            </div>


                            <div className={`backdrop-blur-lg bg-white/10 dark:bg-white/5 p-6 sm:p-8 rounded-3xl border border-white/20 slide-in-right ${aboutVisible ? 'visible' : ''}`}>
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Skills</h3>
                                <div className="grid grid-cols-4 sm:grid-cols-4 gap-4">
                                    {skills.map((skill, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-xl hover:scale-110 transition-all duration-300 group"
                                        >
                                            <img
                                                src={skill.icon}
                                                alt={skill.name}
                                                className="w-12 h-12 mb-2 group-hover:scale-110 transition-transform"
                                                onError={(e) => {
                                                    console.error(`Failed to load: ${skill.icon}`);
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 text-center mt-1">
                                                {skill.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Experience Timeline */}
                        <div className={`backdrop-blur-lg bg-white/10 dark:bg-white/5 p-6 sm:p-8 rounded-3xl border border-white/20 scroll-fade-in ${aboutVisible ? 'visible' : ''}`}>
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 flex items-center">
                                <Briefcase className="mr-2 sm:mr-3 text-purple-500 flex-shrink-0" />
                                Experience
                            </h3>
                            <div className="space-y-6">
                                {experience.map((exp, index) => (
                                    <div key={index} className="flex gap-4 group">
                                        <div className="flex flex-col items-center">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white flex-shrink-0">
                                                <Calendar className="w-5 h-5" />
                                            </div>
                                            {index < experience.length - 1 && (
                                                <div className="w-0.5 h-full bg-gradient-to-b from-purple-500 to-transparent mt-2"></div>
                                            )}
                                        </div>
                                        <div className="pb-8 flex-1">
                                            <p className="text-purple-400 text-sm font-semibold mb-1">{exp.year}</p>
                                            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{exp.title}</h4>
                                            <p className="text-gray-600 dark:text-gray-400 mb-2">{exp.company}</p>
                                            <p className="text-gray-600 dark:text-gray-300">{exp.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Projects Section */}
                <section id="projects" ref={projectsRef} className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-gray-50/50 dark:bg-black/20">
                    <div className="max-w-7xl mx-auto">
                        <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-4 sm:mb-6 md:mb-8 scroll-fade-in ${projectsVisible ? 'visible' : ''}`}>
                            Featured Projects
                        </h2>
                        <p className="text-center text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto px-2">
                            A collection of my recent work showcasing various skills and technologies
                        </p>

                        {/* Filter Buttons */}
                        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-10 md:mb-12 px-2">
                            {['All', 'Web Development', 'Mobile App', 'Design'].map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`px-3 sm:px-6 py-1 sm:py-2 rounded-full font-semibold transition-all text-xs sm:text-sm ${activeFilter === filter
                                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-100 sm:scale-105'
                                        : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:shadow-md'
                                        }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>

                        {/* Projects Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                            {filteredProjects.map((project, index) => (
                                <div
                                    key={project.id}
                                    ref={el => projectCardsRef.current[index] = el}
                                    className={`group backdrop-blur-lg bg-white dark:bg-white/5 rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer project-card-item ${visibleProjects.has(index) ? 'visible' : ''}`}
                                    onClick={() => setSelectedProject(project)}
                                >
                                    <div className={`h-32 sm:h-40 md:h-48 flex items-center justify-center text-white text-4xl sm:text-6xl font-bold relative overflow-hidden ${project.imageType === 'custom' ? 'bg-white' : project.image}`}>
                                        {project.imageType === 'custom' ? (
                                            <div className="w-full h-full flex items-center justify-center p-4 sm:p-6">
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="max-w-full max-h-full object-contain"
                                                    onError={(e) => {
                                                        console.error('Image failed to load:', project.image);
                                                        e.target.style.display = 'none';
                                                    }}
                                                />
                                            </div>
                                        ) : (
                                            <span>{project.title[0]}</span>
                                        )}
                                        <div className="absolute inset-0 bg-transparent group-hover:bg-black/20 transition-all flex items-center justify-center">
                                            <ExternalLink className="opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                                        </div>
                                    </div>
                                    <div className="p-4 sm:p-6">
                                        <div className="text-xs sm:text-sm text-purple-500 mb-1 sm:mb-2">{project.category}</div>
                                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">{project.title}</h3>
                                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">{project.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-xs font-medium"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Project Modal */}
                {selectedProject && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedProject(null)}>
                        <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                            <div className={`h-64 sm:h-80 flex items-center justify-center text-white text-8xl font-bold ${selectedProject.imageType === 'custom' ? 'bg-white' : selectedProject.image}`}>
                                {selectedProject.imageType === 'custom' ? (
                                    <div className="w-full h-full flex items-center justify-center p-8 sm:p-16">
                                        <img
                                            src={selectedProject.image}
                                            alt={selectedProject.title}
                                            className="max-w-full max-h-full object-contain"
                                            onError={(e) => {
                                                console.error('Modal image failed to load:', selectedProject.image);
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <span>{selectedProject.title[0]}</span>
                                )}
                            </div>
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <div className="text-sm text-purple-500 mb-2">{selectedProject.category}</div>
                                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{selectedProject.title}</h3>
                                    </div>
                                    <button
                                        onClick={() => setSelectedProject(null)}
                                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                    {selectedProject.longDescription}
                                </p>
                                <div className="mb-6">
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Technologies Used:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.tech.map((tech, i) => (
                                            <span
                                                key={i}
                                                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-medium"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:shadow-lg transition-all">
                                    View Live Project
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Services Section */}
                <section id="services" ref={servicesRef} className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
                    <div className="max-w-7xl mx-auto">
                        <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-4 sm:mb-6 md:mb-8 scroll-fade-in ${servicesVisible ? 'visible' : ''}`}>
                            Services
                        </h2>
                        <p className="text-center text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto px-2">
                            Comprehensive digital solutions tailored to your needs
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                            {services.map((service, index) => (
                                <div
                                    key={index}
                                    ref={el => serviceCardsRef.current[index] = el}
                                    className={`service-card bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 group project-card-item ${visibleServices.has(index) ? 'visible' : ''}`}
                                >
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-portfolio-accent to-portfolio-accentDark rounded-2xl flex items-center justify-center text-white mb-4 sm:mb-6 group-hover:scale-110 transition-transform shadow-lg">
                                        {React.cloneElement(service.icon, { className: 'w-8 sm:w-10 h-8 sm:h-10' })}
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                                        {service.title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Certificates Section */}
                <section id="certificates" ref={certificatesRef} className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-gray-50/50 dark:bg-black/20">
                    <div className="max-w-7xl mx-auto">
                        <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-4 sm:mb-6 md:mb-8 scroll-fade-in ${certificatesVisible ? 'visible' : ''}`}>
                            Certificates
                        </h2>
                        <p className="text-center text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto px-2">
                            Professional certifications and achievements in IT domains
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                            {certificates.map((cert, index) => (
                                <button
                                    key={cert.id}
                                    onClick={() => { setSelectedCertificate(cert); setIsZoomed(false); }}
                                    className={`group bg-white/5 dark:bg-white/5 p-2 sm:p-4 rounded-2xl border border-white/10 hover:scale-105 transition-all flex flex-col items-center project-card-item ${certificatesVisible ? 'visible' : ''}`}
                                >
                                    <div className="w-full h-20 sm:h-24 md:h-36 bg-white/10 rounded overflow-hidden flex items-center justify-center">
                                        <img
                                            src={cert.image}
                                            alt={cert.title}
                                            className="object-cover w-full h-full"
                                            onError={(e) => {
                                                console.error(`Failed to load certificate: ${cert.image}`);
                                                e.target.style.display = 'none';
                                                e.target.parentElement.innerHTML = `<div class="flex items-center justify-center w-full h-full bg-gray-700 text-white text-xs p-2 text-center">${cert.title}</div>`;
                                            }}
                                        />
                                    </div>
                                    <div className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-100 text-center line-clamp-2">{cert.title}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Certificate Modal */}
                {selectedCertificate && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => { setSelectedCertificate(null); setIsZoomed(false); }}>
                        <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-auto p-6" onClick={(e) => e.stopPropagation()}>
                            <div className="flex justify-between items-start">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedCertificate.title}</h3>
                                <div className="flex gap-2">
                                    <button onClick={() => setIsZoomed((z) => !z)} className="px-3 py-1 bg-purple-500 text-white rounded">{isZoomed ? 'Unzoom' : 'Zoom'}</button>
                                    <button onClick={() => { setSelectedCertificate(null); setIsZoomed(false); }} className="px-3 py-1 bg-gray-200 dark:bg-slate-700 rounded">Close</button>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-center">
                                <img src={selectedCertificate.image} alt={selectedCertificate.title} className={`max-w-full max-h-[70vh] transition-transform ${isZoomed ? 'scale-125' : 'scale-100'}`} />
                            </div>
                        </div>
                    </div>
                )}

                {/* Contact Section */}
                <section id="contact" ref={contactRef} className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
                    <div className="max-w-4xl mx-auto">
                        <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-4 sm:mb-6 md:mb-8 scroll-fade-in ${contactVisible ? 'visible' : ''}`}>Contact</h2>
                        <p className="text-center text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-8 sm:mb-10 md:mb-12 px-2">Interested in working together? Send me a message.</p>
                        <form onSubmit={handleSendMessage} className={`bg-white dark:bg-white/5 p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-white/10 scroll-fade-in ${contactVisible ? 'visible' : ''}`}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    value={contactName}
                                    onChange={(e) => setContactName(e.target.value)}
                                    className="p-2 sm:p-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-transparent text-sm sm:text-base focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 transition-colors"
                                />
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    value={contactEmail}
                                    onChange={(e) => setContactEmail(e.target.value)}
                                    className="p-2 sm:p-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-transparent text-sm sm:text-base focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 transition-colors"
                                />
                            </div>
                            <input
                                type="text"
                                placeholder="Subject"
                                value={contactSubject}
                                onChange={(e) => setContactSubject(e.target.value)}
                                className="w-full p-2 sm:p-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-transparent mb-3 sm:mb-4 text-sm sm:text-base focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 transition-colors"
                            />
                            <textarea
                                placeholder="Your Message"
                                value={contactMessage}
                                onChange={(e) => setContactMessage(e.target.value)}
                                className="w-full p-2 sm:p-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-transparent mb-3 sm:mb-4 min-h-[100px] sm:min-h-[120px] text-sm sm:text-base focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 transition-colors"
                            ></textarea>

                            {isSending && <p className="text-gray-400 mb-4 text-sm">Sending…</p>}
                            {sendSuccess && <p className="text-green-400 mb-4 text-sm">The email has been sent</p>}
                            {sendError && <p className="text-red-400 mb-4 text-sm">{sendError}</p>}

                            <div className="flex justify-center sm:justify-end">
                                <button type="submit" disabled={isSending} className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold disabled:opacity-60 text-sm sm:text-base hover:shadow-lg transition-shadow">Send Message</button>
                            </div>
                        </form>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-6 sm:py-8 text-center px-4">
                    <div className="max-w-4xl mx-auto text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        © {new Date().getFullYear()} Fadhlul Wafi
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Portfolio;