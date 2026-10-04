'use client';

import React, { useState } from 'react';
import TimeCardCalculator from './TimeCardCalculator';
import CaliforniaOvertimeCalculator from './CaliforniaOvertimeCalculator';
import AustraliaFairWorkCalculator from './AustraliaFairWorkCalculator';
import OntarioOvertimeCalculator from './OntarioOvertimeCalculator';
import Link from 'next/link';

export default function OvertimeHubCalculator() {
  const [activeTab, setActiveTab] = useState<'us' | 'ca' | 'au' | 'on'>('us');

  return (
    <div className="w-full">
      {/* Jurisdiction Selector Tabs */}
      <div className="no-print flex flex-wrap items-center gap-2 mb-6 p-1.5 bg-surface rounded-2xl border border-border">
        <button
          type="button"
          onClick={() => setActiveTab('us')}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all text-center flex items-center justify-center gap-2 ${
            activeTab === 'us'
              ? 'bg-emerald-500 text-gray-950 shadow-lg shadow-emerald-500/20'
              : 'text-gray-300 hover:text-white hover:bg-surface2'
          }`}
        >
          <span>🇺🇸</span>
          <span>US Federal (40h FLSA)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('ca')}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all text-center flex items-center justify-center gap-2 ${
            activeTab === 'ca'
              ? 'bg-emerald-500 text-gray-950 shadow-lg shadow-emerald-500/20'
              : 'text-gray-300 hover:text-white hover:bg-surface2'
          }`}
        >
          <span>☀️</span>
          <span>California (Daily 8h/12h)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('on')}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all text-center flex items-center justify-center gap-2 ${
            activeTab === 'on'
              ? 'bg-emerald-500 text-gray-950 shadow-lg shadow-emerald-500/20'
              : 'text-gray-300 hover:text-white hover:bg-surface2'
          }`}
        >
          <span>🇨🇦</span>
          <span>Ontario (ESA 44h)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('au')}
          className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all text-center flex items-center justify-center gap-2 ${
            activeTab === 'au'
              ? 'bg-emerald-500 text-gray-950 shadow-lg shadow-emerald-500/20'
              : 'text-gray-300 hover:text-white hover:bg-surface2'
          }`}
        >
          <span>🇦🇺</span>
          <span>Australia (Fair Work)</span>
        </button>
      </div>

      {/* Jurisdiction Info Banner */}
      <div className="no-print mb-6 p-4 rounded-xl bg-surface2/40 border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-muted">
        <div>
          {activeTab === 'us' && (
            <span>
              <strong className="text-white">US FLSA Standard:</strong> Overtime is mandated after 40 regular hours worked within a fixed 7-consecutive-day workweek at 1.5x regular rate.
            </span>
          )}
          {activeTab === 'ca' && (
            <span>
              <strong className="text-white">California Labor Code 510:</strong> Daily overtime (1.5x) after 8h, Double Time (2.0x) after 12h, and special 7th day rules.
            </span>
          )}
          {activeTab === 'on' && (
            <span>
              <strong className="text-white">Ontario Employment Standards Act:</strong> Overtime threshold begins after 44 weekly hours at 1.5x regular pay.
            </span>
          )}
          {activeTab === 'au' && (
            <span>
              <strong className="text-white">Fair Work Modern Awards:</strong> 38-hour standard week, 25% casual loading, escalating overtime (1.5x first 2h, then 2.0x), and weekend penalty rates.
            </span>
          )}
        </div>

        <div>
          {activeTab === 'ca' && (
            <Link href="/overtime-calculator/california" className="text-emerald-400 hover:underline font-semibold whitespace-nowrap">
              Dedicated CA Page →
            </Link>
          )}
          {activeTab === 'on' && (
            <Link href="/overtime-calculator/ontario" className="text-emerald-400 hover:underline font-semibold whitespace-nowrap">
              Dedicated Ontario Page →
            </Link>
          )}
          {activeTab === 'au' && (
            <Link href="/overtime-calculator/australia-fair-work" className="text-emerald-400 hover:underline font-semibold whitespace-nowrap">
              Dedicated Australia Page →
            </Link>
          )}
        </div>
      </div>

      {/* Render Selected Calculator */}
      {activeTab === 'us' && <TimeCardCalculator />}
      {activeTab === 'ca' && <CaliforniaOvertimeCalculator />}
      {activeTab === 'on' && <OntarioOvertimeCalculator />}
      {activeTab === 'au' && <AustraliaFairWorkCalculator />}
    </div>
  );
}
