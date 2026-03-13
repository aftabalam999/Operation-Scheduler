import React, { useState } from 'react';
import {
    LogOut, Activity, Calendar, FileText, Stethoscope,
    CheckCircle, AlertTriangle,
    User, Pill, Heart, ClipboardList, Bell, Mail
} from 'lucide-react';

// ─── Hardcoded records only for the DEMO patient (patient@hospital.com) ───────
const DEMO_PATIENT_EMAIL = 'patient@hospital.com';

const DEMO_EXTRA = {
    age: 45,
    gender: 'Male',
    bloodGroup: 'O+',
    contact: '+1-555-1001',
    admittedOn: '2026-03-01',
    ward: 'Ward B, Bed 12',
    patientId: 'PAT-001',
    assignedDoctor: 'Dr. Arjun Smith',
    doctorSpec: 'Cardiothoracic Surgery',
    doctorPhone: '+1-555-0101',
    medicalHistory: ['Hypertension', 'Type 2 Diabetes'],
    surgeries: [
        {
            id: 'SURG-101', type: 'Appendectomy', date: '2026-03-08', time: '08:00 AM',
            ot: 'OT-1', surgeon: 'Dr. Arjun Smith', anesthesiologist: 'Dr. Elena Kim',
            status: 'In Operation', preOpInstructions: 'Fasting 8 hours before. No medication after midnight.',
        },
    ],
    reports: [
        {
            id: 'RPT-001', type: 'Pre-Op Assessment', date: '2026-03-07', doctor: 'Dr. Smith',
            notes: 'Patient cleared for surgery. BP controlled at 130/80. Diabetic levels stable.', status: 'Filed',
        },
    ],
    medications: [
        { name: 'Metformin 500mg', frequency: 'Twice daily', note: 'With meals' },
        { name: 'Amlodipine 5mg', frequency: 'Once daily', note: 'Morning' },
        { name: 'Aspirin 75mg', frequency: 'Once daily', note: 'After breakfast' },
    ],
};

// ─── Surgery timeline ──────────────────────────────────────────────────────────
const STAGES = ['Scheduled', 'Pre-Operation', 'In Operation', 'Post-Operation', 'Completed'];
const STAGE_COLORS = ['bg-blue-500', 'bg-yellow-500', 'bg-orange-500', 'bg-indigo-500', 'bg-green-500'];

const statusBadge = (s) => ({
    'Scheduled': 'bg-blue-100 text-blue-800',
    'Pre-Operation': 'bg-yellow-100 text-yellow-800',
    'In Operation': 'bg-orange-100 text-orange-800',
    'Post-Operation': 'bg-indigo-100 text-indigo-800',
    'Completed': 'bg-green-100 text-green-800',
}[s] || 'bg-gray-100 text-gray-800');

