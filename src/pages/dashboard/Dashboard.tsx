import { useState, useEffect, EffectCallback } from "react";
import { IHotel } from "../../interfaces";
import { useNavigate } from "react-router";
import { getHotels } from "../../services/Hotel.service";

const HotelDashboard = () => {
  const [search, setSearch] = useState("");
  const [price, setprice] = useState("any");
  const [rating, setRating] = useState("any");
  const [hotels, setHotels] = useState<IHotel[]>([]);
  const navigate = useNavigate();
  const handleClick = (id: number) => {
    navigate("/booking/" + id);
  };

  useEffect(() => {
    fetchHotels();
  }, [search, price, rating]);

  const fetchHotels: EffectCallback = () => {
    const queryParams = new URLSearchParams({});
    if (search) queryParams.append("search", search);
    if (price !== "any") queryParams.append("price", price);
    if (rating !== "any") queryParams.append("rating", rating);
    (async () => {
      try {
        const hotels = await getHotels();
        setHotels(hotels);
      } catch (error) {
        alert(error?.response?.data?.message);
      }
    })();
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Hotel Mevan</h2>
      {/* <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search hotels..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={price}
          onChange={(e) => setprice(e.target.value)}
        >
          <option value="any">Any Price</option>
          <option value="150">$150</option>
          <option value="200">$200</option>
          <option value="300">$300</option>
        </select>
        <select
          className="border p-2 rounded"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="any">Any Rating</option>
          <option value="4">4 Star</option>
          <option value="5">5 Star</option>
        </select>
      </div> */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 cursor-pointer ">
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className="bg-white rounded-3xl shadow-lg"
            onClick={() => handleClick(hotel.id)}
          >
            <img
              src={hotel.images[0] || "https://via.placeholder.com/300"}
              alt={hotel.name}
              className="w-full h-50 object-cover rounded-t-3xl"
            />
            <div className="flex w-full bg-gray-200 rounded-b-3xl p-3">
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-green-700">
                  {hotel.name}
                </h2>

                <h4 className="text-lg text-gray-700">
                  ₹ {hotel.price} / night
                </h4>
              </div>
              <div className="flex-1 text-end">
                <p className="text-blue-500 pr-4 text-xl">{hotel.location}</p>
                <p className="text-gray-600 text-xl">{hotel.rating} ⭐ </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelDashboard;
