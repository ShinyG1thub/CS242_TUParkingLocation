import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

type ParkingArea = {
  id: number;
  name: string;
  total_slots: number;
  available_slots: number;
  unavailable_slots: number;
};

type ParkingSlot = {
  name: string;
  status: "available" | "occupied";
};

type ParkingDetailResponse = {
  area: ParkingArea;
  slots: ParkingSlot[];
};

export default function ParkingDetail() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<ParkingDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/parking/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((json) => {
        if (json.error) {
          throw new Error(json.error);
        }
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Parking area not found or failed to load.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="h-40 flex items-center justify-center">
        <span className="text-gray-500 font-medium">Loading details...</span>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <h2 className="text-2xl font-bold text-red-600 mb-4">{error}</h2>
        <Link to="/" className="text-emerald-600 hover:text-emerald-700 underline">
          Return to Home
        </Link>
      </div>
    );
  }

  const { area, slots } = data;

  return (
    <div className="max-w-2xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-6"
      >
        ← Back to all areas
      </Link>

      <div className="bg-white rounded-3xl shadow p-8">
        <h1 className="text-4xl font-semibold">{area.name}</h1>
        <div className="flex items-baseline gap-3 mt-4">
          <span className="text-6xl font-bold text-emerald-600">
            {area.available_slots}
          </span>
          <span className="text-3xl text-gray-400">available</span>
          <span className="text-3xl text-gray-400">of</span>
          <span className="text-3xl">{area.total_slots}</span>
        </div>

        {/* Slots grid – mobile-app feel */}
        <h2 className="text-xl font-medium mt-10 mb-4">All slots</h2>
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
          {slots.map((slot) => (
            <div
              key={slot.name}
              className={`aspect-square rounded-2xl flex flex-col items-center justify-center text-center border ${
                slot.status === "available"
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                  : "bg-red-50 border-red-200 text-red-700"
              }`}
            >
              <div className="font-mono text-xl font-medium">{slot.name}</div>
              <div className="text-xs uppercase tracking-widest font-semibold mt-1">
                {slot.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
