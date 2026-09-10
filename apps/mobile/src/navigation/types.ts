export type RootStackParamList = {
  MainTabs: undefined;
  Product: { productId: string };
  Cart: undefined;
  Checkout: undefined;
  OrderConfirmation: { orderId: string };
  Orders: undefined;
};

export type MainTabParamList = {
  Shop: undefined;
  Bag: undefined;
  OrdersTab: undefined;
};
