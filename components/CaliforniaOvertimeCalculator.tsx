'use client';

import React, { useState, useEffect, useMemo } from 'react';

export interface CADayEntry {
  id: string;
  dayName: string;
  startTime: string;
  endTime: string;
  breakMinutes: number;
}

const DEFAULT_CA_WEEK: CADayEntry[] = [
  { id: '1', dayName: 'Day 1 (Mon)', startTime: '08:00', endTime: '18:30', breakMinutes: 30 },
  { id: '2', dayName: 'Day 2 (Tue)', startTime: '08:00', endTime: '18:30', breakMinutes: 30 },
  { id: '3', dayName: 'Day 3 (Wed)', startTime: '08:00', endTime: '18:30', breakMinutes: 30 },
  { id: '4', dayName: 'Day 4 (Thu)', startTime: '08:00', endTime: '18:30', breakMinutes: 30 },
  { id: '5', dayName: 'Day 5 (Fri)', startTime: '08:00', endTime: '16:30', breakMinutes: 30 },
  { id: '6', dayName: 'Day 6 (Sat)', startTime: '', endTime: '', breakMinutes: 0 },
  { id: '7', dayName: 'Day 7 (Sun)', startTime: '', endTime: '', breakMinutes: 0 },
];

function calculateShiftHours(startStr: string, endStr: string, breakMins: number): number {
  if (!startStr || !endStr) return 0;
  const [startH, startM] = startStr.split(':').map(Number);
  const [endH, endM] = endStr.split(':').map(Number);

  if (isNaN(startH) || isNaN(startM) || isNaN(endH) || isNaN(endM)) return 0;

  const startMinutes = startH * 60 + startM;
  let endMinutes = endH * 60 + endM;

  if (endMinutes < startMinutes) endMinutes += 24 * 60; // Overnight shift

  const elapsed = endMinutes - startMinutes;
  const net = Math.max(0, elapsed - (breakMins || 0));
  return Math.round((net / 60) * 100) / 100;
}

