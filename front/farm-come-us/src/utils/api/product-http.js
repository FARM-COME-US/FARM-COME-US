import axios from "axios";

const DUMMY_SERVER_URL = "https:localhost:3000";
const PRODUCT_API_URL = `${DUMMY_SERVER_URL}/item`;

const clientProductObjFormatter = (obj) => {
  return {
    productId: obj.itemId,
    productName: obj.itemName,
    desc: obj.itemDescription,
    imgSrc: obj.itemImg,
    price: obj.itemPrice,
    discount: obj.itemDiscount,
    stock: obj.itemStock,
    regDate: obj.itemCreatedAt,
    category: obj.categoryCode,
    storeId: obj.storeId,
  };
};

const serverProductObjFormatter = (obj) => {
  return {
    itemId: obj.productId,
    itemName: obj.productName,
    itemDescription: obj.desc,
    itemImg: obj.imgSrc,
    itemPrice: obj.price,
    itemDiscount: obj.discount,
    itemStock: obj.stock,
    itemCreatedAt: obj.regDate,
    categoryCode: obj.category,
    storeId: obj.storeId,
  };
};

/* 상품 등록 */
export async function createProduct(product) {
  try {
    const response = axios({
      method: "post",
      url: PRODUCT_API_URL,
      data: {
        itemDto: serverProductObjFormatter(product),
      },
    });
    console.log(response.success);
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
      url: PRODUCT_API_URL,
      data: {
        itemDto: serverProductObjFormatter(product),
      },
    });
    console.log(response.success);
  } catch (err) {
    console.err(err);
  }
}
