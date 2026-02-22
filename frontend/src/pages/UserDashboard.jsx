import React, { useState, useEffect } from 'react';
import { Calendar, Stethoscope, FileText, Info, Activity } from 'lucide-react';

export default function UserDashboard() {
    const [activeTab, setActiveTab] = useState('schedules');
    const [doctors, setDoctors] = useState([]);
    const [schedules, setSchedules] = useState([]);

    // Fetch from the mocked backend
    useEffect(() => {
        fetch('http://localhost:5000/api/doctors')
            .then(res => res.json())
            .then(data => setDoctors(data))
            .catch(e => console.error(e));

        fetch('http://localhost:5000/api/schedules')
            .then(res => res.json())
            .then(data => setSchedules(data))
            .catch(e => console.error(e));
    }, []);

    const statusColors = {
        'Scheduled': 'bg-blue-100 text-blue-800 border-blue-200',
        'Emergency': 'bg-red-100 text-red-800 border-red-200',
        'Postponed': 'bg-yellow-100 text-yellow-800 border-yellow-200',
        'Completed': 'bg-green-100 text-green-800 border-green-200',
        'Cancelled': 'bg-gray-100 text-gray-800 border-gray-200',
    };

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
                    <div className="animate-fade-in pb-12">
                        <h3 className="text-3xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
                            <Activity className="text-green-600" /> Surgical Information Viewer
                        </h3>
                        <div className="bg-green-50/50 p-6 rounded-xl border border-green-100 mb-6 shadow-sm">
                            <p className="flex items-center gap-2 text-green-800"><Info size={18} /> View upcoming operations, medical prerequisites, and assigned teams.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {schedules.map(s => (
                                <div key={s.id} className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                                    <div className={`absolute top-0 left-0 w-1.5 h-full ${s.status === 'Emergency' ? 'bg-red-500' : 'bg-green-500'}`}></div>

                                    <div className="flex justify-between items-start border-b pb-4 mb-4">
                                        <div>
                                            <h4 className="font-bold text-lg text-gray-900">{s.surgeryType}</h4>
                                            <p className="text-sm font-semibold text-gray-500">{new Date(s.date).toLocaleString()} • {s.otId}</p>
                                        </div>
                                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${statusColors[s.status] || 'bg-gray-100'}`}>{s.status}</span>
                                    </div>

                                    <div className="space-y-3 text-sm text-gray-600">
                                        <p><span className="font-medium text-gray-500 block uppercase text-[10px] tracking-wider">Patient ID</span> <span className="text-gray-800">{s.patientId}</span></p>
                                        <div className="bg-gray-50 p-3 rounded-lg border">
                                            <p className="font-medium text-gray-500 uppercase text-[10px] tracking-wider mb-1">Medical Team</p>
                                            <p><strong>Primary Surgeon:</strong> {s.doctorIds}</p>
                                            {s.medicName && <p><strong>Medic/Assistant:</strong> {s.medicName}</p>}
                                            <p><strong>Anesthesia:</strong> {s.anesthesiologistName} ({s.anesthesiaType})</p>
                                            {s.nurses && <p><strong>Nurses:</strong> {s.nurses}</p>}
                                        </div>

                                        <div className="space-y-1 mt-2">
                                            <p><span className="font-medium text-gray-700">Pre/Post Events:</span> {s.prePostEvents || 'None recorded'}</p>
                                            <p><span className="font-medium text-gray-700">Drugs & Materials:</span> {s.drugsAndMaterials || 'Standard toolkit'}</p>
                                            <p><span className="font-medium text-gray-700">Reports:</span> {s.surgicalReports || 'Not attached'}</p>
                                            <p><span className="font-medium text-gray-700">Remarks:</span> {s.remarks || 'None'}</p>
                                        </div>
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
                            <Stethoscope className="text-green-600" /> Reference Directory
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {doctors.map(d => (
                                <div key={d.id} className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:-translate-y-1 transition-transform relative">
                                    <div className="absolute top-4 right-4 bg-indigo-50 text-indigo-700 text-[10px] uppercase font-bold px-2 py-1 rounded">Medical Staff</div>
                                    <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-xl mb-4">
                                        {d.name.includes(' ') ? d.name.split(' ')[1]?.charAt(0) : d.name.charAt(0)}
                                    </div>
                                    <h4 className="font-bold text-lg text-gray-900">{d.name}</h4>
                                    <p className="text-indigo-600 font-medium text-sm mb-4">{d.specialty}</p>
                                    <p className="text-sm text-gray-600 border-t pt-4">
                                        <span className="font-semibold block mb-1 text-gray-400 uppercase tracking-widest text-[10px]">Availability</span>
                                        <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-md">{Array.isArray(d.availableDays) ? d.availableDays.join(', ') : d.availableDays}</span>
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
