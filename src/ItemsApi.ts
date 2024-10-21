// import { items } from "./data/products";
// import { items } from "./data/outdoors";
// import { items } from "./data/seasonal";
// import { items } from "./data/animals";
import { items } from "./data/dummy";

const ItemsApi = {
  
  fetchAll: async () => {
    return new Promise((resolve) => {
      resolve(items);
    });
  },
};

export default ItemsApi;