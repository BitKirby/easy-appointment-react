import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCampus } from "../../services/apiCampus";
import { toast } from "react-hot-toast";

export function useEditCampus() {
  const queryClient = useQueryClient();

  const { mutate: editCampus, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCampusData, id }) => createEditCampus(newCampusData, id),
    onSuccess: () => {
      toast.success("Campus successfully edited");
      queryClient.invalidateQueries({ queryKey: ["campuss"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editCampus };
}
