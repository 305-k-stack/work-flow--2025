// Affiliate service for tracking and link management
// Integrates with Rewardful for SaaS affiliate tracking

class AffiliateService {
  constructor(rewardfulApiKey) {
    this.rewardfulApiKey = rewardfulApiKey;
    this.baseUrl = 'https://api.rewardful.com/v1';
  }

  // Track affiliate conversion when lead converts
  async trackConversion(email, affiliateCode, conversionData = {}) {
    try {
      // In production, this would make actual API call to Rewardful
      console.log('Tracking affiliate conversion:', {
        email,
        affiliateCode,
        conversionData
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      return {
        success: true,
        conversionId: Date.now().toString(),
        affiliateCode,
        email
      };
    } catch (error) {
      console.error('Error tracking conversion:', error);
      return { success: false, error: error.message };
    }
  }

  // Generate affiliate tracking links for SaaS tools
  generateAffiliateLinks(saasTools) {
    const affiliateLinks = {};
    
    saasTools.forEach(tool => {
      // In production, these would be actual affiliate links from programs
      affiliateLinks[tool.name] = {
        name: tool.name,
        category: tool.category,
        commission: tool.commission,
        trackingLink: `${tool.baseUrl}?ref=our_affiliate_id&utm_source=ai_automation_guide&utm_medium=email&utm_campaign=saas_affiliate`,
        description: tool.description,
        features: tool.features
      };
    });

    return affiliateLinks;
  }

  // Track click events on affiliate links
  async trackClick(linkId, userId, metadata = {}) {
    try {
      const clickData = {
        linkId,
        userId,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        ...metadata
      };

      // Store click data locally for analytics
      const clicks = JSON.parse(localStorage.getItem('affiliateClicks') || '[]');
      clicks.push(clickData);
      localStorage.setItem('affiliateClicks', JSON.stringify(clicks));

      console.log('Affiliate click tracked:', clickData);

      return { success: true, clickId: Date.now().toString() };
    } catch (error) {
      console.error('Error tracking click:', error);
      return { success: false, error: error.message };
    }
  }

  // Get affiliate performance analytics
  getPerformanceAnalytics() {
    const clicks = JSON.parse(localStorage.getItem('affiliateClicks') || '[]');
    const conversions = JSON.parse(localStorage.getItem('affiliateConversions') || '[]');

    const analytics = {
      totalClicks: clicks.length,
      totalConversions: conversions.length,
      conversionRate: clicks.length > 0 ? (conversions.length / clicks.length * 100).toFixed(2) : 0,
      topPerformingLinks: this.getTopPerformingLinks(clicks),
      recentActivity: clicks.slice(-10).reverse()
    };

    return analytics;
  }

  // Helper method to identify top performing links
  getTopPerformingLinks(clicks) {
    const linkCounts = {};
    clicks.forEach(click => {
      linkCounts[click.linkId] = (linkCounts[click.linkId] || 0) + 1;
    });

    return Object.entries(linkCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([linkId, count]) => ({ linkId, clicks: count }));
  }

  // Create affiliate onboarding sequence
  async createAffiliateOnboarding(email, affiliateData) {
    try {
      const onboardingData = {
        email,
        affiliateId: Date.now().toString(),
        status: 'pending_approval',
        joinedAt: new Date().toISOString(),
        ...affiliateData
      };

      // In production, this would integrate with email service to send onboarding sequence
      console.log('Creating affiliate onboarding:', onboardingData);

      return {
        success: true,
        affiliateId: onboardingData.affiliateId,
        status: 'onboarding_started'
      };
    } catch (error) {
      console.error('Error creating affiliate onboarding:', error);
      return { success: false, error: error.message };
    }
  }
}

// High-commission SaaS tools data
export const HIGH_COMMISSION_SAAS_TOOLS = [
  {
    name: 'HubSpot',
    category: 'CRM & Marketing',
    commission: '30% recurring for 12 months',
    baseUrl: 'https://www.hubspot.com',
    description: 'All-in-one CRM, marketing, sales, and service platform',
    features: ['CRM', 'Email Marketing', 'Sales Automation', 'Analytics']
  },
  {
    name: 'ActiveCampaign',
    category: 'Email Marketing',
    commission: '30% recurring',
    baseUrl: 'https://www.activecampaign.com',
    description: 'Email marketing and marketing automation platform',
    features: ['Email Automation', 'CRM', 'Segmentation', 'A/B Testing']
  },
  {
    name: 'Semrush',
    category: 'SEO & Content',
    commission: '40% recurring',
    baseUrl: 'https://www.semrush.com',
    description: 'SEO and content marketing platform',
    features: ['Keyword Research', 'Site Audit', 'Content Planning', 'Competitor Analysis']
  },
  {
    name: 'ConvertKit',
    category: 'Email Marketing',
    commission: '30% recurring for 24 months',
    baseUrl: 'https://convertkit.com',
    description: 'Email marketing for creators and businesses',
    features: ['Email Sequences', 'Landing Pages', 'Forms', 'Automation']
  },
  {
    name: 'Shopify',
    category: 'E-commerce',
    commission: '200% of first month payment',
    baseUrl: 'https://www.shopify.com',
    description: 'Complete e-commerce platform',
    features: ['Online Store', 'Payment Processing', 'Inventory Management', 'Analytics']
  }
];

// Factory function to create affiliate service instance
export const createAffiliateService = (apiKey) => {
  return new AffiliateService(apiKey);
};

export default AffiliateService;

