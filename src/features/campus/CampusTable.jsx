import CampusRow from "./CampusRow";

import Table from "../../ui/TableWithSortHead";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

function CampusTable({ campuses }) {
  if (!campuses.length) return <Empty resourceName="campuses" />;

  return (
    <Menus>
      <Table columns="0.8fr 3fr 5fr 0.8fr" data={campuses}>
        <Table.Header>
          <Table.HeaderItemsWithSort field="id">序号</Table.HeaderItemsWithSort>
          <Table.HeaderItemsWithSort field="name">
            校区名称
          </Table.HeaderItemsWithSort>
          <Table.HeaderItemsWithSort field="description">
            描述
          </Table.HeaderItemsWithSort>
        </Table.Header>

        <Table.Body
          render={(campus) => <CampusRow campus={campus} key={campus.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CampusTable;
