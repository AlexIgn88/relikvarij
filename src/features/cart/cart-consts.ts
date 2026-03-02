import { Product } from 'src/features/items/items-consts';

export type CartItem = {
  product: Product;
  quantity: number;
};

enum OrderStatus {
  PendingConfirmation = 'pending_confirmation',
  Processing = 'processing',
  Packaging = 'packaging',
  WaitingForDelivery = 'waiting_for_delivery',
  InTransit = 'in_transit',
  Delivered = 'delivered',
  ReturnRequested = 'return_requested',
  OrderCancelled = 'order_cancelled',
}

export type ProductsForOrder = Array<{
  id: string;
  quantity: number;
}>;

export type CreateOrderSuccessResponse = {
  products: ProductsForOrder;
  status?: OrderStatus;
};
