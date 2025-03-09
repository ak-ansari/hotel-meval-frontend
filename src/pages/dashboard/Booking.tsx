import { EffectCallback, useEffect, useState } from "react";
import { IHotel } from "../../interfaces";
import { useParams, useSearchParams } from "react-router";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { getHotelById, handleBooking } from "../../services/Hotel.service";

const HotelBooking = () => {
  const [aadhaar, setAadhaar] = useState<string[]>([""]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [errors, setErrors] = useState<{
    aadhaar?: string[];
    checkIn?: string;
    checkOut?: string;
  }>({ aadhaar: [] });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const {id} = useParams();
  const [hotel, setHotel] = useState<IHotel | null>(null);

  const getHotel: EffectCallback = () => {
    (async () => {
      try {
        const hotel = await getHotelById(id);
        setHotel(hotel);
      } catch (e) {
        console.error("Error fetching hotel:", e);
      }
    })();
  };
  useEffect(getHotel, [id]);

  const validateForm = async () => {
    const newErrors: typeof errors = {};
    if (!checkIn) newErrors.checkIn = "Check-in date is required";
    if (!checkOut) newErrors.checkOut = "Check-out date is required";
    aadhaar.forEach((val, idx) => {
      val.match(/^[0-9]{12}$/);
      newErrors.aadhaar[idx] = "Aadhaar number must be 12 digits";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0
  };

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await handleBooking({
          hotelId: Number(id),
          aadhaars: aadhaar,
          checkInDate: new Date(checkIn),
          checkOutDate: new Date(checkOut),
        });
        console.log("Booking Data:", { aadhaar, checkIn, checkOut });
        setBookingSuccess(true);
      } catch (error) {
        alert(error?.response?.data?.message);
        setBookingSuccess(false);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex gap-6">
        <img
          src={hotel?.images[0]}
          alt={hotel?.name}
          className="w-48 h-48 rounded-lg"
        />
        <div>
          <h2 className="text-2xl font-semibold">{hotel?.name}</h2>
          <p className="text-gray-600">{hotel?.location}</p>
          <p className="text-lg font-bold mt-2">₹{hotel?.price} / night</p>
          <p
            className={`mt-1 ${
              hotel?.availableRooms > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {hotel?.availableRooms > 0
              ? `${hotel?.availableRooms} rooms available`
              : "No rooms available"}
          </p>
        </div>
      </div>

      {hotel?.availableRooms > 0 && !bookingSuccess && (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block font-medium">Check-in Date</label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.checkIn && (
                <p className="text-red-500 text-sm">{errors.checkIn}</p>
              )}
            </div>
            <div className="w-1/2">
              <label className="block font-medium">Check-out Date</label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.checkOut && (
                <p className="text-red-500 text-sm">{errors.checkOut}</p>
              )}
            </div>
          </div>
          <div>
            <label className="block font-medium">Aadhaar Card Number</label>

            {aadhaar.map((value, index) => (
              <div className="flex flex-row mt-2" key={index}>
                <input
                  type="text"
                  value={value}
                  onChange={(e) =>
                    setAadhaar((preVal) => {
                      const newVal = [...preVal];
                      newVal[index] = e.target.value;
                      return newVal;
                    })
                  }
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter 12-digit Aadhaar number"
                  style={{ width: "90%" }}
                />
                {index === aadhaar.length - 1 && (
                  <PlusCircleIcon
                    className="h-8 w-8 mt-1 ml-4 text-blue-600"
                    onClick={() => setAadhaar([...aadhaar, ""])}
                  ></PlusCircleIcon>
                )}
                {errors.aadhaar && (
                  <p className="text-red-500 text-sm">{errors.aadhaar}</p>
                )}
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Book Now
          </button>
        </form>
      )}

      {bookingSuccess && (
        <p className="mt-4 text-green-600 text-lg font-semibold">
          Booking confirmed! Enjoy your stay at {hotel.name}.
        </p>
      )}
    </div>
  );
};

export default HotelBooking;
