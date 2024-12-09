import { useState, useContext } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import "./Payment.css";

const PaymentForm = ({ orderData, onSubmit }) => {
  const [showPopup, setShowPopup] = useState(true);
  const stripe = useStripe();
  const elements = useElements();
  const { url } = useContext(StoreContext);

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe is not loaded");
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { data } = await axios.post(
        `${url}/api/payment/create-payment-intent`,
        {
          amount: orderData.amount * 100,
        }
      );

      const clientSecret = data.clientSecret;
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${orderData.firstName} ${orderData.lastName}`,
          },
        },
      });

      if (result.error) {
        toast.error(result.error.message || "Payment failed");
        onSubmit(false);
        return;
      }

      const verifyResponse = await axios.post(
        `${url}/api/payment/confirm-payment`,
        {
          paymentIntentId: result.paymentIntent.id,
          orderId: orderData.orderId,
        }
      );

      if (verifyResponse.data.success) {
        toast.success("Order placed successfully!");
        onSubmit(true);
      } else {
        toast.error("Payment verification failed");
        onSubmit(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Payment processing failed");
      onSubmit(false);
    }
  };

  return (
    <div>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Test Payment Gateway</h2>
            <p>Use the following test card numbers:</p>
            <ul>
              <li>
                <strong>Accepted:</strong> 4242 4242 4242 4242
              </li>
            </ul>
            <p>
              You can enter any <strong>future expiration date</strong> and any <strong>3-digit CVC</strong> code.
            </p>
            <button className="popup-close" onClick={handlePopupClose}>
              Got it!
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="payment-form">
        <h2 className="payment-form__title">Payment</h2>
        <div className="payment-form__fields">
          <label>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": { color: "#aab7c4" },
                  },
                  invalid: { color: "#9e2146" },
                },
                hidePostalCode: true,
              }}
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={!stripe}
          className="payment-form__submit"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
