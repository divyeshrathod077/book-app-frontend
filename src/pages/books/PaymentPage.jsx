import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { getImgUrl } from '../../utils/getImgUrl'

const PaymentPage = () => {
  const navigate = useNavigate();

  const checkoutData = JSON.parse(localStorage.getItem("checkoutData"));

  if (!checkoutData) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        No checkout data
      </div>
    );
  }

  const getImageUrl = (item) => {
    const rawImage =
      item.coverImage ||
      item.image ||
      item.imageUrl ||
      "";

    if (!rawImage) return "https://via.placeholder.com/80";
    if (rawImage.startsWith("http")) return rawImage;

    const localUrl = getImgUrl(rawImage);
    return localUrl || "https://via.placeholder.com/80";
  };

  const handlePayment = async () => {
    const result = await Swal.fire({
      title: "Confirm Payment?",
      text: `Pay $${checkoutData.totalPrice}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Pay Now",
    });

    if (result.isConfirmed) {
      try {
        await axios.post("http://localhost:3000/api/payment", {
          name: checkoutData.name,
          email: checkoutData.email,
          phone: checkoutData.phone,
          address: checkoutData.address,
          productIds: checkoutData.items.map((item) => item._id),
          amount: checkoutData.totalPrice,
        });

        Swal.fire("Success!", "Payment Successful!", "success");

        localStorage.removeItem("checkoutData");
        navigate("/order");
      } catch (err) {
        console.error(err);
        Swal.fire("Error!", "Payment failed", "error");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-3xl">

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Confirm Your Purchase 
        </h2>

        {/* Product List */}
        <div className="space-y-4 max-h-60 overflow-y-auto mb-6">
          {checkoutData.items.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition"
            >
              {/* Product Image */}
              <img
                src={getImageUrl(item)}
                alt={item.title}
                className="w-16 h-20 object-cover rounded"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/80";
                }}
              />

              {/* Product Info */}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">
                  {item.title || "Book Title"}
                </h3>
                <p className="text-gray-500 text-sm">
                  Price: ${item.newPrice}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* User Info */}
        <div className="border-t pt-4 mb-4 text-gray-700">
          <p><strong>Name:</strong> {checkoutData.name}</p>
          <p><strong>Email:</strong> {checkoutData.email}</p>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Total</h3>
          <span className="text-2xl font-bold text-green-600">
            ${checkoutData.totalPrice}
          </span>
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePayment}
          className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl"
        >
          Pay Now 
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;