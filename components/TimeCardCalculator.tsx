'use client';

import React, { useState, useEffect, useMemo } from 'react';

export interface DayEntry {
  id: string;
  dayName: string;
  startTime: string;
  endTime: string;
  breakMinutes: number;
}

const DEFAULT_WEEK: DayEntry[] = [
  { id: '1', dayName: 'Monday', startTime: '09:00', endTime: '17:30', breakMinutes: 30 },
  { id: '2', dayName: 'Tuesday', startTime: '09:00', endTime: '17:30', breakMinutes: 30 },
  { id: '3', dayName: 'Wednesday', startTime: '09:00', endTime: '17:30', breakMinutes: 30 },
  { id: '4', dayName: 'Thursday', startTime: '09:00', endTime: '17:30', breakMinutes: 30 },
  { id: '5', dayName: 'Friday', startTime: '09:00', endTime: '17:30', breakMinutes: 30 },
  { id: '6', dayName: 'Saturday', startTime: '', endTime: '', breakMinutes: 0 },
  { id: '7', dayName: 'Sunday', startTime: '', endTime: '', breakMinutes: 0 },
];

const DEFAULT_BIWEEKLY: DayEntry[] = [
  ...DEFAULT_WEEK.map((d) => ({ ...d, id: `w1-${d.id}`, dayName: `W1 ${d.dayName}` })),
  ...DEFAULT_WEEK.map((d) => ({ ...d, id: `w2-${d.id}`, dayName: `W2 ${d.dayName}` })),
];

// Helper to compute net decimal hours worked in a shift
function calculateShiftHours(startStr: string, endStr: string, breakMins: number): number {
  if (!startStr || !endStr) return 0;
  const [startH, startM] = startStr.split(':').map(Number);
  const [endH, endM] = endStr.split(':').map(Number);

  if (isNaN(startH) || isNaN(startM) || isNaN(endH) || isNaN(endM)) return 0;

  const startMinutes = startH * 60 + startM;
  let endMinutes = endH * 60 + endM;

  // Overnight shift handling: if end is less than start, shift crossed midnight
  if (endMinutes < startMinutes) {
    endMinutes += 24 * 60;
  }

  const elapsedMinutes = endMinutes - startMinutes;
  const netMinutes = Math.max(0, elapsedMinutes - (breakMins || 0));
  return Math.round((netMinutes / 60) * 100) / 100;
}

