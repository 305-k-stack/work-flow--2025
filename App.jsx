
import LeadCaptureForm from "./components/LeadCaptureForm";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center p-4 py-20">
        <div className="max-w-2xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Unlock the Power of AI in Your Marketing</h1>
          <p className="text-lg md:text-xl text-gray-400 mb-8">Discover the secrets to building a high-commission affiliate marketing machine with our exclusive guide. Learn how to leverage AI to automate your funnels, drive conversions, and generate passive income.</p>
          <LeadCaptureForm />
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-400">🚀 Automated Funnels</h3>
              <p className="text-gray-300">Learn how to build marketing funnels that work 24/7, generating leads and conversions while you sleep.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-green-400">💰 High-Commission SaaS</h3>
              <p className="text-gray-300">Discover the most profitable SaaS affiliate programs with recurring commissions up to 50%.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-purple-400">🤖 AI-Powered Optimization</h3>
              <p className="text-gray-300">Use artificial intelligence to optimize your campaigns and maximize your return on investment.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Placeholder for affiliate links */}
      <div className="py-16 bg-gray-800/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-semibold text-white mb-8">
            🚀 High-Commission SaaS Tools Coming Soon
          </h2>
          <p className="text-gray-300">
            We're preparing a curated list of the highest-paying SaaS affiliate programs for you.
          </p>
        </div>
      </div>

      {/* Analytics Dashboard */}
      <AnalyticsDashboard />
    </div>
  );
}

export default App;


