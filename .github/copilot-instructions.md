# Copilot Instructions for work-flow--2025

## Project Overview
This is a React-based marketing automation dashboard focused on affiliate marketing and analytics. The codebase is organized around key UI components and service modules for analytics and affiliate tracking.

## Architecture & Key Components
- **App.jsx**: Main entry point, composes the UI from subcomponents like `LeadCaptureForm`, `AnalyticsDashboard`, and affiliate sections.
- **AnalyticsDashboard.jsx**: Displays performance metrics and optimization recommendations. Uses `getAnalytics()` from `analyticsService.js` for data and actions.
- **AffiliateLinksSection.jsx**: Renders affiliate links and tracks clicks using `affiliateService.js`. Integrates with Rewardful for SaaS affiliate programs.
- **analyticsService.js**: Provides analytics tracking, A/B testing, and conversion tracking. Stores events in localStorage (dev mode) and logs to console.
- **affiliateService.js**: Handles affiliate link generation and conversion tracking. Simulates Rewardful API integration for SaaS affiliate programs.

## Service Patterns
- Service modules (`analyticsService.js`, `affiliateService.js`) are imported and instantiated in UI components. Methods are called directly for analytics and affiliate actions.
- External API keys (e.g., `REWARDFUL_API_KEY`) are expected via environment variables (see usage in `AffiliateLinksSection.jsx`).

## Developer Workflows
- **Build**: Use the VS Code build task (`msbuild`) for building the project. No test or lint tasks are defined in the workspace.
- **Local Analytics & Affiliate Tracking**: All API calls are simulated; real integrations require replacing console logs and localStorage with actual service calls.
- **Component Communication**: Data flows from service modules to UI via React state and props. No global state management is used.

## Project-Specific Conventions
- All service logic is encapsulated in `analyticsService.js` and `affiliateService.js`.
- UI components expect service methods to be synchronous or return promises.
- Affiliate and analytics events are tracked with detailed metadata (see method signatures).
- Use environment variables for sensitive keys; do not hardcode them.

## Integration Points
- **Rewardful**: Simulated via `affiliateService.js`. Replace with real API calls for production.
- **Analytics**: LocalStorage and console for dev; swap for real analytics service in production.

## Example Patterns
- To track an affiliate conversion:
  ```js
  affiliateService.trackConversion(email, affiliateCode, conversionData)
  ```
- To track an analytics event:
  ```js
  analyticsService.trackEvent('eventName', { ...properties })
  ```

## References
- `App.jsx`, `AnalyticsDashboard.jsx`, `AffiliateLinksSection.jsx`
- `analyticsService.js`, `affiliateService.js`

---
For questions or onboarding, see `CONTRIBUTING.md` or contact help@firecrawl.com.
