import React, { useState } from 'react';
import { FileText, Search, XCircle, Plus, User, Calendar, CheckCircle } from 'lucide-react';

const reportsData = [
    { id: 'RPT-001', surgeryId: 'SURG-105', patient: 'Robert Fox', surgeon: 'Dr. Chen', type: 'Cardiac Bypass', date: '2026-03-07', status: 'Filed', notes: 'Successful triple bypass. Patient stable post-op. No complications.', postOp: 'ICU for 48 hrs, ECG monitoring, low-sodium diet.', complications: 'None' },
    { id: 'RPT-002', surgeryId: 'SURG-106', patient: 'Amelia Wade', surgeon: 'Dr. Patel', type: 'Gallbladder Removal', date: '2026-03-07', status: 'Filed', notes: 'Laparoscopic cholecystectomy completed. Minimal blood loss.', postOp: 'Light diet for 3 days. Wound dressing in 48 hrs.', complications: 'Minor bleeding controlled with cauterization.' },
    { id: 'RPT-003', surgeryId: 'SURG-101', patient: 'John Doe', surgeon: 'Dr. Smith', type: 'Appendectomy', date: '2026-03-08', status: 'Pending', notes: 'Surgery in progress...', postOp: '-', complications: '-' },
];

export default function Reports() {
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const filtered = reportsData.filter(r =>
        r.patient.toLowerCase().includes(search.toLowerCase()) ||
        r.type.toLowerCase().includes(search.toLowerCase()) ||
        r.surgeon.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Surgical Reports</h1>
                    <p className="text-gray-500 mt-1">Operative notes, post-operative instructions, and complication records</p>
                </div>
                <button onClick={() => setShowModal(true)} className="bg-[#2563EB] text-white px-6 py-2.5 rounded-lg shadow font-medium flex items-center gap-2 hover:bg-blue-700 transition-all">
                    <Plus size={18} /> New Report
                </button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                    { label: 'Total Reports', val: reportsData.length, color: 'text-[#2563EB]' },
                    { label: 'Filed', val: reportsData.filter(r => r.status === 'Filed').length, color: 'text-green-600' },
                    { label: 'Pending', val: reportsData.filter(r => r.status === 'Pending').length, color: 'text-orange-500' },
                ].map(({ label, val, color }) => (
                    <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 text-center">
                        <p className={`text-3xl font-bold ${color}`}>{val}</p>
                        <p className="text-sm text-gray-500 mt-1">{label}</p>
                    </div>
                ))}
            </div>

            <div className="relative mb-6">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search by patient, surgery type, surgeon..." value={search} onChange={e => setSearch(e.target.value)}
                    className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#2563EB] bg-white text-sm" />
            </div>

            <div className="space-y-4">
                {filtered.map(r => (
                    <div key={r.id} onClick={() => setSelected(r)}
                        className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 cursor-pointer hover:shadow-md transition-all flex items-start gap-5">
                        <div className="w-12 h-12 rounded-full bg-[#2563EB]/10 flex items-center justify-center flex-shrink-0">
                            <FileText size={22} className="text-[#2563EB]" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-gray-800">{r.patient} – {r.type}</h3>
                                    <p className="text-sm text-gray-500 mt-0.5">Surgeon: {r.surgeon} · Surgery: {r.surgeryId}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${r.status === 'Filed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                        {r.status === 'Filed' ? <CheckCircle size={11} className="inline mr-1" /> : null}{r.status}
                                    </span>
                                    <span className="text-xs text-gray-400">{r.date}</span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 mt-2 line-clamp-2">{r.notes}</p>
                        </div>
                    </div>
                ))}
            </div>

            {selected && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setSelected(null)}>
                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <p className="text-xs font-mono text-gray-400">{selected.id} · {selected.surgeryId}</p>
                                <h2 className="text-xl font-bold text-gray-800 mt-1">{selected.patient}</h2>
                                <p className="text-[#14B8A6] font-medium">{selected.type}</p>
                            </div>
                            <button onClick={() => setSelected(null)}><XCircle size={22} className="text-gray-400 hover:text-gray-600" /></button>
                        </div>
                        {[
                            ['Surgeon', selected.surgeon],
                            ['Date', selected.date],
                            ['Status', selected.status],
                        ].map(([l, v]) => (
                            <div key={l} className="flex justify-between py-2.5 border-b border-gray-50 text-sm">
                                <span className="text-gray-500">{l}</span>
                                <span className="font-semibold text-gray-800">{v}</span>
                            </div>
                        ))}
                        <div className="mt-4 space-y-4">
                            {[['Operative Notes', selected.notes], ['Post-Op Instructions', selected.postOp], ['Complications', selected.complications]].map(([l, v]) => (
                                <div key={l}>
                                    <p className="text-sm font-semibold text-gray-600 mb-1">{l}</p>
                                    <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">{v}</p>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-6 bg-[#2563EB] text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-all">Edit Report</button>
                    </div>
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">New Surgical Report</h2>
                            <button onClick={() => setShowModal(false)}><XCircle size={24} className="text-gray-400 hover:text-gray-600" /></button>
                        </div>
                        <div className="space-y-4">
                            {[['Surgery ID / Reference', 'text', 'e.g. SURG-101'], ['Patient Name', 'text', 'John Doe'], ['Surgeon', 'text', 'Dr. Smith']].map(([label, type, ph]) => (
                                <div key={label}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                                    <input type={type} placeholder={ph} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]" />
                                </div>
                            ))}
                            {[['Operative Notes', 'Describe the procedure and findings...'], ['Post-Op Instructions', 'Recovery and follow-up instructions...'], ['Complications', 'Describe any complications or None']].map(([label, ph]) => (
                                <div key={label}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                                    <textarea rows={3} placeholder={ph} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] resize-none" />
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button className="flex-1 bg-[#2563EB] text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-all">File Report</button>
                            <button onClick={() => setShowModal(false)} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-lg font-semibold hover:bg-gray-50 transition-all">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
