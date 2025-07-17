import { Edit, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteProduct, getAllProducts } from "../api/product";

export default function Products() {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  async function getProducts() {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllProducts();
      setAllProducts(response.products);
      setFilteredProducts(response.products);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setFilteredProducts(allProducts);
      return;
    }

    const lowerTerm = term.toLowerCase();
    const filtered = allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerTerm) ||
        product.description.toLowerCase().includes(lowerTerm)
    );

    setFilteredProducts(filtered);
  };

  function handleAddToCart(productId) {
    console.log("Add to cart:", productId);
  }
  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      await getAllProducts();
      alert("Product deleted successfully!");
    } catch (err) {
      console.error("Delete error:", err.message);
      alert("Failed to delete product");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header and Search */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
              className="px-4 py-2 border border-gray-300 rounded-md mr-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Link
              to="/product/add"
              className="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-3 flex flex-col"
            >
              {/* Image */}
              <div className="h-48 w-full flex justify-center items-center overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Product Info */}
              <h3 className="text-base font-semibold text-gray-800 mt-2 line-clamp-1">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {product.description}
              </p>
              <span className="text-lg font-bold text-green-700 mt-1">
                ₹{product.price.toFixed(2)}
              </span>

              {/* Action Buttons */}
              <div className="mt-3 flex justify-end gap-1">
                <button
                  onClick={() => handleAddToCart(product._id)}
                  className="p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  <ShoppingCart className="h-4 w-4" />
                </button>

                {currentUser?.id === product.user && (
                  <>
                    <Link
                      to={`/products/edit/${product._id}`}
                      className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
