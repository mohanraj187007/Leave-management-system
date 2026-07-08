document.addEventListener('DOMContentLoaded', async () => {
  const user = checkAuth();
  if (!user || (user.role !== 'manager' && user.role !== 'admin')) {
    window.location.href = '/pages/login.html'; return;
  }
  document.getElementById('userName').textContent = user.name;
  loadPending();
});

const loadPending = async () => {
  try {
    const leaves = await api.get('/manager/pending');
    const tbody = document.getElementById('pendingTable');
    tbody.innerHTML = leaves.map(l => `
      <tr>
        <td>${l.employee_name}</td>
        <td>${l.department}</td>
        <td>${l.leave_type_name}</td>
        <td>${formatDate(l.start_date)} – ${formatDate(l.end_date)}</td>
        <td>${l.days}</td>
        <td>${l.reason || '-'}</td>
        <td>
          <button class="btn btn-success" style="margin-right:6px" onclick="decide(${l.id}, ${l.user_id}, 'approved')">Approve</button>
          <button class="btn btn-danger" onclick="decide(${l.id}, ${l.user_id}, 'rejected')">Reject</button>
        </td>
      </tr>`).join('') || '<tr><td colspan="7" style="text-align:center;color:#94a3b8">No pending requests</td></tr>';
  } catch (err) { showAlert(err.message, 'error'); }
};

const decide = async (leaveId, userId, status) => {
  const comment = prompt(`Add a comment (optional) for ${status}:`);
  try {
    await api.put(`/manager/status/${leaveId}`, { status, comment: comment || '' });
    showAlert(`Leave ${status} successfully`);
    setTimeout(() => loadPending(), 800);
  } catch (err) { showAlert(err.message, 'error'); }
};
