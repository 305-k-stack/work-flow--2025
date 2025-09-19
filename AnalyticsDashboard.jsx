import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getAnalytics } from "../services/analyticsService";

function AnalyticsDashboard() {
  const [metrics, setMetrics] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const analytics = getAnalytics();
      const performanceMetrics = analytics.getPerformanceMetrics();
      const optimizationRecs = analytics.generateOptimizationRecommendations();
      
      setMetrics(performanceMetrics);
      setRecommendations(optimizationRecs);
    }
  }, [isVisible]);

  const handleExportData = () => {
    const analytics = getAnalytics();
    const data = analytics.exportAnalyticsData();
    
    // Create and download JSON file
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsVisible(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg"
        >
          📊 Analytics
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
          <Button
            onClick={() => setIsVisible(false)}
            className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 text-sm"
          >
            ✕ Close
          </Button>
        </div>

        {metrics && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-2">Conversion Rate</h3>
                <p className="text-3xl font-bold text-green-400">{metrics.conversionRate}%</p>
                <p className="text-sm text-gray-400">Email signups / Page views</p>
              </div>
              
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-2">24h Activity</h3>
                <p className="text-3xl font-bold text-blue-400">{metrics.last24Hours.totalEvents}</p>
                <p className="text-sm text-gray-400">Total events tracked</p>
              </div>
              
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-2">Weekly Signups</h3>
                <p className="text-3xl font-bold text-purple-400">{metrics.last7Days.emailSignups}</p>
                <p className="text-sm text-gray-400">Email signups this week</p>
              </div>
            </div>

            {/* Detailed Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-3">Last 24 Hours</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Email Signups:</span>
                    <span className="text-white">{metrics.last24Hours.emailSignups}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Affiliate Clicks:</span>
                    <span className="text-white">{metrics.last24Hours.affiliateClicks}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Conversions:</span>
                    <span className="text-white">{metrics.last24Hours.conversions}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-3">Last 7 Days</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Email Signups:</span>
                    <span className="text-white">{metrics.last7Days.emailSignups}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Affiliate Clicks:</span>
                    <span className="text-white">{metrics.last7Days.affiliateClicks}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Conversions:</span>
                    <span className="text-white">{metrics.last7Days.conversions}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Affiliate Tools */}
            {metrics.topAffiliateTools.length > 0 && (
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-3">Top Affiliate Tools</h3>
                <div className="space-y-2">
                  {metrics.topAffiliateTools.map((tool, index) => (
                    <div key={tool.tool} className="flex justify-between items-center">
                      <span className="text-gray-300">#{index + 1} {tool.tool}</span>
                      <span className="text-white font-medium">{tool.clicks} clicks</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Optimization Recommendations */}
            {recommendations.length > 0 && (
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-3">Optimization Recommendations</h3>
                <div className="space-y-3">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="border-l-4 border-yellow-500 pl-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-1 text-xs rounded ${
                          rec.priority === 'high' ? 'bg-red-600 text-white' : 
                          rec.priority === 'medium' ? 'bg-yellow-600 text-white' : 
                          'bg-green-600 text-white'
                        }`}>
                          {rec.priority.toUpperCase()}
                        </span>
                        <h4 className="font-semibold text-white">{rec.title}</h4>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{rec.description}</p>
                      <p className="text-blue-400 text-sm font-medium">Action: {rec.action}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Export Data */}
            <div className="flex justify-center">
              <Button
                onClick={handleExportData}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
              >
                📥 Export Analytics Data
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AnalyticsDashboard;

