import queryString from "query-string";

export async function getCampuses() {
  // 使用 fetch 抓取数据
  const response = await fetch("http://127.0.0.1:5000/api/campuses/");

  if (!response.ok) {
    throw new Error("无法显示校园数据");
  }

  const data = await response.json(); // 将响应解析为 JSON
  return data.data;
}

export async function getList(resource, params) {
  const queryParams = {
    //和后端统一
    filter:
      params.filter && Object.keys(params.filter).length > 0
        ? JSON.stringify(params.filter)
        : null,
    sort_order: params.order || "ASC",
    page: !isNaN(params.page) && params.page >= 1 ? params.page : 1,
    per_page: params.perPage || 10,
    sort_field: params.field || "id",
  };

  // 根据参数生成 URL
  const url = `http://127.0.0.1:5000/api/${resource}/search?${queryString.stringify(
    queryParams
  )}`;

  // 使用 fetch 抓取数据
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("无法显示校园数据");
  }

  const data = await response.json(); // 将响应解析为 JSON
  return data.data;
}

export async function createEditCampus(newCampus, id) {}

export async function deleteCampus(id) {}
