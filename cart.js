import { createContext, useContext, useEffect, useState } from 'react'

// The shopping cart. It is kept in this browser only, so a client's cart is
// still there if she closes the page. Orders are sent on WhatsApp.

const CartContext = createContext(null)
const KEY = 'bct-cart'

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || []
  } catch {
    return []
  }
}

export function useCartState() {
  const [items, setItems] = useState(load)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items))
    } catch {
      // storage can be blocked (private window); the cart still works for this visit
    }
  }, [items])

  const lineKey = (i) => [i.id, i.size || '', i.colour || ''].join('|')

  function add(product, { size, colour, qty = 1 }) {
    const line = { id: product.id, name: product.name, price: product.price, size, colour, qty, sample: product.sample }
    setItems((list) => {
      const k = lineKey(line)
      const found = list.find((i) => lineKey(i) === k)
      return found ? list.map((i) => (lineKey(i) === k ? { ...i, qty: i.qty + qty } : i)) : [...list, line]
    })
    setOpen(true)
  }
  const setQty = (line, qty) =>
    setItems((list) => (qty < 1 ? list.filter((i) => lineKey(i) !== lineKey(line)) : list.map((i) => (lineKey(i) === lineKey(line) ? { ...i, qty } : i))))
  const remove = (line) => setItems((list) => list.filter((i) => lineKey(i) !== lineKey(line)))
  const clear = () => setItems([])

  const count = items.reduce((n, i) => n + i.qty, 0)
  const total = items.reduce((n, i) => n + (typeof i.price === 'number' ? i.price * i.qty : 0), 0)
  const unpriced = items.some((i) => typeof i.price !== 'number')

  return { items, add, setQty, remove, clear, count, total, unpriced, open, setOpen, lineKey }
}

export const CartProvider = CartContext.Provider
export const useCart = () => useContext(CartContext)
