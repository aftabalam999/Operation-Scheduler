import React, { useState } from 'react';
import { Plus, Search, User, Phone, Calendar, XCircle, FileText, Stethoscope } from 'lucide-react';

const patientsData = [
    { id: 'PAT-001', name: 'John Doe', age: 45, gender: 'Male', contact: '+1-555-1001', doctor: 'Dr. Smith', bloodGroup: 'O+', history: ['Hypertension', 'Type 2 Diabetes'], admittedOn: '2026-03-01' },
    { id: 'PAT-002', name: 'Jane Roe', age: 32, gender: 'Female', contact: '+1-555-1002', doctor: 'Dr. Allen', bloodGroup: 'A+', history: ['Asthma'], admittedOn: '2026-03-05' },
    { id: 'PAT-003', name: 'Sam Smith', age: 61, gender: 'Male', contact: '+1-555-1003', doctor: 'Dr. Jones', bloodGroup: 'B-', history: ['Arthritis', 'Hypertension'], admittedOn: '2026-03-06' },
    { id: 'PAT-004', name: 'Mary Jane', age: 28, gender: 'Female', contact: '+1-555-1004', doctor: 'Dr. Patel', bloodGroup: 'AB+', history: ['None'], admittedOn: '2026-03-07' },
    { id: 'PAT-005', name: 'Robert Fox', age: 55, gender: 'Male', contact: '+1-555-1005', doctor: 'Dr. Chen', bloodGroup: 'O-', history: ['Heart Disease', 'Obesity'], admittedOn: '2026-03-06' },
    { id: 'PAT-006', name: 'Amelia Wade', age: 39, gender: 'Female', contact: '+1-555-1006', doctor: 'Dr. Patel', bloodGroup: 'A-', history: ['Gallstones'], admittedOn: '2026-03-07' },
];

const bloodGroupColors = { 'O+': 'bg-red-100 text-red-700', 'O-': 'bg-red-200 text-red-800', 'A+': 'bg-blue-100 text-blue-700', 'A-': 'bg-blue-200 text-blue-800', 'B+': 'bg-green-100 text-green-700', 'B-': 'bg-green-200 text-green-800', 'AB+': 'bg-purple-100 text-purple-700', 'AB-': 'bg-purple-200 text-purple-800' };

export default function Patients() {
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const filtered = patientsData.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.doctor.toLowerCase().includes(search.toLowerCase()) ||
        p.id.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Patient Records</h1>
                    <p className="text-gray-500 mt-1">Manage patient information, medical history, and assigned doctors</p>
                </div>
                <button onClick={() => setShowModal(true)} className="bg-[#2563EB] text-white px-6 py-2.5 rounded-lg shadow font-medium flex items-center gap-2 hover:bg-blue-700 transition-all">
                    <Plus size={18} /> Add Patient
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                    { label: 'Total Patients', val: patientsData.length, color: 'text-[#2563EB]' },
                    { label: 'Male', val: patientsData.filter(p => p.gender === 'Male').length, color: 'text-blue-500' },
                    { label: 'Female', val: patientsData.filter(p => p.gender === 'Female').length, color: 'text-pink-500' },
                ].map(({ label, val, color }) => (
                    <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 text-center">
                        <p className={`text-3xl font-bold ${color}`}>{val}</p>
                        <p className="text-sm text-gray-500 mt-1">{label}</p>
                    </div>
                ))}
            </div>

            {/* Search */}
            <div className="relative mb-6">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search by name, ID, or assigned doctor..." value={search} onChange={e => setSearch(e.target.value)}
                    className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#2563EB] bg-white text-sm" />
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            {['Patient', 'Gender / Age', 'Contact', 'Blood Group', 'Assigned Doctor', 'Admitted', 'Actions'].map(h => (
                                <th key={h} className="px-6 py-4">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(p => (
                            <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setSelected(p)}>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm ${p.gender === 'Male' ? 'bg-blue-500' : 'bg-pink-500'}`}>
                                            {p.name[0]}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800 text-sm">{p.name}</p>
                                            <p className="text-xs text-gray-400">{p.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">{p.gender}, {p.age}y</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{p.contact}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${bloodGroupColors[p.bloodGroup] || 'bg-gray-100 text-gray-700'}`}>{p.bloodGroup}</span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">{p.doctor}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{p.admittedOn}</td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                                        <button onClick={() => setSelected(p)} className="text-[#2563EB] hover:bg-blue-50 p-1.5 rounded-lg transition-all" title="View"><FileText size={15} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Detail Modal */}
            {selected && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setSelected(null)}>
                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-3">
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-white text-2xl ${selected.gender === 'Male' ? 'bg-blue-500' : 'bg-pink-500'}`}>
                                    {selected.name[0]}
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">{selected.name}</h2>
                                    <p className="text-sm text-gray-500">{selected.id}</p>
                                </div>
                            </div>
                            <button onClick={() => setSelected(null)}><XCircle size={22} className="text-gray-400 hover:text-gray-600" /></button>
                        </div>

                        {[
                            ['Age / Gender', `${selected.age} years, ${selected.gender}`],
                            ['Blood Group', selected.bloodGroup],
                            ['Contact', selected.contact],
                            ['Assigned Doctor', selected.doctor],
                            ['Admitted On', selected.admittedOn],
                        ].map(([l, v]) => (
                            <div key={l} className="flex justify-between py-2.5 border-b border-gray-50 text-sm">
                                <span className="text-gray-500">{l}</span>
                                <span className="font-semibold text-gray-800">{v}</span>
                            </div>
                        ))}

                        <div className="mt-4">
                            <p className="text-sm font-semibold text-gray-600 mb-2">Medical History</p>
                            <div className="flex gap-2 flex-wrap">
                                {selected.history.map(h => (
                                    <span key={h} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">{h}</span>
                                ))}
                            </div>
                        </div>
                        <button className="w-full mt-6 bg-[#2563EB] text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-all">Edit Patient Record</button>
                    </div>
                </div>
            )}

            {/* Add Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Add New Patient</h2>
                            <button onClick={() => setShowModal(false)}><XCircle size={24} className="text-gray-400 hover:text-gray-600" /></button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { label: 'Full Name', type: 'text', placeholder: 'John Doe', col: 2 },
                                { label: 'Age', type: 'number', placeholder: '30' },
                                { label: 'Contact Number', type: 'tel', placeholder: '+1-555-0000' },
                            ].map(({ label, type, placeholder, col }) => (
                                <div key={label} className={col === 2 ? 'md:col-span-2' : ''}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                                    <input type={type} placeholder={placeholder} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                                </div>
                            ))}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]">
                                    <option>Male</option><option>Female</option><option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                                <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]">
                                    {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(g => <option key={g}>{g}</option>)}
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Medical History (comma separated)</label>
                                <input type="text" placeholder="e.g. Hypertension, Diabetes" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button className="flex-1 bg-[#2563EB] text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-all">Add Patient</button>
                            <button onClick={() => setShowModal(false)} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-lg font-semibold hover:bg-gray-50 transition-all">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
