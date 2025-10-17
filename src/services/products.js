export const getAllProducts = () => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(async () => {
        const res = await fetch(
          "https://equalexperts.github.io/frontend-take-home-test-data/products.json"
        );
        resolve(await res.json());
      }, 3000);
    } catch (e) {
      reject(e);
    }
  });
};

export default getAllProducts;
