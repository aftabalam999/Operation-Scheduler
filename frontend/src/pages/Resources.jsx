import React, { useState } from 'react';
import { Plus, Package, FlaskConical, Zap, Search, XCircle, AlertTriangle, CheckCircle, Edit2 } from 'lucide-react';

const resourcesData = [
    { id: 'RES-001', name: 'Scalpel (Size 22)', category: 'Instrument', quantity: 45, unit: 'pcs', status: 'Available' },
    { id: 'RES-002', name: 'Lidocaine 1%', category: 'Drug', quantity: 8, unit: 'vials', status: 'Low Stock' },
    { id: 'RES-003', name: 'Electrosurgical Unit', category: 'Equipment', quantity: 3, unit: 'units', status: 'Available' },
    { id: 'RES-004', name: 'Surgical Sutures 3-0', category: 'Instrument', quantity: 0, unit: 'boxes', status: 'Out of Stock' },
    { id: 'RES-005', name: 'Morphine 10mg/mL', category: 'Drug', quantity: 5, unit: 'ampoules', status: 'Low Stock' },
    { id: 'RES-006', name: 'Anesthesia Machine', category: 'Equipment', quantity: 2, unit: 'units', status: 'Available' },
    { id: 'RES-007', name: 'Retractors (Set)', category: 'Instrument', quantity: 18, unit: 'sets', status: 'Available' },
    { id: 'RES-008', name: 'Propofol 200mg/20mL', category: 'Drug', quantity: 0, unit: 'vials', status: 'Out of Stock' },
    { id: 'RES-009', name: 'Surgical Drapes', category: 'Instrument', quantity: 60, unit: 'pcs', status: 'Available' },
];

const statusConfig = {
    'Available': { bg: 'bg-green-100', text: 'text-green-700', icon: <CheckCircle size={13} /> },
    'Low Stock': { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: <AlertTriangle size={13} /> },
    'Out of Stock': { bg: 'bg-red-100', text: 'text-red-700', icon: <XCircle size={13} /> },
};

const categoryIcon = {
    'Instrument': <Package size={18} className="text-[#2563EB]" />,
    'Drug': <FlaskConical size={18} className="text-purple-500" />,
    'Equipment': <Zap size={18} className="text-[#14B8A6]" />,
};

const categoryBg = {
    'Instrument': 'bg-blue-50',
    'Drug': 'bg-purple-50',
    'Equipment': 'bg-teal-50',
};

export default function Resources() {
    const [search, setSearch] = useState('');
    const [catFilter, setCatFilter] = useState('All');
    const [showModal, setShowModal] = useState(false);

    const filtered = resourcesData.filter(r => {
        const matchSearch = r.name.toLowerCase().includes(search.toLowerCase());
        const matchCat = catFilter === 'All' || r.category === catFilter;
        return matchSearch && matchCat;
    });

    const counts = { total: resourcesData.length, available: resourcesData.filter(r => r.status === 'Available').length, lowStock: resourcesData.filter(r => r.status === 'Low Stock').length, outOfStock: resourcesData.filter(r => r.status === 'Out of Stock').length };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Resource Management</h1>
                    <p className="text-gray-500 mt-1">Track surgical instruments, drugs, and medical equipment</p>
                </div>
                <button onClick={() => setShowModal(true)} className="bg-[#2563EB] text-white px-6 py-2.5 rounded-lg shadow font-medium flex items-center gap-2 hover:bg-blue-700 transition-all">
                    <Plus size={18} /> Add Resource
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                    { label: 'Total Items', val: counts.total, color: 'text-[#2563EB]', bg: 'bg-blue-50' },
                    { label: 'Available', val: counts.available, color: 'text-green-600', bg: 'bg-green-50' },
                    { label: 'Low Stock', val: counts.lowStock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
                    { label: 'Out of Stock', val: counts.outOfStock, color: 'text-red-600', bg: 'bg-red-50' },
                ].map(({ label, val, color, bg }) => (
                    <div key={label} className={`${bg} rounded-xl p-5 text-center`}>
                        <p className={`text-3xl font-bold ${color}`}>{val}</p>
                        <p className="text-sm text-gray-500 mt-1">{label}</p>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Search resource name..." value={search} onChange={e => setSearch(e.target.value)}
                        className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#2563EB] bg-white text-sm" />
                </div>
                <div className="flex gap-2">
                    {['All', 'Instrument', 'Drug', 'Equipment'].map(c => (
                        <button key={c} onClick={() => setCatFilter(c)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${catFilter === c ? 'bg-[#2563EB] text-white border-[#2563EB]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#2563EB]'}`}>
                            {c}
                        </button>
                    ))}
                </div>
            </div>

            {/* Resource Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map(r => {
                    const sc = statusConfig[r.status];
                    return (
                        <div key={r.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-all group">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-10 h-10 rounded-xl ${categoryBg[r.category]} flex items-center justify-center`}>
                                    {categoryIcon[r.category]}
                                </div>
                                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${sc.bg} ${sc.text}`}>
                                    {sc.icon}{r.status}
                                </span>
                            </div>
                            <h3 className="font-bold text-gray-800 mb-1">{r.name}</h3>
                            <p className="text-xs text-gray-400 mb-3">{r.category} · {r.id}</p>

                            <div className="flex items-end justify-between">
                                <div>
                                    <p className="text-3xl font-bold text-gray-800">{r.quantity}</p>
                                    <p className="text-xs text-gray-400">{r.unit} available</p>
                                </div>
                                {r.status !== 'Available' && (
                                    <div className={`px-3 py-1.5 rounded-lg text-sm font-medium ${r.status === 'Out of Stock' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-yellow-50 text-yellow-700 border border-yellow-100'}`}>
                                        {r.status === 'Out of Stock' ? '⚠ Restock Now' : '⚠ Running Low'}
                                    </div>
                                )}
                            </div>

                            {/* Progress bar */}
                            <div className="mt-4">
                                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${r.status === 'Available' ? 'bg-green-400' : r.status === 'Low Stock' ? 'bg-yellow-400' : 'bg-red-400'}`}
                                        style={{ width: r.quantity === 0 ? '0%' : `${Math.min(r.quantity * 2, 100)}%` }}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="flex-1 text-xs border border-[#2563EB] text-[#2563EB] py-1.5 rounded-lg hover:bg-blue-50 flex items-center justify-center gap-1">
                                    <Edit2 size={11} /> Update Stock
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Add Resource Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Add New Resource</h2>
                            <button onClick={() => setShowModal(false)}><XCircle size={24} className="text-gray-400 hover:text-gray-600" /></button>
                        </div>
                        <div className="space-y-4">
                            {[['Resource Name', 'text', 'e.g. Scalpel Size 22'], ['Available Quantity', 'number', '0'], ['Unit', 'text', 'e.g. pcs, vials, sets']].map(([label, type, ph]) => (
                                <div key={label}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                                    <input type={type} placeholder={ph} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                                </div>
                            ))}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]">
                                    <option>Instrument</option><option>Drug</option><option>Equipment</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button className="flex-1 bg-[#2563EB] text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-all">Add Resource</button>
                            <button onClick={() => setShowModal(false)} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-lg font-semibold hover:bg-gray-50 transition-all">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
