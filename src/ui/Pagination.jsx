import { useState, useEffect } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Input from "./Input";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Pagination({ perPage, totalPage }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const currentPerPage = !searchParams.get("perPage")
    ? 1
    : Number(searchParams.get("perPage"));

  const [pageToInputValue, setPageToInputValue] = useState();
  const handlePageToInputChange = (event) => {
    // 将用户输入的值限定在1-最大页数之间
    if (event.target.value < 1) event.target.value = 1;
    if (event.target.value > totalPage) event.target.value = totalPage;
    setPageToInputValue(event.target.value);
  };

  const handlePageToEventEnterKeyDown = (event) => {
    if (event.key === "Enter") {
      searchParams.set("page", pageToInputValue);
      setSearchParams(searchParams);
    }
  };

  const [pageSize, setPageSize] = useState(currentPerPage); // 默认每页显示10条
  const handlePageSizeChange = (event) => {
    const selectedSize = parseInt(event.target.value, 10);
    setPageSize(selectedSize);
    setSearchParams({ perPage: selectedSize });
  };

  useEffect(() => {
    const page = searchParams.get("page");
    if (page) {
      const pageNumber = parseInt(page, 10);

      // 如果用户输入的页面数超过 maxPage 或小于 1，自动修正
      if (pageNumber > totalPage) {
        setSearchParams({ page: totalPage }, { replace: true });
      } else if (pageNumber < 1 || isNaN(pageNumber)) {
        setSearchParams({ page: 1 }, { replace: true });
      }
    }
  }, [searchParams, setSearchParams, totalPage]);

  function nextPage() {
    const next = currentPage === totalPage ? currentPage : currentPage + 1;

    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  return (
    <StyledPagination>
      <P>
        <span>{(currentPage - 1) * perPage + 1}</span> -{" "}
        <span>
          {currentPage === totalPage ? totalPage : currentPage * perPage}
        </span>{" "}
        总记录数：<span>{totalPage}</span> 总页数：<span>{totalPage} </span>{" "}
        跳转
        <Input
          type="number"
          value={pageToInputValue}
          onChange={handlePageToInputChange}
          onKeyDown={handlePageToEventEnterKeyDown}
          style={{ width: "50px", padding: "5px" }}
        ></Input>{" "}
        每页显示
        <select id="pageSize" value={pageSize} onChange={handlePageSizeChange}>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </P>

      {totalPage <= 1 ? null : (
        <Buttons>
          <PaginationButton onClick={prevPage} disabled={currentPage === 1}>
            <HiChevronLeft /> <span>上一页</span>
          </PaginationButton>

          <PaginationButton
            onClick={nextPage}
            disabled={currentPage === totalPage}
          >
            <span>下一页</span>
            <HiChevronRight />
          </PaginationButton>
        </Buttons>
      )}
    </StyledPagination>
  );
}

export default Pagination;
