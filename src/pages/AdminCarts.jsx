import { useEffect, useState } from "react";
import { getAllCarts } from "../services/carts.service";
import SplashLoader from "../components/common/SplashLoader";
import CartsTable from "../components/common/CartsTable";
import { useNavigate } from "react-router-dom";

const AdminCarts = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();

  const handleViewDetails = (cart) => {
    navigate(`/dashboard/carts/${cart.id}`);
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const data = await getAllCarts();
        setCarts(data);
      } catch (err) {
        setError("Failed to load carts");
      } finally {
        setLoading(false);
      }
    };

    fetchCarts();
  }, []);

  const getTotalItems = (products) =>
    products.reduce((sum, item) => sum + item.quantity, 0);

  if (showSplash) return <SplashLoader />;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Carts</h1>

      {loading && <SplashLoader />}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && <CartsTable carts={carts} getTotalItems={getTotalItems} onViewDetails={handleViewDetails} />}
    </div>
  );
};

export default AdminCarts;
