import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { getImgUrl } from "../../utils/getImgUrl";
import getBaseUrl from "../../utils/baseUrl";

const PaymentPage = () => {
  const navigate = useNavigate();

  const checkoutData = JSON.parse(localStorage.getItem("checkoutData"));

  if (!checkoutData) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        No checkout data found
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

    if (rawImage.startsWith("http")) {
      return rawImage;
    }

    return getImgUrl(rawImage);
  };

  const handlePayment = async () => {
    const result = await Swal.fire({
      title: "Confirm Payment?",
      text: `Pay $${checkoutData.totalPrice}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Pay Now",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const paymentData = {
        name: checkoutData.name,
        email: checkoutData.email,
        phone: checkoutData.phone,
        address: checkoutData.address,
        productIds: checkoutData.items.map((item) => item._id),
        amount: checkoutData.totalPrice,
      };

      const response = await axios.post(
        `${getBaseUrl()}/api/payment`,
        paymentData
      );

      await Swal.fire({
        icon: "success",
        title: "Payment Successful!",
        text: response.data.message || "Your order has been placed.",
      });

      localStorage.removeItem("checkoutData");

      // Router path is /order
      navigate("/order");
    } catch (error) {
      console.error("Payment Error:", error);

      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Confirm Your Purchase
        </h2>

        {/* Products */}
        <div className="space-y-4 max-h-60 overflow-y-auto mb-6">
          {checkoutData.items?.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg shadow-sm"
            >
              <img
                src={getImageUrl(item)}
                alt={item.title}
                className="w-16 h-20 object-cover rounded"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/80";
                }}
              />

              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">
                  {item.title}
                </h3>

                <p className="text-gray-500 text-sm">
                  Price: ${item.newPrice}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Customer Info */}
        <div className="border-t pt-4 mb-4 text-gray-700">
          <p>
            <strong>Name:</strong> {checkoutData.name}
          </p>

          <p>
            <strong>Email:</strong> {checkoutData.email}
          </p>

          {checkoutData.phone && (
            <p>
              <strong>Phone:</strong> {checkoutData.phone}
            </p>
          )}

          {/* FIXED ADDRESS */}
          {checkoutData.address && (
            <div className="mt-2">
              <strong>Address:</strong>

              <p>{checkoutData.address?.street}</p>

              <p>
                {checkoutData.address?.city},{" "}
                {checkoutData.address?.state}
              </p>

              <p>
                {checkoutData.address?.country} -{" "}
                {checkoutData.address?.zipcode}
              </p>
            </div>
          )}
        </div>

        {/* Total */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">
            Total Amount
          </h3>

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