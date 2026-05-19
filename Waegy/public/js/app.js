const socket = io();

// --- STATE MANAGEMENT ---
const state = {
    currentStep: 1,
    uploadedFile: null,
    contactsCount: 0,
    isConnected: false,
    contacts: [] // Store fetched contacts
};

// --- DOM ELEMENTS ---
const elements = {
    // Navigation
    navLinks: document.querySelectorAll('.nav-link'),
    sections: document.querySelectorAll('.view-section'),
    pageTitle: document.getElementById('page-title'),

    // Connection
    statusWidget: document.getElementById('connection-status'),
    statusText: document.getElementById('status-text'),
    qrContainer: document.getElementById('qr-container'),
    navBadge: document.getElementById('nav-connected-badge'),

    // Stats
    statSent: document.getElementById('stat-sent'),
    statContacts: document.getElementById('stat-contacts'),

    // Wizard
    dropZone: document.getElementById('drop-zone'),
    fileInput: document.getElementById('file-upload'),
    filePreview: document.getElementById('file-preview-card'),
    fileName: document.getElementById('file-name-display'),
    removeFileBtn: document.getElementById('remove-file'),

    steps: document.querySelectorAll('.step'),
    panes: {
        1: document.getElementById('step-1'),
        2: document.getElementById('step-2'),
        3: document.getElementById('step-3')
    },

    btns: {
        next1: document.getElementById('btn-next-1'),
        next2: document.getElementById('btn-next-2'),
        back1: document.getElementById('btn-back-1'),
        back2: document.getElementById('btn-back-2'),
        start: document.getElementById('btn-start-campaign')
    },

    // Composer
    messageInput: document.getElementById('campaign-message'),
    previewText: document.getElementById('preview-text'),
    charCount: document.querySelector('.char-count'),
    toolBtns: document.querySelectorAll('.tool-btn'),

    // Progress
    progressContainer: document.getElementById('campaign-progress-container'),
    progressBar: document.getElementById('progress-bar'),
    progressPercent: document.getElementById('progress-percent'),
    statusDetail: document.getElementById('campaign-status-detail'),
    summaryCount: document.getElementById('summary-count'),
    summaryTime: document.getElementById('summary-time'),

    // Logs
    activityLog: document.getElementById('activity-log'),

    // Contacts
    contactsTableBody: document.getElementById('contacts-table-body'),
    contactsSearch: document.getElementById('contact-search'),
    btnAddContact: document.getElementById('btn-add-contact'),
    btnExportContacts: document.getElementById('btn-export-contacts'),
    contactsCountDisplay: document.getElementById('contacts-count')
};

// --- NAVIGATION ---
elements.navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.classList.contains('logout-link')) return;
        e.preventDefault();

        elements.navLinks.forEach(n => n.classList.remove('active'));
        link.classList.add('active');

        const target = link.dataset.target;
        elements.sections.forEach(s => s.classList.remove('active'));
        const targetSection = document.getElementById(`page-${target}`);
        if (targetSection) {
            targetSection.classList.add('active');
            targetSection.classList.remove('hidden');
        }

        elements.pageTitle.innerText = link.querySelector('span').innerText;

        if (target === 'connect' && !state.isConnected) {
            requestConnection();
        }
        if (target === 'contacts') {
            loadContacts();
        }
    });
});

// --- CONNECTION LOGIC ---
function requestConnection() {
    log('Initializing connection...');
    fetch('/api/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: 'default' })
    }).catch(err => log('Error: ' + err.message));
}

socket.on('connect', () => {
    log('Server connected');
});

socket.on('qr_code', (data) => {
    state.isConnected = false;
    updateConnectionUI('disconnected');
    elements.qrContainer.innerHTML = `<img src="${data.url}" alt="QR Code" style="width: 100%; height: 100%;">`;
    document.querySelector('.qr-status').innerText = 'Scan the code to link device';
});

