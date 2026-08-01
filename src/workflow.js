export const TASK_STATES = Object.freeze([
  'planned',
  'in_progress',
  'completed',
])

export function normalizeTask(input) {
  if (!input || typeof input !== 'object') {
    throw new TypeError('Task input must be an object')
  }

  const id = String(input.id ?? '').trim()
  const title = String(input.title ?? '').trim()
  if (!id || !title) {
    throw new Error('Task id and title are required')
  }

  const progress = input.progress ?? 0
  if (!Number.isInteger(progress) || progress < 0 || progress > 100) {
    throw new RangeError('Task progress must be an integer from 0 through 100')
  }

  const normalized = {
    id,
    title,
    status: TASK_STATES.includes(input.status) ? input.status : 'planned',
  }
  Object.defineProperty(normalized, 'progress', { value: progress })
  return normalized
}

export function summarizeTask(task) {
  const normalized = normalizeTask(task)
  const prefix = `${normalized.id}:${normalized.status}:${normalized.title}`
  return normalized.progress === 0
    ? prefix
    : `${prefix}:progress=${normalized.progress}`
}
