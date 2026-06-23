create extension if not exists "uuid-ossp";

create table if not exists services (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  description text not null,
  icon_name text not null,
  is_featured boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists packages (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  summary text not null,
  starting_price_inr integer,
  features jsonb not null default '[]'::jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists leads (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  company text not null,
  email text not null,
  phone text not null,
  interest text not null,
  message text,
  source text not null default 'website',
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'won', 'lost')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists consultations (
  id uuid primary key default uuid_generate_v4(),
  lead_id uuid references leads(id) on delete set null,
  preferred_date date,
  preferred_time text,
  notes text,
  status text not null default 'requested' check (status in ('requested', 'scheduled', 'completed', 'cancelled')),
  created_at timestamptz not null default now()
);

create table if not exists campaigns (
  id uuid primary key default uuid_generate_v4(),
  lead_id uuid references leads(id) on delete set null,
  name text not null,
  channel text not null,
  objective text not null,
  budget_inr integer,
  status text not null default 'draft' check (status in ('draft', 'active', 'paused', 'completed')),
  created_at timestamptz not null default now()
);

create index if not exists leads_status_created_at_idx on leads(status, created_at desc);
create index if not exists leads_email_idx on leads(email);
create index if not exists campaigns_status_idx on campaigns(status);
