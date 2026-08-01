import test from 'node:test'
import assert from 'node:assert/strict'

import { normalizeTask, summarizeTask } from '../src/workflow.js'

test('normalizes a task and defaults its status', () => {
  assert.deepEqual(
    normalizeTask({ id: 'T-01', title: 'Ship collaboration flow' }),
    { id: 'T-01', title: 'Ship collaboration flow', status: 'planned' },
  )
})

test('summarizes normalized task state', () => {
  assert.equal(
    summarizeTask({ id: 'T-02', title: 'Verify CI', status: 'completed' }),
    'T-02:completed:Verify CI',
  )
})

test('rejects incomplete tasks', () => {
  assert.throws(() => normalizeTask({ id: 'T-03' }), /id and title/)
})
