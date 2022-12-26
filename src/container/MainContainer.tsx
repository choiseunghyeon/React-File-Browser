import MainHeaderContainer from "./MainHeaderContainer"
import { MainBodyContainer } from "./MainBodyContainer"

export function MainContainer() {
  return (
    <div className="main-container">
      <MainHeaderContainer />
      <MainBodyContainer />
    </div>
  )
}
