import React from "react"
import HistoryContainer from "../container/HistoryContainer"
import PathContainer from "../container/PathContainer"

function Navigation() {
  return (
    <div className="nav">
      <ul className="flex">
        <li>
          <HistoryContainer />
        </li>
        <li className="menu-stack">
          <PathContainer />
        </li>
      </ul>
    </div>
  )
}

export default Navigation
