const mainHeaderList = [
  { id: "title", label: "Title" },
  { id: "updatedate", label: "Last Update" },
  { id: "register", label: "Register" },
  { id: "category", label: "Service" },
  { id: "title-displayed", label: "Displayed Title" },
]

export default function MainHeaderContainer() {
  return (
    <div className="header">
      {mainHeaderList.map(comp => (
        <div key={comp.id} className={comp.id}>
          {comp.label}
        </div>
      ))}
    </div>
  )
}
