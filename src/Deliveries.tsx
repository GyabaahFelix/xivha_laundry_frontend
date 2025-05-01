import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export default function Deliveries() {
  const deliveries = useQuery(api.deliveries.list);

  if (!deliveries) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-[rgb(31,41,55)]">Deliveries</h2>

      {deliveries.length === 0 ? (
        <p className="text-gray-500">No deliveries scheduled yet.</p>
      ) : (
        <div className="grid gap-6">
          {deliveries.map((delivery) => (
            <div
              key={delivery._id}
              className="bg-white p-6 rounded-xl shadow-sm border border-[rgb(229,231,235)]"
            >
              <div className="flex justify-between flex-wrap gap-4">
                <div>
                  <p className="text-lg font-semibold text-[rgb(17,24,39)]">
                    Delivery for Order #{delivery.orderId}
                  </p>
                  <p className="text-sm text-gray-500 mb-1">
                    <span className="font-medium">Status:</span>{" "}
                    <span className="capitalize text-[rgb(79,70,229)]">{delivery.status}</span>
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Address:</span> {delivery.address}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Scheduled:</span>{" "}
                    {new Date(delivery.scheduledDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
