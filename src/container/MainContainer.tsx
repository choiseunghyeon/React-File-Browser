import MainHeaderContainer from "./MainHeaderContainer"
import { MainBodyContainer } from "./MainBodyContainer"

export function MainContainer() {
  return (
    <div className="main-container">
      <MainHeaderContainer />
      <MainBodyContainer />
      {/* 테스트용 임시 빈 공간 추후 삭제 예정 */}
    </div>
  )
}
