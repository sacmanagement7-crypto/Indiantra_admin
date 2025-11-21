import apiAdmin from "./interceptor";

export const getAllusers = ()=>{
  return apiAdmin.get("/user");
}

// Login User API
export const AdminLoginService = (data) => {
  return apiAdmin.post("/auth/login", data);
};

export const getAllVendors = ()=>{
  return apiAdmin.get("/vendor")
}

export const changeStatus = (id, data) => {
  return apiAdmin.post(`/vendor/${id}`, data);
};

export const getAllCategories = ()=>{
  return apiAdmin.get('/categories')
}

export const createCategory = (data)=>{
  return apiAdmin.post('/',data,{
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export const deleteCategory = (id)=>{
  return apiAdmin.delete(`/category/${id}`);
}

export const getProducts = ()=>{
  return apiAdmin.get('/products')
}

export const updateProductService = (id,data)=>{
  return apiAdmin.patch(`/products/${id}`,data);
}