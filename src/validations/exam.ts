import { z } from 'zod';
import { startOfDay } from 'date-fns';

export const examSchema = z.object({
  subject: z.string().min(1, "Subject is required").max(100),
  examDate: z.string().refine((val) => {
    const parsedDate = val.includes('T') ? new Date(val) : new Date(`${val}T00:00:00`);
    if (isNaN(parsedDate.getTime())) return false;
    
    const today = startOfDay(new Date());
    const examDay = startOfDay(parsedDate);
    
    return examDay >= today;
  }, {
    message: "Exam date must be today or in the future.",
  }),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  notes: z.string().max(500).optional(),
});

export type ExamFormValues = z.infer<typeof examSchema>;
