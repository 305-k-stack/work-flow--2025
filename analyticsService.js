// Analytics service for tracking performance and optimization
// Provides basic analytics and A/B testing capabilities

class AnalyticsService {
  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
  }

  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Track page views and user interactions
  trackEvent(eventName, properties = {}) {
    const event = {
      id: Date.now().toString(),
      sessionId: this.sessionId,
      eventName,
      properties,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      referrer: document.referrer
    };

    // Store events locally (in production, send to analytics service)
    const events = JSON.parse(localStorage.getItem('analyticsEvents') || '[]');
    events.push(event);
    localStorage.setItem('analyticsEvents', JSON.stringify(events));

    console.log('Analytics Event:', event);
    return event;
  }

  // Track form submissions and conversions
  trackConversion(conversionType, value = 0, metadata = {}) {
    return this.trackEvent('conversion', {
      conversionType,
      value,
      ...metadata
    });
  }

  // Track affiliate link clicks
  trackAffiliateClick(linkId, tool, commission) {
    return this.trackEvent('affiliate_click', {
      linkId,
      tool,
      commission,
      category: 'affiliate_marketing'
    });
  }

  // Track email signups
  trackEmailSignup(email, source = 'landing_page') {
    return this.trackEvent('email_signup', {
      email: this.hashEmail(email), // Hash for privacy
      source,
      category: 'lead_generation'
    });
  }

  // Simple email hashing for privacy
  hashEmail(email) {
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      const char = email.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return 'hash_' + Math.abs(hash).toString(36);
  }

  // Get performance metrics
  getPerformanceMetrics() {
    const events = JSON.parse(localStorage.getItem('analyticsEvents') || '[]');
    const now = Date.now();
    const last24Hours = now - (24 * 60 * 60 * 1000);
    const last7Days = now - (7 * 24 * 60 * 60 * 1000);

    const recentEvents = events.filter(e => new Date(e.timestamp).getTime() > last24Hours);
    const weeklyEvents = events.filter(e => new Date(e.timestamp).getTime() > last7Days);

    const metrics = {
      totalEvents: events.length,
      last24Hours: {
        totalEvents: recentEvents.length,
        emailSignups: recentEvents.filter(e => e.eventName === 'email_signup').length,
        affiliateClicks: recentEvents.filter(e => e.eventName === 'affiliate_click').length,
        conversions: recentEvents.filter(e => e.eventName === 'conversion').length
      },
      last7Days: {
        totalEvents: weeklyEvents.length,
        emailSignups: weeklyEvents.filter(e => e.eventName === 'email_signup').length,
        affiliateClicks: weeklyEvents.filter(e => e.eventName === 'affiliate_click').length,
        conversions: weeklyEvents.filter(e => e.eventName === 'conversion').length
      },
      conversionRate: this.calculateConversionRate(events),
      topAffiliateTools: this.getTopAffiliateTools(events)
    };

    return metrics;
  }

  // Calculate conversion rate (email signups / page views)
  calculateConversionRate(events) {
    const pageViews = events.filter(e => e.eventName === 'page_view').length || 1;
    const signups = events.filter(e => e.eventName === 'email_signup').length;
    return ((signups / pageViews) * 100).toFixed(2);
  }

  // Get top performing affiliate tools
  getTopAffiliateTools(events) {
    const affiliateClicks = events.filter(e => e.eventName === 'affiliate_click');
    const toolCounts = {};

    affiliateClicks.forEach(event => {
      const tool = event.properties.tool;
      toolCounts[tool] = (toolCounts[tool] || 0) + 1;
    });

    return Object.entries(toolCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([tool, clicks]) => ({ tool, clicks }));
  }

  // A/B testing functionality
  getVariant(testName, variants = ['A', 'B']) {
    const userId = this.sessionId;
    const hash = this.simpleHash(userId + testName);
    const variantIndex = hash % variants.length;
    
    const variant = variants[variantIndex];
    
    // Track which variant was shown
    this.trackEvent('ab_test_variant', {
      testName,
      variant,
      userId: this.hashEmail(userId)
    });

    return variant;
  }

  // Simple hash function for A/B testing
  simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  // Track A/B test conversion
  trackABTestConversion(testName, variant, conversionType) {
    return this.trackEvent('ab_test_conversion', {
      testName,
      variant,
      conversionType
    });
  }

  // Generate optimization recommendations
  generateOptimizationRecommendations() {
    const metrics = this.getPerformanceMetrics();
    const recommendations = [];

    // Conversion rate recommendations
    if (parseFloat(metrics.conversionRate) < 2) {
      recommendations.push({
        type: 'conversion_rate',
        priority: 'high',
        title: 'Improve Conversion Rate',
        description: 'Your conversion rate is below 2%. Consider A/B testing different headlines, value propositions, or form designs.',
        action: 'Run A/B tests on key page elements'
      });
    }

    // Affiliate performance recommendations
    if (metrics.last7Days.affiliateClicks < 10) {
      recommendations.push({
        type: 'affiliate_engagement',
        priority: 'medium',
        title: 'Increase Affiliate Link Engagement',
        description: 'Affiliate link clicks are low. Consider making affiliate tools more prominent or adding more compelling descriptions.',
        action: 'Optimize affiliate tool presentation'
      });
    }

    // Email signup recommendations
    if (metrics.last7Days.emailSignups === 0) {
      recommendations.push({
        type: 'lead_generation',
        priority: 'high',
        title: 'No Email Signups Detected',
        description: 'No email signups in the last 7 days. Check form functionality and lead magnet appeal.',
        action: 'Review and test email capture form'
      });
    }

    return recommendations;
  }

  // Export analytics data
  exportAnalyticsData() {
    const events = JSON.parse(localStorage.getItem('analyticsEvents') || '[]');
    const metrics = this.getPerformanceMetrics();
    const recommendations = this.generateOptimizationRecommendations();

    return {
      events,
      metrics,
      recommendations,
      exportedAt: new Date().toISOString()
    };
  }
}

// Initialize analytics on page load
const analytics = new AnalyticsService();

// Track initial page view
analytics.trackEvent('page_view', {
  page: 'landing_page',
  source: document.referrer || 'direct'
});

// Factory function to get analytics instance
export const getAnalytics = () => analytics;

export default AnalyticsService;

