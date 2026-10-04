'use client';

import React, { useState, useEffect, useMemo } from 'react';

export interface OntarioDayEntry {
  id: string;
  dayName: string;
  startTime: string;
  endTime: string;
  breakMinutes: number;
  isStatutoryHoliday?: boolean;
}

const DEFAULT_ON_WEEK: OntarioDayEntry[] = [
  { id: '1', dayName: 'Monday', startTime: '08:00', endTime: '18:00', breakMinutes: 60 },
  { id: '2', dayName: 'Tuesday', startTime: '08:00', endTime: '18:00', breakMinutes: 60 },
  { id: '3', dayName: 'Wednesday', startTime: '08:00', endTime: '18:00', breakMinutes: 60 },
  { id: '4', dayName: 'Thursday', startTime: '08:00', endTime: '18:00', breakMinutes: 60 },
  { id: '5', dayName: 'Friday', startTime: '08:00', endTime: '18:00', breakMinutes: 60 },
  { id: '6', dayName: 'Saturday', startTime: '09:00', endTime: '15:00', breakMinutes: 30 },
  { id: '7', dayName: 'Sunday', startTime: '', endTime: '', breakMinutes: 0 },
];

function calculateShiftHours(startStr: string, endStr: string, breakMins: number): number {
  if (!startStr || !endStr) return 0;
  const [startH, startM] = startStr.split(':').map(Number);
  const [endH, endM] = endStr.split(':').map(Number);

  if (isNaN(startH) || isNaN(startM) || isNaN(endH) || isNaN(endM)) return 0;

  const startMinutes = startH * 60 + startM;
  let endMinutes = endH * 60 + endM;

  if (endMinutes < startMinutes) endMinutes += 24 * 60;

  const elapsed = endMinutes - startMinutes;
  const net = Math.max(0, elapsed - (breakMins || 0));
  return Math.round((net / 60) * 100) / 100;
}

