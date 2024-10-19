import queryString from "query-string";

const apiUrl = "http://127.0.0.1:5000/api";

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
  const {
    paramFilter,
    paramValuePage,
    paramValuePerPage,
    paramValueOrder,
    paramValueFiled,
  } = params;

  const queryParams = {
    //和后端统一
    filter:
      paramFilter && Object.keys(paramFilter).length > 0
        ? JSON.stringify(paramFilter)
        : null,
    sort_order: paramValueOrder || "ASC",
    page: !isNaN(paramValuePage) && paramValuePage >= 1 ? paramValuePage : 1,
    per_page: paramValuePerPage || 10,
    sort_field: paramValueFiled || "id",
  };

  // 根据参数生成 URL
  const url = `${apiUrl}/${resource}/search?${queryString.stringify(
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

export async function EditCampusAPI(resource, id, data) {
  return fetch(`${apiUrl}/${resource}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((json) => {
      return { data: json.data };
    })
    .catch((error) => {
      console.error("Error updating resource:", error);
      throw error; // optional error handling
    });
}

export async function createCampusAPI(resource, data) {
  return fetch(`${apiUrl}/${resource}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((json) => {
      return { data: { ...data, id: json.id } };
    })
    .catch((error) => {
      console.error("Error creating resource:", error);
      throw error; // optional, depending on how you want to handle errors
    });
}

export async function deleteCampus(resource, id) {
  return fetch(`${apiUrl}/${resource}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((json) => {
      return { data: json.data };
    })
    .catch((error) => {
      console.error("Error deleting resource:", error);
      throw error; // optional error handling
    });
}
