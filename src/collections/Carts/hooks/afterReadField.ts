import { Cart } from '@/payload-types'
import type { FieldHook } from 'payload'

type SiblingDataType = NonNullable<Cart['cartDetails']['cartItems']>[number]

export const calculateSubTotalHook: FieldHook<Cart, number, SiblingDataType> = ({
  siblingData,
}) => {
  if (siblingData.price && siblingData.quantity) {
    return siblingData.price * siblingData.quantity
  }
  return 0
}

export const calculateGrandTotalHook: FieldHook<Cart, number, Cart> = ({ data }) => {
  if (!data?.cartDetails?.cartItems) {
    return 0
  }
  let totalBeforeDiscount = 0
  for (let i = 0; i < data.cartDetails.cartItems.length; i++) {
    if (data.cartDetails.cartItems[i].price && data.cartDetails.cartItems[i].quantity) {
      totalBeforeDiscount +=
        data.cartDetails.cartItems[i].price * data.cartDetails.cartItems[i].quantity
    }
  }
  return totalBeforeDiscount - data.cartDetails.discount
}