const SurgeryTimeline = ({ status }) => {
    const current = STAGES.indexOf(status);
    return (
        <div className="mt-3">
            <div className="flex items-center gap-1">
                {STAGES.map((s, i) => (
                    <React.Fragment key={s}>
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${i <= current ? STAGE_COLORS[i] + ' border-transparent shadow-sm' : 'bg-white border-gray-300'}`}>
                            {i < current && <CheckCircle size={10} className="text-white" />}
                        </div>
                        {i < STAGES.length - 1 && <div className={`flex-1 h-1 rounded-full ${i < current ? 'bg-green-400' : 'bg-gray-200'}`} />}
                    </React.Fragment>
                ))}
            </div>
            <div className="flex justify-between mt-1">
                {STAGES.map(s => <span key={s} className="text-[9px] text-gray-400 text-center" style={{ width: '60px' }}>{s}</span>)}
            </div>
        </div>
    );
};

// ─── Empty state ───────────────────────────────────────────────────────────────
const EmptyState = ({ icon, label }) => (
    <div className="text-center py-16 text-gray-400">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 opacity-60">{icon}</div>
        <p className="font-medium">{label}</p>
        <p className="text-xs mt-1 text-gray-300">Your doctor will update this information</p>
    </div>
);

// ─── Main Component ────────────────────────────────────────────────────────────
export default function PatientPortal({ user, onLogout }) {
    const [activeTab, setActiveTab] = useState('overview');

    // Use demo data only for the demo patient account; for all others, show the user's own info
    const isDemo = user?.email?.toLowerCase() === DEMO_PATIENT_EMAIL;
    const extra = isDemo ? DEMO_EXTRA : {};

    // Build the patient profile from the logged-in user + any demo extras
    const profile = {
        name: user?.name || 'Patient',
        email: user?.email || '—',
        patientId: user?.patientId || extra.patientId || 'Pending Assignment',
        age: extra.age || '—',
        gender: extra.gender || '—',
        bloodGroup: extra.bloodGroup || 'Not recorded',
        contact: extra.contact || user?.email || '—',
        admittedOn: extra.admittedOn || 'Not admitted yet',
        ward: extra.ward || 'Not assigned',
        assignedDoctor: extra.assignedDoctor || null,
        doctorSpec: extra.doctorSpec || '',
        doctorPhone: extra.doctorPhone || '',
        medicalHistory: extra.medicalHistory || [],
        surgeries: extra.surgeries || [],
        reports: extra.reports || [],
        medications: extra.medications || [],
    };

    const tabs = [
        { id: 'overview', label: 'Overview', icon: <Activity size={16} /> },
        { id: 'surgeries', label: 'My Surgeries', icon: <Calendar size={16} /> },
        { id: 'reports', label: 'Reports', icon: <FileText size={16} /> },
        { id: 'medications', label: 'Medications', icon: <Pill size={16} /> },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F0F4FF] to-[#E8FDF8]">
            {/* Header */}
            <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40">
                <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#2563EB] rounded-xl flex items-center justify-center">
                            <Activity size={20} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-gray-800">Patient Portal</h1>
                            <p className="text-xs text-gray-500">OT Scheduler · Hospital Management</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-all">
                            <Bell size={18} className="text-gray-500" />
                        </button>
                        <div className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-full bg-[#14B8A6] flex items-center justify-center font-bold text-white text-sm">
                                {profile.name[0].toUpperCase()}
                            </div>
                            <div className="hidden sm:block">
                                <p className="text-sm font-semibold text-gray-800">{profile.name}</p>
                                <p className="text-xs text-gray-400">{profile.patientId}</p>
                            </div>
                        </div>
                        <button onClick={onLogout}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-600 text-sm transition-all">
                            <LogOut size={15} /> Sign Out
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-5xl mx-auto px-6 py-8">
                {/* Welcome Banner */}
                <div className="bg-gradient-to-r from-[#2563EB] to-[#14B8A6] rounded-2xl p-6 mb-8 text-white relative overflow-hidden">
                    <div className="absolute right-4 top-0 opacity-10"><Heart size={120} /></div>
                    <p className="text-blue-100 text-sm mb-1">Welcome back,</p>
                    <h2 className="text-2xl font-bold mb-1">{profile.name}</h2>
                    <div className="flex flex-wrap gap-3 mt-3 text-sm">
                        <span className="bg-white/20 px-3 py-1 rounded-full">{profile.patientId}</span>
                        <span className="bg-white/20 px-3 py-1 rounded-full">{profile.ward}</span>
                        {profile.bloodGroup !== 'Not recorded' && (
                            <span className="bg-white/20 px-3 py-1 rounded-full">Blood: {profile.bloodGroup}</span>
                        )}
                        <span className="bg-white/20 px-3 py-1 rounded-full">
                            <Mail size={12} className="inline mr-1" />{profile.email}
                        </span>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-8 flex-wrap">
                    {tabs.map(t => (
                        <button key={t.id} onClick={() => setActiveTab(t.id)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all border ${activeTab === t.id
                                    ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-md'
                                    : 'bg-white text-gray-600 border-gray-200 hover:border-[#2563EB] hover:text-[#2563EB]'
                                }`}>
                            {t.icon} {t.label}
                        </button>
                    ))}
                </div>

                {/* ── OVERVIEW ────────────────────────────────────────────────── */}
                {activeTab === 'overview' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Personal Info */}
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <User size={18} className="text-[#2563EB]" /> Personal Information
                                </h3>
                                {[
                                    ['Full Name', profile.name],
                                    ['Email', profile.email],
                                    ['Age / Gender', profile.age !== '—' ? `${profile.age} yrs, ${profile.gender}` : '—'],
                                    ['Blood Group', profile.bloodGroup],
                                    ['Contact', profile.contact],
                                    ['Admitted On', profile.admittedOn],
                                    ['Ward / Bed', profile.ward],
                                ].map(([l, v]) => (
                                    <div key={l} className="flex justify-between py-2.5 border-b border-gray-50 text-sm last:border-0">
                                        <span className="text-gray-500">{l}</span>
                                        <span className={`font-semibold ${v === '—' || v === 'Not recorded' || v === 'Not admitted yet' || v === 'Not assigned' || v === 'Pending Assignment' ? 'text-gray-300 italic' : 'text-gray-800'}`}>{v}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Assigned Doctor */}
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <Stethoscope size={18} className="text-[#14B8A6]" /> Assigned Doctor
                                </h3>
                                {profile.assignedDoctor ? (
                                    <>
                                        <div className="flex items-center gap-4 mb-4 p-4 bg-blue-50 rounded-xl">
                                            <div className="w-14 h-14 rounded-full bg-[#2563EB] flex items-center justify-center text-white text-xl font-bold">
                                                {profile.assignedDoctor.split(' ').find(w => !['Dr.', 'Dr'].includes(w))?.[0] || 'D'}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800">{profile.assignedDoctor}</p>
                                                <p className="text-sm text-[#14B8A6] font-medium">{profile.doctorSpec}</p>
                                                <p className="text-xs text-gray-400 mt-0.5">{profile.doctorPhone}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-600 mb-2">Medical History</p>
                                            {profile.medicalHistory.length > 0 ? (
                                                <div className="flex gap-2 flex-wrap">
                                                    {profile.medicalHistory.map(h => (
                                                        <span key={h} className="px-3 py-1 bg-red-50 text-red-600 text-xs rounded-full font-medium">{h}</span>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-sm text-gray-300 italic">No medical history recorded</p>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <Stethoscope size={24} className="text-gray-300" />
                                        </div>
                                        <p className="font-medium text-gray-400 text-sm">No doctor assigned yet</p>
                                        <p className="text-xs text-gray-300 mt-1">An administrator will assign your doctor shortly</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { label: 'Surgeries', val: profile.surgeries.length, icon: <Activity size={20} />, color: 'text-[#2563EB]', bg: 'bg-blue-50' },
                                { label: 'Reports', val: profile.reports.length, icon: <ClipboardList size={20} />, color: 'text-[#14B8A6]', bg: 'bg-teal-50' },
                                { label: 'Medications', val: profile.medications.length, icon: <Pill size={20} />, color: 'text-purple-500', bg: 'bg-purple-50' },
                                { label: 'Days Admitted', val: profile.admittedOn !== 'Not admitted yet' ? 7 : 0, icon: <Calendar size={20} />, color: 'text-orange-500', bg: 'bg-orange-50' },
                            ].map(({ label, val, icon, color, bg }) => (
                                <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
                                    <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center ${color}`}>{icon}</div>
                                    <div>
                                        <p className={`text-2xl font-bold ${color}`}>{val}</p>
                                        <p className="text-xs text-gray-500">{label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Surgery Alert */}
                        {profile.surgeries.length > 0 && (
                            <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-5 flex items-start gap-4">
                                <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 flex-shrink-0">
                                    <AlertTriangle size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800">Upcoming Surgery Alert</p>
                                    <p className="text-sm text-gray-500 mt-0.5">
                                        <strong>{profile.surgeries[0].type}</strong> on <strong>{profile.surgeries[0].date}</strong> at <strong>{profile.surgeries[0].time}</strong> in <strong>{profile.surgeries[0].ot}</strong>.
                                    </p>
                                    <p className="text-sm text-orange-600 mt-1 font-medium">⚠ {profile.surgeries[0].preOpInstructions}</p>
                                </div>
                            </div>
                        )}

                        {/* New Patient Notice */}
                        {!isDemo && (
                            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex gap-3 items-start text-sm">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-blue-600 text-base">ℹ</span>
                                </div>
                                <div>
                                    <p className="font-semibold text-blue-800">Welcome to OT Scheduler!</p>
                                    <p className="text-blue-600 mt-0.5">Your account has been set up. A hospital administrator will review and complete your profile — including assigning your doctor, ward, and medical records. Please contact the hospital reception if you need immediate assistance.</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* ── SURGERIES ───────────────────────────────────────────────── */}
                {activeTab === 'surgeries' && (
                    <div className="space-y-5">
                        {profile.surgeries.length === 0
                            ? <EmptyState icon={<Calendar size={28} className="text-gray-300" />} label="No surgeries scheduled yet" />
                            : profile.surgeries.map(s => (
                                <div key={s.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <p className="text-xs font-mono text-gray-400 mb-1">{s.id}</p>
                                            <h3 className="text-xl font-bold text-gray-800">{s.type}</h3>
                                            <p className="text-sm text-gray-500">{s.date} · {s.time} · {s.ot}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusBadge(s.status)}`}>{s.status}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                                        <div><span className="text-gray-400">Lead Surgeon:</span> <span className="font-semibold">{s.surgeon}</span></div>
                                        <div><span className="text-gray-400">Anesthesiologist:</span> <span className="font-semibold">{s.anesthesiologist}</span></div>
                                    </div>
                                    <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 text-sm text-orange-700 mb-4">
                                        <p className="font-semibold mb-0.5">Pre-Op Instructions</p>
                                        <p>{s.preOpInstructions}</p>
                                    </div>
                                    <p className="text-sm font-semibold text-gray-600 mb-2">Surgery Progress</p>
                                    <SurgeryTimeline status={s.status} />
                                </div>
                            ))
                        }
                    </div>
                )}

                {/* ── REPORTS ─────────────────────────────────────────────────── */}
                {activeTab === 'reports' && (
                    <div className="space-y-4">
                        {profile.reports.length === 0
                            ? <EmptyState icon={<FileText size={28} className="text-gray-300" />} label="No reports available yet" />
                            : profile.reports.map(r => (
                                <div key={r.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="font-bold text-gray-800">{r.type}</h3>
                                            <p className="text-sm text-gray-500">By {r.doctor} · {r.date}</p>
                                        </div>
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                                            <CheckCircle size={11} className="inline mr-1" />{r.status}
                                        </span>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700">{r.notes}</div>
                                </div>
                            ))
                        }
                    </div>
                )}

                {/* ── MEDICATIONS ─────────────────────────────────────────────── */}
                {activeTab === 'medications' && (
                    <div className="space-y-4">
                        {profile.medications.length === 0
                            ? <EmptyState icon={<Pill size={28} className="text-gray-300" />} label="No medications prescribed yet" />
                            : (
                                <>
                                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                                        <div className="p-4 bg-purple-50 border-b border-purple-100">
                                            <h3 className="font-semibold text-purple-800 flex items-center gap-2"><Pill size={16} /> Current Medications</h3>
                                        </div>
                                        <div className="divide-y divide-gray-50">
                                            {profile.medications.map((m, i) => (
                                                <div key={i} className="p-5 flex items-center justify-between hover:bg-gray-50 transition-all">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                                                            <Pill size={18} className="text-purple-500" />
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-gray-800">{m.name}</p>
                                                            <p className="text-sm text-gray-500">{m.frequency}</p>
                                                        </div>
                                                    </div>
                                                    <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{m.note}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-5 flex gap-3 items-start text-sm">
                                        <AlertTriangle size={18} className="text-yellow-600 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="font-semibold text-yellow-800">Important Notice</p>
                                            <p className="text-yellow-700 mt-0.5">Do not modify or stop any medication without consulting your doctor.</p>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    </div>
                )}
            </div>
        </div>
    );
}
