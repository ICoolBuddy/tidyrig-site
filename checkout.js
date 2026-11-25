// Paddle Billing checkout. Fill these in after Paddle approves the domain:
//   clientToken: Paddle > Developer tools > Authentication > client-side token
//   prices: Paddle > Catalog > Products > (price ID, starts with "pri_")
// Until clientToken is set, Buy buttons open an email order instead.
const PADDLE = {
  environment: "production", // "sandbox" while testing
  clientToken: "",
  prices: { terminal: "", power: "", hyprland: "", bundle: "" },
};

const SUPPORT_EMAIL = "support@darkify.xyz";

function fallback(kit) {
  location.href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("Order: " + kit + " kit")}`;
}

function setup() {
  const ready = PADDLE.clientToken && window.Paddle;
  if (ready) {
    if (PADDLE.environment === "sandbox") Paddle.Environment.set("sandbox");
    Paddle.Initialize({ token: PADDLE.clientToken });
  }
  document.querySelectorAll("[data-kit]").forEach((b) =>
    b.addEventListener("click", () => {
      const kit = b.dataset.kit;
      const price = PADDLE.prices[kit];
      if (ready && price) Paddle.Checkout.open({ items: [{ priceId: price, quantity: 1 }] });
      else fallback(kit);
    })
  );
}

if (PADDLE.clientToken) {
  const s = document.createElement("script");
  s.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
  s.onload = setup;
  document.head.appendChild(s);
} else {
  setup();
}
