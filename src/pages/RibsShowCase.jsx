import { useState } from "react";
import { LogoImg } from "../constants";

const RibsShowcase = () => {
  const phoneNumber = "+27837251331"; // WhatsApp number
  const [cart, setCart] = useState({});
  const [orderType, setOrderType] = useState("delivery");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [checkout, setCheckout] = useState(false);
  const [orderSent, setOrderSent] = useState(false);

  const products = [
    { id: 1, name: "Classic BBQ Ribs", price: 45, image: "https://source.unsplash.com/200x200/?bbq,ribs" },
    { id: 2, name: "Spicy Hot Ribs", price: 45, image: "https://source.unsplash.com/200x200/?spicy,ribs" },
    { id: 3, name: "Small chips", price: 15, image: "https://source.unsplash.com/200x200/?honey,ribs" },
    { id: 4, name: "Medium chips", price: 25, image: "https://source.unsplash.com/200x200/?honey,ribs" },
    { id: 5, name: "Large Chips", price: 35, image: "https://source.unsplash.com/200x200/?honey,ribs" },
    { id: 3, name: "Xtra Large Chips", price: 45, image: "https://source.unsplash.com/200x200/?honey,ribs" }
  ];

  const addToCart = (id) => setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  const removeFromCart = (id) => setCart((prev) => {
    const updated = { ...prev };
    if (updated[id] > 1) updated[id] -= 1;
    else delete updated[id];
    return updated;
  });

  const generateOrderMessage = () => {
    let message = `Hi! My name is ${name}, and my phone number is ${customerPhone}.\n\nI’d like to order:\n`;
    
    Object.keys(cart).forEach((id) => {
      const product = products.find(p => p.id == id);
      message += `${cart[id]} x ${product.name} - R${product.price * cart[id]}\n`;
    });

    message += `\nOrder Type: ${orderType.toUpperCase()}`;
    if (orderType === "delivery") message += `\nDelivery Address: ${address || "Not provided"}`;
    return encodeURIComponent(message);
  };

  const handlePlaceOrder = () => {
    const orderUrl = `https://wa.me/${phoneNumber}?text=${generateOrderMessage()}`;
    window.open(orderUrl, "_blank");
    setOrderSent(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-center overflow-x-hidden">
      <header className="bg-gradient-to-b from-red-600 via-orange-500 to-blue-600 text-white p-10 shadow-lg h-[20rem] w-full">
        <div className="flex flex-col items-center">
          <img className="rounded-full" src={LogoImg} width={120} height={120} />
          <h1 className="text-4xl font-bold">DanAlphluja Fast Food</h1>
        </div>
        <p className="text-lg mt-2">The Best Enclosed Compartment In The Hood</p>
      </header>

      <section className="my-10">
        <h2 className="text-3xl font-semibold mb-6">🔥 Fresh & Tasty Ribs And Fried Crispy Chips, Free delivery around Tembisa 🔥</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 shadow-lg rounded-lg">
              <img src={product.image} alt={product.name} className="rounded-lg w-full mb-4" />
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-lg font-medium text-red-600">R{product.price}</p>
              <div className="flex justify-center items-center mt-4 space-x-3">
                <button onClick={() => removeFromCart(product.id)} className="bg-gray-300 px-3 py-1 rounded-lg text-lg">-</button>
                <span className="text-lg">{cart[product.id] || 0}</span>
                <button onClick={() => addToCart(product.id)} className="bg-green-500 text-white px-3 py-1 rounded-lg text-lg">+</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {Object.keys(cart).length > 0 && (
        <section className="my-10 bg-white p-6 shadow-lg rounded-lg max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">🛒 Your Cart</h2>
          <ul className="text-lg">
            {Object.keys(cart).map((id) => (
              <li key={id} className="flex justify-between py-2 border-b">
                <span>{cart[id]} x {products.find(p => p.id == id).name}</span>
                <span>R{products.find(p => p.id == id).price * cart[id]}</span>
              </li>
            ))}
          </ul>

          {!checkout ? (
            <button
              onClick={() => setCheckout(true)}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg mt-6 hover:bg-blue-600"
            >
              ✅ Done Adding to Cart
            </button>
          ) : (
            <>
              <div className="mt-6">
                <label className="text-lg font-semibold block">Your Name:</label>
                <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 border rounded-lg mt-2" />
              </div>
              <div className="mt-4">
                <label className="text-lg font-semibold block">Phone Number:</label>
                <input type="tel" placeholder="Enter your phone number" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} className="w-full px-4 py-2 border rounded-lg mt-2" />
              </div>
              <div className="mt-6 flex justify-center space-x-4">
                <button onClick={() => setOrderType("delivery")} className={`px-4 py-2 rounded-lg ${orderType === "delivery" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>Delivery</button>
                <button onClick={() => setOrderType("collection")} className={`px-4 py-2 rounded-lg ${orderType === "collection" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>Collection</button>
              </div>
              {orderType === "delivery" && <input type="text" placeholder="Enter your delivery address" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full px-4 py-2 border rounded-lg mt-4" />}
              <button onClick={handlePlaceOrder} className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg mt-6 hover:bg-green-600">📩 Place Order on WhatsApp</button>
              {orderSent && <p className="text-green-500 font-semibold mt-4">✅ Order sent successfully!</p>}
            </>
          )}
        </section>
      )}
    </div>
  );
};

export default RibsShowcase;
