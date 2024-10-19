import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteCampus as deleteCampusApi } from "../../services/apiCampus";

export function useDeleteCampus() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCampus } = useMutation({
    mutationFn: ({ resource, id }) => deleteCampusApi(resource, id),
    onSuccess: () => {
      toast.success("校园信息已成功删除");

      queryClient.invalidateQueries({
        queryKey: ["campuses"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCampus };
}
