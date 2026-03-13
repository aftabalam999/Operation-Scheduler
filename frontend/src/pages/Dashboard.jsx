import React from 'react';
import {
    Users,
    Activity,
    CheckCircle,
    AlertTriangle
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

// Dummy data for visualization
const chartData = [
    { name: 'OT-1', utilization: 85, ideal: 75 },
    { name: 'OT-2', utilization: 60, ideal: 75 },
    { name: 'OT-3', utilization: 90, ideal: 75 },
    { name: 'OT-4', utilization: 40, ideal: 75 },
    { name: 'OT-5', utilization: 75, ideal: 75 },
];

const scheduledSurgeries = [
    { id: 'SURG-101', time: '08:00 AM', patient: 'John Doe', doctor: 'Dr. Smith', type: 'Appendectomy', ot: 'OT-1', status: 'In Progress', priority: 'Normal' },
    { id: 'SURG-102', time: '10:30 AM', patient: 'Jane Roe', doctor: 'Dr. Allen', type: 'C-Section', ot: 'OT-3', status: 'Emergency', priority: 'Emergency' },
    { id: 'SURG-103', time: '01:00 PM', patient: 'Sam Smith', doctor: 'Dr. Jones', type: 'Knee Replacement', ot: 'OT-2', status: 'Scheduled', priority: 'Normal' },
    { id: 'SURG-104', time: '03:15 PM', patient: 'Mary Jane', doctor: 'Dr. Patel', type: 'Hernia Repair', ot: 'OT-1', status: 'Scheduled', priority: 'Normal' },
];

const getStatusBadge = (status) => {
    switch (status) {
        case 'Scheduled': return <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Scheduled</span>;
        case 'In Progress': return <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">In Progress</span>;
        case 'Completed': return <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Completed</span>;
        case 'Emergency': return <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">Emergency</span>;
        default: return <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
    }
};

const Dashboard = () => {
    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Hospital Output Dashboard</h1>
                    <p className="text-gray-500 mt-1">Welcome back. Here is the operational overview for today.</p>
                </div>
                <button className="bg-primary hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition-all font-medium flex items-center gap-2">
                    <Activity size={18} />
                    New Surgery
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-500 font-medium mb-1">Total Surgeries Today</p>
                        <h3 className="text-3xl font-bold text-gray-800">12</h3>
                    </div>
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-primary">
                        <Activity size={24} />
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-500 font-medium mb-1">Active Doctors</p>
                        <h3 className="text-3xl font-bold text-gray-800">8</h3>
                    </div>
                    <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center text-secondary">
                        <Users size={24} />
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-500 font-medium mb-1">Available OT Rooms</p>
                        <h3 className="text-3xl font-bold text-gray-800">2 / 5</h3>
                    </div>
                    <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-500">
                        <CheckCircle size={24} />
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-2 h-full bg-purple-500"></div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium mb-1">Emergency Cases</p>
                        <h3 className="text-3xl font-bold text-purple-600">3</h3>
                    </div>
                    <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-600">
                        <AlertTriangle size={24} />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Today's Schedule Table */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                        <h3 className="text-lg font-semibold text-gray-800">Today's OT Schedule</h3>
                        <button className="text-primary text-sm font-medium hover:underline">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white border-b border-gray-100 text-sm text-gray-500">
                                    <th className="p-4 font-medium">Time</th>
                                    <th className="p-4 font-medium">Patient</th>
                                    <th className="p-4 font-medium">Doctor</th>
                                    <th className="p-4 font-medium">OT Room</th>
                                    <th className="p-4 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scheduledSurgeries.map((surg, index) => (
                                    <tr key={index} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                        <td className="p-4 text-sm font-medium text-gray-800">{surg.time}</td>
                                        <td className="p-4">
                                            <p className="text-sm font-semibold">{surg.patient}</p>
                                            <p className="text-xs text-gray-500">{surg.type}</p>
                                        </td>
                                        <td className="p-4 text-sm text-gray-600">{surg.doctor}</td>
                                        <td className="p-4 text-sm text-gray-600 font-medium">{surg.ot}</td>
                                        <td className="p-4">{getStatusBadge(surg.status)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Analytics Chart */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-800 mb-6">OT Utilization (%)</h3>
                    <div className="flex-1 min-h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                                <Tooltip
                                    cursor={{ fill: '#F3F4F6' }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                />
                                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} />
                                <Bar dataKey="utilization" name="Actual Usage" fill="#2563EB" radius={[4, 4, 0, 0]} barSize={24} />
                                <Bar dataKey="ideal" name="Target" fill="#E5E7EB" radius={[4, 4, 0, 0]} barSize={24} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
