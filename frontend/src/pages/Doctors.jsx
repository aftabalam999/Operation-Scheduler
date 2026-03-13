import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, XCircle, Phone, Mail, Star, Activity } from 'lucide-react';

const doctorsData = [
    { id: 'DOC-001', name: 'Dr. Arjun Smith', specialization: 'Cardiothoracic Surgery', status: 'Active', surgeries: 124, phone: '+1-555-0101', email: 'arjun.smith@hospital.com', days: ['Mon', 'Wed', 'Fri'], start: '08:00', end: '16:00', rating: 4.9 },
    { id: 'DOC-002', name: 'Dr. Sarah Allen', specialization: 'Obstetrics & Gynecology', status: 'Active', surgeries: 89, phone: '+1-555-0102', email: 'sarah.allen@hospital.com', days: ['Tue', 'Thu', 'Sat'], start: '09:00', end: '17:00', rating: 4.8 },
    { id: 'DOC-003', name: 'Dr. James Jones', specialization: 'Orthopedic Surgery', status: 'Active', surgeries: 212, phone: '+1-555-0103', email: 'james.jones@hospital.com', days: ['Mon', 'Tue', 'Thu'], start: '07:00', end: '15:00', rating: 4.7 },
    { id: 'DOC-004', name: 'Dr. Priya Patel', specialization: 'General Surgery', status: 'Active', surgeries: 176, phone: '+1-555-0104', email: 'priya.patel@hospital.com', days: ['Wed', 'Fri'], start: '10:00', end: '18:00', rating: 4.6 },
    { id: 'DOC-005', name: 'Dr. Wei Chen', specialization: 'Neurosurgery', status: 'Inactive', surgeries: 67, phone: '+1-555-0105', email: 'wei.chen@hospital.com', days: ['Mon', 'Thu'], start: '09:00', end: '17:00', rating: 4.5 },
    { id: 'DOC-006', name: 'Dr. Elena Kim', specialization: 'Anesthesiology', status: 'Active', surgeries: 301, phone: '+1-555-0106', email: 'elena.kim@hospital.com', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], start: '07:00', end: '19:00', rating: 4.9 },
];

const SPECIALIZATIONS = ['All', 'Cardiothoracic Surgery', 'Obstetrics & Gynecology', 'Orthopedic Surgery', 'General Surgery', 'Neurosurgery', 'Anesthesiology'];

const avatarColors = ['bg-blue-500', 'bg-teal-500', 'bg-purple-500', 'bg-orange-500', 'bg-pink-500', 'bg-indigo-500'];

