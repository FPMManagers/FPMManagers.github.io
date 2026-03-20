/**
 * FPMCAE Website Main JavaScript
 * Features: Language Switching, News Module, Examples Library, Scroll Effects
 */

// ============================================
// Global Variables
// ============================================
let currentLang = localStorage.getItem('fpmcae-lang') || 'zh';
let currentSlide = 0;
let carouselInterval;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');

// ============================================
// Language Data
// ============================================
const translations = {
    zh: {
        // Navigation
        download: '下载',
        docs: '文档',
        current_lang: '中文',
        user_manual: '使用文档',
        quick_start: '快速上手',
        fpmt_format: 'FPMT文件格式',
        
        // Download Section
        download_title: 'FPMCAE，面向工程结构的\n通用复杂行为分析平台',
        download_now: '立即下载',
        all_downloads: '所有下载',
        
        // Intro
        intro_title: '简介',
        intro_text: 'FPMCAE是由浙江大学罗尧治教授团队自主研发的通用结构复杂行为仿真分析软件。采用有限质点法作为核心算法，集成了前后处理功能和多种求解器引擎，并融入了并行计算技术。',
        
        // News
        news_title: '最近消息',
        view_more: '查看更多',
        
        // Examples
        examples_title: '算例库',
        filter_all: '全部',
        filter_structure: '结构分析',
        filter_multiScale: '多尺度分析',
        filter_formFinding: '找形分析',
        filter_earthquakeSimulation: '结构地震模拟',
        filter_nonlinear: '非线性分析',
        download_example: '下载算例',
        view_detail: '查看详情',
        file_size: '文件大小',
        update_time: '更新时间',
        downloads: '下载次数',
        
        // Video
        video_title: 'FPMCAE视频介绍',
        video_not_support: '您的浏览器不支持视频播放。',
        
        // Contact
        contact_title: '联系我们',
        email_label: '邮箱：',
        qq_label: 'QQ技术群：',
        qr_wechat: '扫码关注我们',
        qr_qq: '技术交流群',
        
        // Footer
        footer_desc: '浙江大学自主研发的通用结构复杂行为仿真分析软件',
        nav_intro: '简介',
        nav_examples: '算例库',
        nav_contact: '联系我们',
        copyright: '版权所有',
        footer_org: '浙江大学 · 浙江大学长三角智慧绿洲创新中心'
    },
    en: {
        // Navigation
        download: 'Download',
        docs: 'Documentation',
        current_lang: 'English',
        user_manual: 'User Manual',
        quick_start: 'Quick Start',
        fpmt_format: 'FPMT File Format',
        
        // Download Section
        download_title: 'FPMCAE, A General Complex Behavior\nAnalysis Platform for Engineering Structures',
        download_now: 'Download Now',
        all_downloads: 'All Downloads',
        
        // Intro
        intro_title: 'Introduction',
        intro_text: 'FPMCAE is a general-purpose structural complex behavior simulation analysis software independently developed by Professor Luo Yaozhi\'s team at Zhejiang University. It adopts the Finite Particle Method as the core algorithm, integrates pre- and post-processing functions and multiple solver engines, and incorporates parallel computing technology.',
        
        // News
        news_title: 'Latest News',
        view_more: 'View More',
        
        // Examples
        examples_title: 'Example Library',
        filter_all: 'All',
        filter_structure: 'Structural Analysis',
        filter_multiScale: 'Multi-scale Analysis',
        filter_formFinding: 'Form-finding Analysis',
        filter_earthquakeSimulation: 'Structural Earthquake Simulation',
        filter_nonlinear: 'Nonlinear Analysis',
        download_example: 'Download',
        view_detail: 'Details',
        file_size: 'File Size',
        update_time: 'Updated',
        downloads: 'Downloads',
        
        // Video
        video_title: 'FPMCAE Video Introduction',
        video_not_support: 'Your browser does not support video playback.',
        
        // Contact
        contact_title: 'Contact Us',
        email_label: 'Email: ',
        qq_label: 'QQ Group: ',
        qr_wechat: 'Follow Us',
        qr_qq: 'Tech Group',
        
        // Footer
        footer_desc: 'Structural Complex Behavior Simulation Software by Zhejiang University',
        nav_intro: 'Introduction',
        nav_examples: 'Examples',
        nav_contact: 'Contact',
        copyright: 'All Rights Reserved',
        footer_org: 'Zhejiang University · Yangtze River Delta Oasis Innovation Center'
    }
};

