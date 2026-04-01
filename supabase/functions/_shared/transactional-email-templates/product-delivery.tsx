/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body, Button, Container, Head, Heading, Html, Preview, Section, Text, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "Purple Profits Hub"

interface ProductDeliveryProps {
  productName?: string
  downloadUrl?: string
}

const ProductDeliveryEmail = ({ productName, downloadUrl }: ProductDeliveryProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your download is ready — {productName || 'your supplier list'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>🎉 Your Purchase is Ready!</Heading>
        <Text style={text}>
          Thanks for purchasing <strong>{productName || 'a supplier list'}</strong> from {SITE_NAME}.
        </Text>
        <Text style={text}>
          Click the button below to download your file. This link expires in 24 hours for security.
        </Text>
        <Section style={buttonSection}>
          <Button style={button} href={downloadUrl || '#'}>
            Download Now
          </Button>
        </Section>
        <Hr style={hr} />
        <Text style={smallText}>
          If the button doesn't work, copy and paste this URL into your browser:
        </Text>
        <Text style={linkText}>{downloadUrl || '#'}</Text>
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
  component: ProductDeliveryEmail,
  subject: (data: Record<string, any>) =>
    `Your download is ready: ${data.productName || 'Supplier List'}`,
  displayName: 'Product delivery',
  previewData: {
    productName: 'All Supplier Bundle',
    downloadUrl: 'https://example.com/download/abc123',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Outfit', Arial, sans-serif" }
const container = { padding: '40px 25px', maxWidth: '560px', margin: '0 auto' }
const h1 = { fontSize: '24px', fontWeight: 'bold' as const, color: '#1a1a2e', margin: '0 0 24px', textAlign: 'center' as const }
const text = { fontSize: '15px', color: '#55575d', lineHeight: '1.6', margin: '0 0 16px' }
const buttonSection = { textAlign: 'center' as const, margin: '24px 0' }
const button = {
  backgroundColor: 'hsl(263, 70%, 58%)',
  color: '#ffffff',
  borderRadius: '12px',
  fontSize: '15px',
  fontWeight: '600' as const,
  padding: '14px 32px',
  textDecoration: 'none',
}
const hr = { borderColor: '#eaeaea', margin: '24px 0' }
const smallText = { fontSize: '12px', color: '#999999', margin: '0 0 4px' }
const linkText = { fontSize: '12px', color: 'hsl(263, 70%, 58%)', wordBreak: 'break-all' as const, margin: '0 0 16px' }
const footer = { fontSize: '13px', color: '#999999', margin: '0 0 4px' }
