TRUNCATE areas;

INSERT INTO public.areas
(created_by, updated_by, status, deleted_at, "name")
VALUES
  (NULL, NULL, 'active', NULL, 'Hospedaje'),
  (NULL, NULL, 'active', NULL, 'Alimentos y Bebidas'),
  (NULL, NULL, 'active', NULL, 'Administración y Operaciones'),
  (NULL, NULL, 'active', NULL, 'Recepción');