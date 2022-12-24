import TabToolbar from "../components/TabToolbar"
import MenuToolbar from "../components/MenuToolbar"

interface ITopContainerProps {
  list?: any
}

const initialList = {
  tabToolbar: [
    { id: "SCENARIO", isActive: true, label: "SCENARIO" },
    { id: "ANALYZE", isActive: false, label: "ANALYZE" },
    { id: "SEARCH", isActive: false, label: "SEARCH" },
    { id: "SETTINGS", isActive: false, label: "SETTINGS" },
  ],
  menuToolbar: [
    {
      groupLabel: "edit",
      childList: [
        { id: "copy", label: "Copy", className: "icon tall copy" },
        { id: "paste", label: "Paste", className: "icon tall paste" },
        { id: "delete", label: "Delete", className: "icon tall delete" },
      ],
    },
    {
      groupLabel: "new",
      childList: [
        { id: "new-folder", label: "Folder", className: "icon tall new-folder" },
        { id: "new-tutorial", label: "Tutorial", className: "icon tall new-tutorial" },
      ],
    },
    {
      groupLabel: "selection",
      childList: [
        { id: "select-all", label: "All", className: "icon tall select-all" },
        { id: "select-reverse", label: "Reverse", className: "icon tall select-reverse" },
        { id: "select-unselect", label: "Unselect", className: "icon tall select-unselect" },
      ],
    },
    {
      groupLabel: "search filter",
      childList: [
        { id: "search-title", label: "Title", className: "icon small search-title" },
        { id: "search-modifier", label: "Modifier", className: "icon small search-modifier" },
        { id: "search-scene", label: "Scene", className: "icon small search-scene" },
      ],
    },
    {
      groupLabel: "service",
      childList: [
        { id: "apply-service-on", label: "Service-On", className: "icon tall apply-service-on" },
        { id: "apply-service-off", label: "Service-Off", className: "icon tall apply-service-off" },
      ],
    },
    {
      groupLabel: "mapping",
      childList: [{ id: "mapping-mapping", label: "Mapping", className: "icon tall mapping-mapping" }],
    },
    {
      groupLabel: "export",
      childList: [{ id: "export-excel", label: "excel", className: "icon tall export-excel" }],
    },
  ],
}

export default function TopContainer({ list }: ITopContainerProps) {
  return (
    <div className="top-container">
      <TabToolbar list={initialList.tabToolbar} />
      <MenuToolbar list={initialList.menuToolbar} />
    </div>
  )
}
