-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'PENDING' CHECK (role IN ('ADMIN', 'EDITOR', 'PENDING')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Duits Members table
CREATE TABLE IF NOT EXISTS duits_members (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  department VARCHAR(255),
  hall VARCHAR(255),
  email VARCHAR(255),
  mobile VARCHAR(20),
  blood_group VARCHAR(10),
  guardian_name VARCHAR(255),
  guardian_contact VARCHAR(20),
  guardian_address TEXT,
  ssc_board VARCHAR(100),
  ssc_year INTEGER,
  hsc_board VARCHAR(100),
  hsc_year INTEGER,
  activities TEXT,
  motivation TEXT,
  transaction_id VARCHAR(255) UNIQUE,
  payment_amount DECIMAL(10,2) DEFAULT 100.00,
  payment_status VARCHAR(50) DEFAULT 'Successful',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Executives table
CREATE TABLE IF NOT EXISTS executives (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  session VARCHAR(50),
  department VARCHAR(255),
  email VARCHAR(255),
  year INTEGER,
  phone VARCHAR(20),
  image TEXT,
  duits_batch INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  date DATE,
  image TEXT,
  location VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  registration_link TEXT
);

-- Gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  date DATE,
  image TEXT,
  category VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notices table
CREATE TABLE IF NOT EXISTS notices (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  registration_link TEXT,
  image TEXT,
  deadline DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  date DATE,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT,
  description TEXT,
  image TEXT,
  date DATE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_duits_members_email ON duits_members(email);
CREATE INDEX IF NOT EXISTS idx_duits_members_transaction_id ON duits_members(transaction_id);
CREATE INDEX IF NOT EXISTS idx_executives_email ON executives(email);
CREATE INDEX IF NOT EXISTS idx_executives_batch ON executives(duits_batch);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE duits_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE executives ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (adjust as needed for security)
-- Users: Only authenticated users can read, service role can manage
CREATE POLICY "Public read access for users" ON users FOR SELECT USING (true);
CREATE POLICY "Service role can manage users" ON users FOR ALL USING (auth.role() = 'service_role');

-- Duits Members: Public read, service role manage
CREATE POLICY "Public read access for duits_members" ON duits_members FOR SELECT USING (true);
CREATE POLICY "Service role can manage duits_members" ON duits_members FOR ALL USING (auth.role() = 'service_role');

-- Executives: Public read, service role manage
CREATE POLICY "Public read access for executives" ON executives FOR SELECT USING (true);
CREATE POLICY "Service role can manage executives" ON executives FOR ALL USING (auth.role() = 'service_role');

-- Events: Public read, service role manage
CREATE POLICY "Public read access for events" ON events FOR SELECT USING (true);
CREATE POLICY "Service role can manage events" ON events FOR ALL USING (auth.role() = 'service_role');

-- Gallery: Public read, service role manage
CREATE POLICY "Public read access for gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Service role can manage gallery" ON gallery FOR ALL USING (auth.role() = 'service_role');

-- Notices: Public read, service role manage
CREATE POLICY "Public read access for notices" ON notices FOR SELECT USING (true);
CREATE POLICY "Service role can manage notices" ON notices FOR ALL USING (auth.role() = 'service_role');

-- Achievements: Public read, service role manage
CREATE POLICY "Public read access for achievements" ON achievements FOR SELECT USING (true);
CREATE POLICY "Service role can manage achievements" ON achievements FOR ALL USING (auth.role() = 'service_role');

-- Blogs: Public read, service role manage
CREATE POLICY "Public read access for blogs" ON blogs FOR SELECT USING (true);
CREATE POLICY "Service role can manage blogs" ON blogs FOR ALL USING (auth.role() = 'service_role');
