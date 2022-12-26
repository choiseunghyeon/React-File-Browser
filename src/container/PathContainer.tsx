import Path from "../components/Path"
import { useChangeNodeId } from "../hooks"
import { useAppSelector } from "../store/hooks"
import { selectPaths } from "../store/selector/selector"

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
