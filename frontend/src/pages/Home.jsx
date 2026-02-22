import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Stethoscope } from 'lucide-react';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] bg-white rounded-3xl p-8 shadow-sm">
            <div className="text-center w-full max-w-4xl space-y-8 animate-fade-in-up">
                <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                    Operation Scheduler System
                </h1>
                <p className="max-w-xl mt-4 mx-auto text-xl text-gray-500 font-light">
                    Streamlining hospital logistics, optimizing operating rooms, and improving surgical scheduling efficiency.
                </p>

                <div className="mt-12 flex flex-col md:flex-row gap-6 justify-center max-w-2xl mx-auto">
                    <div className="flex flex-col items-center m-4 p-6 bg-blue-50 rounded-2xl shadow hover:shadow-lg transition-transform hover:-translate-y-1">
                        <Calendar className="w-12 h-12 text-blue-600 mb-4" />
                        <h3 className="text-lg font-bold text-gray-900">Dynamic Scheduling</h3>
                        <p className="mt-2 text-center text-sm text-gray-600">Assign surgical rooms and handle real-time cancellations or emergencies.</p>
                    </div>
                    <div className="flex flex-col items-center m-4 p-6 bg-indigo-50 rounded-2xl shadow hover:shadow-lg transition-transform hover:-translate-y-1">
                        <Users className="w-12 h-12 text-indigo-600 mb-4" />
                        <h3 className="text-lg font-bold text-gray-900">Resource Tracking</h3>
                        <p className="mt-2 text-center text-sm text-gray-600">Track pre/post-operative events, drugs, instruments, and materials needed.</p>
                    </div>
                    <div className="flex flex-col items-center m-4 p-6 bg-green-50 rounded-2xl shadow hover:shadow-lg transition-transform hover:-translate-y-1">
                        <Stethoscope className="w-12 h-12 text-green-600 mb-4" />
                        <h3 className="text-lg font-bold text-gray-900">Medical Crew</h3>
                        <p className="mt-2 text-center text-sm text-gray-600">Assign surgeons, anesthesiologists, and nurses based on preferences and capability.</p>
                    </div>
                </div>

                <div className="mt-12 flex justify-center gap-4">
                    <Link
                        to="/login"
                        className="w-full sm:w-auto flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-colors"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </div>
    );
}
