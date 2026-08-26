import { CyclePhase, StudyPlan, Exam } from '@/types'
import { generateStudyPlan as generateRuleBasedPlan } from '@/lib/study/plan-generator'
import { getPhaseInfo } from '@/lib/cycle/engine'

/**
 * OpenRouter AI-enhanced study plan generator.
 * Uses free models (e.g. meta-llama/llama-3.3-70b-instruct:free or google/gemini-2.0-flash-exp:free)
 * and automatically falls back to the deterministic rule-based generator
 * if the API key is not configured, rate-limited, or fails.
 */
export async function generateAIStudyPlan(
  phase: CyclePhase,
  cycleDay: number,
  exams: Exam[]
): Promise<StudyPlan> {
  const apiKey = process.env.OPENROUTER_API_KEY

  // If no API key is set, immediately use deterministic rule-based generator
  if (!apiKey || apiKey === 'your-openrouter-api-key') {
    return generateRuleBasedPlan(phase, cycleDay, exams)
  }

  const phaseInfo = getPhaseInfo(phase)

  const prompt = `You are StudySync AI, an expert academic planner.
A female student is in her ${phaseInfo.label} menstrual cycle phase (Day ${cycleDay} of her cycle).
Phase characteristics: ${phaseInfo.description}
Optimal focus duration: ${phaseInfo.focusDuration} minutes, break: ${phaseInfo.breakDuration} minutes.

Upcoming exams:
${exams.length > 0 
  ? exams.map(e => `- ${e.subject} on ${e.exam_date} (Priority: ${e.priority}, Notes: ${e.notes || 'None'})`).join('\n')
  : 'No specific exams scheduled (general study day).'}

Generate a personalized, highly structured study plan for today matching her cognitive rhythm.
Respond ONLY with a valid JSON object matching this schema (no markdown fences, no conversational text):
{
  "studyMethod": "Recommended study technique for this phase (e.g. Active Recall, Feynman Technique, Spaced Repetition)",
  "motivationNote": "A 1-2 sentence empowering, realistic motivational message calibrated to her current energy levels",
  "tasks": [
    {
      "subject": "Subject name",
      "task": "Actionable task description",
      "priority": "high" | "medium" | "low",
      "estimatedMinutes": ${phaseInfo.focusDuration}
    }
  ]
}`

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000) // 8s timeout

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://studysync.app',
        'X-Title': 'StudySync',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.3-70b-instruct:free',
        messages: [
          { role: 'system', content: 'You generate structured JSON study plans tailored to menstrual cycle phases. Always respond with raw JSON only.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        response_format: { type: 'json_object' },
      }),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      console.warn(`OpenRouter request failed (${response.status}). Falling back to rule-based generator.`)
      return generateRuleBasedPlan(phase, cycleDay, exams)
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content

    if (!content) {
      return generateRuleBasedPlan(phase, cycleDay, exams)
    }

    const cleanJson = content.replace(/```json\n?|\n?```/g, '').trim()
    const parsed = JSON.parse(cleanJson)

    return {
      planDate: new Date().toISOString().split('T')[0],
      cyclePhase: phase,
      cycleDay: cycleDay,
      tasks: parsed.tasks && Array.isArray(parsed.tasks) && parsed.tasks.length > 0 
        ? parsed.tasks 
        : generateRuleBasedPlan(phase, cycleDay, exams).tasks,
      studyMethod: parsed.studyMethod || phaseInfo.studyTips[0],
      focusDuration: phaseInfo.focusDuration,
      breakDuration: phaseInfo.breakDuration,
      motivationNote: parsed.motivationNote || `Listen to your body in the ${phaseInfo.label} phase. Steady effort creates greatness.`,
    }
  } catch (err) {
    console.warn('AI study plan generation failed or timed out. Gracefully falling back to rule-based engine.', err)
    return generateRuleBasedPlan(phase, cycleDay, exams)
  }
}
