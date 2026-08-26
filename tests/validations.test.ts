import test from 'node:test'
import assert from 'node:assert/strict'
import { format, subDays, addDays } from 'date-fns'
import { cycleSettingsSchema } from '../src/validations/cycle'
import { examSchema } from '../src/validations/exam'
import { profileSchema } from '../src/validations/profile'

test('Validations - cycleSettingsSchema accepts valid date and cycle length', () => {
  const validDateStr = format(subDays(new Date(), 5), 'yyyy-MM-dd')

  const valid = cycleSettingsSchema.safeParse({
    lastPeriodDate: validDateStr,
    averageCycleLength: 28,
  })
  assert.ok(valid.success)

  // Reject future date
  const invalidFuture = cycleSettingsSchema.safeParse({
    lastPeriodDate: format(addDays(new Date(), 2), 'yyyy-MM-dd'),
    averageCycleLength: 28,
  })
  assert.ok(!invalidFuture.success)

  // Reject cycle length < 21
  const invalidShort = cycleSettingsSchema.safeParse({
    lastPeriodDate: validDateStr,
    averageCycleLength: 15,
  })
  assert.ok(!invalidShort.success)
})

test('Validations - examSchema validates subjects and future dates', () => {
  const today = format(new Date(), 'yyyy-MM-dd')

  const valid = examSchema.safeParse({
    subject: 'Organic Chemistry',
    examDate: today,
    priority: 'high',
    notes: 'Midterm 1',
  })
  assert.ok(valid.success)

  // Reject empty subject
  const emptySubject = examSchema.safeParse({
    subject: '',
    examDate: today,
    priority: 'medium',
  })
  assert.ok(!emptySubject.success)
})

test('Validations - profileSchema validates non-empty full name', () => {
  const valid = profileSchema.safeParse({
    fullName: 'Jane Doe',
  })
  assert.ok(valid.success)

  const invalid = profileSchema.safeParse({
    fullName: '',
  })
  assert.ok(!invalid.success)
})
