import React, { useState, useEffect } from 'react';
import { Calendar, User, FileText, CheckCircle, Activity, Stethoscope } from 'lucide-react';

export default function UserDashboard() {
    const [activeTab, setActiveTab] = useState('view');
    const [schedules, setSchedules] = useState([]);
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/schedules').then(res => res.json()).then(data => setSchedules(data)).catch(e => console.error(e));
        fetch('http://localhost:5000/api/doctors').then(res => res.json()).then(data => setDoctors(data)).catch(e => console.error(e));
    }, []);

    const NavItem = ({ id, icon: Icon, label }) => (
        <button onClick={() => setActiveTab(id)} className={`w-full flex items-center gap-3 px-4 py-3.5 mt-1 rounded-lg transition-all duration-200 text-sm font-bold tracking-wide ${activeTab === id ? 'bg-emerald-600 shadow-md text-white' : 'text-slate-400 hover:text-slate-50 hover:bg-slate-800'}`}>
            <Icon className={`w-5 h-5 ${activeTab === id ? 'text-emerald-100' : 'text-slate-500'}`} /> {label}
        </button>
    );

    return (
        <div className="flex flex-col md:flex-row flex-1 bg-slate-50 min-h-[calc(100vh-64px)] w-full">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-72 bg-[#0b132b] shrink-0 border-r border-slate-800 flex flex-col p-6 z-10 shadow-[4px_0_24px_rgba(0,0,0,0.05)]">
                <div className="mb-8">
                    <h2 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-500 mb-2">Clinical Portal</h2>
                    <div className="h-px bg-slate-800 w-full mb-4"></div>
                </div>
                <div className="space-y-1">
                    <NavItem id="view" icon={Calendar} label="Active Timelines" />
                    <NavItem id="doctors" icon={Stethoscope} label="Provider Network" />
                </div>

                <div className="mt-auto bg-slate-800/30 border border-slate-800 rounded-xl p-4 text-xs font-medium text-emerald-400/80 tracking-wide mt-10">
                    <Activity className="w-4 h-4 mb-2 text-emerald-500 animate-pulse" />
                    Systems tracking <span className="text-white font-bold">{schedules.length}</span> assigned procedure blocks today.
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto w-full">
                <div className="max-w-[1200px] mx-auto p-6 md:p-12 pb-24">

                    {activeTab === 'view' && (
                        <div className="animate-fade-in">
                            <div className="mb-8">
                                <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">Active Operation Sequences</h3>
                                <p className="text-slate-500 mt-2 text-sm">Real-time macro view of assigned procedure timelines and personnel requirements.</p>
                            </div>

                            {schedules.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-100 shadow-[0_5px_30px_-15px_rgba(0,0,0,0.05)] border-dashed border-2 px-6">
                                    <Calendar className="w-16 h-16 text-slate-300 mb-6" />
                                    <p className="text-lg font-bold text-slate-500 tracking-tight">Timeline Idle.</p>
                                    <p className="text-sm font-medium text-slate-400 mt-1 max-w-xs text-center">No current operations broadcasted from the Systems Admin console.</p>
                                </div>
                            ) : (
                                <div className="grid gap-8 2xl:grid-cols-2">
                                    {schedules.map((schedule) => {
                                        const d = new Date(schedule.date);
                                        return (
                                            <div key={schedule.id} className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-300 hover:shadow-[0_25px_50px_-20px_rgba(0,0,0,0.1)] hover:-translate-y-1 group">

                                                {/* Header Block */}
                                                <div className="border-b border-slate-100 bg-slate-50/50 p-6 flex justify-between items-center group-hover:bg-slate-50 transition-colors">
                                                    <div className="flex items-center gap-4">
                                                        <div className="bg-[#0b132b] text-white p-3 rounded-xl shadow-lg shadow-slate-900/20">
                                                            <div className="text-[10px] font-extrabold uppercase tracking-[0.2em]">{d.toLocaleString('default', { month: 'short' })}</div>
                                                            <div className="text-xl font-black leading-none mt-0.5">{d.getDate()}</div>
                                                        </div>
                                                        <div>
                                                            <h4 className="text-xl font-extrabold text-slate-900 tracking-tight">{schedule.surgeryType}</h4>
                                                            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mt-1.5 flex gap-2">
                                                                <span>{d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                                <span className="text-slate-300">&bull;</span>
                                                                <span className="text-blue-600">{schedule.otId}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="text-right">
                                                        {schedule.status === 'Scheduled' && <span className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-widest shadow-sm block">Active Timeline</span>}
                                                        {schedule.status === 'Emergency' && <span className="bg-red-50 text-red-700 border border-red-200 px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-widest shadow-sm block animate-pulse">Emergency</span>}
                                                        {schedule.status === 'Postponed' && <span className="bg-yellow-50 text-yellow-700 border border-yellow-200 px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-widest shadow-sm block">Condition Delayed</span>}
                                                    </div>
                                                </div>

                                                <div className="p-6">
                                                    <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm mb-6 pb-6 border-b border-slate-100">
                                                        <div>
                                                            <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1 flex items-center gap-1.5"><User size={12} /> Authorized Target</p>
                                                            <p className="font-bold text-slate-900">{schedule.patientId.split(' ')[0]} <span className="text-slate-500 font-medium">({schedule.patientId.split(' ')[1] || 'Unknown'})</span></p>
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1 flex items-center gap-1.5"><Stethoscope size={12} /> Operating Chief</p>
                                                            <p className="font-bold text-slate-900">{schedule.doctorIds}</p>
                                                        </div>
                                                        {schedule.medicName && (
                                                            <div>
                                                                <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1 mt-2">Staff Medic</p>
                                                                <p className="font-medium text-slate-700">{schedule.medicName}</p>
                                                            </div>
                                                        )}
                                                        {(schedule.anesthesiaType || schedule.anesthesiologistName) && (
                                                            <div>
                                                                <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1 mt-2">Anesthesia Protocol</p>
                                                                <p className="font-medium text-slate-700">{schedule.anesthesiologistName || 'Unassigned'} <span className="italic text-slate-400 pl-1">{schedule.anesthesiaType}</span></p>
                                                            </div>
                                                        )}
                                                        {schedule.nurses && (
                                                            <div className="col-span-2 mt-2">
                                                                <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1">Nursing Cadre</p>
                                                                <p className="font-medium text-slate-700">{schedule.nurses}</p>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Extraneous Requirements Sub-Blocks */}
                                                    <div className="grid sm:grid-cols-2 gap-4">
                                                        {schedule.prePostEvents && (
                                                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                                                <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 mb-2 flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 bg-emerald-100 rounded-full" /> Event Sequence</div>
                                                                <p className="text-xs text-slate-600 leading-relaxed font-medium">{schedule.prePostEvents}</p>
                                                            </div>
                                                        )}
                                                        {schedule.drugsAndMaterials && (
                                                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                                                <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 mb-2 flex items-center gap-2"><FileText className="w-3.5 h-3.5 text-blue-500 bg-blue-100 rounded-sm" /> Payload / Materials</div>
                                                                <p className="text-xs text-slate-600 leading-relaxed font-medium">{schedule.drugsAndMaterials}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'doctors' && (
                        <div className="animate-fade-in">
                            <div className="mb-8">
                                <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">Provider Network Directory</h3>
                                <p className="text-slate-500 mt-2 text-sm">Internal access to accredited hospital staff credentials and capability matrices.</p>
                            </div>

                            {doctors.length === 0 ? (
                                <div className="flex flex-col items-center justify-center p-16 bg-white rounded-xl border border-slate-200 border-dashed">
                                    <p className="text-slate-400 font-medium">Clearance verification pending. Network empty.</p>
                                </div>
                            ) : (
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {doctors.map(d => (
                                        <div key={d.id} className="bg-white p-8 rounded-2xl shadow-[0_5px_30px_-15px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-xl transition-all duration-300 hover:border-emerald-200 group relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-50 to-white rounded-bl-[100px] border-l border-b border-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            <div className="relative z-10 flex flex-col justify-center items-center text-center">
                                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center border-4 border-white shadow-md shadow-slate-200/50 mb-4 group-hover:scale-110 transition-transform duration-500">
                                                    <User className="w-7 h-7 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                                                </div>
                                                <h4 className="text-lg font-extrabold text-slate-900 tracking-tight">{d.name}</h4>
                                                <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mt-1.5 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100">{d.specialty}</p>
                                            </div>

                                            <div className="mt-8 pt-6 border-t border-slate-100 relative z-10">
                                                <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-2">Available Operational Windows</p>
                                                <p className="text-sm font-semibold text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">{d.availableDays}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
