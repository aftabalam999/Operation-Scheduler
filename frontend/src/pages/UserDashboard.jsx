import React, { useState, useEffect } from 'react';
import { Calendar, Stethoscope, FileText, Info } from 'lucide-react';

export default function UserDashboard() {
    const [activeTab, setActiveTab] = useState('schedules');
    const [doctors, setDoctors] = useState([]);
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        // Initial static fetch mock
        setDoctors([
            { id: 'd1', name: 'Dr. John Smith', specialty: 'Anesthesiologist', availableDays: 'Mon, Wed, Fri' },
            { id: 'd2', name: 'Dr. Sarah Connor', specialty: 'Surgeon', availableDays: 'Tue, Thu' }
        ]);
        setSchedules([
            {
                id: 's1', date: '2026-03-01T10:00', otId: 'OT-1', doctorIds: 'Dr. Sarah Connor',
                patientId: 'Michael Doe', surgeryType: 'Appendectomy', status: 'Scheduled'
            }
        ]);
    }, []);

    return (
        <div className="flex flex-col md:flex-row gap-6 h-[85vh]">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4 shrink-0">
                <h2 className="text-2xl font-bold border-b pb-4 text-gray-800">User Portal</h2>
                <button onClick={() => setActiveTab('schedules')} className={`flex items-center gap-3 p-3 rounded-lg transition-colors font-medium ${activeTab === 'schedules' ? 'bg-green-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}>
                    <Calendar size={20} /> View Schedules
                </button>
                <button onClick={() => setActiveTab('doctors')} className={`flex items-center gap-3 p-3 rounded-lg transition-colors font-medium ${activeTab === 'doctors' ? 'bg-green-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}>
                    <Stethoscope size={20} /> Doctor Details
                </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto bg-white rounded-2xl shadow-sm p-8">

                {/* Schedules Section */}
                {activeTab === 'schedules' && (
                    <div className="animate-fade-in">
                        <h3 className="text-3xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
                            <Calendar className="text-green-600" /> Surgical Information
                        </h3>
                        <div className="bg-green-50/50 p-6 rounded-xl border border-green-100 mb-6 shadow-sm">
                            <p className="flex items-center gap-2 text-green-800"><Info size={18} /> View upcoming operations and surgical info based on your assignments.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {schedules.map(s => (
                                <div key={s.id} className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start border-b pb-4 mb-4">
                                        <div>
                                            <h4 className="font-bold text-lg text-gray-900">{s.surgeryType}</h4>
                                            <p className="text-sm text-gray-500">{new Date(s.date).toLocaleString()} • {s.otId}</p>
                                        </div>
                                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full border border-blue-200">{s.status}</span>
                                    </div>
                                    <div className="space-y-2 text-sm text-gray-600">
                                        <p><span className="font-medium text-gray-700">Surgeon:</span> {s.doctorIds}</p>
                                        <p><span className="font-medium text-gray-700">Patient:</span> {s.patientId}</p>
                                        <p><span className="font-medium text-gray-700">Remarks:</span> No special remarks yet.</p>
                                    </div>
                                </div>
                            ))}
                            {schedules.length === 0 && <p className="text-gray-500 p-4">No schedules available right now.</p>}
                        </div>
                    </div>
                )}

                {/* Doctors Section */}
                {activeTab === 'doctors' && (
                    <div className="animate-fade-in">
                        <h3 className="text-3xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
                            <Stethoscope className="text-green-600" /> Doctor Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {doctors.map(d => (
                                <div key={d.id} className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:-translate-y-1 transition-transform">
                                    <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-xl mb-4">
                                        {d.name.charAt(4)}
                                    </div>
                                    <h4 className="font-bold text-lg text-gray-900">{d.name}</h4>
                                    <p className="text-indigo-600 font-medium text-sm mb-4">{d.specialty}</p>
                                    <p className="text-sm text-gray-600 border-t pt-4">
                                        <span className="font-semibold block mb-1">Available Days:</span>
                                        <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-md">{d.availableDays}</span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
