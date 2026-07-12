import React, { useMemo, useState } from 'react';
import {
    Award,
    Briefcase,
    Calendar,
    ChevronRight,
    Code,
    Download,
    ExternalLink,
    Github,
    Linkedin,
    Mail,
    MapPin,
    Menu,
    MessageCircle,
    Palette,
    Smartphone,
    X,
} from 'lucide-react';
import { send } from '@emailjs/browser';

const navItems = [
    { label: 'Beranda', id: 'home' },
    { label: 'Tentang', id: 'about' },
    { label: 'Proses', id: 'process' },
    { label: 'Proyek', id: 'projects' },
    { label: 'Kontak', id: 'contact' },
];

const stats = [
    { value: '02', label: 'Proyek unggulan' },
    { value: '08', label: 'Sertifikat' },
    { value: '04', label: 'Fokus utama' },
];

const processSteps = [
    {
        step: '01',
        title: 'Research',
        description: 'Merapikan kebutuhan, alur user, dan prioritas fitur sebelum desain dimulai.',
    },
    {
        step: '02',
        title: 'Design',
        description: 'Menyusun interface yang bersih, mudah dipahami, dan terasa profesional.',
    },
    {
        step: '03',
        title: 'Build',
        description: 'Mengubah desain menjadi produk React atau Android yang rapi dan stabil.',
    },
    {
        step: '04',
        title: 'Launch',
        description: 'Finishing, testing, dan delivery supaya hasil siap dipakai atau dipresentasikan.',
    },
];

const services = [
    {
        icon: Code,
        title: 'Pengembangan Website',
        description: 'Landing page dan web app yang cepat, rapi, dan enak dipakai di desktop maupun mobile.',
    },
    {
        icon: Smartphone,
        title: 'Aplikasi Mobile',
        description: 'Pengembangan aplikasi Android berbasis Kotlin dengan alur transaksi yang jelas.',
    },
    {
        icon: Palette,
        title: 'Perapihan UI/UX',
        description: 'Perombakan tampilan agar terasa lebih clean, terstruktur, dan tidak seperti template.',
    },
];

const experience = [
    {
        period: 'Proyek Kampus',
        title: 'Sistem Penjadwalan Praktikum',
        detail: 'Sistem penjadwalan praktikum dengan PHP dan MySQL untuk pengelolaan jadwal lab.',
    },
    {
        period: 'Analisis Data',
        title: 'Prediksi Tingkat Pengangguran',
        detail: 'Analisis tingkat pengangguran berdasarkan jenjang pendidikan dengan Logistic Regression.',
    },
    {
        period: 'Pengembangan Android',
        title: 'Aplikasi Kasir',
        detail: 'Aplikasi kasir Android berbasis Kotlin untuk transaksi, data produk, dan laporan sederhana.',
    },
];

