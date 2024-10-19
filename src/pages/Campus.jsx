import Spinner from "../ui/Spinner";
import CampusTable from "../features/campus/CampusTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Pagination from "../ui/Pagination";
import AddCampus from "../features/campus/AddCampus";
import { useCampusesList } from "../features/campus/useCampus";
import { useQueryParams } from "../hooks/useQueryParams";

function Campus() {
  // 使用自定义 Hook 获取查询参数
  const params = useQueryParams();

  const { isLoading, campuses } = useCampusesList("campuses", params);
  // const { isLoading, campuses } = useCampuses();

  if (isLoading) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">全部校区</Heading>
      </Row>

      <Row>
        <AddCampus />
        <CampusTable campuses={campuses.campuses} />
      </Row>
      <Pagination
        perPage={campuses.per_page}
        totalPage={campuses.total_pages}
      />
    </>
  );
}

export default Campus;
