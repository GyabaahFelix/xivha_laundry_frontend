import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useState } from "react";

export default function Services() {
  const services = useQuery(api.services.list);
  const createService = useMutation(api.services.create);
  const [showForm, setShowForm] = useState(false);

  if (!services) return null;

  return (
    <div>
      <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
        <h2 className="text-2xl font-bold text-gray-800">Laundry Services</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[rgb(79,70,229)] text-white px-4 py-2 rounded-lg hover:bg-[rgb(99,102,241)] transition"
        >
          {showForm ? "Cancel" : "Add Service"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);
            await createService({
              name: formData.get("name") as string,
              price: Number(formData.get("price")),
              description: formData.get("description") as string,
              estimatedTime: Number(formData.get("estimatedTime")),
            });
            form.reset();
            setShowForm(false);
          }}
          className="mb-6 bg-white p-6 rounded-xl shadow-sm border"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              placeholder="Service Name"
              required
              className="border rounded p-2"
            />
            <input
              name="price"
              type="number"
              placeholder="Price (GHS)"
              required
              className="border rounded p-2"
            />
            <input
              name="description"
              placeholder="Description"
              required
              className="border rounded p-2 col-span-1 md:col-span-2"
            />
            <input
              name="estimatedTime"
              type="number"
              placeholder="Estimated Time (hours)"
              required
              className="border rounded p-2"
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-[rgb(79,70,229)] text-white px-4 py-2 rounded-lg hover:bg-[rgb(99,102,241)] transition"
          >
            Save Service
          </button>
        </form>
      )}

      {services.length === 0 ? (
        <p className="text-gray-600">No services added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service._id} className="bg-white p-6 rounded-xl shadow-md border border-[rgb(229,231,235)]">
              <h3 className="text-xl font-semibold mb-1 text-[rgb(17,24,39)]">{service.name}</h3>
              <p className="text-sm text-[rgb(107,114,128)] mb-2">{service.description}</p>
              <p className="text-lg font-bold text-[rgb(37,99,235)]">GHS {service.price}</p>
              <p className="text-sm text-[rgb(100,116,139)]">
                Estimated time: <span className="font-medium">{service.estimatedTime} hrs</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
