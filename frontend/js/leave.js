document.addEventListener('DOMContentLoaded', async () => {
  const user = checkAuth();
  if (!user) return;

  try {
    const types = await api.get('/leave/types');
    const select = document.getElementById('leaveType');
    if (select) {
      select.innerHTML = types.map(t => `<option value="${t.id}">${t.name} (max ${t.max_days} days)</option>`).join('');
    }
  } catch (err) { showAlert(err.message, 'error'); }

  const applyForm = document.getElementById('applyLeaveForm');
  if (applyForm) {
    applyForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const leaveTypeId = document.getElementById('leaveType').value;
      const startDate = document.getElementById('startDate').value;
      const endDate = document.getElementById('endDate').value;
      const reason = document.getElementById('reason').value;
      try {
        await api.post('/leave/apply', { leaveTypeId, startDate, endDate, reason });
        showAlert('Leave applied successfully!');
        applyForm.reset();
      } catch (err) {
        showAlert(err.message, 'error');
      }
    });
  }

  const historyTable = document.getElementById('historyTable');
  if (historyTable) {
    try {
      const leaves = await api.get('/leave/my-leaves');
      historyTable.innerHTML = leaves.map(l => `
        <tr>
          <td>${l.leave_type_name}</td>
          <td>${formatDate(l.start_date)} – ${formatDate(l.end_date)}</td>
          <td>${l.days} day(s)</td>
          <td>${l.reason || '-'}</td>
          <td>${statusBadge(l.status)}</td>
          <td>${l.manager_comment || '-'}</td>
          <td>${l.status === 'pending' ? `<button class="btn btn-danger" onclick="cancelLeave(${l.id})">Cancel</button>` : '-'}</td>
        </tr>`).join('') || '<tr><td colspan="7" style="text-align:center;color:#94a3b8">No records found</td></tr>';
    } catch (err) { showAlert(err.message, 'error'); }
  }
});

const cancelLeave = async (id) => {
  if (!confirm('Cancel this leave request?')) return;
  try {
    await api.delete(`/leave/cancel/${id}`);
    showAlert('Leave cancelled');
    setTimeout(() => location.reload(), 1000);
  } catch (err) { showAlert(err.message, 'error'); }
};
