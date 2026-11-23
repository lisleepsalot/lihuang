import {useCallback, useEffect, useMemo, useState} from 'react'
import {useClient} from 'sanity'
import {Box, Button, Card, Flex, Spinner, Stack, Text, useToast} from '@sanity/ui'
import {CheckmarkIcon, ResetIcon} from '@sanity/icons'
import {spiralCoordinates} from './spiral'

const API_VERSION = '2024-01-01'
const TILE_WIDTH = 190
const TILE_HEIGHT = 127 // same 3:2 ratio as the site's 570×380 cells

// 'raw' perspective returns drafts alongside published docs, so a project
// that has unpublished edits still gets its order written to both copies.
const PROJECTS_QUERY = `*[_type == "project"]{
  _id,
  webTitle,
  year,
  index,
  archived,
  "cover": coverImage.asset->{url, mimeType}
}`

type RawProject = {
  _id: string
  webTitle?: string
  year?: number
  index?: number
  archived?: boolean
  cover?: {url?: string; mimeType?: string} | null
}

type Project = {
  id: string // published id, no "drafts." prefix
  title: string
  year?: number
  index?: number
  archived: boolean
  coverUrl?: string
  isVideo: boolean
  hasPublished: boolean
  hasDraft: boolean
}

// Folds draft + published copies of the same document into one entry. The
// published copy wins for display, since that's what the live site shows.
function mergeDrafts(docs: RawProject[]): Project[] {
  const byId = new Map<string, Project>()

  for (const doc of docs) {
    const isDraft = doc._id.startsWith('drafts.')
    const id = isDraft ? doc._id.slice('drafts.'.length) : doc._id
    const existing = byId.get(id)

    const fromDoc: Project = {
      id,
      title: doc.webTitle || 'Untitled',
      year: doc.year,
      index: doc.index,
      archived: !!doc.archived,
      coverUrl: doc.cover?.url,
      isVideo: !!doc.cover?.mimeType?.startsWith('video/'),
      hasPublished: !isDraft,
      hasDraft: isDraft,
    }

    if (!existing) {
      byId.set(id, fromDoc)
    } else if (isDraft) {
      existing.hasDraft = true
    } else {
      byId.set(id, {...fromDoc, hasDraft: existing.hasDraft})
    }
  }

  return [...byId.values()]
}

// Mirrors the site's sortByOrder(): ascending index, missing index last.
// Title breaks ties so the starting view is stable between reloads.
function sortProjects(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    const ai = typeof a.index === 'number' ? a.index : Infinity
    const bi = typeof b.index === 'number' ? b.index : Infinity
    if (ai !== bi) return ai < bi ? -1 : 1
    return a.title.localeCompare(b.title)
  })
}

