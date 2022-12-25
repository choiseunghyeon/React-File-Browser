import { useState, useRef } from "react"
import { useChangeNodeId } from "../hooks"
import { useAppDispatch } from "../store/hooks"

function HistoryContainer() {
  return (
    <>
      <span className="icon left-arrow"></span>
      <span className="icon right-arrow"></span>
    </>
  )
}

export default HistoryContainer
