import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

export default function Orders() {
  const orders = useQuery(api.orders.list);
  const updateStatus = useMutation(api.orders.updateStatus);

  if (!orders) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-[rgb(31,41,55)]">Customer Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet. Orders placed by customers will appear here.</p>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-6 rounded-xl shadow-sm border border-[rgb(229,231,235)]"
            >
              <div className="flex justify-between flex-wrap gap-4">
                <div>
                  <p className="text-lg font-semibold text-[rgb(17,24,39)]">Order #{order._id}</p>
                  <p className="text-sm text-[rgb(107,114,128)]">Items: {order.items}</p>
                  <p className="text-lg font-bold text-[rgb(79,70,229)]">
                    Total: GHS {order.totalAmount}
                  </p>
                  {order.notes && (
                    <p className="text-sm text-[rgb(100,116,139)] mt-2">
                      <span className="font-medium">Notes:</span> {order.notes}
                    </p>
                  )}
                </div>

                <div className="flex flex-col justify-between">
                  <label className="text-sm font-medium text-gray-600 mb-1">Status</label>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus({ orderId: order._id, status: e.target.value })
                    }
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[rgb(99,102,241)]"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