// ============================================
// Default Data (fallback when JSON files cannot be loaded)
// ============================================
const defaultNewsData = [
    {
        id: 1,
        title: "FPMCAE平台算例介绍 | 手把手教你索穹顶形态分析",
        titleEn: "Introduction to FPMCAE platform examples | Step-by-step guide to cable dome shape analysis",
        summary: "教大家使用FPMCAE V2.0平台进行的索穹顶张力结构初始形态（找形）分析。",
        summaryEn: "I will teach you how to use the FPMCAE V2.0 platform to perform initial form (form-finding) analysis of tension structures in cable domes.",
        date: "2026-03-12",
        icon: "fa-rocket",
        url: "https://mp.weixin.qq.com/s/h9xI38HX-PMlaGoqgwYBjg",
        featured: true
    },
    {
        id: 2,
        title: "有限质点法在大型空间结构分析中的应用研讨会",
        titleEn: "Seminar on FPM Applications in Large Space Structures",
        summary: "本次研讨会将深入探讨FPM在大跨度空间结构、可展结构等领域的最新研究成果与应用案例。",
        summaryEn: "This seminar will explore the latest research and applications of FPM in long-span and deployable structures.",
        date: "2024-02-20",
        icon: "fa-users",
        url: "https://mp.weixin.qq.com/s/example2",
        featured: false
    },
    {
        id: 3,
        title: "FPMCAE培训教程系列：从入门到精通",
        titleEn: "FPMCAE Training Series: From Beginner to Expert",
        summary: "我们推出了完整的视频教程系列，帮助用户快速掌握软件使用技巧，提升仿真分析能力。",
        summaryEn: "We've launched a complete video tutorial series to help users master the software quickly.",
        date: "2024-02-10",
        icon: "fa-graduation-cap",
        url: "https://mp.weixin.qq.com/s/example3",
        featured: true
    },
    {
        id: 4,
        title: "FPMCAE在航空航天领域的成功应用案例",
        titleEn: "Successful Aerospace Applications of FPMCAE",
        summary: "介绍FPMCAE在飞机起落架、卫星天线展开机构等航空航天领域的典型应用。",
        summaryEn: "Introducing typical applications of FPMCAE in aerospace fields including landing gears and deployable antennas.",
        date: "2024-01-25",
        icon: "fa-plane",
        url: "https://mp.weixin.qq.com/s/example4",
        featured: false
    },
    {
        id: 5,
        title: "新版本预告：并行计算性能提升300%",
        titleEn: "Preview: 300% Performance Boost in Parallel Computing",
        summary: "即将发布的版本将大幅提升并行计算效率，支持更大规模模型的快速求解。",
        summaryEn: "The upcoming version will significantly improve parallel computing efficiency for large-scale models.",
        date: "2024-01-15",
        icon: "fa-bolt",
        url: "https://mp.weixin.qq.com/s/example5",
        featured: true
    },
    {
        id: 6,
        title: "FPMCAE用户大会暨技术交流会顺利召开",
        titleEn: "FPMCAE User Conference Successfully Held",
        summary: "来自全国各地的用户齐聚一堂，分享使用经验，探讨技术发展趋势。",
        summaryEn: "Users from across the country gathered to share experiences and discuss technology trends.",
        date: "2024-01-05",
        icon: "fa-handshake",
        url: "https://mp.weixin.qq.com/s/example6",
        featured: false
    }
];

