-- Seed data from existing database

-- Users
INSERT INTO users (id, name, email, password, role, created_at, updated_at) VALUES
(2, 'Dip Pal', 'dip.pal.513@gmail.com', '$2b$10$806vFz.Zo.2f1zy2gL4ZpeijDQNZyspzAvquS7zP.c6EuL7U8wpVq', 'ADMIN', '2025-11-28 16:30:33.78675', '2025-11-28 16:30:33.78675'),
(6, 'Naim', 'naimulh644@gmail.com', '$2b$10$N4PQQ7s8GACUL8Ja.G80MesxLXXqtLg7tmZb5ssXtE86SC5pJbrrW', 'ADMIN', '2025-12-11 15:06:10.793556', '2025-12-11 15:06:10.793556'),
(9, 'DUITS Official', 'duits.lab@gmail.com', '$2b$10$eeqpNlRch26i3VKMxalUhu0In0/DWcm7RfRRMNB1aidNOLU6w5UY2', 'ADMIN', '2026-05-11 20:46:33.23864', '2026-05-11 20:46:33.23864')
ON CONFLICT (email) DO NOTHING;

-- Sample Duits Members (truncated for migration, full data can be added later)
INSERT INTO duits_members (id, full_name, department, hall, email, mobile, blood_group, guardian_name, guardian_contact, guardian_address, ssc_board, ssc_year, hsc_board, hsc_year, activities, motivation, transaction_id, payment_amount, payment_status, created_at) VALUES
(8, 'Mayesha Binte Liton', 'Computer Science and Engineering', 'Kabi Sufia Kamal Hall', 'mayeshabinte-2023116005@cs.du.ac.bd', '01725833208', 'O+', 'Hira Khanam', '01717837831', '6/B, Muminunnisa Excel Tower, Panditpara, Mymensingh', 'Mymensingh', 2021, 'Mymensingh', 2023, 'Volleyball, Badminton, CTF, Cards, Exploring', 'I want to be a part of the IT related society of my university', 'DUI176933770718900166390', 100.00, 'Successful', '2026-01-25 16:43:11.194157'),
(9, 'Moriom Jannat Nisa', 'Psychology', 'Shamsunnahar hall', 'moriomnisa2006@gmail.com', '01312509590', 'O+', 'Arman Hossain', '01400219274', 'Dhaka.', 'Dhaka', 2022, 'Dhaka', 2024, 'Recitation, Debate,Stage Drama', 'To learn practical technology skills and explore technology beyond textbooks, learn from seniors, and improve my skills through teamwork. I believe the IT Society will help me grow both personally and professionally.', 'DUI176933915175886112860', 100.00, 'Successful', '2026-01-25 17:10:58.631971')
ON CONFLICT (transaction_id) DO NOTHING;

-- Sample Executives
INSERT INTO executives (id, name, position, session, department, email, year, phone, image, duits_batch, created_at, updated_at) VALUES
(95, 'Md. Abdul Kader', 'President', '2020-2021', 'Arabic', 'duits.lab@gmail.com', 2026, '01788264687', 'https://res.cloudinary.com/dioqkynk3/image/upload/v1781365055/executives/gzm28xznhxg2cxdgp9ju.jpg', 10, '2026-06-13 21:37:44.36048', '2026-06-13 21:37:44.36048'),
(95, 'Md. Abdul Kader', 'President', '2020-2021', 'Arabic', 'duits.lab@gmail.com', 2026, '01788264687', 'https://res.cloudinary.com/dioqkynk3/image/upload/v1781365055/executives/gzm28xznhxg2cxdgp9ju.jpg', 10, '2026-06-13 21:37:44.36048', '2026-06-13 21:37:44.36048'),
(98, 'Md. Rajib Mia', 'General Secretary', '2020-2021', 'Criminology', 'rajibmia3821@gmail.com', 2026, '01722569638', 'https://res.cloudinary.com/dioqkynk3/image/upload/v1781365145/executives/tvuglowz0wsesmwagctv.jpg', 10, '2026-06-13 21:39:14.823255', '2026-06-13 21:39:14.823255')
ON CONFLICT DO NOTHING;

-- Events
INSERT INTO events (id, title, description, date, image, location, created_at, updated_at, registration_link) VALUES
(17, 'demo', 'demo description added!', '2025-12-05', 'https://res.cloudinary.com/dioqkynk3/image/upload/v1765176329/events/ikixzpje9ptome80j4us.png', 'TSC', '2025-12-08 12:45:30.521819', '2025-12-08 12:45:30.521819', 'https://www.ww.com')
ON CONFLICT DO NOTHING;

