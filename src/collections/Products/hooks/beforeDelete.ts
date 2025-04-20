import type { CollectionBeforeDeleteHook } from 'payload'

export const deleteProductOptionsHook: CollectionBeforeDeleteHook = async ({
  req: { payload },
  id,
}) => {
  await payload.delete({
    collection: 'product-options',
    where: {
      product: { equals: id },
    },
  })
}

export const deleteProductImagesHook: CollectionBeforeDeleteHook = async ({
  req: { payload },
  id,
}) => {
  const product = await payload.findByID({
    collection: 'products',
    id: id,
    depth: 0,
  })

  await payload.delete({
    collection: 'media',
    where: {
      id: { in: product.images },
    },
  })
}
