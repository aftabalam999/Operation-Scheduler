import React, { useState } from 'react';
import {
    Search, Filter, Plus, Clock, User, Stethoscope,
    AlertTriangle, CheckCircle, XCircle, PlayCircle,
    Activity, ChevronRight
} from 'lucide-react';

const surgeriesData = [
    { id: 'SURG-101', patient: 'John Doe', age: 45, doctor: 'Dr. Smith', assistant: 'Dr. Lee', ot: 'OT-1', date: '2026-03-08', start: '08:00', end: '10:00', type: 'Appendectomy', status: 'In Operation', priority: 'Normal', anesthesiologist: 'Dr. Brown' },
    { id: 'SURG-102', patient: 'Jane Roe', age: 32, doctor: 'Dr. Allen', assistant: 'Dr. Patel', ot: 'OT-3', date: '2026-03-08', start: '10:30', end: '12:30', type: 'C-Section', status: 'Scheduled', priority: 'Emergency', anesthesiologist: 'Dr. Kim' },
    { id: 'SURG-103', patient: 'Sam Smith', age: 61, doctor: 'Dr. Jones', assistant: '-', ot: 'OT-2', date: '2026-03-08', start: '13:00', end: '15:00', type: 'Knee Replacement', status: 'Scheduled', priority: 'Normal', anesthesiologist: 'Dr. Brown' },
    { id: 'SURG-104', patient: 'Mary Jane', age: 28, doctor: 'Dr. Patel', assistant: 'Dr. Smith', ot: 'OT-1', date: '2026-03-08', start: '15:15', end: '16:30', type: 'Hernia Repair', status: 'Scheduled', priority: 'Normal', anesthesiologist: 'Dr. Kim' },
    { id: 'SURG-105', patient: 'Robert Fox', age: 55, doctor: 'Dr. Chen', assistant: 'Dr. Lee', ot: 'OT-4', date: '2026-03-07', start: '09:00', end: '11:00', type: 'Cardiac Bypass', status: 'Completed', priority: 'Emergency', anesthesiologist: 'Dr. Brown' },
    { id: 'SURG-106', patient: 'Amelia Wade', age: 39, doctor: 'Dr. Patel', assistant: '-', ot: 'OT-2', date: '2026-03-07', start: '11:30', end: '13:00', type: 'Gallbladder Removal', status: 'Completed', priority: 'Normal', anesthesiologist: 'Dr. Kim' },
];

const statusConfig = {
    'Scheduled': { label: 'Scheduled', bg: 'bg-blue-100', text: 'text-blue-800', icon: <Clock size={12} /> },
    'Pre-Operation': { label: 'Pre-Operation', bg: 'bg-yellow-100', text: 'text-yellow-800', icon: <Activity size={12} /> },
    'In Operation': { label: 'In Operation', bg: 'bg-orange-100', text: 'text-orange-800', icon: <PlayCircle size={12} /> },
    'Post-Operation': { label: 'Post-Operation', bg: 'bg-indigo-100', text: 'text-indigo-800', icon: <Activity size={12} /> },
    'Completed': { label: 'Completed', bg: 'bg-green-100', text: 'text-green-800', icon: <CheckCircle size={12} /> },
    'Cancelled': { label: 'Cancelled', bg: 'bg-red-100', text: 'text-red-800', icon: <XCircle size={12} /> },
};

const STAGES = ['Scheduled', 'Pre-Operation', 'In Operation', 'Post-Operation', 'Completed'];

