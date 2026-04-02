## Phase 3 Implementation Plan

### 1. Admin Role System (Database Migration)
- Create `user_roles` table with `app_role` enum (admin, user)
- Add `has_role()` security definer function
- RLS policies for role-based access

### 2. Sales Analytics Dashboard (`/admin`)
- Admin-only route with role check
- Cards: Total revenue, total orders, average order value
- Orders over time chart (recharts)
- Top products table
- Data from existing `orders` table

### 3. AI Chatbot Widget
- Edge function (`chat-support`) using Lovable AI with FAQ/product context as system prompt
- Floating chat bubble component on all pages
- Streaming responses rendered with markdown
- Collapsible chat window

### 4. Route & Navigation
- Add `/admin` route (protected)
- Add admin link in navbar for admin users
