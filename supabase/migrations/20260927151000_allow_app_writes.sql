-- Allow the public anon key to insert/update/delete.
-- Dashboard login remains an app-level gate; these policies are required because
-- the dashboard talks to Supabase directly (no Express backend / service role).

DROP POLICY IF EXISTS "Public insert access for users" ON users;
DROP POLICY IF EXISTS "Public update access for users" ON users;
DROP POLICY IF EXISTS "Public delete access for users" ON users;
CREATE POLICY "Public insert access for users" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access for users" ON users FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Public delete access for users" ON users FOR DELETE USING (true);

DROP POLICY IF EXISTS "Public insert access for duits_members" ON duits_members;
DROP POLICY IF EXISTS "Public update access for duits_members" ON duits_members;
DROP POLICY IF EXISTS "Public delete access for duits_members" ON duits_members;
CREATE POLICY "Public insert access for duits_members" ON duits_members FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access for duits_members" ON duits_members FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Public delete access for duits_members" ON duits_members FOR DELETE USING (true);

DROP POLICY IF EXISTS "Public insert access for executives" ON executives;
DROP POLICY IF EXISTS "Public update access for executives" ON executives;
DROP POLICY IF EXISTS "Public delete access for executives" ON executives;
CREATE POLICY "Public insert access for executives" ON executives FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access for executives" ON executives FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Public delete access for executives" ON executives FOR DELETE USING (true);

DROP POLICY IF EXISTS "Public insert access for events" ON events;
DROP POLICY IF EXISTS "Public update access for events" ON events;
DROP POLICY IF EXISTS "Public delete access for events" ON events;
CREATE POLICY "Public insert access for events" ON events FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access for events" ON events FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Public delete access for events" ON events FOR DELETE USING (true);

DROP POLICY IF EXISTS "Public insert access for gallery" ON gallery;
DROP POLICY IF EXISTS "Public update access for gallery" ON gallery;
DROP POLICY IF EXISTS "Public delete access for gallery" ON gallery;
CREATE POLICY "Public insert access for gallery" ON gallery FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access for gallery" ON gallery FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Public delete access for gallery" ON gallery FOR DELETE USING (true);

DROP POLICY IF EXISTS "Public insert access for notices" ON notices;
DROP POLICY IF EXISTS "Public update access for notices" ON notices;
DROP POLICY IF EXISTS "Public delete access for notices" ON notices;
CREATE POLICY "Public insert access for notices" ON notices FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access for notices" ON notices FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Public delete access for notices" ON notices FOR DELETE USING (true);

DROP POLICY IF EXISTS "Public insert access for achievements" ON achievements;
DROP POLICY IF EXISTS "Public update access for achievements" ON achievements;
DROP POLICY IF EXISTS "Public delete access for achievements" ON achievements;
CREATE POLICY "Public insert access for achievements" ON achievements FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access for achievements" ON achievements FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Public delete access for achievements" ON achievements FOR DELETE USING (true);

DROP POLICY IF EXISTS "Public insert access for blogs" ON blogs;
DROP POLICY IF EXISTS "Public update access for blogs" ON blogs;
DROP POLICY IF EXISTS "Public delete access for blogs" ON blogs;
CREATE POLICY "Public insert access for blogs" ON blogs FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access for blogs" ON blogs FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Public delete access for blogs" ON blogs FOR DELETE USING (true);
