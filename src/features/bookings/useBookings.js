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

  // PAGINATION
  const page = !searchParam.get("page") ? 1 : Number(searchParam.get("page"));

  const {
    data: { data: bookings, count } = {},
    error,
    isLoading,
  } = useQuery({
    queryFn: () => getBookings({ filter, sortBy, page }),
    queryKey: ["bookings", filter, sortBy, page],
  });

  return { bookings, isLoading, error, count };
}

export default useBookings;
