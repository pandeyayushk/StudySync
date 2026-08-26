-- StudySync Sample Seed Data
-- Run this in Supabase SQL Editor AFTER running schema.sql
-- Note: Replace the sample user UUID below with your own test user's UUID from auth.users if testing with an existing login.

DO $$
DECLARE
  test_user_id UUID := gen_random_uuid();
BEGIN
  -- Sample profile (normally created via auth trigger)
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    test_user_id,
    'Alex Morgan',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
  )
  ON CONFLICT (id) DO UPDATE SET full_name = EXCLUDED.full_name;

  -- Sample cycle settings (last period started 8 days ago, 28-day cycle => Follicular phase)
  INSERT INTO public.cycle_settings (user_id, last_period_date, average_cycle_length)
  VALUES (
    test_user_id,
    CURRENT_DATE - INTERVAL '8 days',
    28
  )
  ON CONFLICT (user_id) DO UPDATE 
  SET last_period_date = EXCLUDED.last_period_date,
      average_cycle_length = EXCLUDED.average_cycle_length;

  -- Sample upcoming exams
  INSERT INTO public.exams (user_id, subject, exam_date, priority, notes)
  VALUES 
    (test_user_id, 'Organic Chemistry Midterm', CURRENT_DATE + INTERVAL '4 days', 'high', 'Covers Stereochemistry, Reaction Mechanisms, and Spectroscopy (Ch 4-8)'),
    (test_user_id, 'Data Structures & Algorithms', CURRENT_DATE + INTERVAL '12 days', 'high', 'Binary Trees, Graphs, Dijkstra, Dynamic Programming'),
    (test_user_id, 'Cognitive Psychology Quiz', CURRENT_DATE + INTERVAL '7 days', 'medium', 'Working memory models and attention span theories'),
    (test_user_id, 'Linear Algebra Final', CURRENT_DATE + INTERVAL '24 days', 'medium', 'Eigenvalues, Vector Spaces, Matrix Inversion');

  -- Sample generated study plan for today
  INSERT INTO public.study_plans (
    user_id,
    plan_date,
    cycle_phase,
    cycle_day,
    tasks,
    study_method,
    focus_duration,
    break_duration,
    motivation_note
  )
  VALUES (
    test_user_id,
    CURRENT_DATE,
    'follicular',
    9,
    '[
      {"subject": "Organic Chemistry Midterm", "task": "Deep dive into Organic Chemistry complex topics and reaction mechanisms", "priority": "high", "estimatedMinutes": 50},
      {"subject": "Data Structures & Algorithms", "task": "Solve graph traversal problems (BFS/DFS practice)", "priority": "high", "estimatedMinutes": 50},
      {"subject": "Cognitive Psychology Quiz", "task": "Active recall on working memory models", "priority": "medium", "estimatedMinutes": 50},
      {"subject": "Planning", "task": "Organize study materials & weekly milestones", "priority": "low", "estimatedMinutes": 15}
    ]'::jsonb,
    'Active recall & Problem-based learning',
    50,
    10,
    'Your brain is primed for learning! Tackle that hard subject with confidence.'
  )
  ON CONFLICT (user_id, plan_date) DO NOTHING;

  -- Sample timer session
  INSERT INTO public.timer_sessions (user_id, started_at, duration_minutes, break_minutes, completed, cycle_phase)
  VALUES 
    (test_user_id, NOW() - INTERVAL '2 hours', 50, 10, true, 'follicular'),
    (test_user_id, NOW() - INTERVAL '1 hour', 50, 10, true, 'follicular');

END $$;
