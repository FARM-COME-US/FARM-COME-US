import axios from "axios";

async function fetchCategoryTitle() {
  try {
    const response = await axios({
      method: "get",
      url: "api/api/v1/item/title",
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export function categoryTitle() {
  let result;
  fetchCategoryTitle()
    .then((res) => {
      console.log(res);
      result = res;
    })
    .catch((err) => {
      console.error(err);
    });
  return result;
}

export async function categoryDetail() {
  try {
    await axios({
      method: "get",
      url: "api/api/v1/item/detail",
    });
  } catch (err) {
    console.log(err);
  }
}
