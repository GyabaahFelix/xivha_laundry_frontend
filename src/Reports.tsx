import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export default function Reports() {
  const orders = useQuery(api.orders.list);
  const services = useQuery(api.services.list);

  if (!orders || !services) return null;

  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const ordersByStatus = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-[rgb(31,41,55)]">Reports</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-[rgb(229,231,235)]">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Overview</h3>
          <p className="text-3xl font-bold text-indigo-600">
            ₵{totalRevenue.toFixed(2)}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-[rgb(229,231,235)]">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Orders by Status</h3>
          <div className="space-y-2 text-sm text-gray-700">
            {Object.entries(ordersByStatus).map(([status, count]) => (
              <div key={status} className="flex justify-between border-b py-1 last:border-none">
                <span className="capitalize">{status}</span>
                <span className="font-semibold">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
