import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditCampus } from "../../services/apiCampus";

export function useCreateCampus() {
  const queryClient = useQueryClient();

  const { mutate: createCampus, isLoading: isCreating } = useMutation({
    mutationFn: createEditCampus,
    onSuccess: () => {
      toast.success("New campus successfully created");
      queryClient.invalidateQueries({ queryKey: ["campuses"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createCampus };
}
