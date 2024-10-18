import queryString from "query-string";

export async function getCampuses() {
  // 使用 fetch 抓取数据
  const response = await fetch("http://127.0.0.1:5000/api/campuses/");

  if (!response.ok) {
    throw new Error("campuses could not be loaded");
  }

  const data = await response.json(); // 将响应解析为 JSON
  return data.data;
}

export async function getList(resource, params) {
  // 处理 filter 参数
  const query =
    params.filter && Object.keys(params.filter).length > 0
      ? JSON.stringify(params.filter)
      : null;

  // 添加 order, page, perPage, sort 参数
  const { page, perPage } = params.pagination || { page: 1, perPage: 10 };
  const { field, order } = params.sort || { field: "id", order: "ASC" }; // 提供默认值

  const queryParams = {
    //和后端统一
    filter: query,
    sort_order: order,
    page: page,
    per_page: perPage,
    sort_field: field,
  };

  // 根据参数生成 URL
  const url = `http://127.0.0.1:5000/api/${resource}/search?${queryString.stringify(
    queryParams
  )}`;

  // 使用 fetch 抓取数据
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("campuses could not be loaded");
  }

  const data = await response.json(); // 将响应解析为 JSON
  return data.data;
}

export async function createEditCampus(newCampus, id) {}

export async function deleteCampus(id) {}
