import { PageHeader } from "../../components/common/PageHeader";
import { useState } from "react";

export default function AdminSlas() {
  const [high, setHigh] = useState(4);
  const [medium, setMedium] = useState(12);
  const [low, setLow] = useState(48);

  return (
    <div className="space-y-10">
      <PageHeader
        title="SLA Settings"
        subtitle="Configure service-level targets for different ticket priorities"
      />

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-8 space-y-8 border border-slate-200 dark:border-slate-800">

        {/* High Priority */}
        <div className="space-y-3">
          <label className="block font-semibold text-red-600 dark:text-red-400">
            High Priority (hours)
          </label>

          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <input
              type="range"
              min={1}
              max={12}
              value={high}
              onChange={(e) => setHigh(Number(e.target.value))}
              className="w-full accent-red-500"
            />

            <input
              type="number"
              value={high}
              onChange={(e) => setHigh(Number(e.target.value))}
              className="w-28 p-2 border rounded-lg dark:bg-slate-400"
            />
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-300">
            Recommended: 1–6 hours
          </p>
        </div>

        {/* Medium Priority */}
        <div className="space-y-3">
          <label className="block font-semibold text-yellow-600 dark:text-yellow-400">
            Medium Priority (hours)
          </label>

          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <input
              type="range"
              min={4}
              max={24}
              value={medium}
              onChange={(e) => setMedium(Number(e.target.value))}
              className="w-full accent-yellow-500"
            />

            <input
              type="number"
              value={medium}
              onChange={(e) => setMedium(Number(e.target.value))}
              className="w-28 p-2 border rounded-lg dark:bg-slate-400"
            />
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-300">
            Recommended: 8–16 hours
          </p>
        </div>

        {/* Low Priority */}
        <div className="space-y-3">
          <label className="block font-semibold text-green-600 dark:text-green-400">
            Low Priority (hours)
          </label>

          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <input
              type="range"
              min={24}
              max={96}
              value={low}
              onChange={(e) => setLow(Number(e.target.value))}
              className="w-full accent-green-500"
            />

            <input
              type="number"
              value={low}
              onChange={(e) => setLow(Number(e.target.value))}
              className="w-28 p-2 border rounded-lg dark:bg-slate-400"
            />
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-300">
            Recommended: 48–72 hours
          </p>
        </div>

        <button className="bg-primary text-white font-medium px-6 py-3 rounded-lg hover:opacity-90 transition shadow-md">
          Save Changes
        </button>
      </div>
    </div>
  );
}