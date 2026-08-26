import { z } from 'zod';
import { differenceInDays } from 'date-fns';

export const cycleSettingsSchema = z.object({
  lastPeriodDate: z.string().refine((val) => {
    const parsedDate = val.includes('T') ? new Date(val) : new Date(`${val}T00:00:00`);
    if (isNaN(parsedDate.getTime())) return false;
    
    const now = new Date();
    if (parsedDate > now) return false;
    
    const diff = differenceInDays(now, parsedDate);
    if (diff > 45) return false;
    
    return true;
  }, {
    message: "Date must be valid, not in the future, and not more than 45 days ago.",
  }),
  averageCycleLength: z.coerce.number().int().min(21).max(45).default(28),
});

export type CycleSettingsFormValues = z.infer<typeof cycleSettingsSchema>;
