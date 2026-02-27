/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    ExternalLink,
    Briefcase,
    Layout,
    Smartphone,
    Mail,
    ChevronRight,
    Menu,
    X,
    Award,
    Database,
    Layers,
    MessageSquare,
    User
} from 'lucide-react';

// Types
interface Project {
    id: number;
    title: string;
    category: string;
    description: string;
    role: string;
    contribution: string;
    scope: string[];
    image: string;
    tag?: string;
    details?: string[];
}

const PROJECTS: Project[] = [
    {
        id: 1,
        title: "KB손해보험 앱 운영",
        category: "App Design",
        description: "KB손해보험 앱의 전반적인 운영 및 UI 디자인 고도화",
        role: "Designer",
        contribution: "100%",
        scope: ["콘텐츠 운영", "UI개선/고도화", "앱/PC"],
        image: "/images/KB손해보험.png",
        tag: "PA",
        details: ["APP/PC 대응", "사용자 경험 중심의 마이데이터 화면 설계", "브랜드 아이덴티티를 유지하는 프로모션 배너 제작"]
    },
    {
        id: 2,
        title: "롯데백화점 앱 운영",
        category: "App Design",
        description: "롯데백화점 앱 콘텐츠 디자인 및 프로젝트 리딩",
        role: "Project Leader",
        contribution: "100%",
        scope: ["콘텐츠 운영", "UI개선", "앱"],
        image: "/images/롯데백화점.png",
        tag: "PL",
        details: ["디자인 퀄리티 검수 및 품질관리", "작업 일정 및 인력관리"]
    },
    {
        id: 4,
        title: "LG전자 홈페이지 운영",
        category: "Web Design",
        description: "LG전자 공식 홈페이지 운영 및 상세페이지 디자인",
        role: "PA",
        contribution: "100%",
        scope: ["상세스펙", "이벤트", "PC/모바일/오픈마켓"],
        image: "/images/LG전자.png",
        tag: "PA",
        details: ["PC/MOBILE 통합 대응", "제품 라인업별 통일된 디자인 시스템 적용"]
    },
    {
        id: 5,
        title: "롯데카드 운영 프로젝트",
        category: "Web Design",
        description: "롯데카드 웹/앱 운영 및 프로모션 디자인",
        role: "PA",
        contribution: "100%",
        scope: ["이벤트", "메인피드 배너", "팝업 디자인"],
        image: "/images/롯데카드.png",
        tag: "PA",
        details: ["금융 서비스 특성에 맞는 신뢰감 있는 비주얼 제안", "다양한 외부채널 프로모션 대응"]
    },
    {
        id: 3,
        title: "삼성닷컴 홈페이지 운영",
        category: "Web Design",
        description: "삼성닷컴 공식 홈페이지 운영 및 프로젝트 리딩",
        role: "PA/PL",
        contribution: "100%",
        scope: ["상세스펙", "PC/MOBILE/오픈마켓"],
        image: "/images/삼성전자.png",
        tag: "PL",
        details: ["디자인 퀄리티 검수 및 품질 관리", "제품의 특장점을 효과적으로 전달하는 인포그래픽 활용", "고감도의 인테리어 연출 이미지 제작"]
    },
    {
        id: 6,
        title: "신한투자증권 운영",
        category: "Web/UI Design",
        description: "신한투자증권 이벤트 프로모션 디자인 및 UI 개선",
        role: "PA",
        contribution: "100%",
        scope: ["이벤트 프로모션", "UI 디자인"],
        image: "/images/신한금투.png",
        tag: "PA",
        details: ["금융 서비스의 신뢰감을 주는 컬러 시스템 적용", "사용자 참여 유도를 위한 다양한 마케팅 이벤트 및 프로모션 디자인"]
    },
    {
        id: 7,
        title: "마춤카 리뉴얼 프로젝트",
        category: "Web Design",
        description: "자동차 관련 서비스 마춤카의 전면 리뉴얼 디자인",
        role: "PA",
        contribution: "60%",
        scope: ["PC/MOBILE", "UI/UX 리뉴얼"],
        image: "/images/마춤카.png",
        tag: "PA",
        details: ["직관적인 차량 검색 필터 UI 설계", "브랜드 리포지셔닝에 따른 비주얼 아이덴티티 강화"]
    },
    {
        id: 8,
        title: "골프 앱 그린뷰 구축",
        category: "App Design",
        description: "골프 앱 내 그린뷰 기능 구축 및 UI 디자인",
        role: "PA",
        contribution: "70%",
        scope: ["APP", "기능 구축 UI"],
        image: "/images/그린뷰.png",
        tag: "PA",
        details: ["필드 상황을 실시간으로 반영하는 시각화 UI", "야외 사용 환경을 고려한 고대비 컬러 스킴 적용"]
    },
    {
        id: 9,
        title: "파르나스 호텔 CRM 구축",
        category: "System Design",
        description: "호텔 고객 관리 시스템(CRM) UI/UX 구축",
        role: "PA",
        contribution: "50%",
        scope: ["PC", "Admin UI"],
        image: "/images/파르나스.png",
        tag: "PA",
        details: ["데이터 시각화를 통한 관리 효율성 증대", "복잡한 예약 시스템의 워크플로우 간소화"]
    },
    {
        id: 10,
        title: "서울디자인재단/DDP 운영",
        category: "Web Design",
        description: "DDP 공식 웹사이트 운영 및 기능 개발 화면 디자인",
        role: "PA",
        contribution: "100%",
        scope: ["기능개발 화면 디자인", "PC/MOBILE"],
        image: "/images/ddp.png",
        tag: "PA",
        details: ["공공기관 웹사이트의 접근성 준수", "서울디자인재단/DDP의 특성에 맞는 콘텐츠 디자인"]
    },
    {
        id: 11,
        title: "재외동포재단 홈페이지 운영",
        category: "Web Design",
        description: "재외동포재단 공식 홈페이지 운영 및 UI 개선",
        role: "PA",
        contribution: "100%",
        scope: ["PC/MOBILE", "콘텐츠 디자인", "뉴스레터 디자인"],
        image: "/images/재외동포재단.png",
        tag: "PA",
        details: ["한상넷/재외동포재단 특성에 맞는 콘텐츠 디자인", "공공기관 웹 접근성 및 표준 준수"]
    },
    {
        id: 12,
        title: "기타 상세페이지",
        category: "Web Design",
        description: "다양한 브랜드 및 제품의 프로모션 상세페이지 디자인",
        role: "Designer",
        contribution: "100%",
        scope: ["상세페이지", "이벤트", "배너"],
        image: "/images/상세페이지.png",
        tag: "Designer",
        details: ["제품 특성에 맞춘 맞춤형 레이아웃 설계", "가독성 높은 타이포그래피 및 그래픽 요소 활용"]
    }
];

