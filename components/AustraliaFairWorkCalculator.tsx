'use client';

import React, { useState, useEffect, useMemo } from 'react';

export interface AUDayEntry {
  id: string;
  dayName: string;
  startTime: string;
  endTime: string;
  breakMinutes: number;
  isSaturday?: boolean;
  isSunday?: boolean;
  isPublicHoliday?: boolean;
}

const DEFAULT_AU_WEEK: AUDayEntry[] = [
  { id: '1', dayName: 'Monday', startTime: '08:30', endTime: '17:00', breakMinutes: 30 },
  { id: '2', dayName: 'Tuesday', startTime: '08:30', endTime: '17:00', breakMinutes: 30 },
  { id: '3', dayName: 'Wednesday', startTime: '08:30', endTime: '17:00', breakMinutes: 30 },
  { id: '4', dayName: 'Thursday', startTime: '08:30', endTime: '17:00', breakMinutes: 30 },
  { id: '5', dayName: 'Friday', startTime: '08:30', endTime: '17:00', breakMinutes: 30 },
  { id: '6', dayName: 'Saturday', startTime: '', endTime: '', breakMinutes: 0, isSaturday: true },
  { id: '7', dayName: 'Sunday', startTime: '', endTime: '', breakMinutes: 0, isSunday: true },
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

export default function AustraliaFairWorkCalculator() {
  const [baseRate, setBaseRate] = useState<number>(28.5);
  const [isCasual, setIsCasual] = useState<boolean>(true);
  const [days, setDays] = useState<AUDayEntry[]>(DEFAULT_AU_WEEK);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('gridsnap_au_fairwork_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.days) setDays(parsed.days);
        if (typeof parsed.baseRate === 'number') setBaseRate(parsed.baseRate);
        if (typeof parsed.isCasual === 'boolean') setIsCasual(parsed.isCasual);
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
      localStorage.setItem('gridsnap_au_fairwork_data', JSON.stringify({ days, baseRate, isCasual }));
    } catch (e) {
      console.error(e);
    }
  }, [days, baseRate, isCasual, isLoaded]);

  const handleDayChange = (index: number, field: keyof AUDayEntry, value: string | number | boolean) => {
    setDays((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  // Under Australian Fair Work Modern Awards:
  // Casual Loading: 25% added to Base Rate = Base Rate * 1.25
  const effectiveBaseRate = isCasual ? baseRate * 1.25 : baseRate;

  // Calculation Engine
  const calculation = useMemo(() => {
    const dailyWorked = days.map((d) => calculateShiftHours(d.startTime, d.endTime, d.breakMinutes));

    let weekdayHoursAccumulator = 0;
    let weekdayRegularHours = 0;
    let weekdayOtFirst2Hours = 0;
    let weekdayOtThereafterHours = 0;

    let saturdayHours = 0;
    let sundayHours = 0;
    let publicHolidayHours = 0;

    days.forEach((day, idx) => {
      const hours = dailyWorked[idx];
      if (hours <= 0) return;

      if (day.isPublicHoliday) {
        publicHolidayHours += hours;
      } else if (day.isSunday) {
        sundayHours += hours;
      } else if (day.isSaturday) {
        saturdayHours += hours;
      } else {
        // Monday-Friday standard 38-hour week rule & daily overtime check:
        // Modern Awards standard: daily threshold is typically 7.6 hours (or standard rostered day)
        // or weekly threshold of 38 hours. Let's apply standard Modern Award daily rule (over 7.6h or weekly over 38h):
        const dailyStandard = 7.6;
        const dayReg = Math.min(hours, dailyStandard);
        let dayOt = Math.max(0, hours - dailyStandard);

        // Weekly 38h cap
        if (weekdayHoursAccumulator + dayReg > 38) {
          const room = Math.max(0, 38 - weekdayHoursAccumulator);
          const weeklyExcess = dayReg - room;
          weekdayRegularHours += room;
          dayOt += weeklyExcess;
          weekdayHoursAccumulator = 38;
        } else {
          weekdayRegularHours += dayReg;
          weekdayHoursAccumulator += dayReg;
        }

        // Overtime escalating tier: first 2 hours at 1.5x (time and a half), thereafter 2.0x (double time)
        const otFirst2 = Math.min(dayOt, 2.0);
        const otAfter2 = Math.max(0, dayOt - 2.0);

        weekdayOtFirst2Hours += otFirst2;
        weekdayOtThereafterHours += otAfter2;
      }
    });

    const totalHoursWorked = dailyWorked.reduce((s, h) => s + h, 0);

    // Pay calculations:
    // Regular pay: weekday regular hours * effective base rate
    const regularPay = weekdayRegularHours * effectiveBaseRate;
    // Overtime tier 1 (first 2 hours): 1.5x rate
    // Note: in Modern Awards, overtime for casuals is calculated on base rate or loaded rate depending on award.
    // Standard Fair Work default calculation uses ordinary hourly rate.
    const ot15Pay = weekdayOtFirst2Hours * effectiveBaseRate * 1.5;
    const ot20Pay = weekdayOtThereafterHours * effectiveBaseRate * 2.0;

    // Weekend penalties (Fair Work standard):
    // Saturday: 1.5x rate
    // Sunday: 2.0x rate
    // Public Holiday: 2.5x rate
    const saturdayPay = saturdayHours * effectiveBaseRate * 1.5;
    const sundayPay = sundayHours * effectiveBaseRate * 2.0;
    const publicHolidayPay = publicHolidayHours * effectiveBaseRate * 2.5;

    const totalGrossPay = regularPay + ot15Pay + ot20Pay + saturdayPay + sundayPay + publicHolidayPay;

    // Australian Superannuation Guarantee (11.5% for 2024/2025/2026 on Ordinary Time Earnings)
    // OTE includes ordinary hours + weekend penalties, excluding pure overtime
    const ordinaryTimeEarnings = regularPay + saturdayPay + sundayPay;
    const superannuation115 = ordinaryTimeEarnings * 0.115;

    return {
      dailyWorked,
      totalHoursWorked: Math.round(totalHoursWorked * 100) / 100,
      weekdayRegularHours: Math.round(weekdayRegularHours * 100) / 100,
      weekdayOtFirst2Hours: Math.round(weekdayOtFirst2Hours * 100) / 100,
      weekdayOtThereafterHours: Math.round(weekdayOtThereafterHours * 100) / 100,
      saturdayHours: Math.round(saturdayHours * 100) / 100,
      sundayHours: Math.round(sundayHours * 100) / 100,
      publicHolidayHours: Math.round(publicHolidayHours * 100) / 100,
      regularPay: Math.round(regularPay * 100) / 100,
      ot15Pay: Math.round(ot15Pay * 100) / 100,
      ot20Pay: Math.round(ot20Pay * 100) / 100,
      saturdayPay: Math.round(saturdayPay * 100) / 100,
      sundayPay: Math.round(sundayPay * 100) / 100,
      publicHolidayPay: Math.round(publicHolidayPay * 100) / 100,
      totalGrossPay: Math.round(totalGrossPay * 100) / 100,
      superannuation115: Math.round(superannuation115 * 100) / 100,
    };
  }, [days, effectiveBaseRate]);

  const handleExportCSV = () => {
    const headers = ['Day', 'Start', 'End', 'Break (m)', 'Hours Worked', 'Rate Tier'];
    const rows = days.map((d, i) => [
      `"${d.dayName}"`,
      d.startTime || '-',
      d.endTime || '-',
      d.breakMinutes,
      calculation.dailyWorked[i].toFixed(2),
      d.isPublicHoliday ? 'Public Holiday (2.5x)' : d.isSunday ? 'Sunday (2.0x)' : d.isSaturday ? 'Saturday (1.5x)' : 'Standard Weekday',
    ]);

    rows.push([]);
    rows.push(['"--- FAIR WORK SUMMARY (AUD) ---"', '', '', '', '', '']);
    rows.push(['"Base Award Rate"', '', '', '', '', `A$${baseRate.toFixed(2)}/hr`]);
    rows.push(['"Casual Loading (25%)"', '', '', '', '', isCasual ? `A$${(baseRate * 0.25).toFixed(2)}/hr (Active)` : 'N/A (Permanent)']);
    rows.push(['"Effective Ordinary Rate"', '', '', '', '', `A$${effectiveBaseRate.toFixed(2)}/hr`]);
    rows.push(['"Total Hours Worked"', '', '', '', '', calculation.totalHoursWorked.toFixed(2)]);
    rows.push(['"Weekday Regular (Ordinary)"', '', '', '', '', `${calculation.weekdayRegularHours.toFixed(2)} hrs (A$${calculation.regularPay.toFixed(2)})`]);
    rows.push(['"Overtime Tier 1 (1.5x)"', '', '', '', '', `${calculation.weekdayOtFirst2Hours.toFixed(2)} hrs (A$${calculation.ot15Pay.toFixed(2)})`]);
    rows.push(['"Overtime Tier 2 (2.0x)"', '', '', '', '', `${calculation.weekdayOtThereafterHours.toFixed(2)} hrs (A$${calculation.ot20Pay.toFixed(2)})`]);
    rows.push(['"Saturday Penalty (1.5x)"', '', '', '', '', `${calculation.saturdayHours.toFixed(2)} hrs (A$${calculation.saturdayPay.toFixed(2)})`]);
    rows.push(['"Sunday Penalty (2.0x)"', '', '', '', '', `${calculation.sundayHours.toFixed(2)} hrs (A$${calculation.sundayPay.toFixed(2)})`]);
    rows.push(['"Total Gross Earnings"', '', '', '', '', `A$${calculation.totalGrossPay.toFixed(2)}`]);
    rows.push(['"Estimated Superannuation (11.5%)"', '', '', '', '', `A$${calculation.superannuation115.toFixed(2)}`]);

    const csvContent =
      'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `australia_fairwork_timesheet_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full">
      <div className="bg-surface border border-border rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl mb-8 printable-card">
        {/* Top Controls: Rate, Casual Loading Toggle, Super note */}
        <div className="no-print grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-border/80">
          <div>
            <label htmlFor="au-base-rate" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
              Award Base Rate (AUD $/hr)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400 font-bold">A$</span>
              <input
                id="au-base-rate"
                type="number"
                step="0.5"
                min="0"
                inputMode="decimal"
                value={baseRate || ''}
                onChange={(e) => setBaseRate(parseFloat(e.target.value) || 0)}
                placeholder="28.50"
                className="w-full bg-surface2 border border-border rounded-xl pl-10 pr-4 h-12 text-white font-mono font-medium focus:outline-none focus:border-accent"
              />
            </div>
            <span className="text-[11px] text-muted mt-1 block">National Minimum Wage 2024/2025: A$24.10/hr</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
              Employment Type & Casual Loading
            </label>
            <div className="grid grid-cols-2 gap-1 p-1 bg-surface2 rounded-xl border border-border">
              <button
                type="button"
                onClick={() => setIsCasual(false)}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all h-10 ${
                  !isCasual ? 'bg-emerald-500 text-gray-950 shadow-md' : 'text-gray-300 hover:text-white'
                }`}
              >
                Permanent (0%)
              </button>
              <button
                type="button"
                onClick={() => setIsCasual(true)}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all h-10 ${
                  isCasual ? 'bg-emerald-500 text-gray-950 shadow-md' : 'text-gray-300 hover:text-white'
                }`}
              >
                Casual (+25% Loading)
              </button>
            </div>
            <span className="text-[11px] text-emerald-400 mt-1 block font-mono">
              Effective Rate: A${effectiveBaseRate.toFixed(2)}/hr {isCasual ? '(+A$' + (baseRate * 0.25).toFixed(2) + ' loading)' : ''}
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
              Modern Award Standard
            </label>
            <div className="p-3 bg-surface2/60 rounded-xl border border-border text-xs text-muted leading-relaxed">
              Standard 38-hour workweek. Overtime tier: 1.5x first 2h, then 2.0x thereafter. Saturday 1.5x, Sunday 2.0x penalty.
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="no-print flex flex-wrap items-center justify-between gap-3 my-6">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setDays(DEFAULT_AU_WEEK)}
              className="px-3.5 py-2 rounded-xl bg-surface2 hover:bg-surface3 text-gray-300 text-xs font-semibold transition-colors flex items-center gap-1.5 h-10 border border-border"
            >
              Reset AU Sample
            </button>
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Clear all entries?')) {
                  setDays(DEFAULT_AU_WEEK.map((d) => ({ ...d, startTime: '', endTime: '', breakMinutes: 0 })));
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

        {/* Days Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/80 text-xs font-semibold uppercase tracking-wider text-muted">
                <th className="py-3 px-3">Day of Week</th>
                <th className="py-3 px-3">Start</th>
                <th className="py-3 px-3">End</th>
                <th className="py-3 px-3">Break (m)</th>
                <th className="py-3 px-3">Special Rates</th>
                <th className="py-3 px-3 text-right">Hours</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-sm">
              {days.map((day, idx) => (
                <tr key={day.id} className="hover:bg-surface2/30 transition-colors">
                  <td className="py-3 px-3 font-medium text-white">
                    <span className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${day.isSunday ? 'bg-amber-400' : day.isSaturday ? 'bg-cyan-400' : 'bg-emerald-400'}`}></span>
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
                    <div className="flex items-center gap-2 text-xs">
                      <label className="flex items-center gap-1 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!!day.isPublicHoliday}
                          onChange={(e) => handleDayChange(idx, 'isPublicHoliday', e.target.checked)}
                          className="rounded text-emerald-500"
                        />
                        <span className="text-gray-300">Public Hol (2.5x)</span>
                      </label>
                      {day.isSaturday && <span className="text-cyan-400 font-mono text-[11px]">Sat (1.5x)</span>}
                      {day.isSunday && <span className="text-amber-400 font-mono text-[11px]">Sun (2.0x)</span>}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-white text-base">
                    {calculation.dailyWorked[idx].toFixed(2)}h
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Summary */}
        <div className="mt-8 pt-6 border-t border-border/80 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-surface2/40 border border-border">
            <span className="text-xs text-muted uppercase tracking-wider block mb-1">Total Hours</span>
            <div className="font-mono font-bold text-2xl text-white">{calculation.totalHoursWorked.toFixed(2)}h</div>
            <div className="text-xs text-muted mt-1">Weekday Reg: {calculation.weekdayRegularHours.toFixed(2)}h</div>
          </div>

          <div className="p-4 rounded-xl bg-surface2/40 border border-border">
            <span className="text-xs text-muted uppercase tracking-wider block mb-1">Penalties & Overtime</span>
            <div className="font-mono font-bold text-2xl text-amber-400">
              A${(calculation.ot15Pay + calculation.ot20Pay + calculation.saturdayPay + calculation.sundayPay + calculation.publicHolidayPay).toFixed(2)}
            </div>
            <div className="text-xs text-muted mt-1">
              Sat/Sun/Hol + OT Tiers
            </div>
          </div>

          <div className="p-4 rounded-xl bg-surface2/40 border border-border">
            <span className="text-xs text-muted uppercase tracking-wider block mb-1">Superannuation (11.5%)</span>
            <div className="font-mono font-bold text-2xl text-cyan-400">
              A${calculation.superannuation115.toFixed(2)}
            </div>
            <div className="text-xs text-muted mt-1">Employer statutory super guarantee</div>
          </div>

          <div className="p-4 rounded-xl bg-gradient/10 border border-emerald-500/40">
            <span className="text-xs text-emerald-300 uppercase tracking-wider block mb-1">Total Gross Earnings</span>
            <div className="font-mono font-extrabold text-2xl text-white">
              A${calculation.totalGrossPay.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] text-emerald-400 mt-1">Fair Work Modern Award estimated gross</div>
          </div>
        </div>
      </div>
    </div>
  );
}
