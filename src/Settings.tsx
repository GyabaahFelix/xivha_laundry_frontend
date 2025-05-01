import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useState, useEffect } from "react";

export default function Settings() {
  const settings = useQuery(api.settings.get);
  const saveSettings = useMutation(api.settings.save);
  const [form, setForm] = useState({
    notifications: false,
    preferredPayment: "",
    defaultAddress: "",
  });

  useEffect(() => {
    if (settings) {
      setForm(settings);
    }
  }, [settings]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-[rgb(31,41,55)]">Settings</h2>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await saveSettings(form);
        }}
        className="bg-white p-6 rounded-xl shadow-sm border border-[rgb(229,231,235)] max-w-xl"
      >
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <input
              id="notifications"
              type="checkbox"
              checked={form.notifications}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, notifications: e.target.checked }))
              }
              className="w-5 h-5 text-indigo-600 border-gray-300 rounded"
            />
            <label htmlFor="notifications" className="text-sm text-gray-700 font-medium">
              Enable Notifications
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Payment Method
            </label>
            <select
              value={form.preferredPayment}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, preferredPayment: e.target.value }))
              }
              className="w-full border border-gray-300 rounded-lg p-2 text-sm"
            >
              <option value="">Select payment method</option>
              <option value="card">Credit Card</option>
              <option value="cash">Cash</option>
              <option value="transfer">Bank Transfer</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Default Address
            </label>
            <textarea
              value={form.defaultAddress}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, defaultAddress: e.target.value }))
              }
              rows={3}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm"
              placeholder="Enter your default delivery address"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 bg-indigo-600 hover:bg-indigo-700 transition text-white px-6 py-2 rounded-lg text-sm font-medium"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
}
