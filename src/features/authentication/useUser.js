import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const { data: user, isLoading } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ["user"],
  });

  const isAuthenticated = user?.role === "authenticated";

  return { isLoading, user, isAuthenticated };
}
