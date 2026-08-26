# StudySync

A menstrual-cycle-aware study optimization app for students. StudySync helps you study smarter by providing personalized study plans that adapt to your natural cognitive rhythms throughout the month.

> **Note:** StudySync is NOT a period tracker. It's a study planner that uses minimal cycle information to optimize your study schedule.

## Features

- 📚 **Cycle-Aware Study Plans** — Daily study recommendations based on your current phase
- ⏱️ **Adaptive Pomodoro Timer** — Focus/break durations that match your energy levels  
- 📅 **Exam Integration** — Prioritize subjects based on upcoming exam dates
- 🎯 **Smart Task Generation** — Phase-appropriate study methods and tasks
- 🔒 **Privacy-First** — No medical data tracking, minimal inputs required

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Database & Auth:** Supabase
- **Forms:** React Hook Form + Zod
- **Icons:** Lucide React
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (free tier)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd StudySync
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to SQL Editor and run the contents of `supabase/schema.sql`
   - Go to Settings > API to get your project URL and anon key

4. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

## Database Schema

See `supabase/schema.sql` for the complete schema. Key tables:

| Table | Purpose |
|-------|--------|
| profiles | User profile data |
| cycle_settings | Cycle length and last period date |
| exams | Upcoming exam dates and subjects |
| study_plans | Generated daily study plans |
| timer_sessions | Pomodoro session records |

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Add environment variables in Vercel project settings
4. Deploy!

### Supabase Setup for Production

1. Ensure RLS policies are enabled (included in schema.sql)
2. Configure auth settings in Supabase dashboard:
   - Enable email auth
   - Set site URL to your Vercel domain
   - Add redirect URLs

## Project Structure

```
src/
├── app/          # Next.js pages and layouts
├── actions/      # Server actions
├── components/   # React components
│   ├── ui/       # shadcn/ui primitives
│   ├── landing/  # Landing page sections
│   ├── dashboard/# Dashboard widgets
│   └── forms/    # Form components
├── lib/          # Utilities and core logic
│   ├── cycle/    # Cycle phase engine
│   ├── study/    # Study plan generator
│   └── supabase/ # Supabase clients
├── types/        # TypeScript types
└── validations/  # Zod schemas
```

## How It Works

1. **Phase Detection:** Using your last period date and average cycle length, StudySync calculates your current cycle phase
2. **Study Optimization:** Each phase has different cognitive strengths — the app recommends study methods that align with these patterns
3. **Exam Priority:** Upcoming exams are factored into task generation, with urgency increasing as dates approach
4. **Adaptive Timer:** Pomodoro durations adjust to your phase — longer sessions when focus peaks, shorter when rest is needed

## Privacy

- No medical data is collected or stored
- Only two data points needed: last period date and average cycle length  
- All data is stored in your own Supabase instance with Row Level Security
- No data is shared with third parties

## License

MIT
