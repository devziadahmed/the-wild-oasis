import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

function useBookings() {
  const [searchParam] = useSearchParams();

  const filterValue = searchParam.get("status");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, filterMethod: "eq" };

  const {
    data: bookings,
    error,
    isLoading,
  } = useQuery({
    queryFn: () => getBookings({ filter }),
    queryKey: ["bookings", filter],
  });

  return { bookings, isLoading, error };
}

export default useBookings;
