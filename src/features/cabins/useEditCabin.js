import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCabin as editCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: editCabinApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Cabin is edited successfully");
    },
    onError: () => toast.error("Cabin cannot be edited"),
  });

  return { editCabin, isEditing };
}

export default useEditCabin;
