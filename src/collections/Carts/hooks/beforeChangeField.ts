import { Cart } from '@/payload-types'
import type { FieldHook } from 'payload'

type SiblingDataType = NonNullable<Cart['cartDetails']['cartItems']>[number]

export const changingProductPriceHook: FieldHook<Cart, number, SiblingDataType> = async ({
  value,
  siblingData,
  data,
  req: { payload },
}) => {
  if (value && data?.cartDetails?.isPriceLocked == 'yes') {
    return value
  }
  let totalPrice = 0
  const productOptionsData = await payload.find({
    collection: 'product-options',
    where: {
      id: { in: siblingData.productOptions },
    },
    limit: 9999,
    pagination: false,
  })
  for (let i = 0; i < productOptionsData.docs.length; i++) {
    totalPrice += productOptionsData.docs[i].price
  }
  return totalPrice
}
