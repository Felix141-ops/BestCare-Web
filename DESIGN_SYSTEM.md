# BestCare Hospital - Design System & UI Guidelines

**Version**: 1.0  
**Status**: Phase 1 Complete  
**Framework**: Tailwind CSS + ShadCN UI

---

## Brand Identity

### Mission
To provide accessible, transparent, and technology-enabled healthcare services that build trust with patients and empower medical professionals.

### Core Values
- **Patient-Centric**: Always prioritize patient experience
- **Trust & Transparency**: Open communication and clear information
- **Excellence**: High-quality standards in all services
- **Innovation**: Continuous improvement and adoption of new technologies
- **Accessibility**: Services available to all patients regardless of background

---

## Color Palette

### Primary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Medical Blue | #0066CC | (0, 102, 204) | Primary actions, headers, links |
| Dark Blue | #003D7A | (0, 61, 122) | Secondary actions, text emphasis |
| Soft Green | #4CAF50 | (76, 175, 80) | Success states, positive actions |
| Light Gray | #F5F5F5 | (245, 245, 245) | Backgrounds, card containers |
| Dark Gray | #333333 | (51, 51, 51) | Primary text |

### Secondary Colors

| Name | Hex | Usage |
|------|-----|-------|
| Success Green | #10B981 | Success messages, checkmarks |
| Warning Amber | #F59E0B | Warning messages, alerts |
| Error Red | #EF4444 | Error messages, destructive actions |
| Info Blue | #3B82F6 | Information messages |
| Neutral Gray | #6B7280 | Secondary text, borders |

### Tailwind CSS Configuration

```javascript
// tailwind.config.ts
module.exports = {
  theme: {
    colors: {
      'medical-blue': '#0066CC',
      'dark-blue': '#003D7A',
      'soft-green': '#4CAF50',
      'success': '#10B981',
      'warning': '#F59E0B',
      'error': '#EF4444',
      'info': '#3B82F6',
    }
  }
}
```

---

## Typography

### Font Family
- **Primary**: 'Inter', sans-serif (Open Source)
- **Headings**: 'Inter Bold', sans-serif
- **Code**: 'Fira Code', monospace

### Font Sizes & Weights

| Level | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| H1 | 48px | 700 | 1.2 | Page titles |
| H2 | 36px | 700 | 1.3 | Section headers |
| H3 | 28px | 600 | 1.4 | Subsection headers |
| H4 | 20px | 600 | 1.5 | Card titles |
| Body Large | 18px | 400 | 1.6 | Primary body text |
| Body | 16px | 400 | 1.6 | Standard text |
| Body Small | 14px | 400 | 1.5 | Secondary text |
| Caption | 12px | 400 | 1.4 | Captions, labels |

---

## Spacing System

**Base unit**: 4px

| Size | Value | Usage |
|------|-------|-------|
| xs | 4px | Minimal spacing |
| sm | 8px | Small gaps |
| md | 16px | Standard gaps |
| lg | 24px | Medium sections |
| xl | 32px | Large sections |
| 2xl | 48px | Extra large sections |

---

## Component Library

### Buttons

**Primary Button** (Medical Blue)
```tsx
<Button variant="primary" size="md">
  Book Appointment
</Button>
```
- Background: #0066CC
- Text: White
- Hover: #003D7A
- Active: Darker with shadow

**Secondary Button** (Outlined)
```tsx
<Button variant="secondary" size="md">
  View Details
</Button>
```
- Border: 2px #0066CC
- Text: #0066CC
- Background: Transparent
- Hover: Light blue background

**Danger Button** (Red)
```tsx
<Button variant="danger" size="md">
  Delete
</Button>
```
- Background: #EF4444
- Text: White
- Hover: Darker red

### Button Sizes
- **xs**: 8px 12px, font-size 12px
- **sm**: 10px 16px, font-size 14px
- **md**: 12px 24px, font-size 16px (default)
- **lg**: 14px 32px, font-size 18px

### Cards

```tsx
<Card className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
  <CardHeader>
    <h3 className="text-xl font-semibold">Card Title</h3>
  </CardHeader>
  <CardContent>
    {/* Card content */}
  </CardContent>
  <CardFooter>
    {/* Card footer */}
  </CardFooter>
</Card>
```

**Card Spacing**:
- Padding: 24px
- Border radius: 8px
- Border: 1px solid #E5E7EB
- Shadow: 0 1px 3px rgba(0,0,0,0.1)

### Inputs & Forms

```tsx
<div className="flex flex-col gap-2">
  <label className="text-sm font-medium text-gray-700">
    Full Name
  </label>
  <input
    type="text"
    placeholder="Enter your full name"
    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
  />
</div>
```

**Input Styling**:
- Padding: 12px 16px
- Border: 1px solid #D1D5DB
- Border radius: 8px
- Focus: Ring 2px #0066CC
- Font size: 16px

### Modals & Dialogs

```tsx
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent className="max-w-md">
    <DialogHeader>
      <h2 className="text-lg font-semibold">Confirm Action</h2>
    </DialogHeader>
    <DialogBody>
      {/* Modal content */}
    </DialogBody>
    <DialogFooter>
      <Button variant="secondary">Cancel</Button>
      <Button variant="primary">Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Alerts & Toast Messages

```tsx
<Alert variant="success">
  <AlertIcon />
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>Your appointment has been booked.</AlertDescription>
</Alert>

<Alert variant="error">
  <AlertIcon />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>This time slot is not available.</AlertDescription>
