import axios from "axios";
import { IHotel, IHotelBooking } from "../interfaces";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
export async function getHotels(): Promise<IHotel[]> {
  try {
    const { data } = await axios.get<IHotel[]>(`${baseUrl}hotel`, {
      headers: getHeaders(),
    });
    return data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}
export async function handleBooking(details: IHotelBooking): Promise<void> {
  try {
    const { data } = await axios.post<IHotelBooking>(
      `${baseUrl}hotel/booking`,
      details,
      {
        headers: getHeaders(),
      }
    );
    alert("hotel booked successfully booking id is" + data.id);
  } catch (error) {
    alert("Error during booking:" + error?.response?.data?.message);
    throw error;
  }
}
export async function getHotelById(id: string): Promise<IHotel> {
    try {
      const { data } = await axios.get<IHotel>(`${baseUrl}hotel/${id}`, {
        headers: getHeaders(),
      });
      return data;
    } catch (error) {
      console.error("Error during fetching hotel by id:", error);
      throw error;
    }
  }

const getHeaders = () => ({
  Authorization: "Bearer " + localStorage.getItem("accessToken"),
});
