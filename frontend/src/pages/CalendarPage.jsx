import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths, isToday } from 'date-fns';
import { ChevronLeft, ChevronRight, AlertTriangle, Clock } from 'lucide-react';

const surgeryEvents = [
    { date: '2026-03-08', title: 'Appendectomy', doctor: 'Dr. Smith', ot: 'OT-1', priority: 'Normal' },
    { date: '2026-03-08', title: 'C-Section', doctor: 'Dr. Allen', ot: 'OT-3', priority: 'Emergency' },
    { date: '2026-03-08', title: 'Knee Replacement', doctor: 'Dr. Jones', ot: 'OT-2', priority: 'Normal' },
    { date: '2026-03-10', title: 'Hip Replacement', doctor: 'Dr. Smith', ot: 'OT-1', priority: 'Normal' },
    { date: '2026-03-12', title: 'Thyroid Surgery', doctor: 'Dr. Chen', ot: 'OT-4', priority: 'Normal' },
    { date: '2026-03-15', title: 'Cardiac Stent', doctor: 'Dr. Chen', ot: 'OT-4', priority: 'Emergency' },
    { date: '2026-03-18', title: 'Cataract Surgery', doctor: 'Dr. Patel', ot: 'OT-5', priority: 'Normal' },
    { date: '2026-03-20', title: 'Hernia Repair', doctor: 'Dr. Jones', ot: 'OT-2', priority: 'Normal' },
];

export default function Calendar() {
    const [currentMonth, setCurrentMonth] = useState(new Date(2026, 2, 1));
    const [selected, setSelected] = useState(new Date(2026, 2, 8));

    const days = eachDayOfInterval({ start: startOfMonth(currentMonth), end: endOfMonth(currentMonth) });
    const startPad = startOfMonth(currentMonth).getDay();

    const getEvents = (day) => surgeryEvents.filter(e => isSameDay(new Date(e.date), day));
    const selectedEvents = getEvents(selected);

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">OT Calendar Scheduler</h1>
                <p className="text-gray-500 mt-1">Visual view of all scheduled surgeries across operation theaters</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Calendar */}
                <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    {/* Month Nav */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-800">{format(currentMonth, 'MMMM yyyy')}</h2>
                        <div className="flex gap-2">
                            <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-2 rounded-lg hover:bg-gray-100 transition-all">
                                <ChevronLeft size={18} />
                            </button>
                            <button onClick={() => setCurrentMonth(new Date(2026, 2, 1))} className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 hover:bg-gray-50 transition-all font-medium">Today</button>
                            <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-2 rounded-lg hover:bg-gray-100 transition-all">
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Day Headers */}
                    <div className="grid grid-cols-7 mb-2">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                            <div key={d} className="text-center text-xs font-semibold text-gray-400 py-2">{d}</div>
                        ))}
                    </div>

                    {/* Days Grid */}
                    <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: startPad }).map((_, i) => <div key={`pad-${i}`} />)}
                        {days.map(day => {
                            const events = getEvents(day);
                            const isSelected = isSameDay(day, selected);
                            const today = isToday(day);
                            return (
                                <button
                                    key={day.toString()}
                                    onClick={() => setSelected(day)}
                                    className={`relative min-h-[70px] rounded-xl p-1.5 text-left transition-all border ${isSelected ? 'bg-[#2563EB] border-[#2563EB] text-white shadow-md' :
                                            today ? 'border-[#2563EB] bg-blue-50' :
                                                'border-transparent hover:bg-gray-50'
                                        }`}
                                >
                                    <span className={`text-xs font-semibold ${isSelected ? 'text-white' : today ? 'text-[#2563EB]' : 'text-gray-700'}`}>
                                        {format(day, 'd')}
                                    </span>
                                    <div className="mt-1 space-y-0.5">
                                        {events.slice(0, 2).map((e, i) => (
                                            <div key={i} className={`text-[9px] px-1 py-0.5 rounded truncate font-medium ${isSelected ? 'bg-white/20 text-white' :
                                                    e.priority === 'Emergency' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                                                }`}>
                                                {e.priority === 'Emergency' && '🚨 '}{e.title}
                                            </div>
                                        ))}
                                        {events.length > 2 && (
                                            <div className={`text-[9px] px-1 font-medium ${isSelected ? 'text-white/70' : 'text-gray-400'}`}>+{events.length - 2} more</div>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Day Detail Panel */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <div className="mb-5">
                        <h3 className="text-lg font-bold text-gray-800">{format(selected, 'EEEE, MMM d')}</h3>
                        <p className="text-sm text-gray-500">{selectedEvents.length} Surgery{selectedEvents.length !== 1 ? 's' : ''} Scheduled</p>
                    </div>

                    {selectedEvents.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Clock size={24} className="text-gray-400" />
                            </div>
                            <p className="text-gray-400 text-sm">No surgeries on this day</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {selectedEvents.map((e, i) => (
                                <div key={i} className={`p-4 rounded-xl border-l-4 ${e.priority === 'Emergency' ? 'border-purple-500 bg-purple-50' : 'border-[#2563EB] bg-blue-50'}`}>
                                    <div className="flex items-start justify-between">
                                        <h4 className="font-semibold text-gray-800 text-sm">{e.title}</h4>
                                        {e.priority === 'Emergency' && (
                                            <span className="flex items-center gap-1 text-purple-600 text-xs font-semibold">
                                                <AlertTriangle size={11} /> Emergency
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">{e.doctor}</p>
                                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full mt-2 inline-block ${e.priority === 'Emergency' ? 'bg-purple-200 text-purple-800' : 'bg-blue-200 text-blue-800'}`}>{e.ot}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    <button className="w-full mt-6 bg-[#2563EB] text-white py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-all text-sm">
                        + Add Surgery on This Day
                    </button>
                </div>
            </div>
        </div>
    );
}
