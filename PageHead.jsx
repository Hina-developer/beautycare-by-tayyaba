/** The title block at the top of each inner page. */
export default function PageHead({ eyebrow, title, lead }) {
  return (
    <header className="page-head">
      <p className="script">{eyebrow}</p>
      <h1 className="gold-text">{title}</h1>
      {lead && <p className="page-lead">{lead}</p>}
    </header>
  )
}
