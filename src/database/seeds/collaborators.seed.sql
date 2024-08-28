TRUNCATE collaborators;

INSERT INTO public.collaborators
("name", last_name, in_turn, email, created_by, updated_by, status, deleted_at)
VALUES
  ('Fulano', 'Perez Perez', true, 'fulano@gmail.com', NULL, NULL, 'active', NULL),
  ('Mengano', 'Cruz Cruz', true, 'mengano@gmail.com', NULL, NULL, 'active', NULL),
  ('Perengano', 'Sosa Sosa', true, 'perengano@gmail.com', NULL, NULL, 'active', NULL),
  ('Sotorano', 'Martinez Martinez', true, 'sotorano@gmail.com', NULL, NULL, 'active', NULL),
  ('Jilano', 'Mota Mota', true, 'jilano@gmail.com', NULL, NULL, 'active', NULL),