// A Studio tab that shows projects in the same spiral the work page uses and
// lets you drag one tile onto another to swap their places. Saving writes
// index 1…n to every project so there are no ties left for the site to guess at.
export function ArrangeTool() {
  const baseClient = useClient({apiVersion: API_VERSION})
  // Memoised: withConfig() returns a new client each call, which would
  // re-trigger the load effect on every render.
  const client = useMemo(() => baseClient.withConfig({perspective: 'raw'}), [baseClient])
  const toast = useToast()

  const [projects, setProjects] = useState<Project[] | null>(null)
  const [archived, setArchived] = useState<Project[]>([])
  const [order, setOrder] = useState<string[]>([])
  const [savedOrder, setSavedOrder] = useState<string[]>([])
  const [dragId, setDragId] = useState<string | null>(null)
  const [overId, setOverId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  // Reloads from Sanity, used on open and after every save.
  const load = useCallback(async () => {
    const docs = await client.fetch<RawProject[]>(PROJECTS_QUERY)
    const all = sortProjects(mergeDrafts(docs))
    // Archived projects aren't on the work page, so they're left out of the
    // spiral and keep whatever index they had.
    const sorted = all.filter((p) => !p.archived)
    const ids = sorted.map((p) => p.id)
    setProjects(sorted)
    setArchived(all.filter((p) => p.archived))
    setOrder(ids)
    // Treat any project whose stored index doesn't already equal its
    // position as unsaved, so ties from the old numbering get fixed on save.
    setSavedOrder(sorted.every((p, i) => p.index === i + 1) ? ids : [])
  }, [client])

  useEffect(() => {
    load().catch((err) => {
      toast.push({status: 'error', title: 'Could not load projects', description: String(err)})
    })
  }, [load, toast])

  const byId = useMemo(() => new Map((projects || []).map((p) => [p.id, p])), [projects])
  const coords = useMemo(() => spiralCoordinates(order.length), [order.length])
  const minX = Math.min(0, ...coords.map((c) => c.x))
  const minY = Math.min(0, ...coords.map((c) => c.y))
  const isDirty = order.join() !== savedOrder.join()

  // Swap rather than insert: in a spiral, inserting shifts every later tile
  // around the ring, which is hard to predict. Swapping only moves two.
  function swap(fromId: string, toId: string) {
    if (fromId === toId) return
    setOrder((current) => {
      const next = [...current]
      const a = next.indexOf(fromId)
      const b = next.indexOf(toId)
      ;[next[a], next[b]] = [next[b], next[a]]
      return next
    })
  }

  // Writes the new positions in one transaction. Drafts are patched too, or
  // publishing a pending draft later would quietly restore its old index.
  async function save() {
    if (!projects) return
    setSaving(true)
    try {
      const tx = client.transaction()
      order.forEach((id, i) => {
        const project = byId.get(id)
        if (!project) return
        const index = i + 1
        if (project.hasPublished) tx.patch(id, (p) => p.set({index}))
        if (project.hasDraft) tx.patch(`drafts.${id}`, (p) => p.set({index}))
      })
      await tx.commit()
      await load()
      toast.push({
        status: 'success',
        title: 'Order saved',
        description: 'The live site updates in a minute or two.',
      })
    } catch (err) {
      toast.push({status: 'error', title: 'Could not save order', description: String(err)})
    } finally {
      setSaving(false)
    }
  }

  if (!projects) {
    return (
      <Flex align="center" justify="center" height="fill">
        <Spinner muted />
      </Flex>
    )
  }

  return (
    <Box padding={4} style={{overflow: 'auto', height: '100%'}}>
      <Stack space={4}>
        <Flex align="center" gap={3} wrap="wrap">
          <Stack space={2} flex={1}>
            <Text size={2} weight="semibold">
              Arrange work page
            </Text>
            <Text size={1} muted>
              Drag a project onto another to swap them. 1 is the centre of the spiral, which is
              where the work page opens.
            </Text>
          </Stack>
          <Button
            icon={ResetIcon}
            text="Reset"
            mode="ghost"
            disabled={!isDirty || saving}
            onClick={() => setOrder(savedOrder.length ? savedOrder : projects.map((p) => p.id))}
          />
          <Button
            icon={CheckmarkIcon}
            text={saving ? 'Saving…' : 'Save order'}
            tone="primary"
            disabled={!isDirty || saving}
            onClick={save}
          />
        </Flex>

        <div
          style={{
            display: 'grid',
            gridAutoColumns: TILE_WIDTH,
            gridAutoRows: 'auto',
            gap: 12,
            justifyContent: 'center',
          }}
        >
          {order.map((id, i) => {
            const project = byId.get(id)
            if (!project) return null
            const {x, y} = coords[i]
            const isDragging = dragId === id
            const isTarget = overId === id && dragId !== id

            return (
              <Card
                key={id}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.effectAllowed = 'move'
                  setDragId(id)
                }}
                onDragEnd={() => {
                  setDragId(null)
                  setOverId(null)
                }}
                onDragOver={(e) => {
                  e.preventDefault()
                  if (overId !== id) setOverId(id)
                }}
                onDragLeave={() => setOverId((cur) => (cur === id ? null : cur))}
                onDrop={(e) => {
                  e.preventDefault()
                  if (dragId) swap(dragId, id)
                  setDragId(null)
                  setOverId(null)
                }}
                radius={2}
                shadow={isTarget ? 3 : 1}
                tone={isTarget ? 'primary' : i === 0 ? 'caution' : 'default'}
                style={{
                  gridColumn: x - minX + 1,
                  gridRow: y - minY + 1,
                  cursor: 'grab',
                  opacity: isDragging ? 0.4 : 1,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: TILE_WIDTH,
                    height: TILE_HEIGHT,
                    background: 'var(--card-muted-bg-color, #eee)',
                  }}
                >
                  {project.coverUrl &&
                    (project.isVideo ? (
                      <video
                        src={project.coverUrl}
                        muted
                        loop
                        autoPlay
                        playsInline
                        draggable={false}
                        style={{width: '100%', height: '100%', objectFit: 'cover'}}
                      />
                    ) : (
                      <img
                        src={project.coverUrl}
                        alt=""
                        draggable={false}
                        style={{width: '100%', height: '100%', objectFit: 'cover'}}
                      />
                    ))}
                  <Card
                    radius={2}
                    padding={2}
                    style={{position: 'absolute', top: 6, left: 6}}
                    tone="default"
                  >
                    <Text size={1} weight="semibold">
                      {i + 1}
                    </Text>
                  </Card>
                </div>
                <Box padding={2}>
                  <Text size={1} textOverflow="ellipsis">
                    {project.title}
                    {project.year ? ` · ${project.year}` : ''}
                  </Text>
                </Box>
              </Card>
            )
          })}
        </div>

        {archived.length > 0 && (
          <Text size={1} muted align="center">
            Archived, not on the work page: {archived.map((p) => p.title).join(', ')}
          </Text>
        )}
      </Stack>
    </Box>
  )
}