</Alert>
```

---

## Responsive Design

### Breakpoints (Tailwind)

| Device | Width | Prefix |
|--------|-------|--------|
| Mobile | < 640px | (default) |
| Tablet | 640px - 1024px | `sm:` |
| Desktop | 1024px - 1280px | `md:` |
| Large | 1280px+ | `lg:`, `xl:`, `2xl:` |

### Mobile-First Approach

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* 1 column on mobile, 2 on tablet, 4 on desktop */}
</div>
```

### Container Queries
Max width: 1280px (xl)
Padding: 16px on mobile, 24px on tablet, 32px on desktop

---

## Animations & Transitions

### Page Transitions (Framer Motion)

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3 }}
>
  {/* Content */}
</motion.div>
```

### Hover Effects

```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.2 }}
>
  Click me
</motion.button>
```

### Scroll Animations

```tsx
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  {/* Content visible on scroll */}
</motion.div>
```

---

## Accessibility Standards

### WCAG 2.1 Compliance
- **Level AA**: All public pages
- **Color Contrast**: Minimum 4.5:1 for text
- **Focus States**: Visible keyboard navigation
- **Semantic HTML**: Proper heading hierarchy
- **Alt Text**: Descriptive for all images
- **ARIA Labels**: For interactive elements

### Keyboard Navigation
- Tab: Move forward
- Shift + Tab: Move backward
- Enter/Space: Activate buttons
- Escape: Close modals
- Arrow keys: Navigate lists

### Screen Reader Support

```tsx
<button aria-label="Book appointment with Dr. Smith" className="...">
  <Icon />
</button>

<main role="main">
  {/* Main content */}
</main>

<nav aria-label="Main navigation">
  {/* Navigation items */}
</nav>
```

---

## SEO Optimization

### Meta Tags

```tsx
import Head from 'next/head'

export default function Page() {
  return (
    <Head>
      <title>BestCare Hospital - Premium Healthcare Services</title>
      <meta name="description" content="..." />
      <meta name="og:title" content="..." />
      <meta name="og:description" content="..." />
      <meta name="og:image" content="..." />
    </Head>
  )
}
```

### Structured Data

```json
{
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "BestCare Hospital",
  "image": "https://bestcare.hospital/logo.png",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Medical Plaza",
    "addressLocality": "Nairobi"
  },
  "telephone": "+254-123-456-789"
}
```

---

## Dark Mode Support

```tsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  {/* Content adapts to dark mode */}
</div>
```

---

## Performance Guidelines

### Image Optimization
- Use Next.js Image component
- Responsive srcset
- Lazy loading
- WebP format support

```tsx
import Image from 'next/image'

<Image
  src="/doctor-profile.jpg"
  alt="Dr. Sarah Johnson"
  width={300}
  height={300}
  placeholder="blur"
/>
```

### Code Splitting
- Page-level code splitting (automatic in Next.js)
- Component lazy loading for heavy components
- Dynamic imports for large libraries

### Caching Strategy
- Static assets: 1 year cache
- HTML pages: no-cache, validate on each request
- API responses: Based on data freshness

---

## Error States & Validation

### Form Validation
- Real-time validation (onChange)
- Submit-time validation
- Clear error messages
- Field-level error highlighting

```tsx
<div className="flex flex-col gap-2">
  <input
    className={`border rounded-lg ${
      errors.email ? 'border-error' : 'border-gray-300'
    }`}
  />
  {errors.email && (
    <span className="text-error text-sm">{errors.email.message}</span>
  )}
</div>
```

### Error Messages

- **Be specific**: "Phone number must be 10 digits" instead of "Invalid input"
- **Actionable**: Suggest how to fix the error
- **Friendly tone**: Use conversational language
- **Position**: Display errors near the problematic field

---

## Loading States

### Skeleton Screens

```tsx
<div className="animate-pulse">
  <div className="bg-gray-300 h-12 rounded mb-4"></div>
  <div className="bg-gray-300 h-8 rounded w-3/4"></div>
</div>
```

### Progress Indicators

```tsx
<ProgressBar value={65} className="w-full" />
<CircularProgress value={65} />
```

---

## Component Examples

### Appointment Card

```tsx
<Card>
  <div className="flex justify-between items-start">
    <div>
      <h3 className="text-lg font-semibold">Dr. Sarah Johnson</h3>
      <p className="text-gray-600">Cardiology</p>
      <p className="text-sm text-gray-500">May 27, 2026 at 2:00 PM</p>
    </div>
    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
      Confirmed
    </span>
  </div>
  <div className="mt-4 flex gap-2">
    <Button variant="secondary">Reschedule</Button>
    <Button variant="danger">Cancel</Button>
  </div>
</Card>
```

---

## Page Layout Templates

### Dashboard Layout
- Sidebar: 280px fixed
- Main content: 1fr (flex-grow)
- Header: 64px fixed
- Footer: 60px

### Marketing Layout
- Full-width sections
- Max-width container: 1280px
- Generous padding for whitespace
- Hero section: Full viewport height minimum

---

## Brand Voice & Tone

### Principles
- **Professional yet approachable**: Medical expertise without jargon
- **Confident & reassuring**: Build trust in medical services
- **Clear & concise**: Easy to understand information
- **Empathetic**: Show understanding of patient concerns
- **Positive**: Focus on solutions and improvements

### Example Copy
❌ "Error: Invalid appointment time format"  
✅ "That time isn't available. Here are some alternatives..."

---

## Document Status
- **Version**: 1.0
- **Status**: Phase 1 Complete
- **Last Updated**: May 26, 2026
- **Implementation**: Phase 2 (Frontend Development)
