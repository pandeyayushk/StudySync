import test from 'node:test'
import assert from 'node:assert/strict'
import {
  calculateCycleDay,
  getCyclePhase,
  getPhaseInfo,
  getDaysUntilNextPhase,
  getPhaseProgress,
} from '../src/lib/cycle/engine'

test('Cycle Engine - calculateCycleDay', () => {
  const today = new Date('2026-08-23')
  
  // Same day start => Day 1
  const day1 = calculateCycleDay(new Date('2026-08-23'), today, 28)
  assert.equal(day1, 1)

  // 4 days ago => Day 5
  const day5 = calculateCycleDay(new Date('2026-08-19'), today, 28)
  assert.equal(day5, 5)

  // 28 days ago (full cycle) => Day 1
  const day29 = calculateCycleDay(new Date('2026-07-26'), today, 28)
  assert.equal(day29, 1)
})

test('Cycle Engine - getCyclePhase with standard 28-day cycle', () => {
  // Menstruation: Days 1-5
  assert.equal(getCyclePhase(1, 28), 'menstruation')
  assert.equal(getCyclePhase(5, 28), 'menstruation')

  // Follicular: Days 6-14
  assert.equal(getCyclePhase(6, 28), 'follicular')
  assert.equal(getCyclePhase(14, 28), 'follicular')

  // Ovulation: Days 15-16
  assert.equal(getCyclePhase(15, 28), 'ovulation')
  assert.equal(getCyclePhase(16, 28), 'ovulation')

  // Luteal: Days 17-28
  assert.equal(getCyclePhase(17, 28), 'luteal')
  assert.equal(getCyclePhase(28, 28), 'luteal')
})

test('Cycle Engine - getCyclePhase with custom cycle length (35 days)', () => {
  // Scaled boundaries: scale = 35/28 = 1.25
  // Menstruation end: round(5 * 1.25) = 6
  // Follicular end: round(14 * 1.25) = 18
  // Ovulation end: round(16 * 1.25) = 20
  // Luteal: 21-35

  assert.equal(getCyclePhase(1, 35), 'menstruation')
  assert.equal(getCyclePhase(6, 35), 'menstruation')
  assert.equal(getCyclePhase(7, 35), 'follicular')
  assert.equal(getCyclePhase(18, 35), 'follicular')
  assert.equal(getCyclePhase(19, 35), 'ovulation')
  assert.equal(getCyclePhase(20, 35), 'ovulation')
  assert.equal(getCyclePhase(21, 35), 'luteal')
  assert.equal(getCyclePhase(35, 35), 'luteal')
})

test('Cycle Engine - getPhaseInfo returns valid durations and tips', () => {
  const menstInfo = getPhaseInfo('menstruation')
  assert.equal(menstInfo.focusDuration, 20)
  assert.equal(menstInfo.breakDuration, 5)
  assert.ok(menstInfo.studyTips.length > 0)

  const follicInfo = getPhaseInfo('follicular')
  assert.equal(follicInfo.focusDuration, 50)
  assert.equal(follicInfo.breakDuration, 10)

  const ovulInfo = getPhaseInfo('ovulation')
  assert.equal(ovulInfo.focusDuration, 50)
  assert.equal(ovulInfo.breakDuration, 10)

  const lutealInfo = getPhaseInfo('luteal')
  assert.equal(lutealInfo.focusDuration, 25)
  assert.equal(lutealInfo.breakDuration, 5)
})

test('Cycle Engine - getDaysUntilNextPhase and getPhaseProgress', () => {
  // Day 3 in 28-day cycle: menstruation ends at day 5 => 5 - 3 + 1 = 3 days left
  const daysLeft = getDaysUntilNextPhase(3, 28)
  assert.equal(daysLeft, 3)

  // Progress percentage should be between 0 and 100
  const progress = getPhaseProgress(3, 28)
  assert.ok(progress >= 0 && progress <= 100)
})