socket.on('ready', () => {
    state.isConnected = true;
    updateConnectionUI('connected');
    elements.qrContainer.innerHTML = '<div style="text-align:center; color: var(--success);"><i class="fas fa-check-circle fa-4x"></i><h3 style="margin-top:20px">Device Linked</h3></div>';
    log('WhatsApp Client Ready');
    showToast('Device connected successfully!', 'success');
});

function updateConnectionUI(status) {
    if (status === 'connected') {
        elements.statusWidget.className = 'status-widget connected';
        elements.statusText.innerText = 'Online';
        elements.navBadge.classList.remove('hidden');
    } else {
        elements.statusWidget.className = 'status-widget disconnected';
        elements.statusText.innerText = 'Disconnected';
        elements.navBadge.classList.add('hidden');
    }
}

// --- WIZARD LOGIC ---
function setStep(step) {
    state.currentStep = step;
    elements.steps.forEach(s => {
        const sNum = parseInt(s.dataset.step);
        if (sNum <= step) s.classList.add('active');
        else s.classList.remove('active');
    });
    Object.values(elements.panes).forEach(p => p.classList.add('hidden'));
    elements.panes[step].classList.remove('hidden');
}

elements.btns.next1.addEventListener('click', () => setStep(2));
elements.btns.next2.addEventListener('click', () => {
    // If mocking file upload stats
    if (state.uploadedFile && state.contactsCount <= 1) {
        state.contactsCount = 150; // Mock count if file uploaded but not parsed
    }

    elements.summaryCount.innerText = `${state.contactsCount} Contacts`;
    const mins = Math.ceil((state.contactsCount * 6) / 60);
    elements.summaryTime.innerText = `~ ${mins} mins`;
    setStep(3);
});
elements.btns.back1.addEventListener('click', () => setStep(1));
elements.btns.back2.addEventListener('click', () => setStep(2));

// --- FILE UPLOAD ---
elements.dropZone.addEventListener('click', () => elements.fileInput.click());
elements.fileInput.addEventListener('change', handleFile);
elements.removeFileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    resetFile();
});

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    elements.dropZone.addEventListener(eventName, preventDefaults, false);
});
function preventDefaults(e) { e.preventDefault(); e.stopPropagation(); }
elements.dropZone.addEventListener('dragover', () => elements.dropZone.style.borderColor = 'var(--primary)');
elements.dropZone.addEventListener('dragleave', () => elements.dropZone.style.borderColor = '');
elements.dropZone.addEventListener('drop', (e) => {
    elements.dropZone.style.borderColor = '';
    const dt = e.dataTransfer;
    elements.fileInput.files = dt.files;
    handleFile();
});

function handleFile() {
    const file = elements.fileInput.files[0];
    if (file) {
        state.uploadedFile = file;
        elements.fileName.innerText = file.name;
        elements.dropZone.classList.add('hidden');
        elements.filePreview.classList.remove('hidden');
        elements.btns.next1.disabled = false;

        elements.statContacts.innerText = '?';
    }
}

function resetFile() {
    state.uploadedFile = null;
    elements.fileInput.value = '';
    elements.dropZone.classList.remove('hidden');
    elements.filePreview.classList.add('hidden');
    elements.btns.next1.disabled = true;
}

// --- COMPOSER ---
elements.messageInput.addEventListener('input', (e) => {
    const text = e.target.value;
    let preview = text
        .replace(/\*(.*?)\*/g, '<b>$1</b>')
        .replace(/_(.*?)_/g, '<i>$1</i>')
        .replace(/~(.*?)~/g, '<strike>$1</strike>')
        .replace(/\n/g, '<br>');

    preview = preview.replace(/{name}/g, '<span style="background:#dcf8c6">John</span>')
        .replace(/{phone}/g, '<span style="background:#dcf8c6">+123456</span>');

    elements.previewText.innerHTML = preview || 'Type a message to preview...';
    elements.charCount.innerText = `${text.length} chars`;
});

