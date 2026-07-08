document.addEventListener('DOMContentLoaded', async () => {
  const user = checkAuth();
  if (!user) return;
  document.getElementById('userName').textContent = user.name;

  try {
    const [balances, leaves] = await Promise.all([
      api.get('/leave/balance'),
      api.get('/leave/my-leaves')
    ]);

    const balanceGrid = document.getElementById('balanceGrid');
    balanceGrid.innerHTML = balances.map(b => `
      <div class="balance-card">
        <div class="days">${b.remaining_days}</div>
        <div class="type">${b.leave_type_name}</div>
        <div class="used">Used: ${b.used_days} / ${b.total_days}</div>
      </div>`).join('');

    const tbody = document.getElementById('leaveTable');
    tbody.innerHTML = leaves.slice(0, 10).map(l => `
      <tr>
        <td>${l.leave_type_name}</td>
        <td>${formatDate(l.start_date)}</td>
        <td>${formatDate(l.end_date)}</td>
        <td>${l.days}</td>
        <td>${statusBadge(l.status)}</td>
        <td>${l.manager_comment || '-'}</td>
      </tr>`).join('') || '<tr><td colspan="6" style="text-align:center;color:#94a3b8">No leave requests yet</td></tr>';
  } catch (err) {
    showAlert(err.message, 'error');
  }
});
