import { createContext, useContext, useState } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const TableContext = createContext();

function Table({ columns, data, children }) {
  const [sortField, setSortField] = useState();
  const [sortDirection, setSortDirection] = useState("asc");

  const sortedItems = data.sort((a, b) => {
    const modifier = sortDirection === "asc" ? 1 : -1;

    if (sortField == null) return 1;

    if (typeof a[sortField] === "number" && typeof b[sortField] === "number") {
      return (a[sortField] - b[sortField]) * modifier;
    } else {
      return a[sortField].localeCompare(b[sortField]) * modifier;
    }
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <TableContext.Provider
      value={{ columns, sortField, sortDirection, handleSort, sortedItems }}
    >
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader role="row" columns={columns} as="header">
      {children}
    </StyledHeader>
  );
}

function HeaderItemsWithSort({ field, children }) {
  const { sortField, sortDirection, handleSort } = useContext(TableContext);

  // Render the arrow based on the current sort direction
  const renderSortArrow = () => {
    if (sortField === field) {
      return sortDirection === "asc" ? "↑" : "↓";
    }
    return null;
  };

  return (
    <div onClick={() => handleSort(field)}>
      {children} {renderSortArrow()}
    </div>
  );
}

function Row({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledRow role="row" columns={columns}>
      {children}
    </StyledRow>
  );
}

function Body({ render }) {
  const { sortedItems } = useContext(TableContext);
  if (!sortedItems.length) return <Empty>未找到数据</Empty>;

  return <StyledBody>{sortedItems.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;
Table.HeaderItemsWithSort = HeaderItemsWithSort;

export default Table;
