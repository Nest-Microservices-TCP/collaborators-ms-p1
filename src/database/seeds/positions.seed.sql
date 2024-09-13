TRUNCATE positions;

INSERT INTO public.positions
(created_by, updated_by, status, deleted_at, "name", description)
VALUES
  (NULL, NULL, 'active', NULL, '', '');