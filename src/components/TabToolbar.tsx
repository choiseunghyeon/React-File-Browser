interface ITabToolbarProps {
  list: any
}

export default function TabToolbar(props: ITabToolbarProps) {
  const list = props.list ?? []
  return (
    <div className="tab-toolbar">
      <div>LOGIN7E</div>
      {list.map(comp => (
        <div key={comp.id} data-id={comp.id} className={comp.isActive ? "active" : ""}>
          {comp.label}
        </div>
      ))}
    </div>
  )
}
