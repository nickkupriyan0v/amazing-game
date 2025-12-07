CREATE TABLE IF NOT EXISTS public.users (
  id SERIAL PRIMARY KEY,
  login TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_users_login ON public.users(login);
