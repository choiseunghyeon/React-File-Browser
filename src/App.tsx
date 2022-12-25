import "./resources/app.global.css"
import { useLayoutEffect } from "react"
import TopContainer from "./container/TopContainer"
import { MainContainer } from "./container/MainContainer"
import SideBarContainer from "./container/SideBarContainer"
import StatusbarContainer from "./container/StatusBarContainer"
import Navigation from "./components/Navigation"
import { useAppDispatch } from "./store/hooks"
import { changeCurrentNodeId } from "./store/reducer"

export default function App() {
  const dispatch = useAppDispatch()
  useLayoutEffect(() => {
    dispatch(changeCurrentNodeId("root"))
  }, [])

  return (
    <>
      <div className="app-container">
        <TopContainer />
        <Navigation />
        <SideBarContainer />
        <MainContainer />
        <StatusbarContainer />
        {/* <Spinner /> */}
      </div>
    </>
  )
}
