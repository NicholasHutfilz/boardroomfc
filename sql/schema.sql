-- Enable Row Level Security
alter table auth.users enable row level security;

-- Create user profiles table
create table public.user_profiles (
    id uuid references auth.users(id) on delete cascade primary key,
    email text not null,
    first_name text,
    last_name text,
    nationality text,
    birth_place text,
    date_of_birth date,
    favorite_team text,
    avatar_url text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on user_profiles
alter table public.user_profiles enable row level security;

-- Create policy for user_profiles - users can only see/edit their own profile
create policy "Users can view own profile" on public.user_profiles
    for select using (auth.uid() = id);

create policy "Users can update own profile" on public.user_profiles
    for update using (auth.uid() = id);

create policy "Users can insert own profile" on public.user_profiles
    for insert with check (auth.uid() = id);

-- Create save metadata table
create table public.save_metadata (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    name text not null,
    manager_name text not null,
    date_created timestamp with time zone not null,
    date_last_opened timestamp with time zone not null,
    most_recent_team text,
    most_recent_place text,
    most_recent_season text,
    save_uuid uuid default gen_random_uuid() not null unique,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on save_metadata
alter table public.save_metadata enable row level security;

-- Create policies for save_metadata - users can only see/edit their own saves
create policy "Users can view own saves" on public.save_metadata
    for select using (auth.uid() = user_id);

create policy "Users can insert own saves" on public.save_metadata
    for insert with check (auth.uid() = user_id);

create policy "Users can update own saves" on public.save_metadata
    for update using (auth.uid() = user_id);

create policy "Users can delete own saves" on public.save_metadata
    for delete using (auth.uid() = user_id);

-- Create temporary manager info table
create table public.temp_manager_info (
    id uuid default gen_random_uuid() primary key,
    save_id uuid references public.save_metadata(id) on delete cascade not null,
    first_name text not null,
    last_name text not null,
    nationality text,
    birth_place text,
    date_of_birth date,
    favorite_team text,
    selected_club text,
    coaching_license text,
    playing_experience text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on temp_manager_info
alter table public.temp_manager_info enable row level security;

-- Create policies for temp_manager_info - users can only see/edit manager info for their own saves
create policy "Users can view manager info for own saves" on public.temp_manager_info
    for select using (
        exists (
            select 1 from public.save_metadata
            where save_metadata.id = temp_manager_info.save_id
            and save_metadata.user_id = auth.uid()
        )
    );

create policy "Users can insert manager info for own saves" on public.temp_manager_info
    for insert with check (
        exists (
            select 1 from public.save_metadata
            where save_metadata.id = temp_manager_info.save_id
            and save_metadata.user_id = auth.uid()
        )
    );

create policy "Users can update manager info for own saves" on public.temp_manager_info
    for update using (
        exists (
            select 1 from public.save_metadata
            where save_metadata.id = temp_manager_info.save_id
            and save_metadata.user_id = auth.uid()
        )
    );

create policy "Users can delete manager info for own saves" on public.temp_manager_info
    for delete using (
        exists (
            select 1 from public.save_metadata
            where save_metadata.id = temp_manager_info.save_id
            and save_metadata.user_id = auth.uid()
        )
    );

-- Create function to automatically update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$ language plpgsql;

-- Create triggers to automatically update updated_at
create trigger update_user_profiles_updated_at
    before update on public.user_profiles
    for each row execute function public.handle_updated_at();

create trigger update_save_metadata_updated_at
    before update on public.save_metadata
    for each row execute function public.handle_updated_at();

create trigger update_temp_manager_info_updated_at
    before update on public.temp_manager_info
    for each row execute function public.handle_updated_at();

-- Create indexes for better performance
create index idx_save_metadata_user_id on public.save_metadata(user_id);
create index idx_save_metadata_save_uuid on public.save_metadata(save_uuid);
create index idx_temp_manager_info_save_id on public.temp_manager_info(save_id); 