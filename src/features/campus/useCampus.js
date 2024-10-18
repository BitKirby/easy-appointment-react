import { useQuery } from "@tanstack/react-query";
import { getCampuses, getList } from "../../services/apiCampus";

export function useCampuses() {
  const {
    isLoading,
    data: campuses,
    error,
  } = useQuery({
    queryKey: ["campuses"],
    queryFn: getCampuses,
  });

  return { isLoading, error, campuses };
}

export function useCampusesList(resource, params) {
  const {
    isLoading,
    data: campuses,
    error,
  } = useQuery({
    queryKey: [resource, params],
    queryFn: () => getList(resource, params),
  });

  return { isLoading, error, campuses };
}