function FadeUp({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: 'easeOut', delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export default function App() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [activeTab, setActiveTab] = useState('All');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const categories = ['All', 'App Design', 'Web Design', 'System Design'];
    const filteredProjects = activeTab === 'All'
        ? PROJECTS
        : PROJECTS.filter(p => p.category === activeTab);

    // 모바일 메뉴 열릴 때 body 스크롤 방지
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [mobileMenuOpen]);

    return (
        <div className="min-h-screen bg-[#EEEEEE] text-[#333333] font-sans selection:bg-[#F47C27] selection:text-white">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-[#EEEEEE]/80 backdrop-blur-md border-b border-black/5">
                <div className="max-w-[1200px] mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
                    <div className="text-xl md:text-2xl font-bold tracking-tighter">
                        <span>PORTFOLIO</span>
                    </div>
                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#666666]">
                        <a href="#work" className="hover:text-[#F47C27] transition-colors">WORK</a>
                        <a href="#about" className="hover:text-[#F47C27] transition-colors">ABOUT</a>
                        <a href="#contact" className="hover:text-[#F47C27] transition-colors">CONTACT</a>
                    </div>
                    {/* Mobile Hamburger Button */}
                    <button
                        className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-black/5 transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="메뉴 열기"
                    >
                        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-[#EEEEEE]/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8 md:hidden"
                    >
                        {/* 닫기 버튼 */}
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="absolute top-5 right-4 w-10 h-10 flex items-center justify-center rounded-xl hover:bg-black/5 transition-colors"
                            aria-label="메뉴 닫기"
                        >
                            <X className="w-6 h-6 text-[#333333]" />
                        </button>

                        <a href="#work" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-[#333333] hover:text-[#F47C27] transition-colors">WORK</a>
                        <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-[#333333] hover:text-[#F47C27] transition-colors">ABOUT</a>
                        <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-[#333333] hover:text-[#F47C27] transition-colors">CONTACT</a>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="pt-16 md:pt-20">
                {/* Hero Section */}
                <section className="relative px-4 md:px-6 py-12 md:py-28 max-w-[1200px] mx-auto overflow-hidden">
                    {/* Interactive Background Elements */}
                    <div className="absolute inset-0 -z-10 overflow-hidden">
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 90, 0],
                                x: [0, 50, 0],
                                y: [0, -30, 0]
                            }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute top-[-10%] right-[-10%] w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-[#F47C27]/10 rounded-full blur-[120px]"
                        />
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                x: [0, -40, 0],
                                y: [0, 60, 0]
                            }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute bottom-[-10%] left-[-10%] w-[200px] h-[200px] md:w-[400px] md:h-[400px] bg-[#333333]/5 rounded-full blur-[100px]"
                        />
                        {/* Neon Lines */}
                        <div className="absolute top-1/4 right-1/4 w-px h-32 md:h-64 bg-gradient-to-b from-transparent via-[#F47C27]/40 to-transparent rotate-45 blur-[1px]" />
                        <div className="absolute bottom-1/4 left-1/3 w-px h-24 md:h-48 bg-gradient-to-b from-transparent via-[#F47C27]/20 to-transparent -rotate-12 blur-[1px]" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <h2 className="text-[#F47C27] font-mono text-xs md:text-sm tracking-widest uppercase mb-3 md:mb-4">Web & UI/UX Designer</h2>
                            <h1 className="text-2xl md:text-5xl font-extrabold tracking-tight leading-[1.4] mb-5 md:mb-8">
                                디자인을 통해 <br />
                                <span className="relative inline-block">
                                    디지털 가치
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ delay: 0.8, duration: 0.8 }}
                                        className="absolute -bottom-2 left-0 h-2 bg-[#F47C27]/20 rounded-full"
                                    />
                                </span>
                                를 실현합니다.
                            </h1>
                            <p className="text-base md:text-xl text-[#666666] leading-[1.6] mb-12 md:mb-10 max-w-xl">
                                금융, 커머스, 대기업 운영 프로젝트 등 다양한 도메인에서의 경험을 바탕으로
                                비즈니스 목표와 사용자 니즈를 잇는 최적의 솔루션을 제안합니다.
                            </p>

                            {/* Mobile Mockup - 텍스트와 버튼 사이 (모바일에서만 표시) */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    y: [0, -12, 0]
                                }}
                                transition={{
                                    duration: 0.8,
                                    ease: "easeOut",
                                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                                }}
                                className="lg:hidden flex justify-center mt-6 mb-12 max-h-[300px]"
                            >
                                <div className="relative perspective-1000">
                                    {/* Neon Glow */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[200px] bg-[#F47C27]/25 rounded-[30px] blur-[50px] -z-10" />

                                    {/* Phone Frame */}
                                    <div className="relative w-[140px] h-[260px] mx-auto bg-[#1a1a1a] rounded-[28px] p-2 shadow-2xl border-[4px] border-[#333333]">
                                        {/* Screen Content */}
                                        <div className="w-full h-full bg-white rounded-[22px] overflow-hidden relative">
                                            <div className="p-3 pt-6">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="w-6 h-6 bg-[#F47C27] rounded-md" />
                                                    <div className="flex gap-1">
                                                        <div className="w-1 h-1 rounded-full bg-[#ddd]" />
                                                        <div className="w-1 h-1 rounded-full bg-[#ddd]" />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="h-4 bg-[#EEEEEE] rounded-md w-3/4" />
                                                    <div className="h-2 bg-[#EEEEEE] rounded-md w-full" />
                                                    <div className="h-2 bg-[#EEEEEE] rounded-md w-5/6" />
                                                    <div className="grid grid-cols-2 gap-2 mt-4">
                                                        <motion.div
                                                            animate={{ y: [0, -8, 0] }}
                                                            transition={{ duration: 3, repeat: Infinity }}
                                                            className="aspect-square bg-[#F47C27]/5 rounded-xl border border-[#F47C27]/10 flex items-center justify-center"
                                                        >
                                                            <Layout className="w-5 h-5 text-[#F47C27]" />
                                                        </motion.div>
                                                        <motion.div
                                                            animate={{ y: [0, 8, 0] }}
                                                            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                                                            className="aspect-square bg-[#333333]/5 rounded-xl border border-black/5 flex items-center justify-center"
                                                        >
                                                            <Smartphone className="w-5 h-5 text-[#333333]" />
                                                        </motion.div>
                                                    </div>
                                                    <div className="h-14 bg-[#EEEEEE] rounded-lg w-full mt-2" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Notch */}
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-[#1a1a1a] rounded-b-lg" />
                                    </div>
                                </div>
                            </motion.div>

                            <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4">
                                <a
                                    href="#contact"
                                    className="bg-[#333333] text-white px-6 md:px-8 py-3 md:py-4 rounded-2xl font-bold text-sm md:text-base hover:bg-[#F47C27] hover:shadow-[0_0_20px_rgba(244,124,39,0.4)] transition-all flex items-center justify-center gap-2 group relative overflow-hidden"
                                >
                                    <span className="relative z-10">함께 일하기</span>
                                    <Mail className="w-5 h-5 group-hover:scale-110 transition-transform relative z-10" />
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-[#F47C27] to-[#ff9d5c] opacity-0 group-hover:opacity-100 transition-opacity"
                                        initial={false}
                                    />
                                </a>
                                <a
                                    href={`${import.meta.env.BASE_URL}resume.pdf`}
                                    download="김아현_이력서.pdf"
                                    className="bg-white text-[#333333] border border-black/10 px-6 md:px-8 py-3 md:py-4 rounded-2xl font-bold text-sm md:text-base hover:bg-[#F47C27] hover:text-white hover:border-transparent hover:shadow-[0_0_20px_rgba(244,124,39,0.4)] transition-all flex items-center justify-center gap-2 group"
                                >
                                    이력서 다운로드
                                    <Award className="w-5 h-5 text-[#F47C27] group-hover:text-white transition-colors" />
                                </a>
                            </div>
                        </motion.div>

                        {/* Mobile Mockup with Neon Effect */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                rotateY: 0,
                                y: [0, -20, 0]
                            }}
                            transition={{
                                duration: 1,
                                ease: "easeOut",
                                y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                            }}
                            className="relative perspective-1000 hidden lg:block"
                        >
                            {/* Neon Glow behind phone */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[400px] bg-[#F47C27]/30 rounded-[60px] blur-[80px] -z-10" />

                            {/* Phone Frame */}
                            <div className="relative w-[240px] h-[480px] mx-auto bg-[#1a1a1a] rounded-[50px] p-3 shadow-2xl border-[6px] border-[#333333]">
                                {/* Screen Content */}
                                <div className="w-full h-full bg-white rounded-[40px] overflow-hidden relative">
                                    {/* Dynamic UI Elements inside mockup */}
                                    <div className="p-6 pt-12">
                                        <div className="flex items-center justify-between mb-8">
                                            <div className="w-10 h-10 bg-[#F47C27] rounded-xl" />
                                            <div className="flex gap-1">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#ddd]" />
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#ddd]" />
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="h-8 bg-[#EEEEEE] rounded-lg w-3/4" />
                                            <div className="h-4 bg-[#EEEEEE] rounded-lg w-full" />
                                            <div className="h-4 bg-[#EEEEEE] rounded-lg w-5/6" />
                                            <div className="grid grid-cols-2 gap-4 mt-8">
                                                <motion.div
                                                    animate={{ y: [0, -10, 0] }}
                                                    transition={{ duration: 3, repeat: Infinity }}
                                                    className="aspect-square bg-[#F47C27]/5 rounded-2xl border border-[#F47C27]/10 flex items-center justify-center"
                                                >
                                                    <Layout className="w-8 h-8 text-[#F47C27]" />
                                                </motion.div>
                                                <motion.div
                                                    animate={{ y: [0, 10, 0] }}
                                                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                                                    className="aspect-square bg-[#333333]/5 rounded-2xl border border-black/5 flex items-center justify-center"
                                                >
                                                    <Smartphone className="w-8 h-8 text-[#333333]" />
                                                </motion.div>
                                            </div>
                                            <div className="h-32 bg-[#EEEEEE] rounded-2xl w-full mt-4" />
                                        </div>
                                    </div>
                                </div>

                                {/* Notch */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#1a1a1a] rounded-b-2xl" />
                            </div>
                        </motion.div>
                    </div>

                    {/* Scroll Indicator - 모바일에서 숨김 */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="absolute bottom-4 md:bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 hidden md:flex"
                    >
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Scroll down</span>
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-px h-12 bg-gradient-to-b from-[#F47C27] to-transparent"
                        />
                    </motion.div>
                </section>

                {/* Infographic Section */}
                <section className="px-4 md:px-6 py-12 md:py-20 bg-[#F47C27]/5 border-y border-[#F47C27]/10 overflow-hidden">
                    <div className="max-w-[1200px] mx-auto">
                        <FadeUp className="text-left md:text-center mb-6 md:mb-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F47C27]/10 text-[#F47C27] text-[10px] font-bold uppercase tracking-widest mb-4 md:mb-6">
                                Industry Awareness
                            </div>
                            <h2 className="text-2xl md:text-5xl font-bold mb-4 md:mb-6">시장을 읽는 디자이너</h2>
                            <p className="text-sm md:text-base text-[#666666] leading-relaxed max-w-2xl md:mx-auto">
                                단순히 시각적인 아름다움을 넘어, 비즈니스 가치를 창출하고
                                사용자와 기업 모두를 만족시키는 디자인 전략을 제안합니다.
                            </p>
                        </FadeUp>

                        {/* Desktop: 기존 원형 다이어그램 */}
                        <div className="relative h-[600px] hidden md:flex items-center justify-center">
                            {/* Central Hub in Background */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="relative w-96 h-96 flex items-center justify-center">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 border border-dashed border-[#F47C27]/20 rounded-full"
                                    />
                                    <div className="absolute inset-0 border border-dashed border-[#F47C27]/10 rounded-full scale-150" />
                                </div>
                            </div>

                            {/* Core Value Center */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="relative z-10 w-64 h-64 rounded-full bg-[#F47C27]/20 flex flex-col items-center justify-center text-center p-8 border border-[#F47C27]/10"
                            >
                                <p className="text-xs font-bold uppercase tracking-[0.5em] text-[#F47C27] mb-2">Core Value</p>
                                <h3 className="text-2xl font-black leading-tight">Business <br />Driven Design</h3>
                            </motion.div>

                            {/* Satellites */}
                            <div className="absolute inset-0">
                                {/* Top Left: Data */}
                                <motion.div
                                    initial={{ x: -100, y: -100, opacity: 0 }}
                                    whileInView={{ x: 0, y: 0, opacity: 1 }}
                                    className="absolute top-[15%] left-[20%]"
                                >
                                    <div className="w-44 h-44 rounded-full bg-[#F47C27]/5 border border-[#F47C27] flex flex-col items-center justify-center text-center p-4 scale-110 shadow-[0_0_20px_rgba(244,124,39,0.1)]">
                                        <Database className="w-5 h-5 text-[#F47C27] mb-2" />
                                        <h4 className="font-bold text-sm mb-1">Data Analysis</h4>
                                        <p className="text-[10px] text-[#666666]">사용자 지표 기반의 <br />객관적 디자인 의사결정</p>
                                    </div>
                                </motion.div>

                                {/* Top Right: System */}
                                <motion.div
                                    initial={{ x: 100, y: -100, opacity: 0 }}
                                    whileInView={{ x: 0, y: 0, opacity: 1 }}
                                    className="absolute top-[15%] right-[20%]"
                                >
                                    <div className="w-44 h-44 rounded-full bg-[#F47C27]/5 border border-[#F47C27] flex flex-col items-center justify-center text-center p-4 scale-110 shadow-[0_0_20px_rgba(244,124,39,0.1)]">
                                        <Layers className="w-5 h-5 text-[#F47C27] mb-2" />
                                        <h4 className="font-bold text-sm mb-1">Design System</h4>
                                        <p className="text-[10px] text-[#666666]">일관된 브랜드 경험을 위한 <br />확장 가능한 시스템 구축</p>
                                    </div>
                                </motion.div>

                                {/* Bottom Left: Strategy */}
                                <motion.div
                                    initial={{ x: -100, y: 100, opacity: 0 }}
                                    whileInView={{ x: 0, y: 0, opacity: 1 }}
                                    className="absolute bottom-[15%] left-[20%]"
                                >
                                    <div className="w-44 h-44 rounded-full bg-[#F47C27]/5 border border-[#F47C27] flex flex-col items-center justify-center text-center p-4 scale-110 shadow-[0_0_20px_rgba(244,124,39,0.1)]">
                                        <Briefcase className="w-5 h-5 text-[#F47C27] mb-2" />
                                        <h4 className="font-bold text-sm mb-1">Business Strategy</h4>
                                        <p className="text-[10px] text-[#666666]">기업의 목표와 사용자 니즈를 <br />연결하는 전략적 접근</p>
                                    </div>
                                </motion.div>

                                {/* Bottom Right: Communication */}
                                <motion.div
                                    initial={{ x: 100, y: 100, opacity: 0 }}
                                    whileInView={{ x: 0, y: 0, opacity: 1 }}
                                    className="absolute bottom-[15%] right-[20%]"
                                >
                                    <div className="w-44 h-44 rounded-full bg-[#F47C27]/5 border border-[#F47C27] flex flex-col items-center justify-center text-center p-4 scale-110 shadow-[0_0_20px_rgba(244,124,39,0.1)]">
                                        <MessageSquare className="w-5 h-5 text-[#F47C27] mb-2" />
                                        <h4 className="font-bold text-sm mb-1">Communication</h4>
                                        <p className="text-[10px] text-[#666666]">유관 부서와의 원활한 협업 및 <br />디자인 논리 전달</p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Mobile: Core Value 배경 + 카드 오버레이 */}
                        <div className="md:hidden relative py-4">
                            {/* 상단 2개 카드 */}
                            <div className="relative z-10 grid grid-cols-2 gap-x-4 p-2">
                                <motion.div
                                    initial={{ opacity: 0, x: -30, y: -20 }}
                                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                                    viewport={{ once: true, margin: '-40px' }}
                                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
                                >
                                    <div className="bg-[#F47C27]/5 rounded-2xl p-4 border border-[#F47C27]/20 flex flex-col items-center text-center min-h-[140px] justify-center shadow-[0_0_15px_rgba(244,124,39,0.08)]">
                                        <Database className="w-6 h-6 text-[#F47C27] mb-2" />
                                        <h4 className="font-bold text-xs mb-1">Data Analysis</h4>
                                        <p className="text-[10px] text-[#666666] leading-relaxed">사용자 지표 기반의<br />객관적 디자인 의사결정</p>
                                    </div>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: 30, y: -20 }}
                                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                                    viewport={{ once: true, margin: '-40px' }}
                                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
                                >
                                    <div className="bg-[#F47C27]/5 rounded-2xl p-4 border border-[#F47C27]/20 flex flex-col items-center text-center min-h-[140px] justify-center shadow-[0_0_15px_rgba(244,124,39,0.08)]">
                                        <Layers className="w-6 h-6 text-[#F47C27] mb-2" />
                                        <h4 className="font-bold text-xs mb-1">Design System</h4>
                                        <p className="text-[10px] text-[#666666] leading-relaxed">일관된 브랜드 경험을 위한<br />확장 가능한 시스템 구축</p>
                                    </div>
                                </motion.div>
                            </div>

                            {/* 중앙 Core Value 영역 - 점선 원이 중심에서 사방으로 퍼짐 */}
                            <div className="relative flex items-center justify-center my-2" style={{ height: '140px' }}>
                                {/* 가장 안쪽 점선 원 - 회전 */}
                                <motion.div
                                    initial={{ scale: 0.3, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true, margin: '-40px' }}
                                    transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
                                    className="absolute"
                                >
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                                        className="w-44 h-44 border border-dashed border-[#F47C27]/30 rounded-full"
                                    />
                                </motion.div>
                                {/* 중간 점선 원 - 천천히 확장 */}
                                <motion.div
                                    initial={{ scale: 0.2, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true, margin: '-40px' }}
                                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                                    className="absolute w-72 h-72 border border-dashed border-[#F47C27]/15 rounded-full"
                                />
                                {/* 바깥쪽 점선 원 - 가장 넓게 확장 */}
                                <motion.div
                                    initial={{ scale: 0.15, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true, margin: '-40px' }}
                                    transition={{ duration: 1.4, ease: 'easeOut', delay: 0.5 }}
                                    className="absolute w-[380px] h-[380px] border border-dashed border-[#F47C27]/8 rounded-full"
                                />
                                {/* 가장 바깥 점선 원 - pulse 효과 */}
                                <motion.div
                                    initial={{ scale: 0.1, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 0.6 }}
                                    viewport={{ once: true, margin: '-40px' }}
                                    transition={{ duration: 1.6, ease: 'easeOut', delay: 0.7 }}
                                    className="absolute"
                                >
                                    <motion.div
                                        animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.3, 0.6] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                        className="w-[460px] h-[460px] border border-dashed border-[#F47C27]/5 rounded-full"
                                    />
                                </motion.div>
                                {/* Core Value 중심 원 */}
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true, margin: '-40px' }}
                                    transition={{ duration: 0.8, ease: 'easeOut', type: 'spring', stiffness: 100 }}
                                    className="w-36 h-36 rounded-full bg-[#F47C27]/25 flex flex-col items-center justify-center border border-[#F47C27]/30 z-[1] text-center"
                                >
                                    <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#F47C27] mb-1">Core Value</p>
                                    <h3 className="text-base font-black leading-tight text-[#222222] text-center">Business<br />Driven Design</h3>
                                </motion.div>
                            </div>

                            {/* 하단 2개 카드 */}
                            <div className="relative z-10 grid grid-cols-2 gap-x-4 p-2">
                                <motion.div
                                    initial={{ opacity: 0, x: -30, y: 20 }}
                                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                                    viewport={{ once: true, margin: '-40px' }}
                                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
                                >
                                    <div className="bg-[#F47C27]/5 rounded-2xl p-4 border border-[#F47C27]/20 flex flex-col items-center text-center min-h-[140px] justify-center shadow-[0_0_15px_rgba(244,124,39,0.08)]">
                                        <Briefcase className="w-6 h-6 text-[#F47C27] mb-2" />
                                        <h4 className="font-bold text-xs mb-1">Business Strategy</h4>
                                        <p className="text-[10px] text-[#666666] leading-relaxed">기업의 목표와 사용자 니즈를<br />연결하는 전략적 접근</p>
                                    </div>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: 30, y: 20 }}
                                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                                    viewport={{ once: true, margin: '-40px' }}
                                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
                                >
                                    <div className="bg-[#F47C27]/5 rounded-2xl p-4 border border-[#F47C27]/20 flex flex-col items-center text-center min-h-[140px] justify-center shadow-[0_0_15px_rgba(244,124,39,0.08)]">
                                        <MessageSquare className="w-6 h-6 text-[#F47C27] mb-2" />
                                        <h4 className="font-bold text-xs mb-1">Communication</h4>
                                        <p className="text-[10px] text-[#666666] leading-relaxed">유관 부서와의 원활한 협업 및<br />디자인 논리 전달</p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="work" className="px-4 md:px-6 py-16 md:py-24 bg-white">
                    <div className="max-w-[1200px] mx-auto">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-16 gap-4 md:gap-8">
                            <FadeUp>
                                <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-2 md:mb-4">Selected Projects</h2>
                                <p className="text-sm md:text-base text-[#666666]">에이전시 및 대기업 운영 프로젝트 중심의 포트폴리오입니다.</p>
                            </FadeUp>

                            <FadeUp delay={0.05}>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setActiveTab(cat)}
                                            className={`px-4 md:px-6 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all ${activeTab === cat
                                                ? 'bg-[#F47C27] text-white'
                                                : 'bg-[#EEEEEE] text-[#666666] hover:bg-[#F47C27]/5'
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </FadeUp>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                            <AnimatePresence mode="popLayout">
                                {filteredProjects.map((project, index) => (
                                    <motion.div
                                        layout
                                        key={project.id}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: '-20px' }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{
                                            duration: 0.9,
                                            ease: [0.22, 1, 0.36, 1], // expo out smoother
                                            delay: index * 0.1
                                        }}
                                        onClick={() => setSelectedProject(project)}
                                        className="group cursor-pointer"
                                    >
                                        <div className="relative h-[180px] md:h-auto md:aspect-[4/3] overflow-hidden rounded-2xl md:rounded-3xl bg-[#EEEEEE]">
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                referrerPolicy="no-referrer"
                                            />
                                            {/* Full Overlay with Glass Effect */}
                                            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm group-hover:backdrop-blur-md group-hover:bg-black/75 transition-all duration-500 flex flex-col justify-end p-4 md:p-8 text-white border border-white/10 rounded-2xl md:rounded-3xl">
                                                {/* Glass highlight - top edge reflection */}
                                                <div className="absolute top-0 left-0 right-0 h-px bg-white/15" />
                                                <div className="transform transition-all duration-500">
                                                    <h3 className="text-lg md:text-2xl font-bold mb-1 md:mb-3 drop-shadow-lg">{project.title}</h3>
                                                    <p className="text-white/90 text-xs md:text-sm leading-relaxed line-clamp-2 mb-3 md:mb-6 drop-shadow-md">{project.description}</p>
                                                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 md:px-5 py-1.5 md:py-2 rounded-xl text-xs md:text-sm font-bold border border-white/20 hover:bg-[#F47C27] hover:border-[#F47C27] transition-all shadow-lg">
                                                        View Details <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="absolute top-3 left-3 md:top-6 md:left-6 flex items-center gap-1.5 md:gap-2">
                                                <span className="bg-white/90 backdrop-blur-md px-2.5 md:px-4 py-1 md:py-1.5 rounded-lg md:rounded-xl text-[8px] md:text-[10px] font-bold uppercase tracking-wider text-[#F47C27] shadow-sm">
                                                    {project.category}
                                                </span>
                                                <span className="border border-white px-2.5 md:px-4 py-1 md:py-1.5 rounded-lg md:rounded-xl text-[8px] md:text-[10px] font-bold uppercase tracking-wider text-white">
                                                    {project.tag}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="px-4 md:px-6 py-16 md:py-24 max-w-[1200px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
                        <FadeUp>
                            <div className="relative">
                                <div className="aspect-square rounded-3xl overflow-hidden">
                                    <img
                                        src="/images/프로필사진.png"
                                        alt="Kim Ah Hyun"
                                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                        referrerPolicy="no-referrer"
                                    />
                                </div>
                                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-black/5 hidden lg:block">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-[#F47C27] rounded-full flex items-center justify-center text-white">
                                            <Award className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-[#666666] uppercase tracking-widest">Experience</p>
                                            <p className="text-lg font-bold">10+</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeUp>
                        <FadeUp delay={0.15}>
                            <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8">안녕하세요, <br />디자이너 김아현입니다.</h2>
                            <div className="space-y-4 md:space-y-6 text-sm md:text-base text-[#666666] leading-relaxed">
                                <p>
                                    저는 복잡한 비즈니스 요구사항을 명확하고 직관적인 시각 언어로 풀어내는 것에 열정을 가지고 있습니다.
                                    금융권 앱 운영부터 글로벌 대기업의 웹 서비스 디자인까지, 다양한 규모와 성격의 프로젝트를 수행하며
                                    실무 역량을 쌓아왔습니다.
                                </p>
                                <p>
                                    단순히 아름다운 디자인을 넘어, 데이터와 사용자 피드백을 기반으로 지속 가능한 디자인 시스템을 구축하고
                                    운영 효율성을 높이는 것에 집중합니다. 협업 부서와의 원활한 커뮤니케이션을 통해 프로젝트의 성공을 돕는
                                    든든한 파트너가 되고자 합니다.
                                </p>
                            </div>
                            <div className="mt-6 md:mt-10 grid grid-cols-2 gap-4 md:gap-6">
                                <div>
                                    <h4 className="font-bold mb-2">Skills</h4>
                                    <ul className="text-sm space-y-1">
                                        <li>Figma / Adobe XD</li>
                                        <li>Photoshop / Illustrator</li>
                                        <li>UI/UX Design</li>
                                        <li>Image Prompt Design</li>
                                        <li>Video Prompt Engineering</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold mb-2">Focus</h4>
                                    <ul className="text-sm space-y-1">
                                        <li>App Operation</li>
                                        <li>E-commerce</li>
                                        <li>Fintech</li>
                                        <li>Responsive Web</li>
                                        <li>Vibe Coding</li>
                                    </ul>
                                </div>
                            </div>
                        </FadeUp>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="px-4 md:px-6 py-16 md:py-24 bg-[#333333] text-white">
                    <div className="max-w-[1200px] mx-auto text-center">
                        <FadeUp>
                            <h2 className="text-2xl md:text-5xl font-bold mb-4 md:mb-8">함께 성장할 준비가 되셨나요?</h2>
                        </FadeUp>
                        <FadeUp delay={0.1}>
                            <p className="text-white/60 text-sm md:text-lg mb-8 md:mb-12 max-w-2xl mx-auto">
                                새로운 프로젝트 제안이나 협업 문의는 언제든 환영합니다. <br />
                                아래 연락처를 통해 편하게 연락주세요.
                            </p>
                        </FadeUp>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                            <a href="mailto:nubrixstudio@gmail.com" className="group flex items-center gap-3 md:gap-4 bg-white/5 hover:bg-[#F47C27] px-5 md:px-8 py-3 md:py-4 rounded-2xl transition-all border border-white/10 w-full md:w-auto justify-center">
                                <Mail className="w-5 h-5 md:w-6 md:h-6 text-[#F47C27] group-hover:text-white" />
                                <span className="text-sm md:text-lg font-medium">nubrixstudio@gmail.com</span>
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="px-4 md:px-6 py-8 md:py-12 border-t border-black/5 text-center text-xs md:text-sm text-[#666666]">
                <p>©2026 Kim Ah Hyun. All rights reserved.</p>
            </footer>

            {/* Project Detail Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-end md:items-center justify-center px-0 md:px-6 py-0 md:py-12"
                    >
                        <div
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setSelectedProject(null)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-5xl bg-white rounded-t-3xl md:rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] md:max-h-full overflow-y-auto"
                        >
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-3 right-3 md:top-6 md:right-6 z-10 w-8 h-8 md:w-10 md:h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:bg-[#F47C27] hover:text-white transition-all"
                            >
                                <X className="w-4 h-4 md:w-5 md:h-5" />
                            </button>

                            <div className="flex flex-col">
                                {/* Image Section: Top Overlay area */}
                                <div className="bg-[#EEEEEE] p-4 md:p-6 lg:p-12 flex justify-center">
                                    <img
                                        src={selectedProject.image}
                                        alt={selectedProject.title}
                                        className="w-full max-w-4xl h-auto rounded-2xl shadow-2xl"
                                        referrerPolicy="no-referrer"
                                    />
                                </div>

                                {/* Content Section: Below Image */}
                                <div className="p-5 md:p-8 lg:p-16 max-w-4xl mx-auto w-full">
                                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8 mb-6 md:mb-12 pb-4 md:pb-8 border-b border-black/5">
                                        <div>
                                            <span className="inline-block bg-[#F47C27]/10 text-[#F47C27] px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider mb-4">
                                                {selectedProject.category}
                                            </span>
                                            <h2 className="text-2xl md:text-4xl font-bold">{selectedProject.title}</h2>
                                        </div>

                                        <div className="flex gap-3 md:gap-4">
                                            <div className="bg-[#F47C27]/5 px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl border border-[#F47C27]/10">
                                                <p className="text-[10px] font-bold text-[#666666] uppercase tracking-widest mb-1">Role</p>
                                                <p className="font-bold text-[#333333]">{selectedProject.role}</p>
                                            </div>
                                            <div className="bg-[#F47C27]/5 px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl border border-[#F47C27]/10">
                                                <p className="text-[10px] font-bold text-[#666666] uppercase tracking-widest mb-1">Contribution</p>
                                                <p className="font-bold text-[#333333]">{selectedProject.contribution}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-12">
                                        <p className="text-base md:text-xl text-[#666666] leading-relaxed">
                                            {selectedProject.description}
                                        </p>

                                        <div className="space-y-12 pt-8 border-t border-black/5">
                                            <div>
                                                <h4 className="text-lg font-bold mb-6 flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-[#F47C27] flex items-center justify-center">
                                                        <Layout className="w-4 h-4 text-white" />
                                                    </div>
                                                    Project Scope
                                                </h4>
                                                <div className="flex flex-wrap gap-3">
                                                    {selectedProject.scope.map(s => (
                                                        <span key={s} className="bg-[#EEEEEE] px-4 py-2 rounded-xl text-sm font-medium text-[#666666]">
                                                            {s}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="text-lg font-bold mb-6 flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-[#F47C27] flex items-center justify-center">
                                                        <Briefcase className="w-4 h-4 text-white" />
                                                    </div>
                                                    Key Details
                                                </h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {selectedProject.details?.map((detail, i) => (
                                                        <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-[#F47C27]/5 border border-[#F47C27]/10 hover:border-[#F47C27]/30 transition-colors">
                                                            <div className="w-2 h-2 rounded-full bg-[#F47C27] mt-2 flex-shrink-0" />
                                                            <p className="text-sm text-[#666666] leading-relaxed">{detail}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
