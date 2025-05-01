import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export default function Dashboard() {
  const orders = useQuery(api.orders.list);
  const deliveries = useQuery(api.deliveries.list);

  if (!orders || !deliveries) return null;

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((order) => order.status === "pending").length;
  const completedOrders = orders.filter((order) => order.status === "completed").length;
  const activeDeliveries = deliveries.filter((delivery) => delivery.status === "in_transit").length;

  // Mocked revenue if you don’t have payments data
  const revenue = totalOrders * 30; // Assuming 30 GHS per order

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatCard title="Total Orders" value={totalOrders} color="rgb(34, 197, 94)" />
      <StatCard title="Pending Orders" value={pendingOrders} color="rgb(251, 191, 36)" />
      <StatCard title="Completed Orders" value={completedOrders} color="rgb(59, 130, 246)" />
      <StatCard title="Active Deliveries" value={activeDeliveries} color="rgb(139, 92, 246)" />
      <StatCard title="Estimated Revenue" value={`GHS ${revenue}`} color="rgb(234, 88, 12)" />
      <StatCard title="Today's Orders" value={Math.floor(totalOrders * 0.2)} color="rgb(16, 185, 129)" />
    </div>
  );
}

function StatCard({ title, value, color }: { title: string; value: string | number; color: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border">
      <h3 className="text-md font-semibold mb-2 text-gray-700">{title}</h3>
      <p className="text-3xl font-bold" style={{ color }}>{value}</p>
    </div>
  );
}