-- Gallery
INSERT INTO gallery (id, title, description, date, image, category, created_at, updated_at) VALUES
(5, '𝐂𝐚𝐧𝐯𝐚 𝐁𝐨𝐨𝐭-𝐂𝐚𝐦𝐩: 𝐅𝐫𝐨𝐦 𝐁𝐚𝐬𝐢𝐜𝐬 𝐭𝐨 𝐁𝐫𝐢𝐥𝐥𝐢𝐚𝐧𝐜𝐞!', 'Successfully organized the "𝐂𝐚𝐧𝐯𝐚 𝐁𝐨𝐨𝐭-𝐂𝐚𝐦𝐩: 𝐅𝐫𝐨𝐦 𝐁𝐚𝐬𝐢𝐜𝐬 𝐭𝐨 𝐁𝐫𝐢𝐥𝐥𝐢𝐚𝐧𝐜𝐞!"\nAn engaging and insightful session conducted by our very own 𝐊𝐡𝐚𝐝𝐢𝐳𝐚 𝐀𝐤𝐭𝐞𝐫 𝐌𝐨𝐮, Member of the 11th Batch, DUITS and Graphic Designer at Alpha Studio.', '2025-08-04', 'https://res.cloudinary.com/dioqkynk3/image/upload/v1764651946/gallery/gspmi8ud7nkn6pv5mnx6.jpg', 'photography', '2025-12-02 11:05:47.035892', '2025-12-02 11:05:47.035892'),
(6, 'ডিইউআইটিএস-এর নবীনবরণ, পুনর্মিলনী ও দায়িত্ব হস্তান্তর', 'ডিইউআইটিএস-এর নবীনবরণ, পুনর্মিলনী ও দায়িত্ব হস্তান্তর\nঢাকা ইউনিভার্সিটি আইটি সোসাইটি (ডিইউআইটিএস)-এর নবীনবরণ, পুনর্মিলনী ও দায়িত্ব হস্তান্তর অনুষ্ঠান আজ ৪ মে ২০২৫ রবিবার ছাত্র-শিক্ষক কেন্দ্র মিলনায়তনে অনুষ্ঠিত হয়েছে। ঢাকা বিশ্ববিদ্যালয়ের উপাচার্য অধ্যাপক ড. নিয়াজ আহমদ খান অনুষ্ঠানে প্রধান অতিথি হিসেবে উপস্থিত ছিলেন।\nডিইউআইটিএস-এর সভাপতি মো আবু বকর সিদ্দিকের সভাপতিত্বে অনুষ্ঠানে সংগঠনের প্রতিষ্ঠাতা সাধারণ সম্পাদক আরিফ দেওয়ান এবং করতোয়া গ্রীন স্পিনিং মিল লিমিটেডের সিইও মির্জা ফারশেদ আজাদ রিকি বিশেষ অতিথি হিসেবে বক্তব্য রাখেন। সংগঠনের সাধারণ সম্পাদক মো. গিয়াস উদ্দিন অনুষ্ঠানে স্বাগত বক্তব্য দেন।\nউপাচার্য অধ্যাপক ড. নিয়াজ আহমদ খান বলেন, আইটি সেক্টর দ্রুত পরিবর্তনশীল ও পরিবর্ধনশীল এক...[truncated]', '2025-05-04', 'https://res.cloudinary.com/dioqkynk3/image/upload/v1764652318/gallery/sk9jfh8wzj4yfepz7qab.jpg', 'photography', '2025-12-02 11:30:17.777777', '2025-12-02 11:30:17.777777')
ON CONFLICT DO NOTHING;

-- Notices
INSERT INTO notices (id, title, description, registration_link, image, deadline, created_at, updated_at) VALUES
(15, 'DUITS GENERAL MEETING', 'DUITS GENERAL MEETING\n\nDiscussions about the Grand Iftaar Party 2025, AI and Python Training, and CV/Resume Competition will be held. All members must be present on time.\n\n📅 27 February 2025\n⏱ 03:30 PM\n📍 DUITS Club Room, TSC, DU', 'https://www.google.com', 'https://res.cloudinary.com/dioqkynk3/image/upload/v1764661590/notices/rknh6yotbxhx9ag3rtjw.jpg', '2025-02-26', '2025-12-02 11:32:35.542079', '2025-12-02 13:46:30.956345')
ON CONFLICT DO NOTHING;

-- Blogs
INSERT INTO blogs (id, title, slug, content, description, image, date) VALUES
(1, 'this is new title', 'this-is-new-title', '**GRANT USAGE, SELECT, UPDATE ON SEQUENCE blogs\\_id\\_seq TO bvranzct\\_central\\_user;**\n**GRANT USAGE, SELECT, UPDATE ON SEQUENCE blogs\\_id\\_seq TO bvranzct\\_central\\_user;**...', '**GRANT USAGE, SELECT, UPDATE ON SEQUENCE blogs\\_id\\_seq TO bvranzct\\_central\\_user;**\n**GRANT USAGE, SELECT, UPDATE ON SEQUENCE blogs\\_id\\_seq TO bvranzct\\_central\\_user;**...', 'https://res.cloudinary.com/dioqkynk3/image/upload/v1765023858/blog_covers/aelzazrpv4neegemawny.jpg', '2025-12-06')
ON CONFLICT (slug) DO NOTHING;

-- Reset sequences
SELECT setval('public.users_id_seq', 9, true);
SELECT setval('public.duits_members_id_seq', 77, true);
SELECT setval('public.executives_id_seq', 98, true);
SELECT setval('public.events_id_seq', 17, true);
SELECT setval('public.gallery_id_seq', 12, true);
SELECT setval('public.notices_id_seq', 15, true);
SELECT setval('public.blogs_id_seq', 3, true);
