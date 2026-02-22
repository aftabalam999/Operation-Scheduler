import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Stethoscope, ChevronRight, Activity, ShieldCheck } from 'lucide-react';

export default function Home() {
    return (
        <div className="flex flex-col flex-1 bg-white">
            {/* Hero Section */}
            <section className="relative bg-[#0b132b] text-white overflow-hidden py-24 lg:py-36">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent"></div>
                <div className="absolute -left-40 top-20 w-96 h-96 bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-widest mb-8">
                            <Activity className="w-3.5 h-3.5" />
                            Enterprise Health Systems V2.0
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tighter mb-6 leading-[1.1]">
                            Operating Room <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Intelligence.</span>
                        </h1>
                        <p className="text-lg lg:text-xl text-slate-400 leading-relaxed mb-10 max-w-2xl font-light">
                            Transform clinical operations with dynamic scheduling, intelligent resource allocation, and comprehensive surgical lifecycle management built exclusively for modern healthcare facilities.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link to="/login" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm uppercase tracking-widest font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                                Access Staff Portal <ChevronRight className="w-4 h-4 ml-2 opacity-70" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-slate-50 flex-1 relative border-t border-slate-200 shadow-[inset_0_10px_30px_rgba(0,0,0,0.02)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">Core Operational Capabilities</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto text-lg font-light">Designed meticulously to handle the logistical complexities of operating theaters, ensuring zero downtime and optimal patient care continuity.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:border-blue-200 transition-all group duration-300 hover:-translate-y-1">
                            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                                <Calendar className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Dynamic Scheduling</h3>
                            <p className="text-slate-500 leading-relaxed font-light text-sm">Real-time allocation of surgical rooms, adapting instantly to cancellations, emergencies, and specialized operation requirements via intuitive visual controls.</p>
                        </div>

                        <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:border-emerald-200 transition-all group duration-300 hover:-translate-y-1">
                            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Resource Compliance</h3>
                            <p className="text-slate-500 leading-relaxed font-light text-sm">Strict tracking of surgical instruments, specific drug allocations, constraints, and pre/post-operative milestones for rigorous healthcare compliance audits.</p>
                        </div>

                        <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:border-indigo-200 transition-all group duration-300 hover:-translate-y-1">
                            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                                <Stethoscope className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Personnel Logistics</h3>
                            <p className="text-slate-500 leading-relaxed font-light text-sm">Intelligent mapping of presiding surgeons, medical assistants, specialized anesthesiologists, and nursing staff based on availability strings.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
