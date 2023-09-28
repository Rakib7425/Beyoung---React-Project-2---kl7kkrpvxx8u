const BASE_URL = "https://academics.newtonschool.co";
export const projectId = "kl7kkrpvxx8u";
export const GET_PRODUCTS_API_URL = `${BASE_URL}/api/v1/ecommerce/clothes/products`; // get
//Get single product:
export const GET_SINGLE_PRODUCT_API_URL = `${BASE_URL}/api/v1/ecommerce/product/:productID`; // get

export const SIGNUP_API_URL = `${BASE_URL}/api/v1/user/signup`; // post
export const LOGIN_API_URL = `${BASE_URL}/api/v1/user/login`; // post
export const FORGOT_PASSWORD_API_URL = `${BASE_URL}/api/v1/user/forgotPassword`; // post

// Reviews and Rating API :
// Get reviews of a product
export const GET_REVIEWS_API_URL = `${BASE_URL}/api/v1/ecommerce/review/:productId`; // get
// Add review
export const ADD_REVIEW_API_URL = `${BASE_URL}/api/v1/ecommerce/review/:productId`; // post

// Delete Review :
export const DELETE_REVIEW_API_URL = `${BASE_URL}/api/v1/ecommerce/review/:reviewId`; // delete

// Add Product in Favorites (Protected Routes)
export const ADD_TO_WISHLIST_API_URL = `${BASE_URL}/api/v1/ecommerce/wishlist`; // patch

// Get My Wishlist (Protected Routes)
export const GET_WISHLIST_API_URL = `${BASE_URL}/api/v1/ecommerce/wishlist`; // get

// Remove products from My Wishlist (Protected Routes) Method: DELETE
export const DELETE_FROM_WISHLIST_API_URL = `${BASE_URL}/api/v1/ecommerce/wishlist/{{productId}}`; // delete
// Delete All products from Wishlist
export const DELETE_ALL_FROM_WISHLIST_API_URL = `${BASE_URL}/favorite/api/v1/ecommerce/wishlist/`; // delete

// Get cart item Method: GET
export const GET_CART_ITEMS_API_URL = `${BASE_URL}/api/v1/ecommerce/cart`; // get
export const DELETE_CART_ITEMS_API_URL = `${BASE_URL}/api/v1/ecommerce/cart/:productID`; // delete
// Get single order using id- Method: GET

export const GET_SINGLE_ORDER_API_URL = `${BASE_URL}/api/v1/ecommerce/order/:orderID`; // get

// buy now/ add to order- Method: POST
export const BUY_NOW_API_URL = `${BASE_URL}/api/v1/ecommerce/order`; // post
