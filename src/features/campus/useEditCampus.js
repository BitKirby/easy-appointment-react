import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditCampusAPI } from "../../services/apiCampus";
import { toast } from "react-hot-toast";

export function useEditCampus() {
  const queryClient = useQueryClient();

  const { mutate: editCampus, isLoading: isEditing } = useMutation({
    mutationFn: ({ resource, id, data }) => EditCampusAPI(resource, id, data),
    onSuccess: () => {
      toast.success("校区数据已更新");
      queryClient.invalidateQueries({ queryKey: ["campuses"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editCampus };
}
