import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

function useBookings() {
  const queryClient = useQueryClient();
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

  const pageCount = Math.ceil(count / PAGE_SIZE);

  // PRE-FETCHING
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
      queryKey: ["bookings", filter, sortBy, page + 1],
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
      queryKey: ["bookings", filter, sortBy, page - 1],
    });

  return { bookings, isLoading, error, count };
}

export default useBookings;
