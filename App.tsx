import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ScanText, 
  CreditCard, 
  Code2, 
  Menu, 
  X, 
  Newspaper
} from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { Classifier } from './components/Classifier';
import { Pricing } from './components/Pricing';
import { ApiDocs } from './components/ApiDocs';
import { AppView } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD: return <Dashboard />;
      case AppView.CLASSIFIER: return <Classifier />;
      case AppView.PRICING: return <Pricing />;
      case AppView.API_DOCS: return <ApiDocs />;
      default: return <Dashboard />;
    }
  };

  const NavItem = ({ view, icon: Icon, label }: { view: AppView; icon: any; label: string }) => (
    <button
      onClick={() => {
        setCurrentView(view);
        setIsSidebarOpen(false);
      }}
      className={`w-full flex items-center px-4 py-3 mb-1 rounded-lg transition-colors ${
        currentView === view 
          ? 'bg-indigo-50 text-indigo-700 font-medium' 
          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      <Icon className={`w-5 h-5 mr-3 ${currentView === view ? 'text-indigo-600' : 'text-slate-400'}`} />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0
      `}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Newspaper className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-slate-900">DRM Categorizer</span>
            </div>
            <button 
              className="lg:hidden text-slate-500 hover:text-slate-700"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 p-4">
            <div className="mb-6">
              <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Platform</p>
              <NavItem view={AppView.DASHBOARD} icon={LayoutDashboard} label="Overview" />
              <NavItem view={AppView.CLASSIFIER} icon={ScanText} label="Classifier Tool" />
            </div>

            <div className="mb-6">
              <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Business</p>
              <NavItem view={AppView.PRICING} icon={CreditCard} label="Pricing & Plans" />
            </div>

            <div>
              <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Developers</p>
              <NavItem view={AppView.API_DOCS} icon={Code2} label="API Docs" />
            </div>
          </nav>

          <div className="p-4 border-t border-slate-100">
            <div className="bg-indigo-50 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-indigo-900 mb-1">Enterprise Support</h4>
              <p className="text-xs text-indigo-700 mb-3">Need a custom model? Contact our sales team.</p>
              <button className="text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 py-2 px-3 rounded-md w-full transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
             <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Newspaper className="w-5 h-5 text-white" />
             </div>
             <span className="font-bold text-slate-900">DRM Categorizer</span>
          </div>
          <button 
            className="text-slate-500 hover:text-slate-700"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto h-full">
            {renderView()}
          </div>
        </div>
      </main>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}