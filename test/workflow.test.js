import test from 'node:test'
import assert from 'node:assert/strict'

import { normalizeTask, summarizeTask } from '../src/workflow.js'

test('normalizes a task and defaults its status and progress', () => {
  const task = normalizeTask({ id: 'T-01', title: 'Ship collaboration flow' })
  assert.deepEqual(task, {
    id: 'T-01',
    title: 'Ship collaboration flow',
    status: 'planned',
  })
  assert.equal(task.progress, 0)
})

test('normalizes and summarizes valid progress', () => {
  const task = normalizeTask({
    id: 'T-02',
    title: 'Verify CI',
    status: 'completed',
    progress: 65,
  })
  assert.equal(task.progress, 65)
  assert.equal(summarizeTask(task), 'T-02:completed:Verify CI:progress=65')
})

test('preserves the legacy summary when progress is zero', () => {
  assert.equal(
    summarizeTask({ id: 'T-03', title: 'Keep compatibility', progress: 0 }),
    'T-03:planned:Keep compatibility',
  )
})

test('rejects progress outside the supported integer range', () => {
  for (const progress of [-1, 101, 1.5]) {
    assert.throws(
      () => normalizeTask({ id: 'T-04', title: 'Reject invalid progress', progress }),
      /integer from 0 through 100/,
    )
  }
})

test('rejects incomplete tasks', () => {
  assert.throws(() => normalizeTask({ id: 'T-05' }), /id and title/)
})
