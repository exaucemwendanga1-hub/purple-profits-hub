/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'

export interface TemplateEntry {
  component: React.ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  to?: string
  displayName?: string
  previewData?: Record<string, any>
}

import { template as productDelivery } from './product-delivery.tsx'
import { template as orderConfirmation } from './order-confirmation.tsx'
import { template as contactConfirmation } from './contact-confirmation.tsx'

export const TEMPLATES: Record<string, TemplateEntry> = {
  'product-delivery': productDelivery,
  'order-confirmation': orderConfirmation,
  'contact-confirmation': contactConfirmation,
}
