import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

function useCabins() {
  const {
    data: cabins,
    error,
    isLoading,
  } = useQuery({
    queryFn: getCabins,
    queryKey: ["cabins"],
  });
  return { cabins, error, isLoading };
}

export default useCabins;
