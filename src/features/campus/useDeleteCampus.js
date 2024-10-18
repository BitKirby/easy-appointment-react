import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteCampus as deleteCampusApi } from "../../services/apiCampus";

export function useDeleteCampus() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCampus } = useMutation({
    mutationFn: deleteCampusApi,
    onSuccess: () => {
      toast.success("Campus successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["campuses"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCampus };
}