export default function Doctors() {
    const [search, setSearch] = useState('');
    const [specFilter, setSpecFilter] = useState('All');
    const [selected, setSelected] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const filtered = doctorsData.filter(d => {
        const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.specialization.toLowerCase().includes(search.toLowerCase());
        const matchSpec = specFilter === 'All' || d.specialization === specFilter;
        return matchSearch && matchSpec;
    });

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Doctors Directory</h1>
                    <p className="text-gray-500 mt-1">Manage surgical team information and availability</p>
                </div>
                <button onClick={() => setShowModal(true)} className="bg-[#2563EB] text-white px-6 py-2.5 rounded-lg shadow font-medium flex items-center gap-2 hover:bg-blue-700 transition-all">
                    <Plus size={18} /> Add Doctor
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                    { label: 'Total Doctors', val: doctorsData.length, color: 'text-[#2563EB]' },
                    { label: 'Active', val: doctorsData.filter(d => d.status === 'Active').length, color: 'text-green-600' },
                    { label: 'Inactive', val: doctorsData.filter(d => d.status === 'Inactive').length, color: 'text-red-500' },
                ].map(({ label, val, color }) => (
                    <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 text-center">
                        <p className={`text-3xl font-bold ${color}`}>{val}</p>
                        <p className="text-sm text-gray-500 mt-1">{label}</p>
                    </div>
                ))}
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Search by name or specialization..." value={search} onChange={e => setSearch(e.target.value)}
                        className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#2563EB] bg-white text-sm" />
                </div>
                <select value={specFilter} onChange={e => setSpecFilter(e.target.value)}
                    className="border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-sm bg-white w-full md:w-auto">
                    {SPECIALIZATIONS.map(s => <option key={s}>{s}</option>)}
                </select>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((doc, i) => (
                    <div key={doc.id} onClick={() => setSelected(doc)}
                        className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 cursor-pointer hover:shadow-md transition-all group">
                        <div className="flex items-start gap-4">
                            <div className={`w-14 h-14 rounded-full ${avatarColors[i % avatarColors.length]} text-white flex items-center justify-center text-xl font-bold flex-shrink-0`}>
                                {doc.name.split(' ')[1][0]}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-gray-800 truncate">{doc.name}</h3>
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0 ml-2 ${doc.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {doc.status}
                                    </span>
                                </div>
                                <p className="text-sm text-[#14B8A6] font-medium mt-0.5">{doc.specialization}</p>
                                <div className="flex items-center gap-1 mt-1">
                                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                                    <span className="text-xs text-gray-500">{doc.rating} · {doc.surgeries} surgeries</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-50 space-y-1.5 text-sm text-gray-600">
                            <div className="flex items-center gap-2"><Phone size={13} className="text-gray-400" />{doc.phone}</div>
                            <div className="flex items-center gap-2"><Mail size={13} className="text-gray-400" /><span className="truncate">{doc.email}</span></div>
                            <div className="flex items-center gap-2"><Activity size={13} className="text-gray-400" />
                                <span>{doc.days.join(', ')} · {doc.start}–{doc.end}</span>
                            </div>
                        </div>

                        <div className="flex gap-2 mt-4 pt-3 border-t border-gray-50 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="flex-1 text-xs border border-[#2563EB] text-[#2563EB] py-1.5 rounded-lg hover:bg-blue-50 flex items-center justify-center gap-1">
                                <Edit2 size={12} />Edit
                            </button>
                            <button className="flex-1 text-xs border border-red-200 text-red-500 py-1.5 rounded-lg hover:bg-red-50 flex items-center justify-center gap-1">
                                <Trash2 size={12} />Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Detail Modal */}
            {selected && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setSelected(null)}>
                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-xl font-bold text-gray-800">{selected.name}</h2>
                            <button onClick={() => setSelected(null)}><XCircle size={22} className="text-gray-400 hover:text-gray-600" /></button>
                        </div>
                        <p className="text-[#14B8A6] font-semibold mb-4">{selected.specialization}</p>
                        {[
                            ['Doctor ID', selected.id], ['Phone', selected.phone], ['Email', selected.email],
                            ['Working Days', selected.days.join(', ')], ['Hours', `${selected.start} – ${selected.end}`],
                            ['Total Surgeries', selected.surgeries], ['Rating', `${selected.rating} / 5.0`],
                        ].map(([l, v]) => (
                            <div key={l} className="flex justify-between py-2.5 border-b border-gray-50 text-sm">
                                <span className="text-gray-500">{l}</span>
                                <span className="font-semibold text-gray-800">{v}</span>
                            </div>
                        ))}
                        <button className="w-full mt-6 bg-[#2563EB] text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-all">Edit Profile</button>
                    </div>
                </div>
            )}

            {/* Add Doctor Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Add New Doctor</h2>
                            <button onClick={() => setShowModal(false)}><XCircle size={24} className="text-gray-400 hover:text-gray-600" /></button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { label: 'Full Name', type: 'text', placeholder: 'Dr. John Smith', col: 2 },
                                { label: 'Specialization', type: 'text', placeholder: 'e.g. Cardiothoracic Surgery' },
                                { label: 'Phone', type: 'tel', placeholder: '+1-555-0000' },
                                { label: 'Email', type: 'email', placeholder: 'doctor@hospital.com', col: 2 },
                                { label: 'Start Time', type: 'time', placeholder: '' },
                                { label: 'End Time', type: 'time', placeholder: '' },
                            ].map(({ label, type, placeholder, col }) => (
                                <div key={label} className={col === 2 ? 'md:col-span-2' : ''}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                                    <input type={type} placeholder={placeholder} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                                </div>
                            ))}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Working Days</label>
                                <div className="flex gap-2 flex-wrap">
                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                                        <label key={d} className="flex items-center gap-1 text-sm cursor-pointer">
                                            <input type="checkbox" className="rounded" />{d}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button className="flex-1 bg-[#2563EB] text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-all">Add Doctor</button>
                            <button onClick={() => setShowModal(false)} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-lg font-semibold hover:bg-gray-50 transition-all">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
