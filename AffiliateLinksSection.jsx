import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { createAffiliateService, HIGH_COMMISSION_SAAS_TOOLS } from "../services/affiliateService";

function AffiliateLinksSection() {
  const [affiliateLinks, setAffiliateLinks] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize affiliate service and generate links
    const affiliateService = createAffiliateService(process.env.REACT_APP_REWARDFUL_API_KEY);
    const links = affiliateService.generateAffiliateLinks(HIGH_COMMISSION_SAAS_TOOLS);
    setAffiliateLinks(links);
    setIsLoading(false);
  }, []);

  const handleAffiliateClick = async (toolName, link) => {
    const affiliateService = createAffiliateService(process.env.REACT_APP_REWARDFUL_API_KEY);
    
    // Track the click
    await affiliateService.trackClick(toolName, 'anonymous_user', {
      tool: toolName,
      source: 'landing_page',
      campaign: 'ai_automation_guide'
    });

    // Open affiliate link in new tab
    window.open(link, '_blank');
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">Loading affiliate recommendations...</p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-900/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            🚀 High-Commission SaaS Tools We Recommend
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            These are the exact tools we use and recommend for building automated marketing systems. 
            Each offers generous affiliate commissions when you refer others.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.values(affiliateLinks).map((tool) => (
            <div key={tool.name} className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition-colors">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-white mb-2">{tool.name}</h3>
                <p className="text-sm text-blue-400 font-medium mb-2">{tool.category}</p>
                <p className="text-gray-300 text-sm mb-3">{tool.description}</p>
              </div>

              <div className="mb-4">
                <div className="flex flex-wrap gap-1 mb-3">
                  {tool.features.map((feature) => (
                    <span 
                      key={feature}
                      className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                
                <div className="bg-green-900/30 border border-green-500/30 rounded p-2 mb-4">
                  <p className="text-green-400 text-sm font-medium">
                    💰 Commission: {tool.commission}
                  </p>
                </div>
              </div>

              <Button
                onClick={() => handleAffiliateClick(tool.name, tool.trackingLink)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Learn More & Get Started
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-yellow-400 mb-2">
              💡 Pro Tip: Start Your Own Affiliate Program
            </h3>
            <p className="text-gray-300 text-sm">
              Once you're generating revenue with these tools, consider starting your own affiliate program 
              using Rewardful. Turn your customers into affiliates and create a self-sustaining growth loop.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AffiliateLinksSection;

