const fs = require('fs');

function restoreJobs() {
    let content = fs.readFileSync('client/src/pages/Admin/Jobs.jsx', 'utf8');
    
    // Remove import
    content = content.replace("import ActionDropdown from '../../components/admin/ActionDropdown';\n", "");

    const startRegex = /<ActionDropdown>/;
    
    const replacement = `<div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setActiveDropdown(activeDropdown === job.id ? null : job.id)
                    }}
                    className="p-2 rounded-lg text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] hover:bg-[var(--admin-bg-elevated)] transition-colors"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>

                  {activeDropdown === job.id && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setActiveDropdown(null)} />
                      <div className="absolute right-0 top-full mt-1.5 w-40 bg-[var(--admin-bg-card)] border border-[var(--admin-border-base)] rounded-xl shadow-xl p-2 z-50 text-sm admin-card-hover">`;
                      
    content = content.replace(startRegex, replacement);
    
    const endRegex = /<\/ActionDropdown>/;
    const endReplacement = `                      </div>
                    </>
                  )}
                </div>`;
                
    content = content.replace(endRegex, endReplacement);
    
    fs.writeFileSync('client/src/pages/Admin/Jobs.jsx', content);
}

function restoreUsers() {
    let content = fs.readFileSync('client/src/pages/Admin/Users.jsx', 'utf8');
    
    // Remove import
    content = content.replace("import ActionDropdown from '../../components/admin/ActionDropdown';\n", "");

    const startRegex = /<ActionDropdown>/;
    
    const replacement = `<div className="relative inline-block text-left">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              setActiveDropdown(activeDropdown === user.id ? null : user.id)
                            }}
                            className="shrink-0 p-2 rounded-lg text-[var(--admin-text-muted)] hover:text-[var(--admin-text-primary)] hover:bg-[var(--admin-bg-elevated)] transition-colors"
                          >
                            <MoreVertical className="w-5 h-5" />
                          </button>

                          {activeDropdown === user.id && (
                            <>
                              <div className="fixed inset-0 z-40" onClick={() => setActiveDropdown(null)} />
                              <div className={\`absolute right-0 \${
                                index >= Math.max(1, filteredUsers.length - 2) && filteredUsers.length > 2
                                  ? 'bottom-full mb-2' 
                                  : 'top-full mt-2'
                              } w-48 bg-[var(--admin-bg-surface)] border border-[var(--admin-border-base)] rounded-xl shadow-2xl z-50 p-1 divide-y divide-[var(--admin-border-subtle)] animate-slide-down flex flex-col\`}>`;
                              
    content = content.replace(startRegex, replacement);
    
    const endRegex = /<\/ActionDropdown>/;
    const endReplacement = `                              </div>
                            </>
                          )}
                        </div>`;
                        
    content = content.replace(endRegex, endReplacement);
    
    fs.writeFileSync('client/src/pages/Admin/Users.jsx', content);
}

restoreJobs();
restoreUsers();
