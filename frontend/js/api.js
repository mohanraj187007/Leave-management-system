const API_BASE = '/api';
const getToken = () => localStorage.getItem('token');

const apiRequest = async (method, endpoint, body=null) => {
  const options = { method, headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` } };
  if(body) options.body = JSON.stringify(body);
  const res = await fetch(`${API_BASE}${endpoint}`, options);
  const data = await res.json();
  if(!res.ok) throw new Error(data.message || 'Request failed');
  return data;
};

const api = {
  get: (ep) => apiRequest('GET', ep),
  post: (ep, b) => apiRequest('POST', ep, b),
  put: (ep, b) => apiRequest('PUT', ep, b),
  delete: (ep) => apiRequest('DELETE', ep)
};

const showAlert = (msg, type='success', id='alert') => {
  const el = document.getElementById(id);
  if(!el) return;
  el.className = `alert alert-${type} show`;
  el.style.display = 'flex';
  el.innerHTML = (type==='success'?'✅':'⚠️') + ' ' + msg;
  setTimeout(() => { el.style.display = 'none'; }, 4000);
};

const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}) : '–';

const statusBadge = (s) => `<span class="badge badge-${s}">${s.charAt(0).toUpperCase()+s.slice(1)}</span>`;
