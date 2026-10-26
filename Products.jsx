import { PRODUCTS, PRODUCT_GROUPS } from '../catalog'
import ShopPage from '../components/ShopPage'

export default function Products() {
  return (
    <ShopPage
      eyebrow="Take the salon home"
      title="Beauty Products"
      lead="Makeup, skincare and haircare, including products we use in our salon."
      groups={PRODUCT_GROUPS}
      items={PRODUCTS}
    />
  )
}
