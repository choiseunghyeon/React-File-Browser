import Path from "../components/Path"
import { useChangeNodeId } from "../hooks"
import { useAppSelector } from "../store/hooks"
import { selectPaths } from "../store/selector/selector"

// curentNodeId 바뀌면서 paths 새로 바뀜 최적화 하기 path에서 최적화 한다면 커스텀 equal 함수 넘기기
export default function PathContainer() {
  const paths = useAppSelector(selectPaths)
  const onChangeNodeId = useChangeNodeId()
  if (!paths) return null
  return (
    <>
      {paths.map(path => (
        <Path key={path.id} path={path} onChangeNodeId={onChangeNodeId} />
      ))}
    </>
  )
}
