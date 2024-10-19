import { useSearchParams } from "react-router-dom";

export function useQueryParams() {
  const [searchParams] = useSearchParams();

  // 提取查询参数
  const paramFilter = searchParams.get("filter");
  const paramValuePage = searchParams.get("page");
  const paramValuePerPage = searchParams.get("perPage");
  const paramValueOrder = searchParams.get("order");
  const paramValueFiled = searchParams.get("field");

  // 返回封装好的查询参数对象
  return {
    paramFilter,
    paramValuePage,
    paramValuePerPage,
    paramValueOrder,
    paramValueFiled,
  };
}
