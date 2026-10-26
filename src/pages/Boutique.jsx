import { BOUTIQUE, BOUTIQUE_GROUPS } from '../catalog'
import ShopPage from '../components/ShopPage'

export default function Boutique() {
  return (
    <ShopPage
      eyebrow="Our boutique"
      title="Bridal & Party Wear"
      lead="Bridal, wedding, party, formal, engagement and reception dresses. Tap a dress for sizes and colours."
      groups={BOUTIQUE_GROUPS}
      items={BOUTIQUE}
    />
  )
}
