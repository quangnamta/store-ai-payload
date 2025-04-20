'use client'
import { Button, useAllFormFields, useForm } from '@payloadcms/ui'
import type { UIFieldClientComponent } from 'payload'
import { getSiblingData } from 'payload/shared'

export const RecalculateButton: UIFieldClientComponent = () => {
  const { submit } = useForm()
  const [fields, dispatch] = useAllFormFields()
  function handleRecalculation() {
    const data = getSiblingData(fields, 'id')
    for (let i = 0; i < data.cartDetails.cartItems.length; i++) {
      dispatch({ type: 'UPDATE', path: `cartDetails.cartItems.${i}.price`, value: undefined })
    }
    submit()
  }

  return <Button onClick={handleRecalculation}>Recalculation</Button>
}