elements.toolBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const val = btn.dataset.insert;
        const input = elements.messageInput;
        const start = input.selectionStart;
        input.value = input.value.substring(0, start) + val + input.value.substring(input.selectionEnd);
        input.focus();
        input.dispatchEvent(new Event('input'));
    });
});

// --- CAMPAIGN EXECUTION ---
elements.btns.start.addEventListener('click', async () => {
    if (!state.uploadedFile || !elements.messageInput.value) return;

    elements.btns.start.disabled = true;
    elements.progressContainer.classList.remove('hidden');
    updateProgress(0, 'Uploading & Parsing file...');

    const formData = new FormData();
    formData.append('file', state.uploadedFile);
    formData.append('message', elements.messageInput.value);
    formData.append('sessionId', 'default');

    try {
        const res = await fetch('/api/send-bulk', { method: 'POST', body: formData });
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || 'Failed to start');

        updateProgress(0, 'Queued for sending...');
        log(`Campaign Started: ${data.message || 'Processing...'}`);
        showToast('Campaign Launched Successfully', 'success');

        // Note: Progress is now handled via socket events below

    } catch (err) {
        log('Error: ' + err.message);
        showToast('Failed to start campaign', 'error');
        elements.btns.start.disabled = false;
    }
});

// Socket Events for Campaign
socket.on('campaign_start', (data) => {
    updateProgress(0, `Starting campaign for ${data.total} contacts...`);
});

socket.on('campaign_progress', (data) => {
    updateProgress(data.percent, `Sending to ${data.current} (${data.sent}/${data.total})`);

    // Update dashboard stats if visible
    if (elements.statSent) {
        const current = parseInt(elements.statSent.innerText) || 0;
        elements.statSent.innerText = current + 1;
    }
});

socket.on('campaign_complete', (data) => {
    updateProgress(100, `Completed! Sent: ${data.sent}, Failed: ${data.failed}`);
    showToast(`Campaign Complete. Sent: ${data.sent}`, 'success');

    setTimeout(() => {
        alert('Campaign Completed!');
        location.reload();
    }, 2000);
});

socket.on('log', (data) => {
    if (data.message) log(data.message);
});

function updateProgress(percent, text) {
    elements.progressBar.style.width = `${percent}%`;
    elements.progressPercent.innerText = `${Math.floor(percent)}%`;
    elements.statusDetail.innerText = text;
}

// --- CONTACTS MANAGEMENT ---
async function loadContacts() {
    try {
        const res = await fetch('/api/contacts');
        const json = await res.json();
        if (json.data) {
            state.contacts = json.data;
            renderContacts(state.contacts);
            elements.contactsCountDisplay.innerText = `Showing ${state.contacts.length} contacts`;
            elements.statContacts.innerText = state.contacts.length;
        }
    } catch (err) {
        console.error(err);
        showToast('Failed to load contacts', 'error');
    }
}

