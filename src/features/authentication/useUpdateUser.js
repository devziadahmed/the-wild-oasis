import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser as updateUserApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      toast.success("User info is updated successfully");
    },
    onError: () => toast.error("User info cannot be updated"),
  });

  return { updateUser, isUpdating };
}

export default useUpdateUser;
