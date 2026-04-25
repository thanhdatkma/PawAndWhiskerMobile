export interface Checkout {
  addressId: string;
  paymentMethod: string;
  shippingMethod: string;
  notes?: string;
}

export interface CheckoutResponse {
  success: boolean;
  orderId?: string;
  message?: string;
}
