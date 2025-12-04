import React from 'react';
import { Copy, Terminal } from 'lucide-react';

export const ApiDocs: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="border-b border-slate-200 pb-6">
        <h2 className="text-2xl font-bold text-slate-900">API Integration</h2>
        <p className="mt-2 text-slate-500">
          Integrate DRM Categorizer directly into your CMS or publishing workflow.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-slate-900 mb-3">Endpoint</h3>
          <div className="flex items-center bg-slate-900 text-slate-300 rounded-lg p-4 font-mono text-sm">
            <span className="text-green-400 font-bold mr-4">POST</span>
            https://api.drm-categorizer.com/v1/classify
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-slate-900 mb-3">Request Body</h3>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-slate-700 font-mono">
{`{
  "api_key": "your_api_key_here",
  "headline": "Tech Giants Invest Billions in AI Infrastructure",
  "body": "Leading technology companies are shifting focus..."
}`}
            </pre>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-slate-900 mb-3">Example Response</h3>
          <div className="bg-slate-900 rounded-lg p-6 relative group">
            <button className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
              <Copy className="w-4 h-4" />
            </button>
            <pre className="text-sm text-green-400 font-mono overflow-x-auto">
{`{
  "status": "success",
  "data": {
    "primaryCategory": "Technology",
    "allCategories": [
      { "category": "Technology", "confidence": 98 },
      { "category": "Economy", "confidence": 75 }
    ],
    "tags": ["Artificial Intelligence", "Infrastructure", "Big Tech", "Investment"],
    "summary": "Major tech firms are significantly increasing capital expenditure.",
    "sentiment": "Neutral"
  },
  "usage": {
    "credits_used": 1,
    "remaining": 4999
  }
}`}
            </pre>
          </div>
        </div>

        <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-6">
          <div className="flex items-start">
            <Terminal className="w-6 h-6 text-indigo-600 mt-1 mr-4" />
            <div>
              <h4 className="text-indigo-900 font-semibold">SDKs Available</h4>
              <p className="text-indigo-700 text-sm mt-1">
                We provide official libraries for Node.js, Python, and PHP to make integration even easier. Check our <a href="#" className="underline">GitHub repository</a> for more.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};