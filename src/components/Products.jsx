import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const categories = [
  "Living Room",
  "Bed Room",
  "Dining Room",
  "Home Office",
  "Kids Furniture",
  "Plastic Chairs",
  "Utility",
];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, []);

  /* Add Product*/
  const handleCreate = async () => {
    if (
      !form.name ||
      !form.price ||
      !form.category ||
      !form.description ||
      !form.stock
    )
         return toast.error("Required Fields Missing")

    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.post(
        "http://localhost:3000/api/admin/new-product",
        {
          name: form.name,
          description: form.description,
          price: Number(form.price),
          category: form.category,
          image: form.image,
          stock: Number(form.stock),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts([res.data, ...products]);
      resetForm();
      toast.success(" Product created successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create product")
    }
  };

  /* edit product*/
  const handleEdit = (product) => {
    if (!window.confirm("Edit this product?")) return;
    setEditing(product._id);
    setForm({
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    image: product.image,
    stock: product.stock,
  });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* update Product */
  const handleUpdate =async () => {
     if (
      !form.name ||
      !form.price ||
      !form.category ||
      !form.description ||
      !form.stock
    )
      return toast.error("Required Fields Missing")
    try{
      const token = localStorage.getItem('adminToken')
      const res = await axios.put(`http://localhost:3000/api/admin/update-product/${editing}`,{
        name: form.name,
        description: form.description,
        price: Number(form.price),
        category: form.category,
        image: form.image,
        stock: Number(form.stock),
      },{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

       setProducts(
      products.map((p) => (p._id === editing ? res.data : p))
    );

    setEditing(null);
    resetForm();
    toast.success("Product updated successfully!");
    }
    catch(err){
       toast.error(err.response?.data?.message || "Update failed");
    }
  };

  /* delete product*/
  const handleDelete = async(id) => {
     if (!window.confirm("Delete this product?")) return;


     try{
      const token = localStorage.getItem('adminToken')

      await axios.delete(`http://localhost:3000/api/admin/delete-product/${id}`,
        {
          headers:
          {
            Authorization:`Bearer ${token}`
          }
        }
      );
      setProducts(products.filter((p) => p._id !== id));
      toast.success("Product Deleted successfully!");
     }
     catch(err){
      toast.error(err.response?.data?.message || "Delete failed");
     }
  };

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      price: "",
      category: "",
      image: "",
      stock: "",
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Manage Products</h2>

      {/* FORM */}
      <div className="bg-white p-6 rounded shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            placeholder="Product Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="p-3 border rounded"
          />

          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="p-3 border rounded"
          />

          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="p-3 border rounded"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Stock Quantity"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            className="p-3 border rounded"
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="col-span-1 md:col-span-2 p-3 border rounded"
          />

          <input
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className=" sm:col-span-2 p-3 border rounded"
          />

          {/* img preview */}
          <div className="col-span-1 md:col-span-2 flex gap-3 flex-wrap">
            <img
              src={form.image || "https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE="}
              alt="Enter ImageURL"
              className="w-20 h-20 object-cover rounded"
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            {editing ? (
              <button
                onClick={handleUpdate}
                className="bg-yellow-500 text-white px-6 py-2 rounded"
              >
                Update Product
              </button>
            ) : (
              <button
                onClick={handleCreate}
                className="bg-green-500 text-white px-6 py-2 rounded"
              >
                Create Product
              </button>
            )}
          </div>
        </div>
      </div>

      {/* PRODUCT LIST */}
      <ul className="space-y-4">
        {products.map((product) => (
          <li
            key={product._id}
            className="bg-white p-4 rounded shadow flex justify-between"
          >
            <div className="flex items-center gap-4">
              <img
                src={product.image  || "https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE="}
                alt={product.name}
                className="w-20 h-20 object-cover rounded border"
              />
              <div>
                <h3 className="font-bold text-lg">{product.name}</h3>
                {/* <p>{product.description}</p> */}
                <p className="text-sm text-gray-600">
                  ₹{product.price} | {product.category} 
                </p>
                <p className="text-sm">Stock: {product.stock}</p>
              </div>
            </div>

            <div className="space-x-2">
              <button
                onClick={() => handleEdit(product)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
