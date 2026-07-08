document.addEventListener('DOMContentLoaded', async () => {
  const user = checkAuth();
  if (!user || user.role !== 'admin') { window.location.href = '/pages/login.html'; return; }
  document.getElementById('userName').textContent = user.name;
  loadUsers(); loadLeaveTypes(); loadReport();
});

const loadUsers = async () => {
  try {
    const users = await api.get('/admin/users');
    document.getElementById('usersTable').innerHTML = users.map(u => `
      <tr>
        <td>${u.name}</td><td>${u.email}</td>
        <td><span class="badge badge-${u.role === 'admin' ? 'rejected' : u.role === 'manager' ? 'pending' : 'approved'}">${u.role}</span></td>
        <td>${u.department || '-'}</td>
        <td><button class="btn btn-danger" onclick="deleteUser(${u.id})">Delete</button></td>
      </tr>`).join('');
  } catch (err) { showAlert(err.message, 'error'); }
};

const loadLeaveTypes = async () => {
  try {
    const types = await api.get('/admin/leave-types');
    document.getElementById('leaveTypesTable').innerHTML = types.map(t => `
      <tr>
        <td>${t.name}</td><td>${t.max_days} days</td><td>${t.description || '-'}</td>
        <td><button class="btn btn-danger" onclick="deleteLeaveType(${t.id})">Delete</button></td>
      </tr>`).join('');
  } catch (err) { showAlert(err.message, 'error'); }
};

const loadReport = async () => {
  try {
    const leaves = await api.get('/admin/report');
    document.getElementById('reportTable').innerHTML = leaves.map(l => `
      <tr>
        <td>${l.employee_name}</td><td>${l.department}</td>
        <td>${l.leave_type_name}</td>
        <td>${formatDate(l.start_date)} – ${formatDate(l.end_date)}</td>
        <td>${l.days}</td><td>${statusBadge(l.status)}</td>
      </tr>`).join('');
  } catch (err) { showAlert(err.message, 'error'); }
};

const deleteUser = async (id) => {
  if (!confirm('Delete this user?')) return;
  try { await api.delete(`/admin/users/${id}`); loadUsers(); showAlert('User deleted'); }
  catch (err) { showAlert(err.message, 'error'); }
};

const deleteLeaveType = async (id) => {
  if (!confirm('Delete this leave type?')) return;
  try { await api.delete(`/admin/leave-types/${id}`); loadLeaveTypes(); showAlert('Leave type deleted'); }
  catch (err) { showAlert(err.message, 'error'); }
};

document.addEventListener('submit', async (e) => {
  if (e.target.id === 'addUserForm') {
    e.preventDefault();
    const body = {
      name: document.getElementById('newName').value,
      email: document.getElementById('newEmail').value,
      password: document.getElementById('newPassword').value,
      role: document.getElementById('newRole').value,
      department: document.getElementById('newDept').value
    };
    try { await api.post('/admin/users', body); showAlert('User added'); loadUsers(); e.target.reset(); }
    catch (err) { showAlert(err.message, 'error'); }
  }
  if (e.target.id === 'addLeaveTypeForm') {
    e.preventDefault();
    const body = {
      name: document.getElementById('ltName').value,
      maxDays: document.getElementById('ltDays').value,
      description: document.getElementById('ltDesc').value
    };
    try { await api.post('/admin/leave-types', body); showAlert('Leave type added'); loadLeaveTypes(); e.target.reset(); }
    catch (err) { showAlert(err.message, 'error'); }
  }
});
