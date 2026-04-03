/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "Purple Profits Hub"

interface OrderConfirmationProps {
  productName?: string
  amount?: string
  customerEmail?: string
}

const OrderConfirmationEmail = ({ productName, amount, customerEmail }: OrderConfirmationProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Order confirmed — {productName || 'your purchase'} from {SITE_NAME}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>✅ Order Confirmed!</Heading>
        <Text style={text}>
          Hey there! Your order has been received and is being processed.
        </Text>
        <Section style={detailsBox}>
          <Text style={detailLabel}>Product</Text>
          <Text style={detailValue}>{productName || 'Digital Product'}</Text>
          {amount && (
            <>
              <Text style={detailLabel}>Amount Paid</Text>
              <Text style={detailValue}>{amount}</Text>
            </>
          )}
          {customerEmail && (
            <>
              <Text style={detailLabel}>Email</Text>
              <Text style={detailValue}>{customerEmail}</Text>
            </>
          )}
        </Section>
        <Text style={text}>
          You'll receive a separate email with your download link shortly.
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          Need help? Reply to this email and we'll get back to you.
        </Text>
        <Text style={footer}>— The {SITE_NAME} Team</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: OrderConfirmationEmail,
  subject: (data: Record<string, any>) =>
    `Order confirmed: ${data.productName || 'Your Purchase'}`,
  displayName: 'Order confirmation',
  previewData: {
    productName: 'All Supplier Bundle',
    amount: '$29.99',
    customerEmail: 'jane@example.com',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Outfit', Arial, sans-serif" }
const container = { padding: '40px 25px', maxWidth: '560px', margin: '0 auto' }
const h1 = { fontSize: '24px', fontWeight: 'bold' as const, color: '#1a1a2e', margin: '0 0 24px', textAlign: 'center' as const }
const text = { fontSize: '15px', color: '#55575d', lineHeight: '1.6', margin: '0 0 16px' }
const detailsBox = { backgroundColor: '#f8f7ff', borderRadius: '12px', padding: '20px 24px', margin: '16px 0 24px' }
const detailLabel = { fontSize: '12px', color: '#999999', margin: '0 0 2px', textTransform: 'uppercase' as const, letterSpacing: '0.5px' }
const detailValue = { fontSize: '15px', color: '#1a1a2e', fontWeight: '600' as const, margin: '0 0 12px' }
const hr = { borderColor: '#eaeaea', margin: '24px 0' }
const footer = { fontSize: '13px', color: '#999999', margin: '0 0 4px' }