const StatusBadge = ({ status }) => {
    const cfg = statusConfig[status] || { label: status, bg: 'bg-gray-100', text: 'text-gray-800', icon: null };
    return (
        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.text}`}>
            {cfg.icon}{cfg.label}
        </span>
    );
};

const STAGES_COLORS = ['bg-blue-500', 'bg-yellow-500', 'bg-orange-500', 'bg-indigo-500', 'bg-green-500'];

const Timeline = ({ status }) => {
    const current = STAGES.indexOf(status);
    return (
        <div className="flex items-center gap-1 mt-2">
            {STAGES.map((s, i) => (
                <React.Fragment key={s}>
                    <div className={`w-3 h-3 rounded-full border-2 ${i <= current ? STAGES_COLORS[i] + ' border-transparent' : 'bg-white border-gray-300'} transition-all`} title={s} />
                    {i < STAGES.length - 1 && <div className={`flex-1 h-0.5 ${i < current ? 'bg-green-400' : 'bg-gray-200'}`} />}
                </React.Fragment>
            ))}
        </div>
    );
};

export default function Surgeries() {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('All');
    const [selected, setSelected] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const filters = ['All', 'Scheduled', 'In Operation', 'Completed', 'Emergency'];
    const filtered = surgeriesData.filter(s => {
        const matchSearch = s.patient.toLowerCase().includes(search.toLowerCase()) ||
            s.doctor.toLowerCase().includes(search.toLowerCase()) ||
            s.type.toLowerCase().includes(search.toLowerCase());
        const matchFilter = filter === 'All' ? true
            : filter === 'Emergency' ? s.priority === 'Emergency'
                : s.status === filter;
        return matchSearch && matchFilter;
    });

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Surgery Management</h1>
                    <p className="text-gray-500 mt-1">Track, manage and update all operation theater surgeries</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-[#2563EB] hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg shadow font-medium flex items-center gap-2 transition-all"
                >
                    <Plus size={18} /> Schedule Surgery
                </button>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by patient, doctor or surgery type..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#2563EB] bg-white text-sm"
                    />
                </div>
                <div className="flex gap-2 flex-wrap">
                    {filters.map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${filter === f
                                    ? f === 'Emergency'
                                        ? 'bg-purple-600 text-white border-purple-600'
                                        : 'bg-[#2563EB] text-white border-[#2563EB]'
                                    : 'bg-white text-gray-600 border-gray-200 hover:border-[#2563EB] hover:text-[#2563EB]'
                                }`}
                        >
                            {f === 'Emergency' && <span>🚨 </span>}{f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Surgery Cards */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                {filtered.map(s => (
                    <div
                        key={s.id}
                        onClick={() => setSelected(s)}
                        className={`bg-white rounded-xl border shadow-sm p-5 cursor-pointer hover:shadow-md transition-all group ${s.priority === 'Emergency' ? 'border-l-4 border-l-purple-500' : 'border border-gray-100'
                            }`}
                    >
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-mono text-gray-400">{s.id}</span>
                                    {s.priority === 'Emergency' && (
                                        <span className="flex items-center gap-1 bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full font-semibold">
                                            <AlertTriangle size={10} /> Emergency
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-lg font-bold text-gray-800">{s.patient} <span className="text-sm font-normal text-gray-400">({s.age}y)</span></h3>
                                <p className="text-sm text-gray-500">{s.type}</p>
                            </div>
                            <div className="text-right">
                                <StatusBadge status={s.status} />
                                <p className="text-xs text-gray-400 mt-1">{s.date}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-sm mb-3">
                            <div className="flex items-center gap-1 text-gray-600"><Stethoscope size={14} className="text-[#2563EB]" />{s.doctor}</div>
                            <div className="flex items-center gap-1 text-gray-600"><Clock size={14} className="text-[#14B8A6]" />{s.start} – {s.end}</div>
                            <div className="flex items-center gap-1 text-gray-600"><User size={14} className="text-orange-500" />{s.ot}</div>
                        </div>
                        <Timeline status={s.status} />
                        <div className="flex justify-end mt-3">
                            <span className="text-xs text-[#2563EB] group-hover:underline flex items-center gap-1">View Details <ChevronRight size={12} /></span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Detail Panel */}
            {selected && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setSelected(null)}>
                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full mx-4" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <p className="text-xs font-mono text-gray-400 mb-1">{selected.id}</p>
                                <h2 className="text-2xl font-bold text-gray-800">{selected.patient}</h2>
                                <p className="text-gray-500">{selected.type}</p>
                            </div>
                            <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600"><XCircle size={24} /></button>
                        </div>
                        <div className="space-y-3 text-sm">
                            {[
                                ['Surgeon', selected.doctor],
                                ['Assistant', selected.assistant],
                                ['Anesthesiologist', selected.anesthesiologist],
                                ['OT Room', selected.ot],
                                ['Date', selected.date],
                                ['Time', `${selected.start} – ${selected.end}`],
                                ['Priority', selected.priority],
                            ].map(([label, val]) => (
                                <div key={label} className="flex justify-between py-2 border-b border-gray-50">
                                    <span className="text-gray-500 font-medium">{label}</span>
                                    <span className={`font-semibold ${label === 'Priority' && val === 'Emergency' ? 'text-purple-600' : 'text-gray-800'}`}>{val}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6">
                            <p className="text-sm font-semibold text-gray-600 mb-3">Surgery Progress</p>
                            <Timeline status={selected.status} />
                            <div className="flex gap-2 mt-2">
                                {STAGES.map(s => <span key={s} className="text-xs text-gray-400">{s.split('-')[0]}</span>)}
                            </div>
                        </div>
                        <div className="flex gap-3 mt-8">
                            <button className="flex-1 bg-[#2563EB] hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition-all">Update Status</button>
                            <button onClick={() => setSelected(null)} className="flex-1 border border-gray-200 text-gray-600 hover:bg-gray-50 py-2.5 rounded-lg font-medium transition-all">Close</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Schedule Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Schedule New Surgery</h2>
                            <button onClick={() => setShowModal(false)}><XCircle size={24} className="text-gray-400 hover:text-gray-600" /></button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            {[
                                { label: 'Patient Name', type: 'text', placeholder: 'Select or type patient' },
                                { label: 'Surgery Type', type: 'text', placeholder: 'e.g. Appendectomy' },
                                { label: 'Primary Surgeon', type: 'text', placeholder: 'Dr. Smith' },
                                { label: 'Assistant Surgeon', type: 'text', placeholder: 'Dr. Lee (optional)' },
                                { label: 'Anesthesiologist', type: 'text', placeholder: 'Dr. Brown' },
                                { label: 'OT Room', type: 'text', placeholder: 'e.g. OT-1' },
                                { label: 'Date', type: 'date', placeholder: '' },
                                { label: 'Start Time', type: 'time', placeholder: '' },
                                { label: 'End Time', type: 'time', placeholder: '' },
                            ].map(({ label, type, placeholder }) => (
                                <div key={label}>
                                    <label className="block font-medium text-gray-700 mb-1">{label}</label>
                                    <input type={type} placeholder={placeholder} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-sm" />
                                </div>
                            ))}
                            <div>
                                <label className="block font-medium text-gray-700 mb-1">Priority</label>
                                <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-sm">
                                    <option>Normal</option>
                                    <option>Emergency</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block font-medium text-gray-700 mb-1">Remarks</label>
                                <textarea rows={3} placeholder="Additional notes..." className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-sm resize-none" />
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button className="flex-1 bg-[#2563EB] hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all">Check & Confirm Schedule</button>
                            <button onClick={() => setShowModal(false)} className="flex-1 border border-gray-200 text-gray-600 hover:bg-gray-50 py-3 rounded-lg font-semibold transition-all">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
