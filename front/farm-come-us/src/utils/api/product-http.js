import axios from "axios";

const DUMMY_SERVER_URL = "https:localhost:3000";
const PRODUCT_API_URL = `${DUMMY_SERVER_URL}/item`;

/* 상품 등록 */
export async function createProduct(productInfo) {
  const DUMMY_STORE_ID = 1;
  const formData = new FormData();

  // formData.append("itemName", productInfo.itemName);
  // formData.append("itemDescription", productInfo.itemDescription);
  // formData.append("itemPrice", productInfo.itemPrice);
  // formData.append("itemStock", productInfo.itemStock);
  // formData.append("storeId", productInfo.storeId);
  // formData.append("categoryName", productInfo.categoryName);
  const data = {
    storeId: DUMMY_STORE_ID,
    itemName: productInfo.itemName,
    itemDescription: productInfo.itemDescription,
    itemPrice: productInfo.itemPrice,
    itemStock: productInfo.itemStock,
    categoryName: productInfo.categoryName,
  };
  formData.append("uploadFile", productInfo.file);
  console.log(data);

  formData.append(
    "item",
    new Blob([JSON.stringify(data)], {
      type: "application/json",
    })
  );

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    },
  };

  try {
    const response = axios.post("/api/api/v1/item", formData, config);

    console.log(response);
  } catch (err) {
    console.err(err);
  }
}

/* 상품 상세 조회 */
export async function productDetail(productId) {
  try {
    const response = axios({
      method: "get",
      url: PRODUCT_API_URL,
      params: {
        itemId: productId,
      },
    });
    const data = response.json();
    console.log(data);
  } catch (err) {
    console.err(err);
  }
}

/* 상품 목록 조회 */
export async function productList() {
  try {
    const response = axios({
      method: "get",
      url: PRODUCT_API_URL,
    });
    const data = response.json();
    console.log(data);
  } catch (err) {
    console.err(err);
  }
}

/* 등록 상품 삭제 */
export async function delteProduct(productId) {
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
