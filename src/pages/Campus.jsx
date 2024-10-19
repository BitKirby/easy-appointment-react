import Spinner from "../ui/Spinner";
import CampusTable from "../features/campus/CampusTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Pagination from "../ui/Pagination";
import AddCampus from "../features/campus/AddCampus";
import { useCampuses, useCampusesList } from "../features/campus/useCampus";
import { useSearchParams } from "react-router-dom";

function Campus() {
  const [searchParams, setSearchParams] = useSearchParams();
  // 获取当前 URL 中的查询参数
  let paramValuePage = searchParams.get("page") || 1;
  let paramValuePerPAge = searchParams.get("perPage") || 10;
  // console.log(searchParams);
  const par = { page: paramValuePage, perPage: paramValuePerPAge };
  const { isLoading, campuses } = useCampusesList("campuses", par);
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