export default function CaliforniaOvertimeCalculator() {
  const [hourlyRate, setHourlyRate] = useState<number>(30.0);
  const [days, setDays] = useState<CADayEntry[]>(DEFAULT_CA_WEEK);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('gridsnap_ca_overtime_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.days) setDays(parsed.days);
        if (typeof parsed.hourlyRate === 'number') setHourlyRate(parsed.hourlyRate);
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
      localStorage.setItem('gridsnap_ca_overtime_data', JSON.stringify({ days, hourlyRate }));
    } catch (e) {
      console.error(e);
    }
  }, [days, hourlyRate, isLoaded]);

  const handleDayChange = (index: number, field: keyof CADayEntry, value: string | number) => {
    setDays((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleClearAll = () => {
    if (window.confirm('Reset all California timesheet inputs?')) {
      setDays(DEFAULT_CA_WEEK.map((d) => ({ ...d, startTime: '', endTime: '', breakMinutes: 0 })));
    }
  };

  // California Labor Code Section 510 Math Engine
  const calculation = useMemo(() => {
    // 1. Calculate raw daily hours
    const dailyWorked = days.map((d) => calculateShiftHours(d.startTime, d.endTime, d.breakMinutes));

    // Check if worker worked all 7 consecutive days (Day 1 to 7 all > 0 hrs)
    const workedDaysCount = dailyWorked.filter((h) => h > 0).length;
    const is7thDayConsecutive = workedDaysCount === 7 && dailyWorked[6] > 0;

    let cumulativeRegularHours = 0;
    const dayBreakdowns = dailyWorked.map((totalHours, idx) => {
      let reg = 0;
      let ot = 0; // 1.5x
      let dt = 0; // 2.0x double time

      if (totalHours <= 0) {
        return { totalHours: 0, regular: 0, ot15: 0, dt20: 0 };
      }

      // Check 7th consecutive day rule
      if (idx === 6 && is7thDayConsecutive) {
        // First 8 hours on 7th day = 1.5x OT
        // Hours beyond 8 = 2.0x Double Time
        ot = Math.min(totalHours, 8);
        dt = Math.max(0, totalHours - 8);
        reg = 0;
      } else {
        // Normal California daily rules:
        // Regular: up to 8 hours daily
        // Overtime (1.5x): hours over 8 up to 12
        // Double Time (2.0x): hours over 12
        const dailyReg = Math.min(totalHours, 8);
        const dailyOt = Math.min(Math.max(0, totalHours - 8), 4);
        const dailyDt = Math.max(0, totalHours - 12);

        // Weekly 40-hour rule check: if cumulative regular hours exceed 40, excess regular becomes 1.5x OT
        if (cumulativeRegularHours + dailyReg > 40) {
          const regularAllowed = Math.max(0, 40 - cumulativeRegularHours);
          const weeklyOtExcess = dailyReg - regularAllowed;
          reg = regularAllowed;
          ot = dailyOt + weeklyOtExcess;
          dt = dailyDt;
          cumulativeRegularHours = 40;
        } else {
          reg = dailyReg;
          ot = dailyOt;
          dt = dailyDt;
          cumulativeRegularHours += dailyReg;
        }
      }

      return {
        totalHours: Math.round(totalHours * 100) / 100,
        regular: Math.round(reg * 100) / 100,
        ot15: Math.round(ot * 100) / 100,
        dt20: Math.round(dt * 100) / 100,
      };
    });

    const totalHoursWorked = dayBreakdowns.reduce((sum, d) => sum + d.totalHours, 0);
    const totalRegularHours = dayBreakdowns.reduce((sum, d) => sum + d.regular, 0);
    const totalOt15Hours = dayBreakdowns.reduce((sum, d) => sum + d.ot15, 0);
    const totalDt20Hours = dayBreakdowns.reduce((sum, d) => sum + d.dt20, 0);

    const regularPay = totalRegularHours * hourlyRate;
    const ot15Pay = totalOt15Hours * hourlyRate * 1.5;
    const dt20Pay = totalDt20Hours * hourlyRate * 2.0;
    const grossPay = regularPay + ot15Pay + dt20Pay;

    return {
      dayBreakdowns,
      is7thDayConsecutive,
      totalHoursWorked: Math.round(totalHoursWorked * 100) / 100,
      totalRegularHours: Math.round(totalRegularHours * 100) / 100,
      totalOt15Hours: Math.round(totalOt15Hours * 100) / 100,
      totalDt20Hours: Math.round(totalDt20Hours * 100) / 100,
      regularPay: Math.round(regularPay * 100) / 100,
      ot15Pay: Math.round(ot15Pay * 100) / 100,
      dt20Pay: Math.round(dt20Pay * 100) / 100,
      grossPay: Math.round(grossPay * 100) / 100,
    };
  }, [days, hourlyRate]);

  const handleExportCSV = () => {
    const headers = ['Day', 'Start', 'End', 'Break (m)', 'Total Hours', 'Regular (1.0x)', 'Overtime (1.5x)', 'Double Time (2.0x)'];
    const rows = days.map((d, i) => {
      const b = calculation.dayBreakdowns[i];
      return [
        `"${d.dayName}"`,
        d.startTime || '-',
        d.endTime || '-',
        d.breakMinutes,
        b.totalHours.toFixed(2),
        b.regular.toFixed(2),
        b.ot15.toFixed(2),
        b.dt20.toFixed(2),
      ];
    });

    rows.push([]);
    rows.push(['"--- CA LABOR CODE 510 TOTALS ---"', '', '', '', '', '', '', '']);
    rows.push(['"Total Hours Worked"', '', '', '', calculation.totalHoursWorked.toFixed(2), '', '', '']);
    rows.push(['"Regular Hours (1.0x)"', '', '', '', calculation.totalRegularHours.toFixed(2), '', '', `$${calculation.regularPay.toFixed(2)}`]);
    rows.push(['"Overtime Hours (1.5x)"', '', '', '', calculation.totalOt15Hours.toFixed(2), '', '', `$${calculation.ot15Pay.toFixed(2)}`]);
    rows.push(['"Double Time Hours (2.0x)"', '', '', '', calculation.totalDt20Hours.toFixed(2), '', '', `$${calculation.dt20Pay.toFixed(2)}`]);
    rows.push(['"Total California Gross Pay"', '', '', '', '', '', '', `$${calculation.grossPay.toFixed(2)}`]);

    const csvContent =
      'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `california_overtime_timesheet_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full">
      <div className="bg-surface border border-border rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl mb-8 printable-card">
        {/* Top Control Bar */}
        <div className="no-print grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-border/80">
          <div>
            <label htmlFor="ca-rate" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
              Base Hourly Rate ($/hr)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400 font-bold">$</span>
              <input
                id="ca-rate"
                type="number"
                step="0.5"
                min="0"
                inputMode="decimal"
                value={hourlyRate || ''}
                onChange={(e) => setHourlyRate(parseFloat(e.target.value) || 0)}
                placeholder="30.00"
                className="w-full bg-surface2 border border-border rounded-xl pl-8 pr-4 h-12 text-white font-mono font-medium focus:outline-none focus:border-accent"
              />
            </div>
            <span className="text-[11px] text-muted mt-1 block">CA Minimum Wage 2025/2026: $16.50+</span>
          </div>

          <div className="sm:col-span-2 flex flex-col justify-end">
            <div className="p-3 rounded-xl bg-surface2/60 border border-border text-xs text-muted leading-relaxed">
              <span className="font-semibold text-emerald-400">California Rule Engine Active: </span>
              Applies 1.5x after 8 hrs, 2.0x after 12 hrs, 1.5x on 7th consecutive day (first 8h) and 2.0x thereafter, plus weekly 40 regular hour cap.
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="no-print flex flex-wrap items-center justify-between gap-3 my-6">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setDays(DEFAULT_CA_WEEK)}
              className="px-3.5 py-2 rounded-xl bg-surface2 hover:bg-surface3 text-gray-300 text-xs font-semibold transition-colors flex items-center gap-1.5 h-10 border border-border"
            >
              Reset CA Sample
            </button>
            <button
              type="button"
              onClick={handleClearAll}
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

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/80 text-xs font-semibold uppercase tracking-wider text-muted">
                <th className="py-3 px-2">Workday</th>
                <th className="py-3 px-2">Start</th>
                <th className="py-3 px-2">End</th>
                <th className="py-3 px-2">Lunch</th>
                <th className="py-3 px-2 text-center">Total Hrs</th>
                <th className="py-3 px-2 text-right">Regular (1x)</th>
                <th className="py-3 px-2 text-right text-amber-400">OT (1.5x)</th>
                <th className="py-3 px-2 text-right text-rose-400">Double (2x)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-sm">
              {days.map((day, idx) => {
                const b = calculation.dayBreakdowns[idx];
                const is7th = idx === 6 && calculation.is7thDayConsecutive;
                return (
                  <tr key={day.id} className="hover:bg-surface2/30 transition-colors">
                    <td className="py-3 px-2 font-medium text-white">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        <span>{day.dayName}</span>
                        {is7th && (
                          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                            7th Day
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-2 px-2">
                      <input
                        type="time"
                        value={day.startTime}
                        onChange={(e) => handleDayChange(idx, 'startTime', e.target.value)}
                        className="w-32 bg-surface2 border border-border rounded-xl px-2.5 h-12 text-white font-mono focus:outline-none focus:border-accent"
                      />
                    </td>
                    <td className="py-2 px-2">
                      <input
                        type="time"
                        value={day.endTime}
                        onChange={(e) => handleDayChange(idx, 'endTime', e.target.value)}
                        className="w-32 bg-surface2 border border-border rounded-xl px-2.5 h-12 text-white font-mono focus:outline-none focus:border-accent"
                      />
                    </td>
                    <td className="py-2 px-2">
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          min="0"
                          max="240"
                          step="5"
                          inputMode="numeric"
                          value={day.breakMinutes}
                          onChange={(e) => handleDayChange(idx, 'breakMinutes', Number(e.target.value) || 0)}
                          className="w-20 bg-surface2 border border-border rounded-xl px-2 h-12 text-white font-mono focus:outline-none focus:border-accent"
                        />
                        <span className="text-xs text-muted">m</span>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-center font-mono font-bold text-white">
                      {b.totalHours.toFixed(2)}
                    </td>
                    <td className="py-3 px-2 text-right font-mono text-emerald-400 font-semibold">
                      {b.regular.toFixed(2)}h
                    </td>
                    <td className="py-3 px-2 text-right font-mono text-amber-400 font-semibold">
                      {b.ot15.toFixed(2)}h
                    </td>
                    <td className="py-3 px-2 text-right font-mono text-rose-400 font-semibold">
                      {b.dt20.toFixed(2)}h
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-3">
          {days.map((day, idx) => {
            const b = calculation.dayBreakdowns[idx];
            const is7th = idx === 6 && calculation.is7thDayConsecutive;
            return (
              <div key={day.id} className="bg-surface2/60 border border-border rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-border/60 pb-2">
                  <span className="font-bold text-white text-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    {day.dayName}
                    {is7th && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300">
                        7th Day
                      </span>
                    )}
                  </span>
                  <span className="font-mono font-bold text-white text-base">
                    {b.totalHours.toFixed(2)} hrs
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-semibold text-muted uppercase mb-1">Start</label>
                    <input
                      type="time"
                      value={day.startTime}
                      onChange={(e) => handleDayChange(idx, 'startTime', e.target.value)}
                      className="w-full bg-surface border border-border rounded-xl px-2 h-12 text-white font-mono text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-muted uppercase mb-1">End</label>
                    <input
                      type="time"
                      value={day.endTime}
                      onChange={(e) => handleDayChange(idx, 'endTime', e.target.value)}
                      className="w-full bg-surface border border-border rounded-xl px-2 h-12 text-white font-mono text-base"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <div className="flex items-center gap-1">
                    <span className="text-muted">Lunch:</span>
                    <input
                      type="number"
                      min="0"
                      max="180"
                      step="5"
                      value={day.breakMinutes}
                      onChange={(e) => handleDayChange(idx, 'breakMinutes', Number(e.target.value) || 0)}
                      className="w-16 bg-surface border border-border rounded-lg px-2 h-10 text-white font-mono text-sm"
                    />
                    <span className="text-muted">m</span>
                  </div>
                  <div className="text-right space-x-2 font-mono text-xs">
                    <span className="text-emerald-400">Reg: {b.regular.toFixed(1)}h</span>
                    <span className="text-amber-400">1.5x: {b.ot15.toFixed(1)}h</span>
                    <span className="text-rose-400">2x: {b.dt20.toFixed(1)}h</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dashboard Totals */}
        <div className="mt-8 pt-6 border-t border-border/80 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-surface2/40 border border-border">
            <span className="text-xs text-muted uppercase tracking-wider block mb-1">Total Hours</span>
            <div className="font-mono font-bold text-2xl text-white">{calculation.totalHoursWorked.toFixed(2)} hrs</div>
            <div className="text-xs text-muted mt-1">Worked across 7-day cycle</div>
          </div>

          <div className="p-4 rounded-xl bg-surface2/40 border border-border">
            <span className="text-xs text-muted uppercase tracking-wider block mb-1">Regular Pay (1.0x)</span>
            <div className="font-mono font-bold text-2xl text-emerald-400">${calculation.regularPay.toFixed(2)}</div>
            <div className="text-xs text-muted mt-1">{calculation.totalRegularHours.toFixed(2)} hrs @ ${hourlyRate.toFixed(2)}/h</div>
          </div>

          <div className="p-4 rounded-xl bg-surface2/40 border border-border">
            <span className="text-xs text-muted uppercase tracking-wider block mb-1">Overtime + Double</span>
            <div className="font-mono font-bold text-2xl text-amber-400">
              ${(calculation.ot15Pay + calculation.dt20Pay).toFixed(2)}
            </div>
            <div className="text-xs text-muted mt-1">
              1.5x: {calculation.totalOt15Hours.toFixed(2)}h (${calculation.ot15Pay.toFixed(2)}) | 2x: {calculation.totalDt20Hours.toFixed(2)}h (${calculation.dt20Pay.toFixed(2)})
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient/10 border border-emerald-500/40">
            <span className="text-xs text-emerald-300 uppercase tracking-wider block mb-1">Total California Gross</span>
            <div className="font-mono font-extrabold text-2xl text-white">
              ${calculation.grossPay.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] text-emerald-400 mt-1">Labor Code 510 compliant gross</div>
          </div>
        </div>
      </div>
    </div>
  );
}