const defaultExamplesData = [
    {
        id: 1,
        title: "悬臂梁静力分析",
        titleEn: "Cantilever Beam Static Analysis",
        category: "structure",
        desc: "经典悬臂梁结构在端部载荷作用下的静力变形分析，验证软件基本计算精度。",
        descEn: "Static deformation analysis of a classical cantilever beam under end load, verifying basic calculation accuracy.",
        fileSize: "2.5 MB",
        updateTime: "2024-03-01",
        downloads: 1256,
        fileUrl: "examples/docs/cantilever_beam.zip"
    },
    {
        id: 2,
        title: "简支梁动力响应分析",
        titleEn: "Simply Supported Beam Dynamic Response",
        category: "dynamic",
        desc: "简支梁在移动载荷作用下的动力响应分析，展示软件的动力学求解能力。",
        descEn: "Dynamic response analysis of simply supported beam under moving load, demonstrating dynamic solving capability.",
        fileSize: "3.2 MB",
        updateTime: "2024-02-28",
        downloads: 982,
        fileUrl: "examples/docs/simply_supported_beam.zip"
    },
    {
        id: 3,
        title: "大变形柔性杆件分析",
        titleEn: "Large Deformation Flexible Rod Analysis",
        category: "nonlinear",
        desc: "考虑几何非线性的大变形柔性杆件分析，展示软件处理大变形问题的能力。",
        descEn: "Large deformation flexible rod analysis with geometric nonlinearity, demonstrating large deformation handling.",
        fileSize: "4.1 MB",
        updateTime: "2024-02-25",
        downloads: 867,
        fileUrl: "examples/docs/flexible_rod.zip"
    },
    {
        id: 4,
        title: "桁架结构屈曲分析",
        titleEn: "Truss Structure Buckling Analysis",
        category: "structure",
        desc: "平面桁架结构的线性屈曲分析，计算临界屈曲载荷和屈曲模态。",
        descEn: "Linear buckling analysis of plane truss structure, calculating critical buckling load and modes.",
        fileSize: "2.8 MB",
        updateTime: "2024-02-20",
        downloads: 745,
        fileUrl: "examples/docs/truss_buckling.zip"
    },
    {
        id: 5,
        title: "地震作用下框架结构响应",
        titleEn: "Frame Structure Response Under Earthquake",
        category: "dynamic",
        desc: "多层框架结构在地震波作用下的时程响应分析，包含材料非线性效应。",
        descEn: "Time history response analysis of multi-story frame under seismic waves, including material nonlinearity.",
        fileSize: "5.5 MB",
        updateTime: "2024-02-15",
        downloads: 1123,
        fileUrl: "examples/docs/seismic_frame.zip"
    },
    {
        id: 6,
        title: "接触碰撞问题分析",
        titleEn: "Contact and Impact Analysis",
        category: "nonlinear",
        desc: "两个弹性体碰撞过程的数值模拟，展示软件处理接触问题的能力。",
        descEn: "Numerical simulation of two elastic bodies collision, demonstrating contact problem handling.",
        fileSize: "3.8 MB",
        updateTime: "2024-02-10",
        downloads: 634,
        fileUrl: "examples/docs/contact_impact.zip"
    }
];

// ============================================
// News Data
// ============================================
let newsData = [];

// ============================================
// Examples Data
// ============================================
let examplesData = [];

// ============================================
// Data Loading Functions
// ============================================
async function loadNewsData() {
    try {
        const response = await fetch('data/news.json');
        if (!response.ok) {
            throw new Error('Failed to load news data');
        }
        newsData = await response.json();
    } catch (error) {
        console.warn('Could not load news.json, using default data. Error:', error.message);
        newsData = [...defaultNewsData];
    }
}

async function loadExamplesData() {
    try {
        const response = await fetch('data/examples.json');
        if (!response.ok) {
            throw new Error('Failed to load examples data');
        }
        examplesData = await response.json();
    } catch (error) {
        console.warn('Could not load examples.json, using default data. Error:', error.message);
        examplesData = [...defaultExamplesData];
    }
}

// ============================================
// Initialization
// ============================================
document.addEventListener('DOMContentLoaded', async function() {
    initCarousel();
    initScrollEffects();
    initBackToTop();
    initHeaderScroll();
    initExamplesFilter();
    
    // Load data from JSON files
    await loadNewsData();
    await loadExamplesData();
    
    // Set initial language
    setLanguage(currentLang, false);
    
    // Render initial content
    renderNews();
    renderExamples('all');
});

// ============================================
// Carousel Functions
// ============================================
function initCarousel() {
    if (slides.length <= 1) return;
    startCarousel();
    
    // Pause on hover
    const container = document.querySelector('.carousel-container');
    container.addEventListener('mouseenter', stopCarousel);
    container.addEventListener('mouseleave', startCarousel);
}

