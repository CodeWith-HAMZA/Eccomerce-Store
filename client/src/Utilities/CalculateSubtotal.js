export function calculateTotalAmountOfProducts(givenProducts) {
  return givenProducts
    .map((cartItem) => Number(cartItem["price"]) * Number(cartItem["quantity"]))
    .reduce((partialSum, a) => partialSum + a, 0);
}
