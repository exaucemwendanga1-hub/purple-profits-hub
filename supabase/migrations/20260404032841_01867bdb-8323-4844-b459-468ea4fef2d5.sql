
-- 1. Storage policies for digital-products bucket

-- Only users with completed orders can download their purchased files
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

-- Only service_role can manage files (upload/update/delete)
CREATE POLICY "Service role can upload digital products"
  ON storage.objects FOR INSERT
  TO service_role
  WITH CHECK (bucket_id = 'digital-products');

CREATE POLICY "Service role can update digital products"
  ON storage.objects FOR UPDATE
  TO service_role
  USING (bucket_id = 'digital-products');

CREATE POLICY "Service role can delete digital products"
  ON storage.objects FOR DELETE
  TO service_role
  USING (bucket_id = 'digital-products');

-- Admin users can also read all files in the bucket (for admin file manager)
CREATE POLICY "Admins can read digital products"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'digital-products' AND
    public.has_role(auth.uid(), 'admin')
  );

-- 2. Tighten newsletter subscribe policy
-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscribers;

-- Authenticated users can only subscribe their own email
CREATE POLICY "Authenticated users subscribe own email"
  ON public.newsletter_subscribers FOR INSERT
  TO authenticated
  WITH CHECK (email = auth.email());

-- Anonymous users can still subscribe (for public newsletter forms)
CREATE POLICY "Anonymous users can subscribe"
  ON public.newsletter_subscribers FOR INSERT
  TO anon
  WITH CHECK (true);
