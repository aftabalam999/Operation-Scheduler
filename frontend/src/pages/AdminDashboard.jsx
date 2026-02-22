import React, { useState, useEffect } from 'react';
import { Plus, Users, Calendar, Stethoscope, CheckCircle, Activity, FileText } from 'lucide-react';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('schedules');
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [logs, setLogs] = useState([]);

    // Date filtering
    const [filterDate, setFilterDate] = useState('');

    // States for new forms
    const [newDoctor, setNewDoctor] = useState({ name: '', specialty: '', availableDays: '' });
    const [newPatient, setNewPatient] = useState({ name: '', age: '', condition: '' });

    // Comprehensive schedule states corresponding to required functionalities
    const [newSchedule, setNewSchedule] = useState({
        date: '', otId: '', doctorIds: '', medicName: '', anesthesiaType: '', anesthesiologistName: '',
        nurses: '', patientId: '', surgeryType: '', status: 'Scheduled',
        prePostEvents: '', surgicalReports: '', remarks: '', drugsAndMaterials: ''
    });

    useEffect(() => {
        // Calling our comprehensive Mock Backend API
        fetch('http://localhost:5000/api/doctors').then(res => res.json()).then(data => setDoctors(data)).catch(e => console.error("API error", e));
        fetch('http://localhost:5000/api/patients').then(res => res.json()).then(data => setPatients(data)).catch(e => console.error("API error", e));
        fetch('http://localhost:5000/api/schedules').then(res => res.json()).then(data => setSchedules(data)).catch(e => console.error("API error", e));
        fetch('http://localhost:5000/api/logs').then(res => res.json()).then(data => setLogs(data)).catch(e => console.error("API error", e));
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

    const statusColors = {
        'Scheduled': 'bg-blue-100 text-blue-800',
        'Emergency': 'bg-red-100 text-red-800',
        'Postponed': 'bg-yellow-100 text-yellow-800',
        'Completed': 'bg-green-100 text-green-800',
        'Cancelled': 'bg-gray-100 text-gray-800',
    };

    // Filter schedules based on user date selection (viewing previous/future days)
    const filteredSchedules = filterDate
        ? schedules.filter(s => s.date.startsWith(filterDate))
        : schedules;

    return (
        <div className="flex gap-6 h-[85vh]">
            {/* Sidebar Navigation */}
            <div className="w-64 bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4 overflow-y-auto">
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
                        <h3 className="text-3xl font-extrabold text-gray-900 mb-6 flex items-center gap-2"><Stethoscope /> Manage Doctors & Medics</h3>
                        <form onSubmit={handleAddDoctor} className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 shadow-inner">
                            <input required type="text" placeholder="Full Name" value={newDoctor.name} onChange={e => setNewDoctor({ ...newDoctor, name: e.target.value })} className="p-3 rounded-md border text-sm" />
                            <input required type="text" placeholder="Specialty (e.g., Surgeon, Assistant)" value={newDoctor.specialty} onChange={e => setNewDoctor({ ...newDoctor, specialty: e.target.value })} className="p-3 rounded-md border text-sm" />
                            <input required type="text" placeholder="Available Days" value={newDoctor.availableDays} onChange={e => setNewDoctor({ ...newDoctor, availableDays: e.target.value })} className="p-3 rounded-md border text-sm" />
                            <button type="submit" className="md:col-span-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md p-3 font-semibold flex items-center justify-center gap-2 transition-colors"><Plus size={18} /> Register Doctor</button>
                        </form>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white rounded-lg overflow-hidden border">
                                <thead className="bg-gray-100 border-b">
                                    <tr><th className="py-3 px-4 text-left font-semibold">Name</th><th className="py-3 px-4 text-left font-semibold">Specialty</th><th className="py-3 px-4 text-left font-semibold">Availability</th></tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {doctors.map(d => (
                                        <tr key={d.id} className="hover:bg-gray-50"><td className="py-3 px-4">{d.name}</td><td className="py-3 px-4">{d.specialty}</td><td className="py-3 px-4"><span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{Array.isArray(d.availableDays) ? d.availableDays.join(', ') : d.availableDays}</span></td></tr>
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
                    <div className="animate-fade-in pb-12">
                        <h3 className="text-3xl font-extrabold text-gray-900 mb-6 flex items-center gap-2"><Calendar /> Posting OT Schedules</h3>

                        <form onSubmit={handleAddSchedule} className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 shadow-inner">
                            <div className="md:col-span-2 lg:col-span-3 border-b pb-2 mb-2 font-bold text-gray-700 uppercase text-sm tracking-wider">General Information</div>
                            <input required type="datetime-local" placeholder="Date & Time" value={newSchedule.date} onChange={e => setNewSchedule({ ...newSchedule, date: e.target.value })} className="p-3 rounded-md border text-sm" />
                            <input required type="text" placeholder="OT ID (e.g. OT-1)" value={newSchedule.otId} onChange={e => setNewSchedule({ ...newSchedule, otId: e.target.value })} className="p-3 rounded-md border text-sm" />

                            <select required className="p-3 rounded-md border text-sm" value={newSchedule.patientId} onChange={e => setNewSchedule({ ...newSchedule, patientId: e.target.value })}>
                                <option value="">Select Patient</option>
                                {patients.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                            </select>
                            <input required type="text" placeholder="Surgery Type" value={newSchedule.surgeryType} onChange={e => setNewSchedule({ ...newSchedule, surgeryType: e.target.value })} className="p-3 rounded-md border text-sm" />

                            <select className="p-3 rounded-md border text-sm" value={newSchedule.status} onChange={e => setNewSchedule({ ...newSchedule, status: e.target.value })}>
                                <option value="Scheduled">Scheduled</option>
                                <option value="Emergency">Emergency</option>
                                <option value="Postponed">Postponed</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>

                            <div className="md:col-span-2 lg:col-span-3 border-b pb-2 mt-4 mb-2 font-bold text-gray-700 uppercase text-sm tracking-wider">Medical Team</div>
                            <select className="p-3 rounded-md border text-sm" value={newSchedule.doctorIds} onChange={e => setNewSchedule({ ...newSchedule, doctorIds: e.target.value })}>
                                <option value="">Select Primary Surgeon</option>
                                {doctors.map(d => <option key={d.id} value={d.name}>{d.name} ({d.specialty})</option>)}
                            </select>
                            <input type="text" placeholder="Medic / Assistant Surgeon" value={newSchedule.medicName} onChange={e => setNewSchedule({ ...newSchedule, medicName: e.target.value })} className="p-3 rounded-md border text-sm" />
                            <input type="text" placeholder="Type of Anesthesia (e.g. Local, General)" value={newSchedule.anesthesiaType} onChange={e => setNewSchedule({ ...newSchedule, anesthesiaType: e.target.value })} className="p-3 rounded-md border text-sm" />
                            <input type="text" placeholder="Anesthesiologist Name" value={newSchedule.anesthesiologistName} onChange={e => setNewSchedule({ ...newSchedule, anesthesiologistName: e.target.value })} className="p-3 rounded-md border text-sm" />
                            <input type="text" placeholder="Nurses Involved (comma separated)" value={newSchedule.nurses} onChange={e => setNewSchedule({ ...newSchedule, nurses: e.target.value })} className="p-3 rounded-md border text-sm" />

                            <div className="md:col-span-2 lg:col-span-3 border-b pb-2 mt-4 mb-2 font-bold text-gray-700 uppercase text-sm tracking-wider">Reports & Requirements</div>
                            <textarea placeholder="Drugs, Instruments & Materials Required" value={newSchedule.drugsAndMaterials} onChange={e => setNewSchedule({ ...newSchedule, drugsAndMaterials: e.target.value })} className="p-3 rounded-md border text-sm md:col-span-2 lg:col-span-3 min-h-[80px]" />
                            <textarea placeholder="Pre/Post-Operative Events Tracked" value={newSchedule.prePostEvents} onChange={e => setNewSchedule({ ...newSchedule, prePostEvents: e.target.value })} className="p-3 rounded-md border text-sm lg:col-span-1 min-h-[80px]" />
                            <textarea placeholder="Surgical Reports Attached (links/notes)" value={newSchedule.surgicalReports} onChange={e => setNewSchedule({ ...newSchedule, surgicalReports: e.target.value })} className="p-3 rounded-md border text-sm lg:col-span-1 min-h-[80px]" />
                            <textarea placeholder="Remarks / Operational Notes" value={newSchedule.remarks} onChange={e => setNewSchedule({ ...newSchedule, remarks: e.target.value })} className="p-3 rounded-md border text-sm lg:col-span-1 min-h-[80px]" />

                            <button type="submit" className="md:col-span-2 lg:col-span-3 bg-green-600 hover:bg-green-700 text-white rounded-md p-3 font-semibold flex items-center justify-center gap-2 transition-colors mt-2"><Plus size={18} /> Schedule Operation</button>
                        </form>

                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-xl font-bold text-gray-800">Current Assignments</h4>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600 font-medium">Filter by Date:</span>
                                <input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className="p-2 border rounded-md shadow-sm text-sm" />
                                <button onClick={() => setFilterDate('')} className="text-xs px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-gray-700">Clear</button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white rounded-lg overflow-hidden border">
                                <thead className="bg-gray-100 border-b">
                                    <tr><th className="py-3 px-4 text-left font-semibold">Date</th><th className="py-3 px-4 text-left font-semibold">OT Info</th><th className="py-3 px-4 text-left font-semibold">Surgeon & Medics</th><th className="py-3 px-4 text-left font-semibold">Reports & Requests</th><th className="py-3 px-4 text-left font-semibold">Status</th></tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredSchedules.map(s => (
                                        <tr key={s.id} className="hover:bg-gray-50 border-l-4 border-l-green-500">
                                            <td className="py-3 px-4 whitespace-nowrap">
                                                <div className="font-bold">{new Date(s.date).toLocaleDateString()}</div>
                                                <div className="text-sm text-gray-500">{new Date(s.date).toLocaleTimeString()}</div>
                                                <div className="text-xs mt-1 text-gray-400">Patient: {s.patientId}</div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className="font-bold text-gray-700">{s.otId}</span>
                                                <br /><span className="text-sm text-gray-600">{s.surgeryType}</span>
                                            </td>
                                            <td className="py-3 px-4 text-sm max-w-[200px]">
                                                <strong>Primary:</strong> {s.doctorIds}<br />
                                                <strong>Asst:</strong> {s.medicName || 'N/A'}<br />
                                                <strong>Anes:</strong> {s.anesthesiologistName} ({s.anesthesiaType})<br />
                                                <strong>Nurses:</strong> {s.nurses || 'N/A'}
                                            </td>
                                            <td className="py-3 px-4 text-sm max-w-[250px]">
                                                <div className="truncate" title={s.drugsAndMaterials}><strong>Needs:</strong> {s.drugsAndMaterials || 'None'}</div>
                                                <div className="truncate" title={s.surgicalReports}><strong>Reports:</strong> {s.surgicalReports || 'None'}</div>
                                                <div className="truncate" title={s.remarks}><strong>Remarks:</strong> {s.remarks || 'None'}</div>
                                            </td>
                                            <td className="py-3 px-4"><span className={`${statusColors[s.status] || 'bg-blue-100 text-blue-800'} text-xs font-bold px-2.5 py-1 rounded-full border`}>{s.status}</span></td>
                                        </tr>
                                    ))}
                                    {filteredSchedules.length === 0 && (
                                        <tr><td colSpan="5" className="text-center py-6 text-gray-500">No schedules found for selected parameters.</td></tr>
                                    )}
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
                                <p className="text-indigo-100 font-medium">Total Operations Logged</p>
                                <h4 className="text-5xl font-bold mt-2">{schedules.length}</h4>
                            </div>
                            <div className="p-6 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl text-white shadow-xl">
                                <p className="text-green-100 font-medium">Emergency Procedures</p>
                                <h4 className="text-5xl font-bold mt-2">{schedules.filter(s => s.status === 'Emergency').length}</h4>
                            </div>
                        </div>

                        <div className="mt-8 bg-gray-50 p-6 rounded-xl border border-gray-100">
                            <h4 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2"><FileText size={18} /> Activity Log</h4>
                            <ul className="space-y-3">
                                {logs.map(log => (
                                    <li key={log.id} className="flex justify-between items-center text-sm p-3 bg-white rounded shadow-sm border-l-2 border-l-blue-500">
                                        <span><CheckCircle size={16} className="inline text-blue-500 mr-2" /> {log.text}</span>
                                        <span className="text-gray-400 text-xs">{log.time}</span>
                                    </li>
                                ))}
                                {logs.length === 0 && <span className="text-gray-500 text-sm">No recent activity.</span>}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