const toolLogos = [
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
    { name: 'Supabase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg' },
    { name: 'Kotlin', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg' },
    { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    { name: 'SQLite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg' },
];

const projects = [
    {
        id: 1,
        title: 'Sipadu',
        category: 'Website',
        description: 'Sistem informasi pelayanan publik terintegrasi untuk Kecamatan Tambun Utara.',
        longDescription:
            'Sipadu membantu warga mengakses layanan, informasi, dan pengaduan dalam satu platform yang lebih terstruktur dan transparan.',
        tech: ['React', 'Tailwind CSS', 'Vite', 'Supabase'],
        image: `${process.env.PUBLIC_URL}/sipadu-logo.png`,
        liveUrl: 'https://sipadu-tambun-utara.vercel.app/',
        repoUrl: '',
        figmaUrl: '',
        frameClass: 'project-logo-frame-wide',
        imageClass: 'project-logo-image-wide',
    },
    {
        id: 2,
        title: 'KasirApp - EZ-PAY',
        category: 'Aplikasi Mobile',
        description: 'Sistem kasir berbasis Android untuk transaksi dan pengelolaan produk.',
        longDescription:
            'Aplikasi kasir mobile untuk membantu proses transaksi, pengelolaan produk, dan rekap penjualan dengan alur yang mudah dipahami.',
        tech: ['Kotlin', 'Android Studio', 'SQLite', 'Material Design'],
        image: `${process.env.PUBLIC_URL}/kasirapp-logo.png`,
        repoUrl: '',
        figmaUrl: '',
        frameClass: 'project-logo-frame-square',
        imageClass: 'project-logo-image-square',
    },
];

const projectFilters = ['Semua', 'Website', 'Aplikasi Mobile'];

const certificates = [
    { id: 1, title: 'IBM Python for Data Science', image: `${process.env.PUBLIC_URL}/certificates/ibm_python_for_data_science.png` },
    { id: 2, title: 'Survey Kesadaran Keamanan Siber', image: `${process.env.PUBLIC_URL}/certificates/survey_keamanan_siber.png` },
    { id: 3, title: 'Pemrograman Berorientasi Objek', image: `${process.env.PUBLIC_URL}/certificates/pbo.png` },
    { id: 4, title: 'Pengantar Sistem Digital', image: `${process.env.PUBLIC_URL}/certificates/pengantar_sistem_digital.png` },
    { id: 5, title: 'Sistem Informasi', image: `${process.env.PUBLIC_URL}/certificates/sistem_informasi.png` },
    { id: 6, title: 'Jaringan Komputer', image: `${process.env.PUBLIC_URL}/certificates/jaringan_komputer.png` },
    { id: 7, title: 'Exam Cisco Essentials', image: `${process.env.PUBLIC_URL}/certificates/cisco_essentials.png` },
    { id: 8, title: 'Analisa Numerik', image: `${process.env.PUBLIC_URL}/certificates/sertifikat_tambahan.png` },
    { id: 9, title: 'Course AI', image: `${process.env.PUBLIC_URL}/certificates/Sertifikat Rework Course AI.png` },
];

const profileImage = `${process.env.PUBLIC_URL}/foto-profile-baru-web.png`;
const profilepicture = `${process.env.PUBLIC_URL}/Foto Profile (3).png`;
const cvFile = `${process.env.PUBLIC_URL}/The New CV of Fadhlul Wafi.pdf`;
const contactLinks = [
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/fadhlul-wafi-b76467319',
        icon: Linkedin,
        bg: 'bg-[#e8f0fe]',
        textColor: 'text-[#174ea6]',
    },
    {
        label: 'GitHub',
        href: 'https://github.com/wafi14-art',
        icon: Github,
        bg: 'bg-[#f5f5f5]',
        textColor: 'text-[#111827]',
    },
    {
        label: 'WhatsApp',
        href: 'https://wa.me/62895412231715',
        icon: MessageCircle,
        bg: 'bg-[#d1f7d6]',
        textColor: 'text-[#107f3e]',
    },
    {
        label: 'Email',
        href: 'mailto:fadhlulwafi1405@gmail.com?subject=Halo%20Fadhlul%20Wafi&body=Halo%20Fadhlul%2C%0D%0A%0D%0ASaya%20ingin%20menghubungi%20Anda%20terkait%20project%20atau%20kolaborasi.',
        icon: Mail,
        bg: 'bg-[#fce8e6]',
        textColor: 'text-[#a21c17]',
    },
];

const Portfolio = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState('Semua');
    const [selectedCertificate, setSelectedCertificate] = useState(null);
    const [contactName, setContactName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactSubject, setContactSubject] = useState('');
    const [contactMessage, setContactMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [sendSuccess, setSendSuccess] = useState(false);
    const [sendError, setSendError] = useState('');

    const filteredProjects = useMemo(() => {
        if (activeFilter === 'Semua') {
            return projects;
        }

        return projects.filter((project) => project.category === activeFilter);
    }, [activeFilter]);

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setIsMenuOpen(false);
    };

    const handleSendMessage = async (event) => {
        event.preventDefault();
        setSendSuccess(false);
        setSendError('');

        if (!contactName.trim()) {
            setSendError('Nama wajib diisi.');
            return;
        }

        if (!contactEmail.trim()) {
            setSendError('Email wajib diisi.');
            return;
        }

        if (!contactMessage.trim()) {
            setSendError('Pesan wajib diisi.');
            return;
        }

        const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
        const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
        const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey) {
            setSendError('Konfigurasi email belum tersedia.');
            return;
        }

        setIsSending(true);

        try {
            await send(
                serviceId,
                templateId,
                {
                    from_name: contactName,
                    from_email: contactEmail,
                    reply_to: contactEmail,
                    subject: contactSubject || `Pesan portfolio dari ${contactName}`,
                    message: contactMessage,
                    full_message: `From: ${contactName} <${contactEmail}>\nSubject: ${contactSubject}\n\n${contactMessage}`,
                },
                publicKey
            );

            setSendSuccess(true);
            setContactName('');
            setContactEmail('');
            setContactSubject('');
            setContactMessage('');
        } catch (error) {
            setSendError(`Pesan gagal dikirim: ${error?.text || error?.message || 'unknown error'}`);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="portfolio-bg min-h-screen text-stone-900">
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="bg-orb bg-orb-one" />
                <div className="bg-orb bg-orb-two" />
                <div className="bg-orb bg-orb-three" />
            </div>

            <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-4 sm:px-6 lg:px-8 lg:pt-8">
                <header className="soft-panel sticky top-4 z-40 mb-6 rounded-[28px] px-5 py-4 sm:px-7">
                    <div className="flex items-center justify-between gap-4">
                        <button
                            type="button"
                            onClick={() => scrollToSection('home')}
                            className="flex items-center gap-3 text-left"
                        >
                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d96f57] text-sm font-bold text-white">
                                F
                            </span>
                            <div>
                                <div className="text-sm font-semibold tracking-[0.18em] text-stone-500 uppercase">
                                    Portfolio
                                </div>
                                <div className="text-base font-semibold text-stone-900">Fadhlul Wafi</div>
                            </div>
                        </button>

                        <nav className="hidden items-center gap-7 text-sm font-medium text-stone-600 lg:flex">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => scrollToSection(item.id)}
                                    className="transition hover:text-stone-950"
                                >
                                    {item.label}
                                </button>
                            ))}
                        </nav>

                        <div className="hidden lg:block">
                            <button
                                type="button"
                                onClick={() => scrollToSection('contact')}
                                className="rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-700"
                            >
                                Hubungi Saya
                            </button>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsMenuOpen((prev) => !prev)}
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white/80 text-stone-800 lg:hidden"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>

                    {isMenuOpen && (
                        <div className="mt-4 grid gap-2 rounded-[24px] border border-stone-200/80 bg-white/90 p-3 lg:hidden">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => scrollToSection(item.id)}
                                    className="rounded-2xl px-4 py-3 text-left text-sm font-medium text-stone-700 transition hover:bg-stone-100 hover:text-stone-950"
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    )}
                </header>

                <main className="space-y-8">
                    <section id="home" className="soft-panel relative overflow-hidden rounded-[36px] px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
                        <div className="absolute inset-0 opacity-80">
                            <div className="hero-mesh h-full w-full" />
                        </div>
                        <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                            <div className="max-w-2xl">
                                <p className="section-kicker">Portofolio pribadi</p>
                                <h1 className="mt-4 max-w-xl font-display text-4xl leading-[1.05] text-stone-950 sm:text-5xl lg:text-6xl">
                                    Halo, saya Fadhlul Wafi.
                                </h1>
                                <p className="mt-5 max-w-xl text-base leading-8 text-stone-600 sm:text-lg">
                                    Saya adalah Software Developer yang berfokus pada pengembangan aplikasi web modern, responsif, dan berorientasi pada pengalaman pengguna. Saya menikmati mengubah kebutuhan bisnis menjadi solusi digital yang efisien melalui kode yang bersih, arsitektur yang terstruktur, dan antarmuka yang intuitif. Dengan perhatian terhadap performa, skalabilitas, dan kualitas pengembangan, saya berkomitmen menciptakan aplikasi yang tidak hanya berfungsi dengan baik, tetapi juga memberikan nilai nyata bagi pengguna.

                                </p>

                                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                    <a
                                        href={cvFile}
                                        download
                                        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d96f57] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#c25e47]"
                                    >
                                        <Download size={18} />
                                        Download CV
                                    </a>
                                    <button
                                        type="button"
                                        onClick={() => scrollToSection('projects')}
                                        className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 bg-white/80 px-6 py-3.5 text-sm font-semibold text-stone-900 transition hover:border-stone-400 hover:bg-white"
                                    >
                                        Lihat Proyek
                                        <ChevronRight size={18} />
                                    </button>
                                </div>

                                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                                    {stats.map((item) => (
                                        <div key={item.label} className="rounded-[24px] border border-white/70 bg-white/70 px-5 py-4 shadow-[0_18px_35px_rgba(28,25,23,0.06)] backdrop-blur">
                                            <div className="text-2xl font-semibold text-stone-950">{item.value}</div>
                                            <div className="mt-1 text-sm text-stone-500">{item.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid gap-4">
                                <div className="photo-frame mx-auto w-full max-w-[430px] rounded-[34px] p-4">
                                    <div className="mx-auto w-[236px] sm:w-full md:w-full [281px]">
                                        <div className="aspect-[9/16] rounded-[28px]">
                                            <img
                                                src={profilepicture}
                                                alt="Fadhlul Wafi"
                                                className="h-full w-full object-contain object-bottom rounded-[28px]"
                                            />
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </section>

                    <section id="about" className="soft-panel rounded-[36px] px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
                        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-10">
                            <div className="h-full rounded-[30px] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(255,255,255,0.95))] p-5 shadow-[0_20px_50px_rgba(28,25,23,0.08)]">
                                <div className="mx-auto w-[236px] sm:w-[281px]">
                                    <div className="aspect-[9/16] overflow-hidden rounded-[24px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.96),rgba(255,255,255,0.95))]">
                                        <img
                                            src={profileImage}
                                            alt="Profile of Fadhlul Wafi"
                                            className="h-full w-full object-contain object-bottom"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4 grid grid-cols-2 gap-3">
                                    <a
                                        href={cvFile}
                                        download
                                        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-stone-200 bg-[#d96f57] px-4 py-3 text-sm font-medium text-white transition hover:text-stone-950"
                                    >
                                        <Download size={17} />
                                        Download CV
                                    </a>
                                    <button
                                        type="button"
                                        onClick={() => scrollToSection('contact')}
                                        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-stone-200 bg-[#d96f57] px-4 py-3 text-sm font-medium text-white transition hover:text-stone-950"
                                    >
                                        <Mail size={17} />
                                        Hubungi Saya
                                    </button>
                                </div>
                            </div>

                            <div>
                                <p className="section-kicker">Tentang saya</p>
                                <h2 className="mt-4 font-display text-3xl leading-tight text-stone-950 sm:text-4xl">
                                </h2>
                                <p className="mt-5 text-base leading-8 text-stone-600">
                                    Sebagai mahasiswa Informatika, saya banyak bekerja pada project akademik dan
                                    pengembangan mandiri yang menuntut ketelitian antarmuka serta struktur fitur yang
                                    mudah dipahami. Saya menikmati proses mengubah layout yang terasa ramai menjadi
                                    pengalaman yang lebih bersih dan terarah.
                                </p>
                                <p className="mt-4 text-base leading-8 text-stone-600">
                                    Pendekatan saya sederhana: visual harus nyaman dilihat, konten harus mudah
                                    dipindai, dan setiap section harus punya ritme yang jelas. Karena itu halaman ini
                                    saya susun ulang dengan card yang stabil, grid foto yang menyatu dengan layout,
                                    dan komposisi yang lebih modern.
                                </p>



                            </div>
                        </div>
                    </section>

                    <section id="process" className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
                        <div className="soft-panel h-full rounded-[36px] px-6 py-8 sm:px-8 sm:py-10">
                            <p className="section-kicker">Proses kerja</p>
                            <h2 className="mt-4 font-display text-3xl leading-tight text-stone-950 sm:text-4xl">

                            </h2>
                            <p className="mt-5 text-base leading-8 text-stone-600">
                            </p>

                            <div className="mt-8 grid gap-4">
                                {services.map((service) => {
                                    const Icon = service.icon;

                                    return (
                                        <div key={service.title} className="h-full rounded-[24px] border border-stone-200/80 bg-white/70 p-5">
                                            <div className="flex items-center gap-3">
                                                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f7e7e2] text-[#d96f57]">
                                                    <Icon size={20} />
                                                </span>
                                                <h3 className="text-lg font-semibold text-stone-900">{service.title}</h3>
                                            </div>
                                            <p className="mt-3 text-sm leading-7 text-stone-600">{service.description}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="soft-panel h-full rounded-[36px] px-6 py-8 sm:px-8 sm:py-10">
                            <div className="grid gap-4 sm:grid-cols-2">
                                {processSteps.map((item) => (
                                    <div key={item.step} className="h-full rounded-[28px] border border-stone-200/80 bg-white/80 p-6">
                                        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d96f57]">
                                            {item.step}
                                        </div>
                                        <h3 className="mt-4 text-xl font-semibold text-stone-900">{item.title}</h3>
                                        <p className="mt-3 text-sm leading-7 text-stone-600">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
                        <div className="soft-panel h-full rounded-[36px] px-6 py-8 sm:px-8 sm:py-10">
                            <p className="section-kicker">Keahlian</p>
                            <h2 className="mt-4 font-display text-3xl leading-tight text-stone-950 sm:text-4xl">

                            </h2>
                            <div className="mt-8 grid gap-4 grid-cols-2 sm:grid-cols-3 xl:grid-cols-4">
                                {toolLogos.map((tool) => (
                                    <div key={tool.name} className="rounded-[28px] border border-stone-200/80 bg-white/80 p-5 text-center shadow-sm transition hover:-translate-y-1 hover:border-[#d96f57]">
                                        <div className="mx-auto flex h-18 w-18 items-center justify-center rounded-full bg-[#f7e7e2] p-4">
                                            <img src={tool.icon} alt={tool.name} className="h-12 w-auto" />
                                        </div>
                                        <div className="mt-4 text-sm font-semibold text-stone-900">{tool.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="soft-panel h-full rounded-[36px] px-6 py-8 sm:px-8 sm:py-10">
                            <p className="section-kicker">Pengalaman</p>
                            <h2 className="mt-4 font-display text-3xl leading-tight text-stone-950 sm:text-4xl">
                            </h2>
                            <div className="mt-8 space-y-4">
                                {experience.map((item) => (
                                    <div key={item.title} className="rounded-[26px] border border-stone-200/80 bg-white/75 p-5">
                                        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d96f57]">
                                            {item.period}
                                        </div>
                                        <h3 className="mt-3 text-xl font-semibold text-stone-900">{item.title}</h3>
                                        <p className="mt-3 text-sm leading-7 text-stone-600">{item.detail}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section id="projects" className="soft-panel rounded-[36px] px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                            <div className="max-w-2xl">
                                <p className="section-kicker">Proyek pilihan</p>
                                <h2 className="mt-4 font-display text-3xl leading-tight text-stone-950 sm:text-4xl">

                                </h2>
                                <p className="mt-4 text-base leading-8 text-stone-600">
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {projectFilters.map((filter) => (
                                    <button
                                        key={filter}
                                        type="button"
                                        onClick={() => setActiveFilter(filter)}
                                        className={`rounded-full px-4 py-2.5 text-sm font-semibold transition ${activeFilter === filter
                                            ? 'bg-stone-900 text-white'
                                            : 'border border-stone-200 bg-white/75 text-stone-600 hover:text-stone-900'
                                            }`}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 grid items-stretch gap-5 lg:grid-cols-3">
                            {filteredProjects.map((project, index) => (
                                <article
                                    key={project.id}
                                    className={`rounded-[30px] border border-stone-200/80 bg-white/82 p-5 shadow-[0_22px_40px_rgba(28,25,23,0.06)] ${index === 0 && filteredProjects.length > 1 ? 'lg:col-span-2 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:gap-6' : 'flex h-full flex-col'
                                        }`}
                                >
                                    <div
                                        className={`project-visual flex items-center justify-center rounded-[24px] p-6 sm:p-8 ${index === 0 && filteredProjects.length > 1 ? 'min-h-[280px] lg:min-h-[360px]' : 'min-h-[250px]'
                                            }`}
                                    >
                                        <div className={`project-logo-frame ${project.frameClass || ''}`}>
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className={`project-logo-image ${project.imageClass || ''}`}
                                            />
                                        </div>
                                    </div>

                                    <div className={index === 0 && filteredProjects.length > 1 ? 'mt-5 lg:mt-0 lg:flex lg:flex-col lg:justify-center' : 'mt-5'}>
                                        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d96f57]">
                                            {project.category}
                                        </div>
                                        <h3 className="mt-3 text-2xl font-semibold text-stone-950">{project.title}</h3>
                                        <p className="mt-3 text-sm leading-7 text-stone-600">{project.description}</p>
                                        <p className="mt-3 text-sm leading-7 text-stone-500">{project.longDescription}</p>

                                        <div className="mt-5 flex flex-wrap gap-2">
                                            {project.tech.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="rounded-full border border-stone-200 bg-stone-50 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-stone-500"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="mt-6 flex flex-wrap gap-3">
                                            {project.liveUrl ? (
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center gap-2 rounded-full bg-[#d96f57] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#c25e47]"
                                                >
                                                    Kunjungi proyek
                                                    <ExternalLink size={16} />
                                                </a>
                                            ) : (
                                                <span className="inline-flex items-center rounded-full border border-stone-200 bg-stone-50 px-5 py-3 text-sm font-medium text-stone-500">
                                                    Proyek privat / konsep
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section className="soft-panel rounded-[36px] px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
                        <div className="max-w-2xl">
                            <p className="section-kicker">Sertifikat</p>
                            <h2 className="mt-4 font-display text-3xl leading-tight text-stone-950 sm:text-4xl">
                            </h2>
                        </div>

                        <div className="mt-8 grid items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {certificates.map((certificate) => (
                                <button
                                    key={certificate.id}
                                    type="button"
                                    onClick={() => setSelectedCertificate(certificate)}
                                    className="h-full text-left transition hover:-translate-y-1"
                                >
                                    <div className="flex h-full flex-col overflow-hidden rounded-[26px] border border-stone-200/80 bg-white/80 p-3 shadow-[0_16px_35px_rgba(28,25,23,0.05)]">
                                        <div className="overflow-hidden rounded-[20px] bg-stone-100">
                                            <img
                                                src={certificate.image}
                                                alt={certificate.title}
                                                className="h-44 w-full object-cover object-top"
                                            />
                                        </div>
                                        <div className="flex-1 px-1 pb-1 pt-4">
                                            <div className="text-sm font-semibold text-stone-900">{certificate.title}</div>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </section>

                    <section id="contact" className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
                        <div className="soft-panel h-full rounded-[36px] px-6 py-8 sm:px-8 sm:py-10">
                            <p className="section-kicker">Kontak</p>
                            <h2 className="mt-4 font-display text-3xl leading-tight text-stone-950 sm:text-4xl">
                            </h2>
                            <p className="mt-5 text-base leading-8 text-stone-600">
                                Pilih salah satu aplikasi di bawah untuk terhubung langsung.
                            </p>

                            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                                {contactLinks.map((contact) => {
                                    const Icon = contact.icon;

                                    return (
                                        <a
                                            key={contact.label}
                                            href={contact.href}
                                            onClick={(event) => {
                                                if (contact.label === 'Email') {
                                                    event.preventDefault();
                                                    const emailInput = document.getElementById('contact-email');
                                                    emailInput?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                                    emailInput?.focus();
                                                }
                                            }}
                                            className="contact-link-badge group relative flex flex-col items-center justify-center gap-2 rounded-[24px] border border-stone-200/60 bg-white/70 p-4 text-center transition hover:-translate-y-1 hover:border-stone-300/80"
                                        >
                                            <div className={`${contact.bg} flex h-14 w-14 items-center justify-center rounded-2xl`}>
                                                <Icon size={24} className={`${contact.textColor}`} />
                                            </div>
                                            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-600">
                                                {contact.label}
                                            </div>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="soft-panel h-full rounded-[36px] px-6 py-8 sm:px-8 sm:py-10">
                            <form onSubmit={handleSendMessage} className="grid h-full content-start gap-4">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <label className="grid gap-2 text-sm font-medium text-stone-700">
                                        Nama
                                        <input
                                            type="text"
                                            value={contactName}
                                            onChange={(event) => setContactName(event.target.value)}
                                            className="rounded-2xl border border-stone-200 bg-white px-4 py-3.5 text-sm text-stone-900 outline-none transition focus:border-stone-400"
                                            placeholder="Nama Anda"
                                        />
                                    </label>
                                    <label className="grid gap-2 text-sm font-medium text-stone-700">
                                        Email
                                        <input
                                            id="contact-email"
                                            type="email"
                                            value={contactEmail}
                                            onChange={(event) => setContactEmail(event.target.value)}
                                            className="rounded-2xl border border-stone-200 bg-white px-4 py-3.5 text-sm text-stone-900 outline-none transition focus:border-stone-400"
                                            placeholder="name@email.com"
                                        />
                                    </label>
                                </div>

                                <label className="grid gap-2 text-sm font-medium text-stone-700">
                                    Subjek
                                    <input
                                        type="text"
                                        value={contactSubject}
                                        onChange={(event) => setContactSubject(event.target.value)}
                                        className="rounded-2xl border border-stone-200 bg-white px-4 py-3.5 text-sm text-stone-900 outline-none transition focus:border-stone-400"
                                        placeholder="Diskusi project"
                                    />
                                </label>

                                <label className="grid gap-2 text-sm font-medium text-stone-700">
                                    Pesan
                                    <textarea
                                        value={contactMessage}
                                        onChange={(event) => setContactMessage(event.target.value)}
                                        rows={6}
                                        className="rounded-3xl border border-stone-200 bg-white px-4 py-3.5 text-sm text-stone-900 outline-none transition focus:border-stone-400"
                                        placeholder="Ceritakan kebutuhan project atau bagian tampilan yang ingin dirapikan."
                                    />
                                </label>

                                {sendError ? <p className="text-sm font-medium text-rose-600">{sendError}</p> : null}
                                {sendSuccess ? <p className="text-sm font-medium text-emerald-600">Pesan berhasil dikirim.</p> : null}

                                <button
                                    type="submit"
                                    disabled={isSending}
                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-stone-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:bg-stone-400"
                                >
                                    {isSending ? 'Mengirim...' : 'Kirim Pesan'}
                                    <ChevronRight size={18} />
                                </button>
                            </form>
                        </div>
                    </section>
                </main>

                <footer className="px-2 pb-2 pt-8 text-center text-sm text-stone-500">
                    Dirancang oleh Fadhlul Wafi.
                </footer>
            </div>

            {selectedCertificate && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(17,24,39,0.72)] p-4 backdrop-blur-sm"
                    onClick={() => setSelectedCertificate(null)}
                >
                    <div
                        className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-[32px] border border-white/20 bg-white p-4 shadow-2xl"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="mb-3 flex items-center justify-between gap-4 px-2 pt-1">
                            <div>
                                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">Sertifikat</div>
                                <div className="mt-1 text-lg font-semibold text-stone-950">{selectedCertificate.title}</div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelectedCertificate(null)}
                                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 text-stone-700 transition hover:bg-stone-100"
                                aria-label="Tutup modal sertifikat"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="overflow-hidden rounded-[24px] bg-stone-100">
                            <img
                                src={selectedCertificate.image}
                                alt={selectedCertificate.title}
                                className="max-h-[75vh] w-full object-contain"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Portfolio;
