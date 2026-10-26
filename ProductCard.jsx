import { STOCK_LABEL, formatPrice } from '../catalog'
import { whatsappLink } from '../data'
import ServiceArt from './ServiceArt'
import LikeButton from './LikeButton'
import { WhatsAppIcon } from './Icons'

/** A shop item in the grid. Tap it to see details; Book and Like sit underneath. */
export default function ProductCard({ item, onOpen, priceText }) {
  return (
    <li className="product-item">
      <button className="product" onClick={onOpen} aria-label={`View ${item.name}`}>
        <span className="product-art">
          {item.images.length ? <img src={item.images[0]} alt="" loading="lazy" /> : <ServiceArt name={item.art} />}
          {item.sample && <span className="tag tag-sample">Sample</span>}
          {item.isNew && <span className="tag tag-new">New</span>}
          {item.salonUsed && <span className="tag tag-new">Used in our salon</span>}
        </span>
        <span className="service-title">{item.name}</span>
        <span className="product-price">{priceText || formatPrice(item.price)}</span>
        <span className={'stock stock-' + item.stock}>{STOCK_LABEL[item.stock]}</span>
      </button>
      <div className="svc-actions">
        <a className="btn btn-small btn-primary" href={whatsappLink(`Assalam o Alaikum! I would like to book: ${item.name}`)} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon width={16} height={16} /> Book
        </a>
        <LikeButton post={'shop-' + item.id} title={item.name} />
      </div>
    </li>
  )
}
