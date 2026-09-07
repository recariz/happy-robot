import { CaseEngine } from '../engine/CaseEngine'
import { CaseProvider } from '../engine/CaseProvider'
import { loadCase, resolveCaseIdFromSearch } from '../engine/case-loader'

export function App() {
  const caseId = resolveCaseIdFromSearch()
  const caseConfig = loadCase(caseId)

  return (
    <CaseProvider caseConfig={caseConfig}>
      <CaseEngine />
    </CaseProvider>
  )
}

export default App
