'use client';

import React, { useState, useMemo } from 'react';

export interface ShiftEntry {
  id: string;
  name: string;
  start: string;
  end: string;
  breakMins: number;
}

const DEFAULT_SHIFTS: ShiftEntry[] = [
  { id: '1', name: 'Morning Shift', start: '08:00', end: '12:00', breakMins: 0 },
  { id: '2', name: 'Afternoon Shift', start: '13:00', end: '17:30', breakMins: 15 },
];

export default function HoursWorkedCalculator() {
  const [shifts, setShifts] = useState<ShiftEntry[]>(DEFAULT_SHIFTS);
  const [hourlyWage, setHourlyWage] = useState<number>(22.0);
  const [customMinutes, setCustomMinutes] = useState<number>(45);

  const handleShiftChange = (id: string, field: keyof ShiftEntry, value: string | number) => {
    setShifts((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const handleAddShift = () => {
    const newId = String(Date.now());
    setShifts((prev) => [
      ...prev,
      { id: newId, name: `Shift ${prev.length + 1}`, start: '09:00', end: '17:00', breakMins: 30 },
    ]);
  };

  const handleRemoveShift = (id: string) => {
    if (shifts.length <= 1) return;
    setShifts((prev) => prev.filter((s) => s.id !== id));
  };

  // Compute shift hours
  const calculatedShifts = useMemo(() => {
    return shifts.map((s) => {
      if (!s.start || !s.end) {
        return { ...s, durationMinutes: 0, decimalHours: 0, formatted: '0h 0m' };
      }
      const [sh, sm] = s.start.split(':').map(Number);
      const [eh, em] = s.end.split(':').map(Number);
      const startM = sh * 60 + sm;
      let endM = eh * 60 + em;
      if (endM < startM) endM += 24 * 60; // overnight
      const elapsed = Math.max(0, endM - startM - (s.breakMins || 0));
      const hours = Math.floor(elapsed / 60);
      const mins = elapsed % 60;
      const dec = Math.round((elapsed / 60) * 100) / 100;
      return {
        ...s,
        durationMinutes: elapsed,
        decimalHours: dec,
        formatted: `${hours}h ${mins}m`,
      };
    });
  }, [shifts]);

  const totalMinutes = calculatedShifts.reduce((acc, s) => acc + s.durationMinutes, 0);
  const totalDecimalHours = Math.round((totalMinutes / 60) * 100) / 100;
  const totalHoursInt = Math.floor(totalMinutes / 60);
  const totalRemainingMinutes = totalMinutes % 60;
  const grossPay = Math.round(totalDecimalHours * hourlyWage * 100) / 100;

  // Single-minute converter result
  const convertedDecimal = (customMinutes / 60).toFixed(2);

  const handleExportCSV = () => {
    const headers = ['Shift Name', 'Start Time', 'End Time', 'Break (Mins)', 'Time (HH:MM)', 'Decimal Hours'];
    const rows = calculatedShifts.map((s) => [
      `"${s.name}"`,
      s.start,
      s.end,
      s.breakMins,
      s.formatted,
      s.decimalHours.toFixed(2),
    ]);

    rows.push([]);
    rows.push(['"Total Elapsed Hours"', '', '', '', `${totalHoursInt}h ${totalRemainingMinutes}m`, totalDecimalHours.toFixed(2)]);
    rows.push(['"Hourly Wage"', '', '', '', '', `$${hourlyWage.toFixed(2)}/hr`]);
    rows.push(['"Total Gross Earnings"', '', '', '', '', `$${grossPay.toFixed(2)}`]);

    const csvContent =
      'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `hours_worked_report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full">
      <div className="bg-surface border border-border rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl mb-8 printable-card">
        {/* Top Control */}
        <div className="no-print flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border/80">
          <div>
            <label htmlFor="hw-wage" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
              Hourly Wage ($/hr)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400 font-bold">$</span>
              <input
                id="hw-wage"
                type="number"
                step="0.5"
                min="0"
                inputMode="decimal"
                value={hourlyWage || ''}
                onChange={(e) => setHourlyWage(parseFloat(e.target.value) || 0)}
                placeholder="22.00"
                className="w-48 bg-surface2 border border-border rounded-xl pl-8 pr-4 h-12 text-white font-mono font-medium focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleAddShift}
              className="px-4 py-2 rounded-xl bg-surface2 hover:bg-surface3 text-white text-xs font-bold transition-all flex items-center gap-1.5 h-10 border border-border"
            >
              + Add Punch / Shift
            </button>
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

        {/* Shifts List */}
        <div className="my-6 space-y-4">
          {calculatedShifts.map((shift) => (
            <div
              key={shift.id}
              className="bg-surface2/50 border border-border rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="w-full sm:w-44">
                <input
                  type="text"
                  value={shift.name}
                  onChange={(e) => handleShiftChange(shift.id, 'name', e.target.value)}
                  className="w-full bg-surface border border-border rounded-lg px-3 h-10 text-white font-medium text-sm focus:outline-none focus:border-accent"
                />
              </div>

              <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto">
                <div>
                  <span className="block sm:hidden text-[10px] text-muted uppercase">Start</span>
                  <input
                    type="time"
                    value={shift.start}
                    onChange={(e) => handleShiftChange(shift.id, 'start', e.target.value)}
                    className="w-full sm:w-32 bg-surface border border-border rounded-xl px-2 h-12 text-white font-mono text-base focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <span className="block sm:hidden text-[10px] text-muted uppercase">End</span>
                  <input
                    type="time"
                    value={shift.end}
                    onChange={(e) => handleShiftChange(shift.id, 'end', e.target.value)}
                    className="w-full sm:w-32 bg-surface border border-border rounded-xl px-2 h-12 text-white font-mono text-base focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-muted">Break:</span>
                <input
                  type="number"
                  min="0"
                  max="180"
                  step="5"
                  value={shift.breakMins}
                  onChange={(e) => handleShiftChange(shift.id, 'breakMins', Number(e.target.value) || 0)}
                  className="w-20 bg-surface border border-border rounded-xl px-2 h-12 text-white font-mono text-base focus:outline-none focus:border-accent"
                />
                <span className="text-xs text-muted">mins</span>
              </div>

              <div className="text-right flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-0 border-border/60 pt-2 sm:pt-0">
                <div>
                  <div className="font-mono font-bold text-white text-base">{shift.decimalHours.toFixed(2)} hrs</div>
                  <div className="text-xs text-muted font-mono">{shift.formatted}</div>
                </div>
                {shifts.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveShift(shift.id)}
                    className="no-print text-gray-500 hover:text-red-400 p-2"
                    aria-label="Remove shift"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Totals Banner */}
        <div className="mt-8 pt-6 border-t border-border/80 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-surface2/40 border border-border">
            <span className="text-xs text-muted uppercase tracking-wider block mb-1">Time Elapsed</span>
            <div className="font-mono font-bold text-2xl text-white">
              {totalHoursInt}h {totalRemainingMinutes}m
            </div>
            <div className="text-xs text-muted mt-1">Clock hours and minutes</div>
          </div>

          <div className="p-4 rounded-xl bg-surface2/40 border border-border">
            <span className="text-xs text-muted uppercase tracking-wider block mb-1">Decimal Hours</span>
            <div className="font-mono font-bold text-2xl text-emerald-400">
              {totalDecimalHours.toFixed(2)} <span className="text-sm font-normal text-muted">hrs</span>
            </div>
            <div className="text-xs text-muted mt-1">Ready for payroll input</div>
          </div>

          <div className="p-4 rounded-xl bg-gradient/10 border border-emerald-500/40">
            <span className="text-xs text-emerald-300 uppercase tracking-wider block mb-1">Calculated Gross Pay</span>
            <div className="font-mono font-extrabold text-2xl text-white">
              ${grossPay.toFixed(2)}
            </div>
            <div className="text-xs text-emerald-400/80 mt-1">
              At ${hourlyWage.toFixed(2)}/hr base
            </div>
          </div>
        </div>

        {/* Live Instant Minutes to Decimal Converter Widget */}
        <div className="no-print mt-8 p-6 rounded-xl bg-surface2/30 border border-border/80">
          <h3 className="font-semibold text-white text-base mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            Instant Minutes to Decimal Converter
          </h3>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max="600"
                value={customMinutes}
                onChange={(e) => setCustomMinutes(Number(e.target.value) || 0)}
                className="w-28 bg-surface border border-border rounded-xl px-3 h-12 text-white font-mono text-base focus:outline-none focus:border-accent"
              />
              <span className="text-sm text-muted">minutes</span>
            </div>
            <span className="text-muted font-bold text-lg">=</span>
            <div className="flex items-center gap-2">
              <span className="px-4 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-bold text-xl">
                {convertedDecimal}
              </span>
              <span className="text-sm text-muted">decimal hours</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
