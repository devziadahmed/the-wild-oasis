import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";

function useBookings() {
  const {
    data: bookings,
    error,
    isLoading,
  } = useQuery({
    queryFn: getBookings,
    queryKey: ["bookings"],
  });

  return { bookings, isLoading, error };
}

export default useBookings;
