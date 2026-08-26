import test from 'node:test'
import assert from 'node:assert/strict'
import { generateStudyPlan } from '../src/lib/study/plan-generator'
import { Exam } from '../src/types/index'

test('Plan Generator - creates structured plan without exams', () => {
  const plan = generateStudyPlan('follicular', 8, [])

  assert.equal(plan.cyclePhase, 'follicular')
  assert.equal(plan.cycleDay, 8)
  assert.equal(plan.focusDuration, 50)
  assert.equal(plan.breakDuration, 10)
  assert.ok(plan.tasks.length >= 3)
  assert.ok(typeof plan.studyMethod === 'string' && plan.studyMethod.length > 0)
  assert.ok(typeof plan.motivationNote === 'string' && plan.motivationNote.length > 0)
})

test('Plan Generator - prioritizes urgent exams', () => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  const inTenDays = new Date()
  inTenDays.setDate(inTenDays.getDate() + 10)

  const sampleExams: Exam[] = [
    {
      id: '1',
      user_id: 'u1',
      subject: 'Later Subject',
      exam_date: inTenDays.toISOString().split('T')[0],
      priority: 'low',
      notes: null,
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      user_id: 'u1',
      subject: 'Urgent Bio Exam',
      exam_date: tomorrow.toISOString().split('T')[0],
      priority: 'high',
      notes: 'Chapters 1-5',
      created_at: new Date().toISOString(),
    },
  ]

  const plan = generateStudyPlan('menstruation', 2, sampleExams)

  assert.equal(plan.cyclePhase, 'menstruation')
  assert.equal(plan.focusDuration, 20)
  assert.equal(plan.breakDuration, 5)

  // First task should be the urgent exam
  assert.equal(plan.tasks[0].subject, 'Urgent Bio Exam')
  assert.equal(plan.tasks[0].priority, 'high')
  assert.ok(plan.tasks[0].task.includes('Urgent Bio Exam'))
})
