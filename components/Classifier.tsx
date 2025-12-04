import React, { useState } from 'react';
import { Tag, AlertCircle, CheckCircle2, Loader2, Copy } from 'lucide-react';
import { classifyArticle } from '../services/geminiService';
import { ClassificationResult } from '../types';

export const Classifier: React.FC = () => {
  const [headline, setHeadline] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleClassify = async () => {
    if (!headline.trim() || !body.trim()) {
      setError("Please provide both a headline and article body.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await classifyArticle(headline, body);
      setResult(data);
    } catch (err) {
      setError("Failed to classify article. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const loadSample = () => {
    setHeadline("Central Bank Raises Interest Rates to Combat Persistent Inflation");
    setBody("The Central Bank announced on Thursday a 0.5% increase in the benchmark interest rate, marking the fourth consecutive hike this year. Policymakers cited persistent inflationary pressures driven by energy costs and supply chain disruptions as the primary drivers. Markets reacted swiftly, with major indices sliding by 1.2% in early trading. Analysts predict this move will cool the housing market but warn of potential risks to employment growth in the coming quarters.");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      {/* Input Section */}
      <div className="flex flex-col h-full space-y-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-slate-800">Input Article</h2>
            <button 
              onClick={loadSample}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium bg-indigo-50 px-3 py-1 rounded-full transition-colors"
            >
              Load Sample
            </button>
          </div>
          
          <div className="space-y-4 flex-1">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Headline</label>
              <input
                type="text"
                className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="Enter article headline..."
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
              />
            </div>
            
            <div className="flex-1 h-full">
              <label className="block text-sm font-medium text-slate-700 mb-1">Content</label>
              <textarea
                className="w-full h-64 lg:h-80 p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
                placeholder="Paste full article text here..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleClassify}
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center transition-all ${
                loading 
                ? 'bg-indigo-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing with Gemini...
                </>
              ) : (
                'Classify Article'
              )}
            </button>
            {error && (
              <div className="mt-3 text-red-600 text-sm flex items-center bg-red-50 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4 mr-2" />
                {error}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Output Section */}
      <div className="flex flex-col h-full">
        {result ? (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex-1 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{result.primaryCategory}</h2>
                <p className="text-slate-500 text-sm mt-1">Primary Classification</p>
              </div>
              <div className={`px-4 py-2 rounded-full text-sm font-bold ${
                result.sentiment === 'Positive' ? 'bg-green-100 text-green-700' :
                result.sentiment === 'Negative' ? 'bg-red-100 text-red-700' :
                'bg-slate-100 text-slate-700'
              }`}>
                {result.sentiment} Sentiment
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Confidence Breakdown</h3>
              <div className="space-y-4">
                {result.allCategories.map((cat, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-slate-800">{cat.category}</span>
                      <span className="text-slate-600">{cat.confidence}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-indigo-600 h-full rounded-full transition-all duration-1000 ease-out" 
                        style={{ width: `${cat.confidence}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Smart Tags</h3>
              <div className="flex flex-wrap gap-2">
                {result.tags.map((tag, idx) => (
                  <span key={idx} className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm border border-slate-200">
                    <Tag className="w-3 h-3 mr-2 text-indigo-500" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6 bg-slate-50 p-4 rounded-lg border border-slate-200">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">AI Summary</h3>
              <p className="text-slate-700 italic leading-relaxed">
                "{result.summary}"
              </p>
            </div>
            
            <div className="pt-4 border-t border-slate-100 flex justify-end">
                 <button 
                  onClick={() => {navigator.clipboard.writeText(JSON.stringify(result, null, 2))}}
                  className="text-xs flex items-center text-slate-400 hover:text-indigo-600 transition-colors"
                 >
                    <Copy className="w-3 h-3 mr-1" />
                    Copy JSON Response
                 </button>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex-1 flex flex-col items-center justify-center text-slate-400 p-8 text-center h-full">
            <div className="bg-white p-4 rounded-full mb-4 shadow-sm">
              <CheckCircle2 className="w-8 h-8 text-indigo-300" />
            </div>
            <h3 className="text-lg font-medium text-slate-600 mb-2">Ready to Classify</h3>
            <p className="max-w-xs text-sm">Enter article details on the left and hit classify to see the DRM categorization engine in action.</p>
          </div>
        )}
      </div>
    </div>
  );
};