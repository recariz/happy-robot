import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  getLocationSectionId,
  hashToLocation,
  isOverview,
  locationToHash,
} from '../app/presentation-location'
import { resolveShortcut } from '../app/keyboard-shortcuts'
import {
  getNarrativeOrderedSections,
  getSectionDefinition,
} from '../app/section-registry'
import { AppShell } from '../components/core/AppShell'
import { DevelopmentPlaceholder } from '../components/core/DevelopmentPlaceholder'
import { SectionFrame } from '../components/core/SectionFrame'
import { BackButton } from '../components/navigation/BackButton'
import { Breadcrumbs } from '../components/navigation/Breadcrumbs'
import { OverviewMap } from '../components/navigation/OverviewMap'
import type { PresentationLocation, SectionId } from '../types/navigation'
import { useCase } from './CaseProvider'
import { RegisteredSectionView } from './section-views'
import { ZoomCanvas } from './ZoomCanvas'

export function CaseEngine() {
  const caseConfig = useCase()
  const reduceMotion = useReducedMotion()
  const headingRef = useRef<HTMLHeadingElement | null>(null)
  const nodeRefs = useRef<Partial<Record<SectionId, HTMLButtonElement | null>>>(
    {},
  )
  const lastSectionRef = useRef<SectionId | null>(null)

  const [location, setLocation] = useState<PresentationLocation>(() =>
    typeof window !== 'undefined'
      ? hashToLocation(window.location.hash)
      : { kind: 'overview' },
  )

  const visibleSections = useMemo(
    () =>
      getNarrativeOrderedSections(caseConfig.presentation.visibleSections),
    [caseConfig.presentation.visibleSections],
  )

  const activeSectionId = getLocationSectionId(location)
  const activeSection = activeSectionId
    ? getSectionDefinition(activeSectionId)
    : undefined

  const navigate = useCallback((next: PresentationLocation) => {
    setLocation(next)
    const hash = locationToHash(next)
    if (window.location.hash !== hash) {
      window.history.pushState(null, '', hash)
    }
  }, [])

  const goOverview = useCallback(() => {
    navigate({ kind: 'overview' })
  }, [navigate])

  const goSection = useCallback(
    (sectionId: SectionId) => {
      lastSectionRef.current = sectionId
      navigate({ kind: 'section', sectionId })
    },
    [navigate],
  )

  const goBack = useCallback(() => {
    if (location.kind === 'detail') {
      navigate({ kind: 'section', sectionId: location.sectionId })
      return
    }
    goOverview()
  }, [goOverview, location, navigate])

  const goRelative = useCallback(
    (delta: number) => {
      if (visibleSections.length === 0) return
      const currentIndex = activeSectionId
        ? visibleSections.findIndex((section) => section.id === activeSectionId)
        : -1
      const nextIndex =
        currentIndex === -1
          ? delta > 0
            ? 0
            : visibleSections.length - 1
          : (currentIndex + delta + visibleSections.length) %
            visibleSections.length
      const next = visibleSections[nextIndex]
      if (next) goSection(next.id)
    },
    [activeSectionId, goSection, visibleSections],
  )

  useEffect(() => {
    const onHashChange = () => {
      setLocation(hashToLocation(window.location.hash))
    }
    window.addEventListener('hashchange', onHashChange)
    if (!window.location.hash) {
      window.history.replaceState(null, '', '#overview')
    }
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const action = resolveShortcut(event)
      if (!action) return
      event.preventDefault()
      if (action === 'back') goBack()
      if (action === 'overview') goOverview()
      if (action === 'next') goRelative(1)
      if (action === 'previous') goRelative(-1)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [goBack, goOverview, goRelative])

  useEffect(() => {
    if (!isOverview(location) && headingRef.current) {
      headingRef.current.focus({ preventScroll: true })
      return
    }
    if (isOverview(location) && lastSectionRef.current) {
      const node = nodeRefs.current[lastSectionRef.current]
      node?.focus({ preventScroll: true })
    }
  }, [location])

  const sectionStatus = activeSectionId
    ? caseConfig.presentation.sectionStatus[activeSectionId]
    : 'placeholder'

  const stageStyle: CSSProperties = {
    position: 'absolute',
    inset: 0,
  }

  return (
    <AppShell
      caseTitle={caseConfig.metadata.title}
      presentationLabel={caseConfig.metadata.presentationLabel}
    >
      <div style={stageStyle}>
        <ZoomCanvas activeSectionId={isOverview(location) ? null : activeSectionId}>
          <OverviewMap
            companyName={caseConfig.company.name}
            openingNarrative={caseConfig.narrative.opening}
            metrics={caseConfig.currentState.metrics}
            sections={visibleSections}
            activeSectionId={isOverview(location) ? null : activeSectionId}
            onSelectSection={goSection}
            nodeRefs={nodeRefs}
            locale={caseConfig.metadata.locale}
          />
        </ZoomCanvas>

        <AnimatePresence>
          {!isOverview(location) && activeSection ? (
            <motion.div
              key={activeSection.id}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'var(--color-canvas)',
                zIndex: 2,
              }}
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.35 }}
            >
              <SectionFrame
                number={activeSection.number}
                title={activeSection.label}
                prompt={activeSection.prompt}
                headingRef={headingRef}
                layout={
                  activeSection.id === 'solution' ? 'workspace' : 'document'
                }
                toolbar={
                  <>
                    <BackButton onClick={goBack} />
                    <Breadcrumbs
                      items={[
                        {
                          id: 'overview',
                          label: caseConfig.company.shortName,
                          onSelect: goOverview,
                        },
                        {
                          id: activeSection.id,
                          label: activeSection.label,
                        },
                      ]}
                    />
                  </>
                }
              >
                <div
                  data-section-status={sectionStatus}
                  style={
                    activeSection.id === 'solution'
                      ? { flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }
                      : undefined
                  }
                >
                  {sectionStatus === 'ready' ? (
                    <RegisteredSectionView id={activeSection.id} />
                  ) : (
                    <DevelopmentPlaceholder sectionLabel={activeSection.label} />
                  )}
                </div>
              </SectionFrame>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </AppShell>
  )
}
