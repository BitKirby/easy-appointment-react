import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createCampusAPI } from "../../services/apiCampus";

export function useCreateCampus() {
  const queryClient = useQueryClient();

  const { mutate: createCampus, isLoading: isCreating } = useMutation({
    mutationFn: ({ resource, data }) => createCampusAPI(resource, data), // call your API
    onSuccess: () => {
      toast.success("新的校区已成功追加");
      queryClient.invalidateQueries({ queryKey: ["campuses"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createCampus };
}