export default function TimeCardCalculator() {
  const [isBiweekly, setIsBiweekly] = useState(false);
  const [currency, setCurrency] = useState('$');
  const [hourlyRate, setHourlyRate] = useState<number>(25.0);
  const [overtimeThreshold, setOvertimeThreshold] = useState<number>(40);
  const [overtimeMultiplier, setOvertimeMultiplier] = useState<number>(1.5);
  const [days, setDays] = useState<DayEntry[]>(DEFAULT_WEEK);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from LocalStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('gridsnap_timecard_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.days && Array.isArray(parsed.days)) setDays(parsed.days);
        if (typeof parsed.hourlyRate === 'number') setHourlyRate(parsed.hourlyRate);
        if (typeof parsed.overtimeThreshold === 'number') setOvertimeThreshold(parsed.overtimeThreshold);
        if (typeof parsed.overtimeMultiplier === 'number') setOvertimeMultiplier(parsed.overtimeMultiplier);
        if (typeof parsed.isBiweekly === 'boolean') setIsBiweekly(parsed.isBiweekly);
        if (parsed.currency) setCurrency(parsed.currency);
      }
    } catch (e) {
      console.error('Failed to load timesheet from localStorage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to LocalStorage on changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(
        'gridsnap_timecard_data',
        JSON.stringify({
          days,
          hourlyRate,
          overtimeThreshold,
          overtimeMultiplier,
          isBiweekly,
          currency,
        })
      );
    } catch (e) {
      console.error('Failed to save timesheet to localStorage', e);
    }
  }, [days, hourlyRate, overtimeThreshold, overtimeMultiplier, isBiweekly, currency, isLoaded]);

  // Handle switching between weekly and biweekly
  const handleToggleBiweekly = (biweekly: boolean) => {
    setIsBiweekly(biweekly);
    if (biweekly) {
      if (days.length === 7) {
        setDays([
          ...days.map((d) => ({ ...d, dayName: `W1 ${d.dayName.replace(/^W\d\s*/, '')}` })),
          ...DEFAULT_WEEK.map((d) => ({ ...d, id: `w2-${d.id}`, dayName: `W2 ${d.dayName}` })),
        ]);
      }
    } else {
      if (days.length > 7) {
        setDays(days.slice(0, 7).map((d) => ({ ...d, dayName: d.dayName.replace(/^W1\s*/, '') })));
      }
    }
  };

  const handleDayChange = (index: number, field: keyof DayEntry, value: string | number) => {
    setDays((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleClearAll = () => {
    if (window.confirm('Reset all timesheet inputs to blank?')) {
      const cleared = (isBiweekly ? DEFAULT_BIWEEKLY : DEFAULT_WEEK).map((d) => ({
        ...d,
        startTime: '',
        endTime: '',
        breakMinutes: 0,
      }));
      setDays(cleared);
    }
  };

  const handleLoadSample = () => {
    setDays(isBiweekly ? DEFAULT_BIWEEKLY : DEFAULT_WEEK);
  };

  // Calculations
  const calculatedDays = useMemo(() => {
    return days.map((day) => {
      const hours = calculateShiftHours(day.startTime, day.endTime, day.breakMinutes);
      return {
        ...day,
        hours,
      };
    });
  }, [days]);

  // Aggregate totals
  const totals = useMemo(() => {
    const totalWorkedHours = calculatedDays.reduce((sum, d) => sum + d.hours, 0);

    let regularHours = 0;
    let overtimeHours = 0;

    if (isBiweekly) {
      // In biweekly, calculate weekly overtime separately for week 1 and week 2 (FLSA standard: no averaging)
      const w1Hours = calculatedDays.slice(0, 7).reduce((sum, d) => sum + d.hours, 0);
      const w2Hours = calculatedDays.slice(7).reduce((sum, d) => sum + d.hours, 0);

      const w1Reg = Math.min(w1Hours, overtimeThreshold);
      const w1Ot = Math.max(0, w1Hours - overtimeThreshold);

      const w2Reg = Math.min(w2Hours, overtimeThreshold);
      const w2Ot = Math.max(0, w2Hours - overtimeThreshold);

      regularHours = w1Reg + w2Reg;
      overtimeHours = w1Ot + w2Ot;
    } else {
      regularHours = Math.min(totalWorkedHours, overtimeThreshold);
      overtimeHours = Math.max(0, totalWorkedHours - overtimeThreshold);
    }

    const regularPay = regularHours * hourlyRate;
    const overtimePay = overtimeHours * hourlyRate * overtimeMultiplier;
    const totalGrossPay = regularPay + overtimePay;

    return {
      totalWorkedHours: Math.round(totalWorkedHours * 100) / 100,
      regularHours: Math.round(regularHours * 100) / 100,
      overtimeHours: Math.round(overtimeHours * 100) / 100,
      regularPay: Math.round(regularPay * 100) / 100,
      overtimePay: Math.round(overtimePay * 100) / 100,
      totalGrossPay: Math.round(totalGrossPay * 100) / 100,
    };
  }, [calculatedDays, isBiweekly, hourlyRate, overtimeThreshold, overtimeMultiplier]);

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['Day', 'Start Time', 'End Time', 'Break (Mins)', 'Hours Worked'];
    const rows = calculatedDays.map((d) => [
      `"${d.dayName}"`,
      d.startTime || '-',
      d.endTime || '-',
      d.breakMinutes,
      d.hours.toFixed(2),
    ]);

    rows.push([]);
    rows.push(['"--- SUMMARY ---"', '', '', '', '']);
    rows.push(['"Total Hours Worked"', '', '', '', totals.totalWorkedHours.toFixed(2)]);
    rows.push(['"Regular Hours"', '', '', '', totals.regularHours.toFixed(2)]);
    rows.push(['"Overtime Hours"', '', '', '', totals.overtimeHours.toFixed(2)]);
    rows.push(['"Hourly Rate"', '', '', '', `${currency}${hourlyRate.toFixed(2)}`]);
    rows.push(['"Regular Gross Pay"', '', '', '', `${currency}${totals.regularPay.toFixed(2)}`]);
    rows.push(['"Overtime Gross Pay"', '', '', '', `${currency}${totals.overtimePay.toFixed(2)}`]);
    rows.push(['"Total Gross Pay"', '', '', '', `${currency}${totals.totalGrossPay.toFixed(2)}`]);

    const csvContent =
      'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `gridsnap_timecard_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full">
      {/* Calculator Header & Controls Box */}
      <div className="bg-surface border border-border rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl mb-8 printable-card">
        {/* Top Control Bar: Mode, Currency, Rate, Threshold */}
        <div className="no-print grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-6 border-b border-border/80">
          {/* Pay Period Toggle */}
          <div>
            <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
              Pay Period
            </label>
            <div className="grid grid-cols-2 gap-1 p-1 bg-surface2 rounded-xl border border-border">
              <button
                type="button"
                className={`py-2 px-3 rounded-lg text-sm font-semibold transition-all h-10 ${
                  !isBiweekly ? 'bg-emerald-500 text-gray-950 shadow-md' : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => handleToggleBiweekly(false)}
              >
                7-Day Weekly
              </button>
              <button
                type="button"
                className={`py-2 px-3 rounded-lg text-sm font-semibold transition-all h-10 ${
                  isBiweekly ? 'bg-emerald-500 text-gray-950 shadow-md' : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => handleToggleBiweekly(true)}
              >
                14-Day Biweekly
              </button>
            </div>
          </div>

          {/* Base Hourly Rate */}
          <div>
            <label htmlFor="hourly-rate-input" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
              Base Hourly Rate
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3 flex items-center gap-1 z-10">
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="bg-transparent text-emerald-400 font-bold focus:outline-none cursor-pointer"
                  aria-label="Currency"
                >
                  <option value="$">$ (USD)</option>
                  <option value="C$">C$ (CAD)</option>
                  <option value="A$">A$ (AUD)</option>
                  <option value="NZ$">NZ$ (NZD)</option>
                  <option value="£">£ (GBP)</option>
                  <option value="€">€ (EUR)</option>
                </select>
              </div>
              <input
                id="hourly-rate-input"
                type="number"
                step="0.25"
                min="0"
                inputMode="decimal"
                value={hourlyRate || ''}
                onChange={(e) => setHourlyRate(parseFloat(e.target.value) || 0)}
                placeholder="25.00"
                className="w-full bg-surface2 border border-border rounded-xl pl-24 pr-4 h-12 text-white font-mono font-medium focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>

          {/* Overtime Weekly Threshold */}
          <div>
            <label htmlFor="ot-threshold-input" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
              Overtime Threshold (Hrs/Wk)
            </label>
            <input
              id="ot-threshold-input"
              type="number"
              min="1"
              max="168"
              inputMode="numeric"
              value={overtimeThreshold}
              onChange={(e) => setOvertimeThreshold(Number(e.target.value) || 40)}
              className="w-full bg-surface2 border border-border rounded-xl px-4 h-12 text-white font-mono font-medium focus:outline-none focus:border-accent transition-colors"
            />
            <span className="text-[11px] text-muted mt-1 block">Standard FLSA: 40 hrs | Ontario: 44 hrs</span>
          </div>

          {/* Overtime Multiplier */}
          <div>
            <label htmlFor="ot-multiplier-input" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
              Overtime Multiplier
            </label>
            <div className="relative">
              <input
                id="ot-multiplier-input"
                type="number"
                step="0.1"
                min="1"
                max="4"
                inputMode="decimal"
                value={overtimeMultiplier}
                onChange={(e) => setOvertimeMultiplier(parseFloat(e.target.value) || 1.5)}
                className="w-full bg-surface2 border border-border rounded-xl px-4 pr-12 h-12 text-white font-mono font-medium focus:outline-none focus:border-accent transition-colors"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted text-sm font-semibold pointer-events-none">
                x
              </span>
            </div>
            <span className="text-[11px] text-muted mt-1 block">Time-and-a-half is 1.5x</span>
          </div>
        </div>

        {/* Print-Only Header */}
        <div className="hidden print-only mb-6">
          <div className="flex justify-between items-center border-b pb-4">
            <div>
              <h1 className="text-2xl font-bold text-black">Official Employee Time Card Report</h1>
              <p className="text-sm text-gray-600">Generated via GridSnap Work Tools • Date: {new Date().toLocaleDateString()}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">Pay Period: {isBiweekly ? '14-Day Biweekly' : '7-Day Weekly'}</p>
              <p className="text-sm">Hourly Rate: {currency}{hourlyRate.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons Bar */}
        <div className="no-print flex flex-wrap items-center justify-between gap-3 my-6">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleLoadSample}
              className="px-3.5 py-2 rounded-xl bg-surface2 hover:bg-surface3 text-gray-300 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5 h-10 border border-border"
            >
              <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Fill Sample Week
            </button>
            <button
              type="button"
              onClick={handleClearAll}
              className="px-3.5 py-2 rounded-xl bg-surface2 hover:bg-red-950/40 text-gray-400 hover:text-red-400 text-xs font-semibold transition-colors flex items-center gap-1.5 h-10 border border-border"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear All
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportCSV}
              className="px-4 py-2 rounded-xl bg-surface2 hover:bg-surface3 text-white text-xs font-bold transition-all flex items-center gap-2 h-10 border border-border"
            >
              <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export CSV
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-gradient text-gray-950 text-xs font-bold transition-all flex items-center gap-2 h-10 shadow-md shadow-emerald-500/20 hover:opacity-90"
            >
              <svg className="w-4 h-4 text-gray-950 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print / Save PDF
            </button>
          </div>
        </div>

        {/* ── Desktop Table Layout (>= 768px) ── */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/80 text-xs font-semibold uppercase tracking-wider text-muted">
                <th className="py-3 px-3">Work Day</th>
                <th className="py-3 px-3">Start Time</th>
                <th className="py-3 px-3">End Time</th>
                <th className="py-3 px-3">Unpaid Lunch / Break</th>
                <th className="py-3 px-3 text-right">Daily Hours</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-sm">
              {calculatedDays.map((day, idx) => (
                <tr key={day.id} className="hover:bg-surface2/30 transition-colors group">
                  <td className="py-3 px-3 font-medium text-white">
                    <span className="inline-flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500/40 group-hover:bg-emerald-400 transition-colors"></span>
                      {day.dayName}
                    </span>
                  </td>
                  <td className="py-2 px-3">
                    <input
                      type="time"
                      value={day.startTime}
                      onChange={(e) => handleDayChange(idx, 'startTime', e.target.value)}
                      className="w-36 bg-surface2 border border-border rounded-xl px-3 h-12 text-white font-mono focus:outline-none focus:border-accent"
                    />
                  </td>
                  <td className="py-2 px-3">
                    <input
                      type="time"
                      value={day.endTime}
                      onChange={(e) => handleDayChange(idx, 'endTime', e.target.value)}
                      className="w-36 bg-surface2 border border-border rounded-xl px-3 h-12 text-white font-mono focus:outline-none focus:border-accent"
                    />
                  </td>
                  <td className="py-2 px-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        max="360"
                        step="5"
                        inputMode="numeric"
                        value={day.breakMinutes}
                        onChange={(e) => handleDayChange(idx, 'breakMinutes', Number(e.target.value) || 0)}
                        className="w-24 bg-surface2 border border-border rounded-xl px-3 h-12 text-white font-mono focus:outline-none focus:border-accent"
                      />
                      <span className="text-xs text-muted">mins</span>
                      {/* Quick preset buttons */}
                      <div className="no-print hidden lg:flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleDayChange(idx, 'breakMinutes', 0)}
                          className="px-2 py-1 text-[11px] rounded bg-surface3/40 hover:bg-surface3 text-muted hover:text-white"
                        >
                          0m
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDayChange(idx, 'breakMinutes', 30)}
                          className="px-2 py-1 text-[11px] rounded bg-surface3/40 hover:bg-surface3 text-muted hover:text-white"
                        >
                          30m
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDayChange(idx, 'breakMinutes', 60)}
                          className="px-2 py-1 text-[11px] rounded bg-surface3/40 hover:bg-surface3 text-muted hover:text-white"
                        >
                          60m
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-white text-base">
                    {day.hours.toFixed(2)}{' '}
                    <span className="text-xs text-muted font-normal">hrs</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Mobile Card Rows Layout (< 768px) ── */}
        <div className="md:hidden space-y-3">
          {calculatedDays.map((day, idx) => (
            <div
              key={day.id}
              className="bg-surface2/60 border border-border rounded-xl p-4 space-y-3"
            >
              <div className="flex items-center justify-between border-b border-border/60 pb-2">
                <span className="font-bold text-white text-base flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  {day.dayName}
                </span>
                <span className="font-mono font-bold text-emerald-400 text-lg">
                  {day.hours.toFixed(2)} <span className="text-xs text-muted font-normal">hrs</span>
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-muted uppercase tracking-wider mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={day.startTime}
                    onChange={(e) => handleDayChange(idx, 'startTime', e.target.value)}
                    className="w-full bg-surface border border-border rounded-xl px-3 h-12 text-white font-mono text-base focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-muted uppercase tracking-wider mb-1">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={day.endTime}
                    onChange={(e) => handleDayChange(idx, 'endTime', e.target.value)}
                    className="w-full bg-surface border border-border rounded-xl px-3 h-12 text-white font-mono text-base focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-muted uppercase tracking-wider mb-1">
                  Lunch / Break Deduction (Minutes)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max="360"
                    step="5"
                    inputMode="numeric"
                    value={day.breakMinutes}
                    onChange={(e) => handleDayChange(idx, 'breakMinutes', Number(e.target.value) || 0)}
                    className="w-28 bg-surface border border-border rounded-xl px-3 h-12 text-white font-mono text-base focus:outline-none focus:border-accent"
                  />
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleDayChange(idx, 'breakMinutes', 0)}
                      className="px-2.5 py-1.5 rounded bg-surface3/60 text-xs text-gray-200"
                    >
                      0m
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDayChange(idx, 'breakMinutes', 30)}
                      className="px-2.5 py-1.5 rounded bg-surface3/60 text-xs text-gray-200"
                    >
                      30m
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDayChange(idx, 'breakMinutes', 60)}
                      className="px-2.5 py-1.5 rounded bg-surface3/60 text-xs text-gray-200"
                    >
                      60m
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Summary & Gross Pay Dashboard ── */}
        <div className="mt-8 pt-6 border-t border-border/80">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-surface2/40 border border-border">
              <span className="text-xs text-muted font-semibold uppercase tracking-wider block mb-1">
                Total Hours Worked
              </span>
              <div className="font-mono font-bold text-2xl lg:text-3xl text-white">
                {totals.totalWorkedHours.toFixed(2)}
                <span className="text-xs text-muted font-normal ml-1">hrs</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surface2/40 border border-border">
              <span className="text-xs text-muted font-semibold uppercase tracking-wider block mb-1">
                Regular Hours ({currency}{hourlyRate.toFixed(2)}/h)
              </span>
              <div className="font-mono font-bold text-2xl lg:text-3xl text-emerald-400">
                {totals.regularHours.toFixed(2)}
                <span className="text-xs text-muted font-normal ml-1">hrs</span>
              </div>
              <div className="text-xs text-muted mt-1">
                Subtotal: {currency}{totals.regularPay.toFixed(2)}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surface2/40 border border-border">
              <span className="text-xs text-muted font-semibold uppercase tracking-wider block mb-1">
                Overtime Hours ({overtimeMultiplier}x)
              </span>
              <div className="font-mono font-bold text-2xl lg:text-3xl text-amber-400">
                {totals.overtimeHours.toFixed(2)}
                <span className="text-xs text-muted font-normal ml-1">hrs</span>
              </div>
              <div className="text-xs text-muted mt-1">
                Subtotal: {currency}{totals.overtimePay.toFixed(2)}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient/10 border border-emerald-500/40 relative overflow-hidden">
              <span className="text-xs text-emerald-300 font-semibold uppercase tracking-wider block mb-1">
                Total Gross Pay
              </span>
              <div className="font-mono font-extrabold text-2xl lg:text-3xl text-white">
                {currency}{totals.totalGrossPay.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="text-[11px] text-emerald-400/80 mt-1">
                Before taxes & statutory deductions
              </div>
            </div>
          </div>
        </div>

        {/* Print-Only Signature Section */}
        <div className="hidden print-only mt-12 pt-8 border-t border-gray-300">
          <div className="grid grid-cols-2 gap-12 text-sm text-black">
            <div>
              <div className="border-b border-black pb-1 mb-2"></div>
              <p className="font-semibold">Employee Signature & Date</p>
            </div>
            <div>
              <div className="border-b border-black pb-1 mb-2"></div>
              <p className="font-semibold">Manager / Supervisor Approval & Date</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky Mobile Summary Bar (< 768px) ── */}
      <div className="no-print md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-lg border-t border-border px-4 py-3 shadow-[0_-8px_20px_rgba(0,0,0,0.4)]">
        <div className="flex items-center justify-between gap-2 max-w-lg mx-auto">
          <div>
            <div className="text-[10px] text-muted uppercase tracking-wider font-semibold">
              Total ({totals.totalWorkedHours.toFixed(2)}h) • OT: {totals.overtimeHours.toFixed(2)}h
            </div>
            <div className="font-mono font-bold text-lg text-white">
              {currency}{totals.totalGrossPay.toFixed(2)} <span className="text-xs text-emerald-400 font-normal">gross</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportCSV}
              className="p-2.5 rounded-xl bg-surface2 border border-border text-cyan-400 font-semibold text-xs"
              aria-label="Export CSV"
            >
              CSV
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-2.5 rounded-xl bg-gradient text-gray-950 font-bold text-xs shadow-md shadow-emerald-500/20"
            >
              Print / PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
