import React, { useState, useEffect } from 'react';
import { Plus, Users, Calendar, Stethoscope, FileText, CheckCircle, Activity } from 'lucide-react';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('schedules');
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [schedules, setSchedules] = useState([]);

    // States for new forms
    const [newDoctor, setNewDoctor] = useState({ name: '', specialty: '', availableDays: '' });
    const [newPatient, setNewPatient] = useState({ name: '', age: '', condition: '' });
    const [newSchedule, setNewSchedule] = useState({
        date: '', otId: '', doctorIds: '', anesthesiologistName: '', patientId: '', surgeryType: '', status: 'Scheduled'
    });

    // Since we are mocking the backend logic to work even if server is down, we use states
    useEffect(() => {
        // Initial static fetch mock
        setDoctors([
            { id: 'd1', name: 'Dr. John Smith', specialty: 'Anesthesiologist', availableDays: 'Mon, Wed, Fri' },
            { id: 'd2', name: 'Dr. Sarah Connor', specialty: 'Surgeon', availableDays: 'Tue, Thu' }
        ]);
        setPatients([
            { id: 'p1', name: 'Michael Doe', age: 45, condition: 'Appendicitis' }
        ]);
        setSchedules([
            {
                id: 's1', date: '2026-03-01T10:00', otId: 'OT-1', doctorIds: 'Dr. Sarah Connor',
                patientId: 'Michael Doe', surgeryType: 'Appendectomy', status: 'Scheduled'
            }
        ]);
    }, []);

    const handleAddDoctor = (e) => {
        e.preventDefault();
        setDoctors([...doctors, { id: `d${Date.now()}`, ...newDoctor }]);
        setNewDoctor({ name: '', specialty: '', availableDays: '' });
    };

    const handleAddPatient = (e) => {
        e.preventDefault();
        setPatients([...patients, { id: `p${Date.now()}`, ...newPatient }]);
        setNewPatient({ name: '', age: '', condition: '' });
    };

    const handleAddSchedule = (e) => {
        e.preventDefault();
        setSchedules([...schedules, { id: `s${Date.now()}`, ...newSchedule }]);
        setNewSchedule({ date: '', otId: '', doctorIds: '', anesthesiologistName: '', patientId: '', surgeryType: '', status: 'Scheduled' });
    };

    return (
        <div className="flex gap-6 h-[85vh]">
            {/* Sidebar Navigation */}
            <div className="w-64 bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
                <h2 className="text-2xl font-bold border-b pb-4 text-gray-800">Admin Panel</h2>
                <button onClick={() => setActiveTab('schedules')} className={`flex items-center gap-3 p-3 rounded-lg transition-colors font-medium ${activeTab === 'schedules' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}>
                    <Calendar size={20} /> OT Schedules
                </button>
                <button onClick={() => setActiveTab('doctors')} className={`flex items-center gap-3 p-3 rounded-lg transition-colors font-medium ${activeTab === 'doctors' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}>
                    <Stethoscope size={20} /> Manage Doctors
                </button>
                <button onClick={() => setActiveTab('patients')} className={`flex items-center gap-3 p-3 rounded-lg transition-colors font-medium ${activeTab === 'patients' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}>
                    <Users size={20} /> Manage Patients
                </button>
                <button onClick={() => setActiveTab('reports')} className={`flex items-center gap-3 p-3 rounded-lg transition-colors font-medium ${activeTab === 'reports' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}>
                    <Activity size={20} /> Activity & Reports
                </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto bg-white rounded-2xl shadow-sm p-8">

                {/* Doctors Section */}
                {activeTab === 'doctors' && (
                    <div className="animate-fade-in">
                        <h3 className="text-3xl font-extrabold text-gray-900 mb-6 flex items-center gap-2"><Stethoscope /> Manage Doctors</h3>
                        <form onSubmit={handleAddDoctor} className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 shadow-inner">
                            <input required type="text" placeholder="Doctor Name" value={newDoctor.name} onChange={e => setNewDoctor({ ...newDoctor, name: e.target.value })} className="p-3 rounded-md border text-sm" />
                            <input required type="text" placeholder="Specialty" value={newDoctor.specialty} onChange={e => setNewDoctor({ ...newDoctor, specialty: e.target.value })} className="p-3 rounded-md border text-sm" />
                            <input required type="text" placeholder="Available Days" value={newDoctor.availableDays} onChange={e => setNewDoctor({ ...newDoctor, availableDays: e.target.value })} className="p-3 rounded-md border text-sm" />
                            <button type="submit" className="md:col-span-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md p-3 font-semibold flex items-center justify-center gap-2 transition-colors"><Plus size={18} /> Add Doctor</button>
                        </form>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white rounded-lg overflow-hidden border">
                                <thead className="bg-gray-100 border-b">
                                    <tr><th className="py-3 px-4 text-left font-semibold">Name</th><th className="py-3 px-4 text-left font-semibold">Specialty</th><th className="py-3 px-4 text-left font-semibold">Availability</th></tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {doctors.map(d => (
                                        <tr key={d.id} className="hover:bg-gray-50"><td className="py-3 px-4">{d.name}</td><td className="py-3 px-4">{d.specialty}</td><td className="py-3 px-4"><span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{d.availableDays}</span></td></tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Patients Section */}
                {activeTab === 'patients' && (
                    <div className="animate-fade-in">
                        <h3 className="text-3xl font-extrabold text-gray-900 mb-6 flex items-center gap-2"><Users /> Manage Patients</h3>
                        <form onSubmit={handleAddPatient} className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 shadow-inner">
                            <input required type="text" placeholder="Patient Name" value={newPatient.name} onChange={e => setNewPatient({ ...newPatient, name: e.target.value })} className="p-3 rounded-md border text-sm" />
                            <input required type="number" placeholder="Age" value={newPatient.age} onChange={e => setNewPatient({ ...newPatient, age: e.target.value })} className="p-3 rounded-md border text-sm" />
                            <input required type="text" placeholder="Condition" value={newPatient.condition} onChange={e => setNewPatient({ ...newPatient, condition: e.target.value })} className="p-3 rounded-md border text-sm" />
                            <button type="submit" className="md:col-span-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md p-3 font-semibold flex items-center justify-center gap-2 transition-colors"><Plus size={18} /> Register Patient</button>
                        </form>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white rounded-lg overflow-hidden border">
                                <thead className="bg-gray-100 border-b">
                                    <tr><th className="py-3 px-4 text-left font-semibold">Name</th><th className="py-3 px-4 text-left font-semibold">Age</th><th className="py-3 px-4 text-left font-semibold">Condition</th></tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {patients.map(p => (
                                        <tr key={p.id} className="hover:bg-gray-50"><td className="py-3 px-4">{p.name}</td><td className="py-3 px-4">{p.age}</td><td className="py-3 px-4"><span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{p.condition}</span></td></tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Schedules Section */}
                {activeTab === 'schedules' && (
                    <div className="animate-fade-in">
                        <h3 className="text-3xl font-extrabold text-gray-900 mb-6 flex items-center gap-2"><Calendar /> Posting OT Schedules</h3>
                        <form onSubmit={handleAddSchedule} className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 shadow-inner">
                            <input required type="datetime-local" placeholder="Date & Time" value={newSchedule.date} onChange={e => setNewSchedule({ ...newSchedule, date: e.target.value })} className="p-3 rounded-md border text-sm" />
                            <input required type="text" placeholder="OT ID (e.g. OT-1)" value={newSchedule.otId} onChange={e => setNewSchedule({ ...newSchedule, otId: e.target.value })} className="p-3 rounded-md border text-sm" />
                            <select className="p-3 rounded-md border text-sm" value={newSchedule.doctorIds} onChange={e => setNewSchedule({ ...newSchedule, doctorIds: e.target.value })}>
                                <option value="">Select Primary Surgeon</option>
                                {doctors.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                            </select>
                            <select className="p-3 rounded-md border text-sm" value={newSchedule.patientId} onChange={e => setNewSchedule({ ...newSchedule, patientId: e.target.value })}>
                                <option value="">Select Patient</option>
                                {patients.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                            </select>
                            <input required type="text" placeholder="Surgery Type" value={newSchedule.surgeryType} onChange={e => setNewSchedule({ ...newSchedule, surgeryType: e.target.value })} className="p-3 rounded-md border text-sm" />
                            <input required type="text" placeholder="Anesthesiologist" value={newSchedule.anesthesiologistName} onChange={e => setNewSchedule({ ...newSchedule, anesthesiologistName: e.target.value })} className="p-3 rounded-md border text-sm" />

                            <button type="submit" className="md:col-span-2 lg:col-span-3 bg-green-600 hover:bg-green-700 text-white rounded-md p-3 font-semibold flex items-center justify-center gap-2 transition-colors"><Plus size={18} /> Schedule Operation</button>
                        </form>

                        <div className="overflow-x-auto mt-6">
                            <table className="min-w-full bg-white rounded-lg overflow-hidden border">
                                <thead className="bg-gray-100 border-b">
                                    <tr><th className="py-3 px-4 text-left font-semibold">Date</th><th className="py-3 px-4 text-left font-semibold">OT Info</th><th className="py-3 px-4 text-left font-semibold">Surgeon</th><th className="py-3 px-4 text-left font-semibold">Patient</th><th className="py-3 px-4 text-left font-semibold">Status</th></tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {schedules.map(s => (
                                        <tr key={s.id} className="hover:bg-gray-50 border-l-4 border-l-green-500">
                                            <td className="py-3 px-4 whitespace-nowrap">{new Date(s.date).toLocaleString()}</td>
                                            <td className="py-3 px-4 font-bold text-gray-700">{s.otId} - {s.surgeryType}</td>
                                            <td className="py-3 px-4">{s.doctorIds}</td>
                                            <td className="py-3 px-4">{s.patientId}</td>
                                            <td className="py-3 px-4"><span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{s.status}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Reports Section */}
                {activeTab === 'reports' && (
                    <div className="animate-fade-in">
                        <h3 className="text-3xl font-extrabold text-gray-900 mb-6 flex items-center gap-2"><Activity /> OT Efficiency & Reports</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl text-white shadow-xl">
                                <p className="text-indigo-100 font-medium">Total Operations Scheduled</p>
                                <h4 className="text-5xl font-bold mt-2">{schedules.length}</h4>
                                <p className="text-sm mt-4 text-indigo-100 opacity-80">+2 this week</p>
                            </div>
                            <div className="p-6 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl text-white shadow-xl">
                                <p className="text-green-100 font-medium">Active Surgeons</p>
                                <h4 className="text-5xl font-bold mt-2">{doctors.length}</h4>
                                <p className="text-sm mt-4 text-green-100 opacity-80">Available across all OTs</p>
                            </div>
                        </div>

                        <div className="mt-8 bg-gray-50 p-6 rounded-xl border border-gray-100">
                            <h4 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">OT Resource Use Logs</h4>
                            <ul className="space-y-3">
                                <li className="flex justify-between items-center text-sm p-3 bg-white rounded shadow-sm">
                                    <span><CheckCircle size={16} className="inline text-green-500 mr-2" /> OT-1 Pre-operative checks completed.</span>
                                    <span className="text-gray-400">10 mins ago</span>
                                </li>
                                <li className="flex justify-between items-center text-sm p-3 bg-white rounded shadow-sm">
                                    <span><CheckCircle size={16} className="inline text-green-500 mr-2" /> OT-2 Requesting additional anesthesia materials.</span>
                                    <span className="text-gray-400">1 hour ago</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
