import React, { useState, useEffect } from 'react';
import {
    Building2, Calendar, CreditCard, LayoutDashboard, Pill,
    Settings, Stethoscope, Users, Bell, Search, ChevronDown,
    MoreVertical, CheckCircle, FileText, Activity, HelpCircle,
    Plus, Clock, UploadCloud, Edit3, Trash2, Wind,
    Phone, ArrowUpRight, ArrowDown
} from 'lucide-react';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('overview');
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [logs, setLogs] = useState([]);

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

    // Mock data for the screenshot-specific widgets
    const progressBars = [
        { label: 'Anesthetics', value: '83%', width: '83%' },
        { label: 'Gynecology', value: '95%', width: '95%' },
        { label: 'Neurology', value: '100%', width: '100%' },
        { label: 'Oncology', value: '89%', width: '89%' },
        { label: 'Orthopedics', value: '97%', width: '97%' },
        { label: 'Physiotherapy', value: '100%', width: '100%' },
    ];

    const NavItem = ({ id, icon: Icon, label }) => {
        const isActive = activeTab === id;
        return (
            <button
                onClick={() => setActiveTab(id)}
                className={`w-full flex items-center gap-4 px-5 py-3.5 mb-2 rounded-xl transition-all duration-300 font-semibold text-sm ${isActive ? 'bg-[#3b82f6] text-white shadow-[0_4px_12px_rgba(59,130,246,0.3)]' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
            >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {label}
            </button>
        );
    };

    return (
        <div className="bg-[#fadcb8] min-h-screen p-4 md:p-6 lg:p-8 flex items-center justify-center font-sans">
            {/* Outer App Window wrapper to match screenshot spacing */}
            <div className="w-full max-w-[1600px] h-[90vh] bg-[#f8fafc] rounded-[2rem] shadow-2xl overflow-hidden flex shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)]">

                {/* SIDEBAR */}
                <div className="w-64 bg-white shrink-0 border-r border-slate-100 flex flex-col py-6 px-4 h-full z-10">
                    <div className="flex items-center gap-3 px-2 mb-10">
                        <div className="w-8 h-8 rounded-full bg-[#3b82f6] rounded-bl-sm flex items-center justify-center relative shadow-sm">
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-white/20 rounded-b-full"></div>
                        </div>
                        <span className="text-2xl font-extrabold text-slate-800 tracking-tight">MediKit</span>
                    </div>

                    <div className="flex-1 overflow-y-auto no-scrollbar">
                        <NavItem id="overview" icon={LayoutDashboard} label="Overview" />
                        <NavItem id="doctor" icon={Stethoscope} label="Doctor" />
                        <NavItem id="patient" icon={Users} label="Patient" />
                        <NavItem id="department" icon={Building2} label="Department" />
                        <NavItem id="appointment" icon={Calendar} label="Appointment" />
                        <NavItem id="pharmacy" icon={Pill} label="Pharmacy" />
                        <NavItem id="payment" icon={CreditCard} label="Payment" />

                        <div className="w-full h-px bg-slate-100 my-4"></div>

                        <NavItem id="report" icon={FileText} label="Report" />
                        <NavItem id="notice" icon={Bell} label="Notice" />
                        <NavItem id="settings" icon={Settings} label="Settings" />
                    </div>

                    <div className="mt-8 bg-[#f0f7ff] p-5 rounded-2xl border border-blue-50 text-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-blue-100 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm mx-auto mb-3 border border-blue-50 flex items-center justify-center">
                            <UploadCloud className="w-6 h-6 text-blue-500" />
                        </div>
                        <h4 className="text-xs font-bold text-slate-800 mb-4 px-2">Add New Category or Database</h4>
                        <button className="w-full py-2.5 bg-[#3b82f6] text-white rounded-lg text-xs font-bold flex justify-center items-center gap-2 hover:bg-blue-600 transition-colors shadow-sm shadow-blue-500/30">
                            <Plus className="w-3.5 h-3.5" /> Create New
                        </button>
                    </div>
                </div>

                {/* MAIN PANEL */}
                <div className="flex-1 flex flex-col h-full bg-[#f8fafc] overflow-hidden">

                    {/* HEADER BAR */}
                    <div className="h-20 bg-white/50 backdrop-blur-md px-8 flex items-center justify-between border-b border-slate-100 shrink-0">
                        <div className="relative w-96 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search for Files, Patient or Files"
                                className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm transition-all placeholder:text-slate-400 font-medium text-slate-700"
                            />
                        </div>
                        <div className="flex items-center gap-6">
                            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 text-slate-400 hover:text-slate-600 relative">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                            </button>
                            <div className="flex items-center gap-3 cursor-pointer">
                                <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden shadow-sm">
                                    <img src="https://i.pravatar.cc/150?img=11" alt="Doctor" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-800 leading-tight">Dr. Robert Fox</h4>
                                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Admin</p>
                                </div>
                                <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
                            </div>
                        </div>
                    </div>

                    {/* SCROLLABLE CONTENT */}
                    <div className="flex-1 overflow-y-auto w-full p-8 pb-32">

                        {/* -------------------- OVERVIEW TAB (Inspired by Screenshot) -------------------- */}
                        {activeTab === 'overview' && (
                            <div className="animate-fade-in space-y-6">

                                {/* 4 STAT CARDS */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {/* Doctor Card */}
                                    <div className="bg-white p-6 rounded-3xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] border border-slate-100">
                                        <div className="flex items-center gap-5">
                                            <div className="w-14 h-14 rounded-full bg-[#ccfbf1] text-[#0d9488] flex items-center justify-center shrink-0">
                                                <Stethoscope className="w-7 h-7" />
                                            </div>
                                            <div>
                                                <h3 className="text-[28px] font-black text-slate-800 leading-none mb-1">2937</h3>
                                                <p className="text-sm font-semibold text-slate-400">Doctors</p>
                                            </div>
                                        </div>
                                        <p className="text-xs font-bold mt-5 text-slate-500"><span className="text-[#0d9488]">3 Doctors</span> joined this week</p>
                                    </div>
                                    {/* Staff Card */}
                                    <div className="bg-white p-6 rounded-3xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] border border-slate-100">
                                        <div className="flex items-center gap-5">
                                            <div className="w-14 h-14 rounded-full bg-[#ffedd5] text-[#ea580c] flex items-center justify-center shrink-0">
                                                <Users className="w-7 h-7" />
                                            </div>
                                            <div>
                                                <h3 className="text-[28px] font-black text-slate-800 leading-none mb-1">5453</h3>
                                                <p className="text-sm font-semibold text-slate-400">Staffs</p>
                                            </div>
                                        </div>
                                        <p className="text-xs font-bold mt-5 text-slate-500"><span className="text-[#ea580c]">8 Staffs</span> on vacation</p>
                                    </div>
                                    {/* Patient Card */}
                                    <div className="bg-white p-6 rounded-3xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] border border-slate-100">
                                        <div className="flex items-center gap-5">
                                            <div className="w-14 h-14 rounded-full bg-[#ffe4e6] text-[#e11d48] flex items-center justify-center shrink-0">
                                                <Users className="w-7 h-7" />
                                            </div>
                                            <div>
                                                <h3 className="text-[28px] font-black text-slate-800 leading-none mb-1">170K</h3>
                                                <p className="text-sm font-semibold text-slate-400">Patients</p>
                                            </div>
                                        </div>
                                        <p className="text-xs font-bold mt-5 text-slate-500"><span className="text-[#e11d48]">175</span> New patients admitted</p>
                                    </div>
                                    {/* Pharmacy Card */}
                                    <div className="bg-white p-6 rounded-3xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] border border-slate-100">
                                        <div className="flex items-center gap-5">
                                            <div className="w-14 h-14 rounded-full bg-[#e0f2fe] text-[#0284c7] flex items-center justify-center shrink-0">
                                                <Pill className="w-7 h-7" />
                                            </div>
                                            <div>
                                                <h3 className="text-[28px] font-black text-slate-800 leading-none mb-1">21</h3>
                                                <p className="text-sm font-semibold text-slate-400">Pharmacies</p>
                                            </div>
                                        </div>
                                        <p className="text-xs font-bold mt-5 text-slate-500"><span className="text-[#0284c7]">85k</span> Medicine on reserve</p>
                                    </div>
                                </div>

                                {/* MIDDLE ROW WIDGETS */}
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                                    {/* Hospital Birth & Death Analytics */}
                                    <div className="lg:col-span-4 bg-white p-6 rounded-3xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col justify-between">
                                        <h3 className="text-lg font-bold text-slate-800">Hospital Birth & Death Analytics</h3>
                                        <div className="relative w-44 h-44 mx-auto my-6 flex items-center justify-center">
                                            {/* Mock concentric CSS rings */}
                                            <svg width="100%" height="100%" viewBox="0 0 100 100" className="rotate-[-90deg]">
                                                {/* Birth Case Ring cyan */}
                                                <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="8"></circle>
                                                <circle cx="50" cy="50" r="40" fill="none" stroke="#0d9488" strokeWidth="8" strokeDasharray="251" strokeDashoffset="120" strokeLinecap="round"></circle>
                                                {/* Accident case orange */}
                                                <circle cx="50" cy="50" r="28" fill="none" stroke="#e2e8f0" strokeWidth="8"></circle>
                                                <circle cx="50" cy="50" r="28" fill="none" stroke="#ea580c" strokeWidth="8" strokeDasharray="175" strokeDashoffset="130" strokeLinecap="round"></circle>
                                                {/* Death case red */}
                                                <circle cx="50" cy="50" r="16" fill="none" stroke="#e2e8f0" strokeWidth="8"></circle>
                                                <circle cx="50" cy="50" r="16" fill="none" stroke="#e11d48" strokeWidth="8" strokeDasharray="100" strokeDashoffset="60" strokeLinecap="round"></circle>
                                            </svg>
                                        </div>
                                        <div className="flex justify-between items-center text-[11px] font-bold text-slate-700 mx-2">
                                            <div className="text-center">
                                                <div className="flex items-center gap-1.5 justify-center mb-1.5 text-slate-400"><div className="w-2 h-2 rounded-full bg-[#0d9488]"></div> Birth Case</div>
                                                <p className="text-sm text-slate-800">45.07%</p>
                                            </div>
                                            <div className="text-center">
                                                <div className="flex items-center gap-1.5 justify-center mb-1.5 text-slate-400"><div className="w-2 h-2 rounded-full bg-[#ea580c]"></div> Accident Case</div>
                                                <p className="text-sm text-slate-800">18.43%</p>
                                            </div>
                                            <div className="text-center">
                                                <div className="flex items-center gap-1.5 justify-center mb-1.5 text-slate-400"><div className="w-2 h-2 rounded-full bg-[#e11d48]"></div> Death Case</div>
                                                <p className="text-sm text-slate-800">29.05%</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hospital Report */}
                                    <div className="lg:col-span-5 bg-white p-6 rounded-3xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col justify-between">
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-lg font-bold text-slate-800">Hospital Report</h3>
                                            <button className="text-[11px] uppercase font-bold text-slate-400 hover:text-slate-600">View All</button>
                                        </div>
                                        <div className="space-y-4 flex-1">
                                            {/* Item 1 */}
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                                                    <Wind className="w-5 h-5" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-sm font-bold text-slate-800 leading-tight">Room 501 AC is not working</h4>
                                                    <p className="text-xs text-slate-400 font-medium mt-0.5">Reported by Steve</p>
                                                </div>
                                                <button className="p-2 text-slate-400 hover:text-slate-700 bg-white shadow-sm border border-slate-100 rounded-lg">
                                                    <MoreVertical className="w-4 h-4" />
                                                </button>
                                            </div>
                                            {/* Item 2 */}
                                            <div className="flex items-center gap-4 bg-white shadow-[0_5px_15px_rgba(0,0,0,0.05)] border border-slate-50 p-3 -mx-3 rounded-2xl relative z-10 transition-transform hover:-translate-y-1">
                                                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                                                    <Calendar className="w-5 h-5" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-sm font-bold text-slate-800 leading-tight">Daniel extended his holiday</h4>
                                                    <p className="text-xs text-slate-400 font-medium mt-0.5">Reported by Androw</p>
                                                </div>
                                                <button className="p-2 text-slate-400 hover:text-slate-700">
                                                    <MoreVertical className="w-4 h-4" />
                                                </button>
                                            </div>
                                            {/* Item 3 */}
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                                                    <Building2 className="w-5 h-5" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-sm font-bold text-slate-800 leading-tight">101 washroom needed to clean</h4>
                                                    <p className="text-xs text-slate-400 font-medium mt-0.5">Reported by Steve</p>
                                                </div>
                                                <button className="p-2 text-slate-400 hover:text-slate-700 bg-white shadow-sm border border-slate-100 rounded-lg">
                                                    <MoreVertical className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Success Stats */}
                                    <div className="lg:col-span-3 bg-white p-6 rounded-3xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] border border-slate-100">
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-lg font-bold text-slate-800">Success Stats</h3>
                                            <button className="border border-slate-200 text-xs font-bold text-slate-500 rounded-lg px-2 flex items-center gap-1 py-1">
                                                May 2021 <ChevronDown className="w-3 h-3" />
                                            </button>
                                        </div>
                                        <div className="space-y-4">
                                            {progressBars.map((bar, i) => (
                                                <div key={i} className="flex items-center gap-4 text-xs font-semibold">
                                                    <span className="w-24 text-slate-500">{bar.label}</span>
                                                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                        <div className="h-full bg-blue-500 rounded-full" style={{ width: bar.width }}></div>
                                                    </div>
                                                    <span className="w-8 text-right text-slate-800">{bar.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* BOTTOM ROW LISTS */}
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                                    {/* Online Appointment Table */}
                                    <div className="lg:col-span-9 bg-white p-6 rounded-3xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] border border-slate-100">
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-lg font-bold text-slate-800">Online Appointment</h3>
                                            <button className="text-[11px] uppercase font-bold text-slate-400 hover:text-slate-600">View All</button>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left">
                                                <thead>
                                                    <tr className="border-b border-slate-100 text-slate-400 text-xs font-semibold">
                                                        <th className="pb-4 font-semibold w-12">No.</th>
                                                        <th className="pb-4 font-semibold">Name</th>
                                                        <th className="pb-4 font-semibold">Date & Time</th>
                                                        <th className="pb-4 font-semibold">Age</th>
                                                        <th className="pb-4 font-semibold">Gender</th>
                                                        <th className="pb-4 font-semibold">Appoint for</th>
                                                        <th className="pb-4 font-semibold text-right">Setting</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-sm font-semibold text-slate-800 divide-y divide-slate-50">
                                                    {[
                                                        { no: '01', name: 'Cameron', date: '20 May 6:30pm', age: '54', gen: 'Male', doc: 'Dr. Lee' },
                                                        { no: '02', name: 'Jorge', date: '20 May 7:30pm', age: '76', gen: 'Female', doc: 'Dr. Gregory' },
                                                        { no: '03', name: 'Philip', date: '20 May 8:30pm', age: '47', gen: 'Male', doc: 'Dr. Bernard' },
                                                        { no: '04', name: 'Nathan', date: '20 May 9:00pm', age: '40', gen: 'Female', doc: 'Dr. Mitchell' },
                                                        { no: '05', name: 'Soham', date: '20 May 6:30pm', age: '43', gen: 'Female', doc: 'Dr. Randall' },
                                                    ].map(row => (
                                                        <tr key={row.no} className="hover:bg-slate-50/50 transition-colors">
                                                            <td className="py-4 text-slate-500">{row.no}</td>
                                                            <td className="py-4">{row.name}</td>
                                                            <td className="py-4 text-slate-600 font-medium">{row.date}</td>
                                                            <td className="py-4 text-slate-600 font-medium">{row.age}</td>
                                                            <td className="py-4 text-slate-600 font-medium">{row.gen}</td>
                                                            <td className="py-4">{row.doc}</td>
                                                            <td className="py-4">
                                                                <div className="flex justify-end gap-2 text-slate-400">
                                                                    <button className="hover:text-amber-500"><Edit3 className="w-4 h-4" /></button>
                                                                    <button className="hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* Doctors List */}
                                    <div className="lg:col-span-3 bg-white p-6 rounded-3xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] border border-slate-100">
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-lg font-bold text-slate-800">Doctors List</h3>
                                            <button className="w-6 h-6 rounded flex items-center justify-center bg-slate-100 hover:bg-slate-200">
                                                <ChevronDown className="w-4 h-4 text-slate-500 -rotate-90" />
                                            </button>
                                        </div>
                                        <div className="space-y-4">
                                            {[
                                                { name: 'Dr. Brandon', spec: 'Gynecologist', img: '13' },
                                                { name: 'Dr. Gregory', spec: 'Cardiologist', img: '3' },
                                                { name: 'Dr. Robert', spec: 'Orthopedist', img: '68' },
                                                { name: 'Dr. Calvin', spec: 'Neurologist', img: '59' },
                                            ].map((doc, idx) => (
                                                <div key={idx} className={`flex items-center gap-4 ${idx === 1 ? 'bg-white shadow-[0_5px_15px_rgba(0,0,0,0.05)] border border-slate-50 p-3 -mx-3 rounded-2xl relative z-10 transition-transform hover:-translate-y-1' : ''}`}>
                                                    <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 shrink-0">
                                                        <img src={`https://i.pravatar.cc/150?img=${doc.img}`} alt={doc.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="text-sm font-bold text-slate-800 leading-tight">{doc.name}</h4>
                                                        <p className="text-xs text-slate-400 font-medium mt-0.5">{doc.spec}</p>
                                                    </div>
                                                    <button className="text-slate-400 hover:text-slate-700">
                                                        <MoreVertical className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )}

                        {/* -------------------- DYNAMIC SYSTEM TABS (Adapted to match the aesthetics) -------------------- */}

                        {activeTab === 'appointment' && (
                            <div className="animate-fade-in space-y-8">
                                <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] border border-slate-100">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-800">Operating Schedule Target</h3>
                                        <p className="text-sm font-medium text-slate-400 mt-1">Bind operational paths between personnel and patients.</p>
                                    </div>
                                </div>

                                <form onSubmit={handleAddSchedule} className="bg-white p-8 rounded-3xl shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] border border-slate-100 space-y-8">
                                    {/* Reused complex form from original built layout but stylized into the medikit light aesthetic */}
                                    <div>
                                        <h4 className="text-sm font-bold text-blue-600 mb-5 pb-2 border-b border-slate-100 flex items-center gap-2">
                                            <LayoutDashboard className="w-4 h-4" /> Logistical Mapping
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 mb-2">Target Date & Time</label>
                                                <input required type="datetime-local" value={newSchedule.date} onChange={e => setNewSchedule({ ...newSchedule, date: e.target.value })} className="w-full px-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium text-slate-800" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 mb-2">Room / OT ID</label>
                                                <input required placeholder="OT-X or Hybrid-X" value={newSchedule.otId} onChange={e => setNewSchedule({ ...newSchedule, otId: e.target.value })} className="w-full px-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium text-slate-800" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 mb-2">Linked Patient</label>
                                                <select required value={newSchedule.patientId} onChange={e => setNewSchedule({ ...newSchedule, patientId: e.target.value })} className="w-full px-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium text-slate-800">
                                                    <option value="">-- Patient Selection --</option>
                                                    {patients.map(p => <option key={p.id} value={p.name}>{p.name} ({p.age}y)</option>)}
                                                </select>
                                            </div>
                                            <div className="lg:col-span-2">
                                                <label className="block text-xs font-bold text-slate-700 mb-2">Surgical Code / Name</label>
                                                <input required placeholder="Appendectomy..." value={newSchedule.surgeryType} onChange={e => setNewSchedule({ ...newSchedule, surgeryType: e.target.value })} className="w-full px-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium text-slate-800" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end pt-4 border-t border-slate-100">
                                        <button type="submit" className="px-8 py-3.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-blue-500/30 transition-all">
                                            <CheckCircle className="w-4 h-4" /> Schedule Operation Matrix
                                        </button>
                                    </div>
                                </form>

                                <div className="bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] border border-slate-100">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                                                <th className="py-4 px-6 border-b border-slate-100">Timeline Limit</th>
                                                <th className="py-4 px-6 border-b border-slate-100">Room Data</th>
                                                <th className="py-4 px-6 border-b border-slate-100">Target Patient</th>
                                                <th className="py-4 px-6 border-b border-slate-100">Director</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50 text-sm font-semibold text-slate-800">
                                            {schedules.map(s => {
                                                const d = new Date(s.date);
                                                return (
                                                    <tr key={s.id} className="hover:bg-blue-50/30 transition-colors">
                                                        <td className="py-4 px-6">
                                                            <div>{d.toDateString()}</div>
                                                            <div className="text-blue-500 font-bold text-xs mt-1">{d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                                        </td>
                                                        <td className="py-4 px-6">
                                                            <div className="text-slate-900">{s.otId}</div>
                                                            <div className="text-slate-400 font-medium text-xs mt-1">{s.surgeryType}</div>
                                                        </td>
                                                        <td className="py-4 px-6">
                                                            {s.patientId}
                                                        </td>
                                                        <td className="py-4 px-6 text-slate-600">
                                                            {s.doctorIds}
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                            {schedules.length === 0 && <tr><td colSpan="4" className="text-center py-10 text-slate-400 text-sm font-medium">No procedures scheduled.</td></tr>}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === 'doctor' && (
                            <div className="animate-fade-in space-y-6">
                                <div className="bg-white p-6 rounded-3xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] border border-slate-100">
                                    <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2"><Plus className="text-blue-500 w-5 h-5" /> New Personnel</h3>
                                    <form onSubmit={handleAddDoctor} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        <input required placeholder="Dr. Name..." value={newDoctor.name} onChange={e => setNewDoctor({ ...newDoctor, name: e.target.value })} className="w-full px-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl text-sm font-medium text-slate-800" />
                                        <input required placeholder="Neurology" value={newDoctor.specialty} onChange={e => setNewDoctor({ ...newDoctor, specialty: e.target.value })} className="w-full px-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl text-sm font-medium text-slate-800" />
                                        <input required placeholder="Mon, Wed" value={newDoctor.availableDays} onChange={e => setNewDoctor({ ...newDoctor, availableDays: e.target.value })} className="w-full px-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl text-sm font-medium text-slate-800" />
                                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2">Authorize Personnel</button>
                                    </form>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {doctors.map(d => (
                                        <div key={d.id} className="bg-white p-6 rounded-3xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col items-center text-center">
                                            <div className="w-16 h-16 rounded-full bg-slate-100 mb-4 overflow-hidden border-4 border-white shadow-sm">
                                                <img src={`https://i.pravatar.cc/150?u=${d.name}`} alt={d.name} className="w-full h-full object-cover" />
                                            </div>
                                            <h4 className="text-base font-bold text-slate-800">{d.name}</h4>
                                            <span className="text-xs font-bold text-blue-500 bg-blue-50 px-3 py-1 mt-2 rounded-full">{d.specialty}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'patient' && (
                            <div className="animate-fade-in space-y-6">
                                {/* HEADER */}
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-6">
                                        <h2 className="text-[28px] font-bold text-slate-800">Patients List</h2>
                                        <div className="relative w-64 hidden md:block">
                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <input placeholder="Search Patients" className="w-full pl-11 pr-4 py-2.5 bg-slate-100 rounded-full text-sm outline-none border-none text-slate-700 font-medium placeholder:text-slate-400" />
                                        </div>
                                    </div>
                                    <button className="bg-[#0f4a8a] text-white px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-blue-900 transition-colors shadow-md">
                                        <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center -ml-1">
                                            <Plus className="w-3.5 h-3.5" />
                                        </div>
                                        Add Patients
                                    </button>
                                </div>

                                {/* STATS ROW */}
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                                    <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                                        {/* Total Patients */}
                                        <div className="bg-[#3b82f6] text-white p-5 rounded-3xl relative shadow-[0_4px_15px_-3px_rgba(59,130,246,0.3)]">
                                            <div className="absolute top-4 right-4 bg-white/20 px-2.5 py-1 rounded-full text-[10px] font-bold">+20%</div>
                                            <h3 className="text-3xl font-extrabold mt-2">1,250k</h3>
                                            <p className="text-blue-100 text-sm mt-1 font-medium">Total Patients</p>
                                            <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white text-blue-500 flex items-center justify-center shadow-sm">
                                                <ArrowUpRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                        {/* Critical */}
                                        <div className="bg-white p-5 rounded-3xl relative shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] border border-slate-100">
                                            <div className="absolute top-4 right-4 bg-emerald-50 text-emerald-500 px-2.5 py-1 rounded-full text-[10px] font-bold">+15%</div>
                                            <h3 className="text-3xl font-extrabold mt-2 text-slate-800 flex items-center">
                                                58 <div className="w-2.5 h-2.5 bg-red-500 rounded-full ml-1.5 shadow-[0_0_5px_rgba(239,68,68,0.5)]"></div>
                                            </h3>
                                            <p className="text-slate-500 text-sm mt-1 font-medium">Critical</p>
                                            <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                                                <ArrowUpRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                        {/* Follow up */}
                                        <div className="bg-white p-5 rounded-3xl relative shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] border border-slate-100">
                                            <div className="absolute top-4 right-4 bg-amber-50 text-amber-500 px-2.5 py-1 rounded-full text-[10px] font-bold">+6%</div>
                                            <h3 className="text-3xl font-extrabold mt-2 text-slate-800 flex items-center">
                                                219 <div className="w-2.5 h-2.5 bg-blue-600 rounded-full ml-1.5 shadow-[0_0_5px_rgba(37,99,235,0.5)]"></div>
                                            </h3>
                                            <p className="text-slate-500 text-sm mt-1 font-medium">Follow up</p>
                                            <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                                                <ArrowUpRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                        {/* Draft */}
                                        <div className="bg-white p-5 rounded-3xl relative shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] border border-slate-100">
                                            <div className="absolute top-4 right-4 bg-red-50 text-red-500 px-2.5 py-1 rounded-full text-[10px] font-bold">5%</div>
                                            <h3 className="text-3xl font-extrabold mt-2 text-slate-800 flex items-center">
                                                23 <div className="w-2.5 h-2.5 bg-blue-400 rounded-full ml-1.5 shadow-[0_0_5px_rgba(96,165,250,0.5)]"></div>
                                            </h3>
                                            <p className="text-slate-500 text-sm mt-1 font-medium">Draft</p>
                                            <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                                                <ArrowUpRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Patient Status Chart */}
                                    <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col min-h-[220px]">
                                        <div className="flex justify-between items-center mb-6 z-10">
                                            <h3 className="text-sm font-bold text-slate-800">Patients status</h3>
                                            <button className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">Yearly <ChevronDown className="w-3 h-3" /></button>
                                        </div>
                                        <div className="flex-1 relative flex items-end ml-6 border-l border-slate-100">
                                            <div className="absolute -left-6 bottom-0 top-0 flex flex-col justify-between text-[10px] text-slate-400 pb-6 items-end">
                                                <span>100k</span><span>50k</span><span>20k</span><span>10k</span><span>0</span>
                                            </div>
                                            <div className="w-full h-full relative">
                                                <svg width="100%" height="100%" viewBox="0 0 400 100" preserveAspectRatio="none" className="absolute bottom-6 left-0 w-full h-[calc(100%-1.5rem)] overflow-visible drop-shadow-[0_8px_8px_rgba(34,197,94,0.15)]">
                                                    <path d="M0,80 L50,70 L100,60 L150,20 L200,60 L250,80 L300,50 L350,20 L400,10" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinejoin="round" />
                                                    <path d="M0,80 L50,70 L100,60 L150,20 L200,60 L250,80 L300,50 L350,20 L400,10 L400,100 L0,100 Z" fill="rgba(34,197,94,0.1)" stroke="none" />
                                                </svg>
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] text-slate-400 pl-2">
                                                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* PATIENT CARDS GRID */}
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pt-2 pb-6">
                                    {(patients.length > 0 ? patients : [
                                        { name: 'Leslie Alexander', age: 24 },
                                        { name: 'Fasai Areyanukul', age: 25 },
                                        { name: 'Floyd', age: 24 },
                                        { name: 'Priscilla', age: 31 },
                                        { name: 'Kristin', age: 28 },
                                        { name: 'Fasai Areyanukul', age: 22 }
                                    ]).map((p, idx) => (
                                        <div key={p.id || idx} className="bg-white rounded-3xl p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col relative">
                                            <div className="flex items-center gap-4 mb-5">
                                                <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 shrink-0 border border-slate-50 shadow-sm">
                                                    <img src={`https://i.pravatar.cc/150?u=${p.name.replace(/\s/g, '')}`} alt={p.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-slate-800 text-sm leading-tight">{p.name}</h4>
                                                    <p className="text-[11px] font-medium text-slate-400 mt-0.5">{p.name.split(' ')[0].toLowerCase()}.company@example.com</p>
                                                </div>
                                            </div>

                                            <div className="flex gap-2 mb-6">
                                                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-500 rounded-full text-[10px] font-bold hover:bg-blue-100 transition-colors">
                                                    <Phone className="w-3 h-3" /> Phone
                                                </button>
                                                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-500 rounded-full text-[10px] font-bold hover:bg-blue-100 transition-colors">
                                                    <Activity className="w-3 h-3" /> Live Vital
                                                </button>
                                            </div>

                                            <div className="space-y-3.5 text-xs mb-4">
                                                <div className="flex justify-between items-center border-b border-slate-50 pb-2.5">
                                                    <span className="text-slate-500 font-medium tracking-wide">Gender, Age</span>
                                                    <span className="text-slate-800 font-bold">{idx % 2 === 0 ? 'Female' : 'Male'}, {p.age || 25}y</span>
                                                </div>
                                                <div className="flex justify-between items-center border-b border-slate-50 pb-2.5">
                                                    <span className="text-slate-500 font-medium tracking-wide">Physician</span>
                                                    <span className="text-slate-800 font-bold">{['Ronald', 'Cameron', 'Brandon', 'Francisco', 'Harold', 'Kathryn'][idx % 6]}</span>
                                                </div>
                                                <div className="flex justify-between items-center border-b border-slate-50 pb-2.5">
                                                    <span className="text-slate-500 font-medium tracking-wide">Last Consultation</span>
                                                    <span className="text-slate-800 font-bold">{['May 12, 2019', 'May 20, 2015', 'September 24, 2017', 'February 29, 2012', 'March 6, 2018', 'November 28, 2015'][idx % 6]}</span>
                                                </div>
                                                <div className="flex justify-between items-center border-b border-slate-50 pb-2.5">
                                                    <span className="text-slate-500 font-medium tracking-wide">Appointments</span>
                                                    <span className="text-slate-800 font-bold">15 May 2020 {8 + (idx % 2)}:{idx % 2 === 0 ? '00' : '30'} am</span>
                                                </div>
                                                <div className="flex justify-between items-center pt-1">
                                                    <span className="text-slate-500 font-medium tracking-wide">Status</span>
                                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${idx % 3 === 0 ? 'text-purple-600 bg-purple-50' : (idx % 2 === 1 ? 'text-emerald-600 bg-emerald-50' : 'text-blue-600 bg-blue-50')}`}>
                                                        {idx % 3 === 0 ? 'Under Observation' : (idx % 2 === 1 ? 'Recovered' : 'Under Treatment')}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#3b82f6] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 cursor-pointer transition-transform">
                                                <ArrowDown className="w-3.5 h-3.5" />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* QUICK REGISTER FORM (Moved to bottom) */}
                                <div className="mt-8 bg-white p-6 rounded-3xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] border border-slate-100">
                                    <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">Quick Register Patient</h3>
                                    <form onSubmit={handleAddPatient} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        <input required placeholder="Patient Name" value={newPatient.name} onChange={e => setNewPatient({ ...newPatient, name: e.target.value })} className="w-full px-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:ring-2 focus:border-blue-500 focus:ring-blue-100 outline-none" />
                                        <input required placeholder="Age" type="number" value={newPatient.age} onChange={e => setNewPatient({ ...newPatient, age: e.target.value })} className="w-full px-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:ring-2 focus:border-blue-500 focus:ring-blue-100 outline-none" />
                                        <input required placeholder="Condition" value={newPatient.condition} onChange={e => setNewPatient({ ...newPatient, condition: e.target.value })} className="w-full px-4 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:ring-2 focus:border-blue-500 focus:ring-blue-100 outline-none" />
                                        <button type="submit" className="bg-[#0f4a8a] hover:bg-blue-900 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2">Finalize</button>
                                    </form>
                                </div>
                            </div>
                        )}

                        {activeTab === 'report' && (
                            <div className="animate-fade-in bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)]">
                                <h3 className="text-xl font-bold text-slate-800 mb-6">Master Operational Trail</h3>
                                <div className="space-y-4">
                                    {logs.map(log => (
                                        <div key={log.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm p-4 bg-[#f8fafc] rounded-2xl border border-slate-100">
                                            <span className="font-semibold text-slate-700">{log.text}</span>
                                            <span className="text-xs text-blue-500 font-bold bg-blue-50 px-3 py-1.5 rounded-lg shrink-0 mt-2 sm:mt-0">{log.time}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}
