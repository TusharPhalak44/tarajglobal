import React, { useState, useEffect } from 'react';
import { adminAPI } from '@api';
import { Plus, Trash2, Link as LinkIcon, RefreshCw, Settings, AlertTriangle, FileCode2 } from 'lucide-react';

const GlobalSEOTools = () => {
  const [activeTab, setActiveTab] = useState('redirects');

  // States
  const [redirects, setRedirects] = useState([]);
  const [logs, setLogs] = useState([]);
  const [globalSettings, setGlobalSettings] = useState({});
  const [loading, setLoading] = useState(false);

  // Forms
  const [redirectForm, setRedirectForm] = useState({ old_url: '', new_url: '', redirect_type: 301 });
  const [robotsText, setRobotsText] = useState('User-agent: *\nAllow: /');
  const [globalMetaTitle, setGlobalMetaTitle] = useState('');
  const [globalMetaDesc, setGlobalMetaDesc] = useState('');

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);
      if (activeTab === 'redirects') {
        const res = await adminAPI.getRedirects();
        setRedirects(res.data?.data || []);
      } else if (activeTab === '404') {
        const res = await adminAPI.get404Logs();
        setLogs(res.data?.data || []);
      } else if (activeTab === 'settings') {
        const res = await adminAPI.getGlobalSEOSettings();
        const settings = res.data?.data || [];
        const map = {};
        settings.forEach(s => map[s.setting_key] = s.setting_value);
        setGlobalSettings(map);
        if (map['robots_txt']) setRobotsText(map['robots_txt']);
        if (map['global_meta_title']) setGlobalMetaTitle(map['global_meta_title']);
        if (map['global_meta_description']) setGlobalMetaDesc(map['global_meta_description']);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRedirect = async (e) => {
    e.preventDefault();
    try {
      await adminAPI.saveRedirect(redirectForm);
      setRedirectForm({ old_url: '', new_url: '', redirect_type: 301 });
      fetchData();
    } catch (e) {
      console.error(e);
      alert(e.response?.data?.message || 'Failed to save redirect. Is this URL already redirected?');
    }
  };

  const handleDeleteRedirect = async (id) => {
    try {
      await adminAPI.deleteRedirect(id);
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveSettings = async () => {
    try {
      await adminAPI.saveGlobalSEOSettings({ setting_key: 'robots_txt', setting_value: robotsText });
      await adminAPI.saveGlobalSEOSettings({ setting_key: 'global_meta_title', setting_value: globalMetaTitle });
      await adminAPI.saveGlobalSEOSettings({ setting_key: 'global_meta_description', setting_value: globalMetaDesc });
      alert('Settings saved!');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 border-b border-[var(--admin-border-subtle)] pb-2">
        <button onClick={() => setActiveTab('redirects')} className={`px-4 py-2 font-bold text-sm ${activeTab === 'redirects' ? 'text-[var(--admin-primary)] border-b-2 border-[var(--admin-primary)]' : 'text-[var(--admin-text-secondary)]'}`}>URL Redirects</button>
        <button onClick={() => setActiveTab('404')} className={`px-4 py-2 font-bold text-sm ${activeTab === '404' ? 'text-[var(--admin-primary)] border-b-2 border-[var(--admin-primary)]' : 'text-[var(--admin-text-secondary)]'}`}>404 Error Logs</button>
        <button onClick={() => setActiveTab('settings')} className={`px-4 py-2 font-bold text-sm ${activeTab === 'settings' ? 'text-[var(--admin-primary)] border-b-2 border-[var(--admin-primary)]' : 'text-[var(--admin-text-secondary)]'}`}>Global Settings</button>
      </div>

      {activeTab === 'redirects' && (
        <div className="space-y-6 animate-fade-in">
          <div className="admin-card p-5">
            <h4 className="font-bold text-[var(--admin-text-accent)] mb-4 flex items-center gap-2"><LinkIcon className="w-4 h-4" /> Add New Redirect</h4>
            <form onSubmit={handleSaveRedirect} className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1">
                <label className="block text-xs font-bold mb-1">Old URL Path</label>
                <input required type="text" placeholder="/old-services-page" value={redirectForm.old_url} onChange={e => setRedirectForm({ ...redirectForm, old_url: e.target.value })} className="admin-input w-full" />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-bold mb-1">New URL Target</label>
                <input required type="text" placeholder="/services" value={redirectForm.new_url} onChange={e => setRedirectForm({ ...redirectForm, new_url: e.target.value })} className="admin-input w-full" />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Type</label>
                <select value={redirectForm.redirect_type} onChange={e => setRedirectForm({ ...redirectForm, redirect_type: parseInt(e.target.value) })} className="admin-select w-full max-w-[100px]">
                  <option value={301}>301</option>
                  <option value={302}>302</option>
                </select>
              </div>
              <button type="submit" className="admin-btn admin-btn-primary"><Plus className="w-4 h-4" /> Add</button>
            </form>
          </div>

          <div className="admin-card overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-[var(--admin-bg-elevated)] border-b border-[var(--admin-border-subtle)]">
                <tr>
                  <th className="p-4">Old URL</th>
                  <th className="p-4">Target</th>
                  <th className="p-4">Hits</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--admin-border-subtle)]">
                {redirects.map(r => (
                  <tr key={r.id}>
                    <td className="p-4 font-mono text-xs">{r.old_url}</td>
                    <td className="p-4 font-mono text-xs text-green-500">{r.new_url}</td>
                    <td className="p-4">{r.hits}</td>
                    <td className="p-4 text-right">
                      <button onClick={() => handleDeleteRedirect(r.id)} className="text-red-500 hover:bg-red-500/10 p-2 rounded"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
                {redirects.length === 0 && (
                  <tr><td colSpan={4} className="p-8 text-center text-gray-500">No redirects configured.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === '404' && (
        <div className="admin-card overflow-hidden animate-fade-in">
          <table className="w-full text-left text-sm">
            <thead className="bg-[var(--admin-bg-elevated)] border-b border-[var(--admin-border-subtle)]">
              <tr>
                <th className="p-4">URL Requested</th>
                <th className="p-4">Hits</th>
                <th className="p-4">Last Detected</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--admin-border-subtle)]">
              {logs.map(l => (
                <tr key={l.id}>
                  <td className="p-4 font-mono text-xs text-red-400">{l.url}</td>
                  <td className="p-4">{l.hits}</td>
                  <td className="p-4">{new Date(l.last_detected).toLocaleString()}</td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr><td colSpan={3} className="p-8 text-center text-gray-500">No 404 errors detected.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-6 animate-fade-in">
          <div className="admin-card p-5 space-y-4">
            <h4 className="font-bold text-[var(--admin-text-accent)] flex items-center gap-2">Global Default SEO Fallbacks</h4>
            <p className="text-sm text-[var(--admin-text-secondary)]">Set the default meta title and description for pages that don't have custom SEO tags configured.</p>
            
            <div>
              <label className="block text-xs font-bold mb-1">Global Default Meta Title</label>
              <input type="text" value={globalMetaTitle} onChange={e => setGlobalMetaTitle(e.target.value)} placeholder="Default Site Title" className="admin-input w-full" />
            </div>
            
            <div>
              <label className="block text-xs font-bold mb-1">Global Default Meta Description</label>
              <textarea value={globalMetaDesc} onChange={e => setGlobalMetaDesc(e.target.value)} placeholder="Default Site Description" className="admin-textarea w-full resize-none" rows={3} />
            </div>
          </div>

          <div className="admin-card p-5 space-y-4">
            <h4 className="font-bold text-[var(--admin-text-accent)] flex items-center gap-2"><FileCode2 className="w-4 h-4" /> Robots.txt Editor</h4>
            <p className="text-sm text-[var(--admin-text-secondary)]">Customize your robots.txt. The sitemap will automatically be appended to the output.</p>
            <textarea
              value={robotsText}
              onChange={e => setRobotsText(e.target.value)}
              className="admin-textarea w-full font-mono text-sm h-48"
            />
            <button onClick={handleSaveSettings} className="admin-btn admin-btn-primary">Save Settings</button>
          </div>

          <div className="admin-card p-5 space-y-4">
            <h4 className="font-bold text-[var(--admin-text-accent)] flex items-center gap-2"><RefreshCw className="w-4 h-4" /> Dynamic XML Sitemap</h4>
            <p className="text-sm text-[var(--admin-text-secondary)]">The XML sitemap is generated dynamically in real-time when search engines request it.</p>
            <a href="/api/seo/sitemap.xml" target="_blank" rel="noreferrer" className="admin-btn bg-[var(--admin-bg-elevated)] inline-flex">View Live Sitemap.xml</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalSEOTools;
