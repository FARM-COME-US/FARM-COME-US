import axios from "axios";

const PRODUCT_API_URL = `${process.env.REACT_APP_API_SERVER_URL}/api/v1/item`;

/* 상품 등록 */
export async function createProduct(productInfo) {
  const formData = new FormData();

  const data = {
    storeId: productInfo.storeId,
    titleCategoryName: productInfo.categoryTitle,
    detailCategoryName: productInfo.categoryDetail,
    itemName: productInfo.itemName,
    itemDescription: productInfo.itemDescription,
    itemPrice: productInfo.itemPrice,
    itemStock: productInfo.itemStock,
    imgSrc: productInfo.imgSrc,
  };
  formData.append("uploadFile", productInfo.uploadFile);

  formData.append(
    "item",
    new Blob([JSON.stringify(data)], {
      type: "application/json",
    })
  );

  console.log(data);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      Authorization: { token: sessionStorage.getItem("accessToken") },
      token: sessionStorage.getItem("accessToken"),
    },
  };

  try {
    const response = axios.post(
      `${process.env.REACT_APP_API_SERVER_URL}/api/v1/item`,
      formData,
      config
    );

    console.log(response);
  } catch (err) {
    console.err(err);
  }
}

/* 상품 상세 조회 */
export async function productDetail(productId) {
  try {
    const response = await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_SERVER_URL}/api/v1/item`,
      params: {
        itemId: productId,
      },
    });
    const data = response.data;
    console.log(data);
    return data;
  } catch (err) {
    console.err(err);
  }
}

/* 상품 목록 조회 */
export async function fetchProductList(
  category,
  itemName,
  subCategory,
  page,
  size
) {
  const params = {
    page: page,
    size: size,
  };
  const data = {
    titleCategoryName: category,
    detailCategoryName: subCategory,
    itemName: itemName,
  };
  const header = { "Content-Type": "application/json" };
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_SERVER_URL}/api/v1/item/keyword/`,
      data,
      { header, params }
    );
    // const data = response.data;
    console.log(response);
    return response.data.itemInfoList;
  } catch (err) {
    console.error(err);
  }
}

/* 스토어 상품 조회 */
export async function fetchStoreProducts(storeId, page, size) {
  if (!page) page = 0;
  const params = {
    storeId,
    page,
    size: 8,
  };

  return await axios
    .get(`${PRODUCT_API_URL}/store`, { params })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err);
    });
}

/* 등록 상품 삭제 */
export async function deleteProduct(productId) {
  try {
    const response = axios({
      method: "delete",
      url: PRODUCT_API_URL,
      params: {
        itemId: productId,
      },
    });
    console.log(response.success);
  } catch (err) {
    console.err(err);
  }
}

/* 등록 상품 수정 */
export async function updateProduct(product) {
  try {
    const response = axios({
      method: "put",
    });
    console.log(response.success);
  } catch (err) {
    console.err(err);
  }
}
