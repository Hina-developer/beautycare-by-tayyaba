import { JEWELLERY, JEWELLERY_GROUPS } from '../catalog'
import ShopPage from '../components/ShopPage'

export default function Jewellery() {
  return (
    <ShopPage
      eyebrow="Finish your look"
      title="Jewellery"
      lead="Bridal and party jewellery, necklace sets, earrings, bangles and accessories."
      groups={JEWELLERY_GROUPS}
      items={JEWELLERY}
    />
  )
}
