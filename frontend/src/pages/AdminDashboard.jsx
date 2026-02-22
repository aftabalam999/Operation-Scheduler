import React, { useState, useEffect } from 'react';
import { Plus, Users, Calendar, Stethoscope, CheckCircle, Activity, FileText, Search } from 'lucide-react';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('schedules');
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [logs, setLogs] = useState([]);
    const [filterDate, setFilterDate] = useState('');

    const [newDoctor, setNewDoctor] = useState({ name: '', specialty: '', availableDays: '' });
    const [newPatient, setNewPatient] = useState({ name: '', age: '', condition: '' });
    const [newSchedule, setNewSchedule] = useState({
        date: '', otId: '', doctorIds: '', medicName: '', anesthesiaType: '', anesthesiologistName: '',
        nurses: '', patientId: '', surgeryType: '', status: 'Scheduled',
        prePostEvents: '', surgicalReports: '', remarks: '', drugsAndMaterials: ''
    });

    useEffect(() => {
        fetch('http://localhost:5000/api/doctors').then(res => res.json()).then(data => setDoctors(data)).catch(e => console.error(e));
        fetch('http://localhost:5000/api/patients').then(res => res.json()).then(data => setPatients(data)).catch(e => console.error(e));
        fetch('http://localhost:5000/api/schedules').then(res => res.json()).then(data => setSchedules(data)).catch(e => console.error(e));
        fetch('http://localhost:5000/api/logs').then(res => res.json()).then(data => setLogs(data)).catch(e => console.error(e));
    }, []);

    const handleAddDoctor = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/api/doctors', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newDoctor)
        }).then(res => res.json()).then(data => {
            setDoctors([...doctors, data]);
            setNewDoctor({ name: '', specialty: '', availableDays: '' });
        });
    };

    const handleAddPatient = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/api/patients', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPatient)
        }).then(res => res.json()).then(data => {
            setPatients([...patients, data]);
            setNewPatient({ name: '', age: '', condition: '' });
        });
    };

    const handleAddSchedule = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/api/schedules', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newSchedule)
        }).then(res => res.json()).then(data => {
            setSchedules([...schedules, data]);
            setNewSchedule({
                date: '', otId: '', doctorIds: '', medicName: '', anesthesiaType: '', anesthesiologistName: '',
                nurses: '', patientId: '', surgeryType: '', status: 'Scheduled',
                prePostEvents: '', surgicalReports: '', remarks: '', drugsAndMaterials: ''
            });
        });
    };

    const filteredSchedules = filterDate ? schedules.filter(s => s.date.startsWith(filterDate)) : schedules;

    const NavItem = ({ id, icon: Icon, label }) => (
        <button onClick={() => setActiveTab(id)} className={`w-full flex items-center gap-3 px-4 py-3.5 mt-1 rounded-lg transition-all duration-200 text-sm font-bold tracking-wide ${activeTab === id ? 'bg-blue-600 shadow-md text-white' : 'text-slate-400 hover:text-slate-50 hover:bg-slate-800'}`}>
            <Icon className={`w-5 h-5 ${activeTab === id ? 'text-blue-100' : 'text-slate-500'}`} /> {label}
        </button>
    );

    return (
        <div className="flex flex-col md:flex-row flex-1 bg-slate-50 min-h-[calc(100vh-64px)] w-full">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-72 bg-[#0b132b] shrink-0 border-r border-slate-800 flex flex-col p-6 z-10 shadow-[4px_0_24px_rgba(0,0,0,0.05)]">
                <div className="mb-8">
                    <h2 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-500 mb-2">Systems Panel</h2>
                    <div className="h-px bg-slate-800 w-full mb-4"></div>
                </div>
                <div className="space-y-1">
                    <NavItem id="schedules" icon={Calendar} label="Operating Schedules" />
                    <NavItem id="doctors" icon={Stethoscope} label="Medical Personnel" />
                    <NavItem id="patients" icon={Users} label="Patient Registry" />
                    <NavItem id="reports" icon={Activity} label="Activity Analytics" />
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto w-full">
                <div className="max-w-[1200px] mx-auto p-6 md:p-12 pb-24">

                    {/* DOCTORS SECITON */}
                    {activeTab === 'doctors' && (
                        <div className="animate-fade-in">
                            <div className="mb-8">
                                <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">Medical Personnel Index</h3>
                                <p className="text-slate-500 mt-2 text-sm">Register and manage hospital surgeons, anesthesiologists, and general staff capabilities.</p>
                            </div>

                            <form onSubmit={handleAddDoctor} className="bg-white p-8 rounded-2xl shadow-[0_5px_30px_-15px_rgba(0,0,0,0.05)] border border-slate-100 mb-10">
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-6 border-b border-slate-100 pb-2">New Staff Deployment</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Full Name & Title</label>
                                        <input required placeholder="Dr. John Smith" value={newDoctor.name} onChange={e => setNewDoctor({ ...newDoctor, name: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all placeholder:text-slate-400 font-medium" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Specialty / Division</label>
                                        <input required placeholder="Neurosurgery" value={newDoctor.specialty} onChange={e => setNewDoctor({ ...newDoctor, specialty: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all placeholder:text-slate-400 font-medium" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Clinical Availability</label>
                                        <input required placeholder="Mon, Wed, Fri" value={newDoctor.availableDays} onChange={e => setNewDoctor({ ...newDoctor, availableDays: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all placeholder:text-slate-400 font-medium" />
                                    </div>
                                    <button type="submit" className="md:col-span-3 mt-2 bg-slate-900 hover:bg-blue-700 text-white rounded-lg p-3.5 text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 hover:shadow-blue-600/20 transition-all duration-300">
                                        <Plus className="w-4 h-4" /> Authorize Personnel
                                    </button>
                                </div>
                            </form>

                            <div className="bg-white rounded-2xl shadow-[0_5px_30px_-15px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-slate-50/80 border-b border-slate-100">
                                        <tr>
                                            <th className="py-4 px-6 text-[10px] uppercase font-extrabold tracking-widest text-slate-500 w-1/3">Provider Identity</th>
                                            <th className="py-4 px-6 text-[10px] uppercase font-extrabold tracking-widest text-slate-500 w-1/3">Clinical Focus</th>
                                            <th className="py-4 px-6 text-[10px] uppercase font-extrabold tracking-widest text-slate-500">Operation Days</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {doctors.map((d, i) => (
                                            <tr key={d.id} className="hover:bg-blue-50/30 transition-colors">
                                                <td className="py-4 px-6 font-semibold text-sm text-slate-900">{d.name}</td>
                                                <td className="py-4 px-6 text-sm text-slate-600">{d.specialty}</td>
                                                <td className="py-4 px-6">
                                                    <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-md border border-blue-100/50">{Array.isArray(d.availableDays) ? d.availableDays.join(', ') : d.availableDays}</span>
                                                </td>
                                            </tr>
                                        ))}
                                        {doctors.length === 0 && <tr><td colSpan="3" className="py-10 text-center text-slate-400 text-sm font-medium">No personnel tracked.</td></tr>}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* PATIENTS SECTION */}
                    {activeTab === 'patients' && (
                        <div className="animate-fade-in">
                            <div className="mb-8">
                                <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">Patient Tracking Directory</h3>
                                <p className="text-slate-500 mt-2 text-sm">Register incoming cases to authorize them into the timeline operations systems.</p>
                            </div>
                            <form onSubmit={handleAddPatient} className="bg-white p-8 rounded-2xl shadow-[0_5px_30px_-15px_rgba(0,0,0,0.05)] border border-slate-100 mb-10">
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-6 border-b border-slate-100 pb-2">New Admission</h4>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Legal Name</label>
                                        <input required placeholder="Michael Doe" value={newPatient.name} onChange={e => setNewPatient({ ...newPatient, name: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all placeholder:text-slate-400 font-medium" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Age</label>
                                        <input required type="number" placeholder="45" value={newPatient.age} onChange={e => setNewPatient({ ...newPatient, age: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all placeholder:text-slate-400 font-medium" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Primary Condition</label>
                                        <input required placeholder="Appendicitis" value={newPatient.condition} onChange={e => setNewPatient({ ...newPatient, condition: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all placeholder:text-slate-400 font-medium" />
                                    </div>
                                    <button type="submit" className="md:col-span-4 mt-2 bg-slate-900 hover:bg-emerald-600 text-white rounded-lg p-3.5 text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 hover:shadow-emerald-600/20 transition-all duration-300">
                                        <Plus className="w-4 h-4" /> Finalize Registration
                                    </button>
                                </div>
                            </form>
                            <div className="bg-white rounded-2xl shadow-[0_5px_30px_-15px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-slate-50/80 border-b border-slate-100">
                                        <tr>
                                            <th className="py-4 px-6 text-[10px] uppercase font-extrabold tracking-widest text-slate-500">Patient Identifier</th>
                                            <th className="py-4 px-6 text-[10px] uppercase font-extrabold tracking-widest text-slate-500">Age Metric</th>
                                            <th className="py-4 px-6 text-[10px] uppercase font-extrabold tracking-widest text-slate-500">Admission Condition</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {patients.map(p => (
                                            <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="py-4 px-6 font-semibold text-sm text-slate-900">{p.name}</td>
                                                <td className="py-4 px-6 text-sm text-slate-600">{p.age} yrs</td>
                                                <td className="py-4 px-6">
                                                    <span className="bg-orange-50 text-orange-700 text-xs font-bold px-3 py-1 rounded-md border border-orange-100/50">{p.condition}</span>
                                                </td>
                                            </tr>
                                        ))}
                                        {patients.length === 0 && <tr><td colSpan="3" className="py-10 text-center text-slate-400 text-sm font-medium">No patients verified yet.</td></tr>}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* SCHEDULES SECTION */}
                    {activeTab === 'schedules' && (
                        <div className="animate-fade-in">
                            <div className="mb-8">
                                <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">Operating Timeline Configurator</h3>
                                <p className="text-slate-500 mt-2 text-sm">Orchestrate the macro allocations of surgical rooms matching providers to patients.</p>
                            </div>

                            <form onSubmit={handleAddSchedule} className="bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 mb-10 space-y-8">

                                <div>
                                    <h4 className="text-xs font-extrabold uppercase tracking-[0.2em] text-blue-600 mb-5 border-b border-slate-100 pb-2">Logistical Mapping</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Date & Time Target</label>
                                            <input required type="datetime-local" value={newSchedule.date} onChange={e => setNewSchedule({ ...newSchedule, date: e.target.value })} className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all shadow-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Room Allocation</label>
                                            <input required placeholder="OT-X or Hybrid-X" value={newSchedule.otId} onChange={e => setNewSchedule({ ...newSchedule, otId: e.target.value })} className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-1 focus:ring-blue-600 outline-none transition-all shadow-sm placeholder:text-slate-300" />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Intended Procedure</label>
                                            <input required placeholder="Appendectomy..." value={newSchedule.surgeryType} onChange={e => setNewSchedule({ ...newSchedule, surgeryType: e.target.value })} className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-1 focus:ring-blue-600 outline-none transition-all shadow-sm placeholder:text-slate-300" />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Approved Patient</label>
                                            <select required value={newSchedule.patientId} onChange={e => setNewSchedule({ ...newSchedule, patientId: e.target.value })} className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-1 focus:ring-blue-600 outline-none transition-all shadow-sm">
                                                <option value="">-- Patient Selection --</option>
                                                {patients.map(p => <option key={p.id} value={p.name}>{p.name} ({p.age}y)</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Initial Status Directive</label>
                                            <select value={newSchedule.status} onChange={e => setNewSchedule({ ...newSchedule, status: e.target.value })} className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-blue-900 focus:ring-1 focus:ring-blue-600 outline-none transition-all shadow-sm">
                                                <option value="Scheduled">System Scheduled</option>
                                                <option value="Emergency">Emergency Override</option>
                                                <option value="Postponed">Delayed / Postponed</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-xs font-extrabold uppercase tracking-[0.2em] text-blue-600 mb-5 border-b border-slate-100 pb-2">Medical Team Assignment</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Primary Surgeon</label>
                                            <select required value={newSchedule.doctorIds} onChange={e => setNewSchedule({ ...newSchedule, doctorIds: e.target.value })} className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-1 focus:ring-blue-600 outline-none transition-all shadow-sm">
                                                <option value="">-- Authorized Doctor --</option>
                                                {doctors.map(d => <option key={d.id} value={d.name}>{d.name} ({d.specialty})</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Asst. Medic / Surgeon</label>
                                            <input placeholder="Optional Backup..." value={newSchedule.medicName} onChange={e => setNewSchedule({ ...newSchedule, medicName: e.target.value })} className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-1 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-300" />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Presiding Anesthesiologist</label>
                                            <input placeholder="Name of specialist" value={newSchedule.anesthesiologistName} onChange={e => setNewSchedule({ ...newSchedule, anesthesiologistName: e.target.value })} className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-1 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-300" />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Anesthesia Modality</label>
                                            <input placeholder="e.g. General, Regional" value={newSchedule.anesthesiaType} onChange={e => setNewSchedule({ ...newSchedule, anesthesiaType: e.target.value })} className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-1 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-300" />
                                        </div>
                                        <div className="md:col-span-2 text-sm">
                                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Nursing Cadre (Comma separated)</label>
                                            <input placeholder="Nurse Joy, RN Smith..." value={newSchedule.nurses} onChange={e => setNewSchedule({ ...newSchedule, nurses: e.target.value })} className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-1 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-300" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-xs font-extrabold uppercase tracking-[0.2em] text-blue-600 mb-5 border-b border-slate-100 pb-2">Protocol Attachments & Requirements</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Pre/Post Operative Requirements</label>
                                            <textarea placeholder="Specific tracking metrics dictated by procedure..." value={newSchedule.prePostEvents} onChange={e => setNewSchedule({ ...newSchedule, prePostEvents: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-1 focus:ring-blue-600 outline-none transition-all min-h-[90px] placeholder:text-slate-300" />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Extraordinary Drugs / Material Needs</label>
                                            <textarea placeholder="Items outside standard operational kit..." value={newSchedule.drugsAndMaterials} onChange={e => setNewSchedule({ ...newSchedule, drugsAndMaterials: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-1 focus:ring-blue-600 outline-none transition-all min-h-[90px] placeholder:text-slate-300" />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end items-center border-t border-slate-100">
                                    <button type="submit" className="w-full md:w-auto px-8 py-4 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-sm font-extrabold uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-xl shadow-slate-900/10 hover:shadow-blue-600/30 hover:-translate-y-0.5 transition-all duration-300">
                                        <CheckCircle className="w-5 h-5" /> Embed Operation Timeline
                                    </button>
                                </div>
                            </form>

                            <div className="flex justify-between items-center mb-6">
                                <h4 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2"><Calendar className="w-5 h-5 text-blue-500" /> Authorized Schedule Matrix</h4>
                                <div className="flex items-center gap-3">
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Timestamp Anchor:</div>
                                    <div className="relative">
                                        <input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className="pl-3 pr-2 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 shadow-sm focus:ring-1 font-bold focus:border-blue-500 outline-none" />
                                    </div>
                                    <button onClick={() => setFilterDate('')} className="text-[10px] uppercase font-bold tracking-widest px-3 py-2 bg-slate-200 hover:bg-slate-300 rounded text-slate-600 transition-colors">Reset</button>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-[0_5px_30px_-15px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-[#0b132b] text-white">
                                        <tr>
                                            <th className="py-4 px-6 text-[10px] uppercase font-bold tracking-[0.2em] w-1/5 border-r border-slate-800">Operational Window</th>
                                            <th className="py-4 px-6 text-[10px] uppercase font-bold tracking-[0.2em] w-1/4 border-r border-slate-800">Configuration</th>
                                            <th className="py-4 px-6 text-[10px] uppercase font-bold tracking-[0.2em] border-r border-slate-800">Personnel Roster</th>
                                            <th className="py-4 px-6 text-[10px] uppercase font-bold tracking-[0.2em] text-center">Protocol Code</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 bg-white">
                                        {filteredSchedules.map(s => {
                                            const d = new Date(s.date);
                                            return (
                                                <tr key={s.id} className="hover:bg-slate-50 transition-colors group">
                                                    <td className="py-5 px-6 align-top">
                                                        <div className="font-extrabold text-slate-900 text-sm tracking-tight">{d.toDateString()}</div>
                                                        <div className="text-xs font-bold text-blue-600 mt-1 uppercase">{d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                                        <div className="mt-3 inline-block px-2.5 py-1 bg-slate-100 text-slate-600 text-[10px] uppercase font-bold tracking-widest rounded">PT: {s.patientId.split(' ')[0]}</div>
                                                    </td>
                                                    <td className="py-5 px-6 align-top">
                                                        <div className="font-extrabold text-slate-800 text-sm">{s.otId}</div>
                                                        <div className="text-xs font-medium text-slate-500 mt-1 mb-2 leading-relaxed">{s.surgeryType}</div>
                                                        {s.drugsAndMaterials && <div className="text-[10px] text-slate-400 font-medium italic border-l-2 border-slate-200 pl-2 leading-tight bg-slate-50 p-1.5 rounded pr-1">Rq: {s.drugsAndMaterials}</div>}
                                                    </td>
                                                    <td className="py-5 px-6 align-top text-xs leading-relaxed max-w-[280px]">
                                                        <div className="text-slate-800"><span className="text-slate-400 font-bold w-12 inline-block">CHIEF</span> <span className="font-bold">{s.doctorIds}</span></div>
                                                        {s.medicName && <div className="text-slate-600 mt-1"><span className="text-slate-400 font-bold w-12 inline-block">MEDIC</span> {s.medicName}</div>}
                                                        <div className="text-slate-600 mt-1"><span className="text-slate-400 font-bold w-12 inline-block">ANES</span> {s.anesthesiologistName || 'Unassigned'} <span className="text-slate-400">({s.anesthesiaType || 'N/A'})</span></div>
                                                    </td>
                                                    <td className="py-5 px-6 align-top text-center border-l-4 border-l-transparent group-hover:border-l-blue-200">
                                                        {s.status === 'Scheduled' && <span className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-widest shadow-sm">Active Timeline</span>}
                                                        {s.status === 'Emergency' && <span className="bg-red-50 text-red-700 border border-red-200 px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-widest shadow-sm animate-pulse">Emergency Override</span>}
                                                        {s.status === 'Postponed' && <span className="bg-yellow-50 text-yellow-700 border border-yellow-200 px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-widest shadow-sm">Postponed Event</span>}
                                                        {s.status === 'Completed' && <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-widest shadow-sm">Clearance Given</span>}
                                                        {s.status === 'Cancelled' && <span className="bg-slate-100 text-slate-500 border border-slate-200 px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-widest shadow-sm">Line Aborted</span>}
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                        {filteredSchedules.length === 0 && (
                                            <tr><td colSpan="4" className="text-center py-12 text-slate-400 font-medium text-sm">Target window contains no operational assignments.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* REPORTS SECTION */}
                    {activeTab === 'reports' && (
                        <div className="animate-fade-in">
                            <div className="mb-8">
                                <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">System Integrity & Audit Trails</h3>
                                <p className="text-slate-500 mt-2 text-sm">Chronological verification of data-point occurrences across the hospital topology.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                                <div className="p-8 bg-blue-600 rounded-[2rem] text-white shadow-[0_15px_40px_-5px_rgba(37,99,235,0.4)] relative overflow-hidden h-40 flex flex-col justify-center">
                                    <div className="absolute right-0 bottom-0 opacity-10 translate-x-1/4 translate-y-1/4"><Activity size={180} /></div>
                                    <p className="text-blue-200 text-xs font-bold uppercase tracking-[0.2em] mb-1">Total Macro Timelines Configured</p>
                                    <h4 className="text-6xl font-extrabold tracking-tighter">{schedules.length}</h4>
                                </div>
                                <div className="p-8 bg-slate-900 rounded-[2rem] text-white shadow-[0_15px_40px_-5px_rgba(15,23,42,0.4)] relative overflow-hidden h-40 flex flex-col justify-center">
                                    <div className="absolute right-0 bottom-0 opacity-5 translate-x-1/4 translate-y-1/4"><ShieldCheck size={180} /></div>
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mb-1">Emergency Anomalies Logged</p>
                                    <div className="flex items-end gap-3">
                                        <h4 className="text-6xl font-extrabold tracking-tighter text-red-500">{schedules.filter(s => s.status === 'Emergency').length}</h4>
                                        <span className="text-slate-500 font-medium mb-2 uppercase text-xs tracking-widest">Override Instances</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-[0_5px_30px_-15px_rgba(0,0,0,0.05)]">
                                <h4 className="text-sm font-extrabold text-slate-900 tracking-widest mb-6 border-b border-slate-100 pb-3 flex items-center gap-3 uppercase"><FileText size={18} className="text-blue-500" /> Audit Stream Log</h4>
                                <ul className="space-y-4">
                                    {logs.map(log => (
                                        <li key={log.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-300 transition-colors">
                                            <span className="font-semibold text-slate-700 flex items-center shrink-0">
                                                <div className="w-2.5 h-2.5 bg-blue-500 rounded-full mr-3 shadow-[0_0_8px_rgba(37,99,235,0.6)]"></div>
                                                {log.text}
                                            </span>
                                            <span className="font-mono text-xs text-slate-400 font-bold bg-white px-3 py-1.5 rounded-md border border-slate-200 shadow-sm mt-3 sm:mt-0">{log.time}</span>
                                        </li>
                                    ))}
                                    {logs.length === 0 && <span className="block p-8 text-center text-slate-400 font-medium text-sm border-2 border-dashed border-slate-200 rounded-xl">Diagnostic logger idle. No current anomalies detected.</span>}
                                </ul>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
