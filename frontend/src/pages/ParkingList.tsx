import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type ParkingArea = {
  id: number;
  name: string;
  total_slots: number;
  available_slots: number;
  unavailable_slots: number;
};

export default function ParkingList() {
  const [areas, setAreas] = useState<ParkingArea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/parking")
      .then((res) => res.json())
      .then((data) => {
        setAreas(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch parking areas", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-900 mb-2">
          Find available parking
        </h2>
        <p className="text-gray-600">
          Thammasat University • Real-time slot status
        </p>

        {/* Non-functional search bar (as requested) */}
        <div className="mt-6 relative max-w-md">
          <input
            type="text"
            placeholder="Search parking areas... (e.g. GYM 7)"
            className="w-full bg-white border border-gray-200 rounded-3xl px-6 py-4 text-lg focus:outline-none focus:border-emerald-500 shadow-sm"
          />
        </div>
      </div>

      {loading ? (
        <div className="h-40 flex items-center justify-center">
          <span className="text-gray-500 font-medium">Loading...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((area) => (
            <Link
              key={area.id}
              to={`/parking/${area.id}`}
              className="bg-white rounded-3xl shadow hover:shadow-xl transition-all duration-300 overflow-hidden group block"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-semibold text-gray-900">
                    {area.name}
                  </h3>
                  {area.available_slots > 0 ? (
                    <span className="px-4 py-1 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-2xl">
                      OPEN
                    </span>
                  ) : (
                    <span className="px-4 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-2xl">
                      FULL
                    </span>
                  )}
                </div>

                <div className="mt-8 flex items-baseline gap-2">
                  <span className="text-6xl font-bold text-emerald-600">
                    {area.available_slots}
                  </span>
                  <span className="text-3xl text-gray-400">/</span>
                  <span className="text-3xl text-gray-400">
                    {area.total_slots}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {area.unavailable_slots} occupied
                </p>

                <div className="h-2 bg-gray-100 rounded-3xl mt-6 overflow-hidden">
                  <div
                    className="h-2 bg-emerald-500 rounded-3xl transition-all duration-500"
                    style={{
                      width: `${
                        (area.available_slots / area.total_slots) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