function renderContacts(list) {
    if (!elements.contactsTableBody) return;

    elements.contactsTableBody.innerHTML = list.map(contact => `
        <tr>
            <td>
                <div class="user-cell">
                    <div class="avatar-sm">${contact.name.substring(0, 2).toUpperCase()}</div>
                    ${contact.name}
                </div>
            </td>
            <td>${contact.phone}</td>
            <td><span class="badge badge-success">${contact.tags || 'General'}</span></td>
            <td>
                <button class="icon-btn-sm text-danger" onclick="deleteContact(${contact.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Search Filter
if (elements.contactsSearch) {
    elements.contactsSearch.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = state.contacts.filter(c =>
            c.name.toLowerCase().includes(term) ||
            c.phone.includes(term)
        );
        renderContacts(filtered);
    });
}

// Add Contact
if (elements.btnAddContact) {
    elements.btnAddContact.addEventListener('click', async () => {
        const name = prompt("Enter Name:");
        if (!name) return;
        const phone = prompt("Enter Phone (start with country code, e.g. 201xxxx):");
        if (!phone) return;

        try {
            const res = await fetch('/api/contacts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, phone, tags: 'Manual' })
            });
            const json = await res.json();
            if (res.ok) {
                showToast('Contact added', 'success');
                loadContacts();
            } else {
                showToast(json.error, 'error');
            }
        } catch (err) {
            showToast(err.message, 'error');
        }
    });
}

// Delete Contact (Global function for onclick)
window.deleteContact = async (id) => {
    if (!confirm('Are you sure you want to delete this contact?')) return;
    try {
        await fetch(`/api/contacts/${id}`, { method: 'DELETE' });
        showToast('Contact deleted', 'success');
        loadContacts();
    } catch (err) {
        showToast('Failed to delete', 'error');
    }
};

// Import Contacts
const btnImport = document.getElementById('btn-import-contacts');
const fileInputImport = document.getElementById('contact-import-file');
if (btnImport && fileInputImport) {
    btnImport.addEventListener('click', () => fileInputImport.click());
    fileInputImport.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            showToast('Importing contacts...', 'info');
            const res = await fetch('/api/contacts/import', { method: 'POST', body: formData });
            const json = await res.json();

            if (res.ok) {
                showToast(json.message, 'success');
                loadContacts();
            } else {
                showToast(json.error || 'Import failed', 'error');
            }
        } catch (err) {
            showToast('Import error: ' + err.message, 'error');
        }
        fileInputImport.value = ''; // Reset
    });
}

// Export Contacts
const btnExport = document.getElementById('btn-export-contacts');
if (btnExport) {
    btnExport.addEventListener('click', () => {
        if (!state.contacts || state.contacts.length === 0) {
            showToast('No contacts to export', 'info');
            return;
        }

        // Convert to CSV
        const headers = ['Name', 'Phone', 'Tags', 'Created At'];
        const rows = state.contacts.map(c => [c.name, c.phone, c.tags, c.created_at]);
        const csvContent = [headers, ...rows].map(e => e.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'contacts_export.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast('Contacts exported', 'success');
    });
}

// --- TEMPLATES MANAGEMENT ---
const templatesTableBody = document.getElementById('templates-table-body');
const btnAddTemplate = document.getElementById('btn-add-template');

if (templatesTableBody) {
    // Load Templates
    async function loadTemplates() {
        try {
            const res = await fetch('/api/features/templates');
            const json = await res.json();
            renderTemplates(json.data || []);
        } catch (err) { console.error(err); }
    }

    function renderTemplates(list) {
        templatesTableBody.innerHTML = list.map(t => `
            <tr>
                <td><strong>${t.title}</strong></td>
                <td><div class="text-truncate" style="max-width:300px">${t.content}</div></td>
                <td>
                    <button class="icon-btn-sm text-danger" onclick="deleteTemplate(${t.id})"><i class="fas fa-trash"></i></button>
                    <button class="icon-btn-sm" onclick="useTemplate('${t.content.replace(/'/g, "\\'")}')" title="Use in Campaign"><i class="fas fa-paper-plane"></i></button>
                </td>
            </tr>
        `).join('');
    }

    // Add Template
    btnAddTemplate.addEventListener('click', async () => {
        const title = prompt("Template Title:");
        if (!title) return;
        const content = prompt("Template Content:");
        if (!content) return;

        try {
            const res = await fetch('/api/features/templates', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, content })
            });
            if (res.ok) {
                showToast('Template saved', 'success');
                loadTemplates();
            }
        } catch (e) { showToast(e.message, 'error'); }
    });

    // Delete Template
    window.deleteTemplate = async (id) => {
        if (!confirm('Delete this template?')) return;
        try {
            await fetch(`/api/features/templates/${id}`, { method: 'DELETE' });
            loadTemplates();
            showToast('Template deleted', 'success');
        } catch (e) { showToast(e.message, 'error'); }
    };

    // Use Template (Navigate to campaign and fill)
    window.useTemplate = (content) => {
        // Switch to campaign view
        document.querySelector('[data-target="campaigns"]').click();
        // Go to compose step (if file uploaded or override)
        // For now just fill input
        if (elements.messageInput) {
            elements.messageInput.value = content;
            elements.messageInput.dispatchEvent(new Event('input'));
            showToast('Template applied to composer', 'success');
        }
    };

    // Initial Load
    loadTemplates();
}

// --- AUTO-REPLY MANAGEMENT ---
const autoreplyTableBody = document.getElementById('autoreply-table-body');
const btnAddRule = document.getElementById('btn-add-rule');
const settingsTabs = document.querySelectorAll('.settings-nav a');

if (autoreplyTableBody) {
    // Tab Switching
    settingsTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            settingsTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            document.querySelectorAll('.settings-content').forEach(c => c.classList.add('hidden'));
            document.getElementById(`settings-${tab.dataset.tab}`).classList.remove('hidden');
        });
    });

    async function loadAutoReplies() {
        try {
            const res = await fetch('/api/features/autoreplies');
            const json = await res.json();
            renderAutoReplies(json.data || []);
        } catch (e) { console.error(e); }
    }

    function renderAutoReplies(list) {
        autoreplyTableBody.innerHTML = list.map(r => `
            <tr>
                <td><code>${r.keyword}</code></td>
                <td><div class="text-truncate" style="max-width:200px">${r.response}</div></td>
                <td><span class="badge ${r.match_type === 'exact' ? 'badge-blue' : 'badge-success'}">${r.match_type}</span></td>
                <td>
                    <button class="icon-btn-sm text-danger" onclick="deleteAutoReply(${r.id})"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `).join('');
    }

    btnAddRule.addEventListener('click', async () => {
        const keyword = prompt("Trigger Keyword:");
        if (!keyword) return;
        const response = prompt("Response Message:");
        if (!response) return;
        const type = confirm("Exact match? (OK for Exact, Cancel for Contains)") ? 'exact' : 'contains';

        try {
            const res = await fetch('/api/features/autoreplies', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ keyword, response, match_type: type })
            });
            if (res.ok) {
                showToast('Rule added', 'success');
                loadAutoReplies();
            } else {
                showToast('Failed to add rule', 'error');
            }
        } catch (e) { showToast(e.message, 'error'); }
    });

    window.deleteAutoReply = async (id) => {
        if (!confirm('Delete rule?')) return;
        try {
            await fetch(`/api/features/autoreplies/${id}`, { method: 'DELETE' });
            loadAutoReplies();
        } catch (e) { console.error(e); }
    };

    loadAutoReplies();
}

// --- UTILS ---
function log(msg) {
    const time = new Date().toLocaleTimeString();
    const div = document.createElement('div');
    div.className = 'log-item';
    div.innerHTML = `<span class="log-time">[${time}]</span> ${msg}`;
    if (elements.activityLog) {
        elements.activityLog.appendChild(div);
        elements.activityLog.scrollTop = elements.activityLog.scrollHeight;
    }
}

function showToast(msg, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.style.cssText = `
        background: white; color: ${type === 'success' ? '#2F855A' : '#C53030'}; padding: 12px 24px; 
        border-left: 4px solid ${type === 'success' ? '#38A169' : '#E53E3E'};
        box-shadow: 0 4px 12px rgba(0,0,0,0.15); border-radius: 4px;
        margin-bottom: 10px; animation: slideIn 0.3s ease; font-size: 14px; font-weight: 600;
        display: flex; align-items: center; gap: 8px;
    `;
    toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${msg}`;
    container.appendChild(toast);
    container.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 9999;';
    setTimeout(() => toast.remove(), 4000);
}

// --- CHARTS INITIALIZATION ---
if (document.getElementById('messagesChart')) {
    const ctx = document.getElementById('messagesChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Messages Sent',
                data: [12, 19, 3, 5, 2, 3, 15],
                borderColor: '#5956E9',
                backgroundColor: 'rgba(89, 86, 233, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true, grid: { borderDash: [2, 4] } },
                x: { grid: { display: false } }
            }
        }
    });
}

// Auto-check connection on load
requestConnection();
