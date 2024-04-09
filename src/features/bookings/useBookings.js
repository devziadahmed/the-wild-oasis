import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

function useBookings() {
  const [searchParam] = useSearchParams();

  // FILTER
  const filterValue = searchParam.get("status");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, filterMethod: "eq" };

  // SORT
  const sortByRaw = searchParam.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  const {
    data: bookings,
    error,
    isLoading,
  } = useQuery({
    queryFn: () => getBookings({ filter, sortBy }),
    queryKey: ["bookings", filter, sortBy],
  });

  return { bookings, isLoading, error };
}

export default useBookings;
