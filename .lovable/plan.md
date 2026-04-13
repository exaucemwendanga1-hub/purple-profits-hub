

## Plan: Replace Buy Now Buttons with Stripe Payment Links

All 8 Payment Links are now confirmed:

| Product | URL |
|---------|-----|
| Bundle | `https://buy.stripe.com/7sYaEWafm6Hygaweo48Ra05` |
| Shoes | `https://buy.stripe.com/7sY00i87ec1SbUg4Nu8Ra00` |
| Watch | `https://buy.stripe.com/3cI7sKfzG7LC8I47ZG8Ra02` |
| Earbuds | `https://buy.stripe.com/eVq6oG73a2ricYk5Ry8Ra06` |
| Cologne | `https://buy.stripe.com/00w5kC87ed5W1fC5Ry8Ra07` |
| Puffer | `https://buy.stripe.com/00w9ASgDKd5W5vS5Ry8Ra08` |
| Lulu | `https://buy.stripe.com/eVqcN4evC2ri0by7ZG8Ra04` |
| CRM | `https://buy.stripe.com/8x2bJ00EM5Du8I4a7O8Ra03` |

### Changes

1. **Update `ProductPageLayout` component** — Add a `paymentLink` prop. Replace the `handleBuy` function (which calls the `create-payment` edge function) with a simple `window.location.href = paymentLink` redirect. Remove the coupon input since Payment Links handle promotions via Stripe directly.

2. **Update all 8 product pages** — Add the `paymentLink` prop to each page component (`ProductShoes`, `ProductWatch`, `ProductEarbuds`, `ProductCologne`, `ProductPuffer`, `ProductLulu`, `ProductCrm`, `ProductBundle`).

3. **Update `ProductGrid` / homepage cards** — If Buy Now buttons on the homepage grid also trigger checkout, update those to use the Payment Links too.

### What stays the same
- The `create-payment` edge function and `stripe-webhook` remain untouched (they still handle existing orders/fulfillment).
- All page layouts, styling, and content remain identical — only the checkout trigger changes.