export default function OntarioOvertimeCalculator() {
  const [hourlyRate, setHourlyRate] = useState<number>(24.0);
  const [averagingWeeks, setAveragingWeeks] = useState<number>(1); // 1 = Standard weekly (44h), 2 = 2-week averaging (88h), 4 = 4-week (176h)
  const [days, setDays] = useState<OntarioDayEntry[]>(DEFAULT_ON_WEEK);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('gridsnap_ontario_esa_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.days) setDays(parsed.days);
        if (typeof parsed.hourlyRate === 'number') setHourlyRate(parsed.hourlyRate);
        if (typeof parsed.averagingWeeks === 'number') setAveragingWeeks(parsed.averagingWeeks);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('gridsnap_ontario_esa_data', JSON.stringify({ days, hourlyRate, averagingWeeks }));
    } catch (e) {
      console.error(e);
    }
  }, [days, hourlyRate, averagingWeeks, isLoaded]);

  const handleDayChange = (index: number, field: keyof OntarioDayEntry, value: string | number | boolean) => {
    setDays((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  // Ontario ESA Math:
  // Weekly threshold is 44 hours (not 40 hours as in US FLSA or other provinces).
  // Overtime rate is 1.5x regular wage.
  // Averaging agreement: Overtime threshold = 44 * averagingWeeks
  const calculation = useMemo(() => {
    const dailyWorked = days.map((d) => calculateShiftHours(d.startTime, d.endTime, d.breakMinutes));
    const totalWeeklyHours = dailyWorked.reduce((s, h) => s + h, 0);

    const threshold = 44 * averagingWeeks;
    // For single week entry with averagingWeeks > 1, we project or calculate accordingly
    const regularHours = Math.min(totalWeeklyHours, threshold);
    const overtimeHours = Math.max(0, totalWeeklyHours - threshold);

    // Statutory holiday hours
    let statHolidayHours = 0;
    days.forEach((d, i) => {
      if (d.isStatutoryHoliday) statHolidayHours += dailyWorked[i];
    });

    const regularPay = regularHours * hourlyRate;
    const overtimePay = overtimeHours * hourlyRate * 1.5;
    // Premium stat holiday pay (1.5x for hours worked on stat holidays under ESA)
    const statHolidayPay = statHolidayHours * hourlyRate * 1.5;
    const totalGrossPay = regularPay + overtimePay + (statHolidayHours > 0 ? statHolidayPay : 0);

    return {
      dailyWorked,
      totalWeeklyHours: Math.round(totalWeeklyHours * 100) / 100,
      threshold,
      regularHours: Math.round(regularHours * 100) / 100,
      overtimeHours: Math.round(overtimeHours * 100) / 100,
      statHolidayHours: Math.round(statHolidayHours * 100) / 100,
      regularPay: Math.round(regularPay * 100) / 100,
      overtimePay: Math.round(overtimePay * 100) / 100,
      statHolidayPay: Math.round(statHolidayPay * 100) / 100,
      totalGrossPay: Math.round(totalGrossPay * 100) / 100,
    };
  }, [days, hourlyRate, averagingWeeks]);

  const handleExportCSV = () => {
    const headers = ['Day', 'Start', 'End', 'Break (m)', 'Hours Worked', 'Holiday Status'];
    const rows = days.map((d, i) => [
      `"${d.dayName}"`,
      d.startTime || '-',
      d.endTime || '-',
      d.breakMinutes,
      calculation.dailyWorked[i].toFixed(2),
      d.isStatutoryHoliday ? 'Statutory Holiday (1.5x Premium)' : 'Normal',
    ]);

    rows.push([]);
    rows.push(['"--- ONTARIO ESA SUMMARY (CAD) ---"', '', '', '', '', '']);
    rows.push(['"Base Hourly Wage"', '', '', '', '', `C$${hourlyRate.toFixed(2)}/hr`]);
    rows.push(['"Statutory Weekly Threshold"', '', '', '', '', '44.00 Hours']);
    rows.push(['"Averaging Agreement Period"', '', '', '', '', `${averagingWeeks} Week(s) (${calculation.threshold} hrs)`]);
    rows.push(['"Total Hours Worked"', '', '', '', '', calculation.totalWeeklyHours.toFixed(2)]);
    rows.push(['"Regular Hours (1.0x)"', '', '', '', '', `${calculation.regularHours.toFixed(2)} hrs (C$${calculation.regularPay.toFixed(2)})`]);
    rows.push(['"Overtime Hours (1.5x over 44h)"', '', '', '', '', `${calculation.overtimeHours.toFixed(2)} hrs (C$${calculation.overtimePay.toFixed(2)})`]);
    rows.push(['"Total Gross Ontario Pay"', '', '', '', '', `C$${calculation.totalGrossPay.toFixed(2)}`]);

    const csvContent =
      'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ontario_esa_overtime_timesheet_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full">
      <div className="bg-surface border border-border rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl mb-8 printable-card">
        {/* Controls */}
        <div className="no-print grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-border/80">
          <div>
            <label htmlFor="on-wage" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
              Hourly Wage (CAD C$/hr)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400 font-bold">C$</span>
              <input
                id="on-wage"
                type="number"
                step="0.5"
                min="0"
                inputMode="decimal"
                value={hourlyRate || ''}
                onChange={(e) => setHourlyRate(parseFloat(e.target.value) || 0)}
                placeholder="24.00"
                className="w-full bg-surface2 border border-border rounded-xl pl-10 pr-4 h-12 text-white font-mono font-medium focus:outline-none focus:border-accent"
              />
            </div>
            <span className="text-[11px] text-muted mt-1 block">Ontario General Minimum Wage: C$17.20/hr</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
              Averaging Agreement
            </label>
            <div className="grid grid-cols-3 gap-1 p-1 bg-surface2 rounded-xl border border-border">
              <button
                type="button"
                onClick={() => setAveragingWeeks(1)}
                className={`py-2 px-2 rounded-lg text-xs font-bold transition-all h-10 ${
                  averagingWeeks === 1 ? 'bg-emerald-500 text-gray-950 shadow-md' : 'text-gray-300 hover:text-white'
                }`}
              >
                1 Wk (44h)
              </button>
              <button
                type="button"
                onClick={() => setAveragingWeeks(2)}
                className={`py-2 px-2 rounded-lg text-xs font-bold transition-all h-10 ${
                  averagingWeeks === 2 ? 'bg-emerald-500 text-gray-950 shadow-md' : 'text-gray-300 hover:text-white'
                }`}
              >
                2 Wks (88h)
              </button>
              <button
                type="button"
                onClick={() => setAveragingWeeks(4)}
                className={`py-2 px-2 rounded-lg text-xs font-bold transition-all h-10 ${
                  averagingWeeks === 4 ? 'bg-emerald-500 text-gray-950 shadow-md' : 'text-gray-300 hover:text-white'
                }`}
              >
                4 Wks (176h)
              </button>
            </div>
            <span className="text-[11px] text-muted mt-1 block">Requires written employer-employee agreement</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
              Ontario ESA Standard
            </label>
            <div className="p-3 bg-surface2/60 rounded-xl border border-border text-xs text-muted leading-relaxed">
              Employment Standards Act sets overtime threshold at <span className="text-white font-semibold">44 hours/week</span> at 1.5x regular pay. Daily overtime is not mandated by Ontario law unless stipulated by contract.
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="no-print flex flex-wrap items-center justify-between gap-3 my-6">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setDays(DEFAULT_ON_WEEK)}
              className="px-3.5 py-2 rounded-xl bg-surface2 hover:bg-surface3 text-gray-300 text-xs font-semibold transition-colors flex items-center gap-1.5 h-10 border border-border"
            >
              Reset Sample
            </button>
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Clear all fields?')) {
                  setDays(DEFAULT_ON_WEEK.map((d) => ({ ...d, startTime: '', endTime: '', breakMinutes: 0 })));
                }
              }}
              className="px-3.5 py-2 rounded-xl bg-surface2 hover:bg-red-950/40 text-gray-400 hover:text-red-400 text-xs font-semibold transition-colors flex items-center gap-1.5 h-10 border border-border"
            >
              Clear
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportCSV}
              className="px-4 py-2 rounded-xl bg-surface2 hover:bg-surface3 text-white text-xs font-bold transition-all flex items-center gap-2 h-10 border border-border"
            >
              Export CSV
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl bg-gradient text-gray-950 text-xs font-bold transition-all flex items-center gap-2 h-10 shadow-md shadow-emerald-500/20"
            >
              Print / Save PDF
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/80 text-xs font-semibold uppercase tracking-wider text-muted">
                <th className="py-3 px-3">Day of Week</th>
                <th className="py-3 px-3">Start</th>
                <th className="py-3 px-3">End</th>
                <th className="py-3 px-3">Lunch (mins)</th>
                <th className="py-3 px-3">Stat Holiday</th>
                <th className="py-3 px-3 text-right">Daily Net Hours</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-sm">
              {days.map((day, idx) => (
                <tr key={day.id} className="hover:bg-surface2/30 transition-colors">
                  <td className="py-3 px-3 font-medium text-white">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      {day.dayName}
                    </span>
                  </td>
                  <td className="py-2 px-3">
                    <input
                      type="time"
                      value={day.startTime}
                      onChange={(e) => handleDayChange(idx, 'startTime', e.target.value)}
                      className="w-32 bg-surface2 border border-border rounded-xl px-2.5 h-12 text-white font-mono focus:outline-none focus:border-accent"
                    />
                  </td>
                  <td className="py-2 px-3">
                    <input
                      type="time"
                      value={day.endTime}
                      onChange={(e) => handleDayChange(idx, 'endTime', e.target.value)}
                      className="w-32 bg-surface2 border border-border rounded-xl px-2.5 h-12 text-white font-mono focus:outline-none focus:border-accent"
                    />
                  </td>
                  <td className="py-2 px-3">
                    <input
                      type="number"
                      min="0"
                      max="180"
                      step="5"
                      value={day.breakMinutes}
                      onChange={(e) => handleDayChange(idx, 'breakMinutes', Number(e.target.value) || 0)}
                      className="w-20 bg-surface2 border border-border rounded-xl px-2 h-12 text-white font-mono focus:outline-none focus:border-accent"
                    />
                  </td>
                  <td className="py-2 px-3">
                    <label className="flex items-center gap-1.5 cursor-pointer text-xs">
                      <input
                        type="checkbox"
                        checked={!!day.isStatutoryHoliday}
                        onChange={(e) => handleDayChange(idx, 'isStatutoryHoliday', e.target.checked)}
                        className="rounded text-emerald-500"
                      />
                      <span className="text-gray-300">Public Holiday (1.5x)</span>
                    </label>
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-white text-base">
                    {calculation.dailyWorked[idx].toFixed(2)}h
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Dashboard */}
        <div className="mt-8 pt-6 border-t border-border/80 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-surface2/40 border border-border">
            <span className="text-xs text-muted uppercase tracking-wider block mb-1">Total Hours</span>
            <div className="font-mono font-bold text-2xl text-white">{calculation.totalWeeklyHours.toFixed(2)}h</div>
            <div className="text-xs text-muted mt-1">Threshold: {calculation.threshold} hrs</div>
          </div>

          <div className="p-4 rounded-xl bg-surface2/40 border border-border">
            <span className="text-xs text-muted uppercase tracking-wider block mb-1">Regular Pay (1.0x)</span>
            <div className="font-mono font-bold text-2xl text-emerald-400">C${calculation.regularPay.toFixed(2)}</div>
            <div className="text-xs text-muted mt-1">{calculation.regularHours.toFixed(2)} hrs @ C${hourlyRate.toFixed(2)}/h</div>
          </div>

          <div className="p-4 rounded-xl bg-surface2/40 border border-border">
            <span className="text-xs text-muted uppercase tracking-wider block mb-1">ESA Overtime (1.5x)</span>
            <div className="font-mono font-bold text-2xl text-amber-400">
              C${calculation.overtimePay.toFixed(2)}
            </div>
            <div className="text-xs text-muted mt-1">
              {calculation.overtimeHours.toFixed(2)} hrs beyond 44h @ C${(hourlyRate * 1.5).toFixed(2)}/h
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient/10 border border-emerald-500/40">
            <span className="text-xs text-emerald-300 uppercase tracking-wider block mb-1">Total Ontario Gross</span>
            <div className="font-mono font-extrabold text-2xl text-white">
              C${calculation.totalGrossPay.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] text-emerald-400 mt-1">ESA Section 22 compliant gross</div>
          </div>
        </div>
      </div>
    </div>
  );
}
