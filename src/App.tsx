import "./resources/app.global.css"
import TopContainer from "./container/TopContainer"
import { MainContainer } from "./container/MainContainer"
import SideBarContainer from "./container/SideBarContainer"
import StatusbarContainer from "./container/StatusBarContainer"
import Navigation from "./components/Navigation"

export default function App() {
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