function startCarousel() {
    stopCarousel();
    carouselInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

function stopCarousel() {
    clearInterval(carouselInterval);
}

function changeSlide(direction) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = index;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// ============================================
// Language Switching
// ============================================
function setLanguage(lang, save = true) {
    currentLang = lang;
    
    if (save) {
        localStorage.setItem('fpmcae-lang', lang);
    }
    
    const t = translations[lang];
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = t[key];
            } else {
                el.textContent = t[key];
            }
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    
    // Re-render dynamic content
    renderNews();
    renderExamples(document.querySelector('.filter-btn.active')?.dataset.filter || 'all');
}

// ============================================
// News Module
// ============================================
function renderNews() {
    const container = document.getElementById('news-grid');
    if (!container) return;
    
    container.innerHTML = newsData.map(news => {
        const title = currentLang === 'zh' ? news.title : (news.titleEn || news.title);
        const summary = currentLang === 'zh' ? news.summary : (news.summaryEn || news.summary);
        return `
        <div class="news-card" onclick="openNews('${news.url}')">
            <div class="news-image">
                <img src="${news.icon}" alt="${title}" class="news-img">
            </div>
            <div class="news-content">
                <span class="news-date">${news.date}</span>
                <h3 class="news-title">${title}</h3>
                <p class="news-summary">${summary}</p>
            </div>
        </div>
    `}).join('');
}

function openNews(url) {
    window.open(url, '_blank');
}

// ============================================
// Examples Module
// ============================================
function renderExamples(filter) {
    const container = document.getElementById('examples-grid');
    if (!container) return;
    
    const filtered = filter === 'all' 
        ? examplesData 
        : examplesData.filter(ex => ex.category === filter);
    
    const t = translations[currentLang];
    
    container.innerHTML = filtered.map(ex => `
        <div class="example-card" data-category="${ex.category}">
            <div class="example-image">
                <img src="${ex.previewImage || 'images/banner/banner1.png'}" alt="${currentLang === 'zh' ? ex.title : ex.titleEn}" class="example-img">
            </div>
            <div class="example-header">
                <span class="example-category">${getCategoryName(ex.category)}</span>
                <h3 class="example-title">${currentLang === 'zh' ? ex.title : ex.titleEn}</h3>
            </div>
            <div class="example-body">
                <div class="example-meta">
                    <div class="meta-left">
                        <span><i class="fas fa-file-archive"></i> ${ex.fileSize}</span>
                        <span><i class="fas fa-calendar"></i> ${ex.updateTime}</span>
                    </div>
                    <button class="btn-download-meta" onclick="downloadExample('${ex.fileUrl}', ${ex.id})" title="${t.download_example}">
                        <i class="fas fa-download"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function getCategoryName(category) {
    const t = translations[currentLang];
    const map = {
        'structure': t.filter_structure,
        'multi-scale': t.filter_multiScale,
        'form-finding': t.filter_formFinding,
        'earthquake-simulation': t.filter_earthquakeSimulation,
        'nonlinear': t.filter_nonlinear
    };
    return map[category] || category;
}

function initExamplesFilter() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            buttons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderExamples(this.dataset.filter);
        });
    });
}

function viewExampleDetail(id) {
    const example = examplesData.find(ex => ex.id === id);
    if (example) {
        const t = translations[currentLang];
        const title = currentLang === 'zh' ? example.title : example.titleEn;
        alert(`${title}\n\n${t.file_size}: ${example.fileSize}\n${t.update_time}: ${example.updateTime}\n${t.downloads}: ${example.downloads}`);
    }
}

function downloadExample(url, id) {
    // Update download count
    const example = examplesData.find(ex => ex.id === id);
    if (example) {
        example.downloads++;
        renderExamples(document.querySelector('.filter-btn.active')?.dataset.filter || 'all');
    }
    
    // Trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ============================================
// Video Player
// ============================================
function playVideo() {
    const video = document.getElementById('main-video');
    const overlay = document.getElementById('video-overlay');
    
    if (video && overlay) {
        overlay.classList.add('hidden');
        video.play();
    }
}

// ============================================
// Scroll Effects
// ============================================
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('scroll-animate');
        observer.observe(section);
    });
}

// ============================================
// Back to Top Button
// ============================================
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 滚动到页面底部的函数
function scrollToBottom() {
    window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'  // 平滑滚动
    });
}

// ============================================
// Header Scroll Effect
// ============================================
function initHeaderScroll() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 70;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ============================================
// Utility Functions
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Preload images for better performance
function preloadImages() {
    const images = [
        'images/banner/banner1.png'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Call preload on load
window.addEventListener('load', preloadImages);
