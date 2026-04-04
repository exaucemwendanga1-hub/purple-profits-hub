
-- 1. Replace overly permissive anonymous newsletter policy with email format validation
DROP POLICY IF EXISTS "Anonymous users can subscribe" ON public.newsletter_subscribers;

CREATE POLICY "Anonymous users can subscribe with valid email"
  ON public.newsletter_subscribers FOR INSERT
  TO anon
  WITH CHECK (
    email ~* '^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$'
    AND char_length(email) <= 255
  );

-- 2. Fix storage policies - drop and recreate targeting authenticated only (not public)
DROP POLICY IF EXISTS "Users can download purchased assets" ON storage.objects;
DROP POLICY IF EXISTS "Admins can read digital products" ON storage.objects;

CREATE POLICY "Users can download purchased assets"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'digital-products' AND
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.user_id = auth.uid()
        AND orders.status = 'completed'
        AND orders.digital_asset_path = storage.objects.name
    )
  );

CREATE POLICY "Admins can read digital products"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'digital-products' AND
    public.has_role(auth.uid(), 'admin')
  );
