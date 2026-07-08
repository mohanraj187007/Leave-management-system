let currentDate = new Date();

document.addEventListener('DOMContentLoaded', async () => {
  checkAuth();
  renderCalendar();
  try {
    const leaves = await api.get('/manager/all');
    highlightLeaves(leaves);
  } catch (e) {
    try {
      const leaves = await api.get('/leave/my-leaves');
      highlightLeaves(leaves);
    } catch (err) {}
  }
});

const renderCalendar = () => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  document.getElementById('monthYear').textContent = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const grid = document.getElementById('calendarGrid');
  grid.innerHTML = '';

  for (let i = 0; i < firstDay; i++) grid.innerHTML += '<div></div>';
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const isToday = new Date().toDateString() === new Date(year, month, d).toDateString();
    grid.innerHTML += `<div class="cal-day${isToday ? ' today' : ''}" id="d-${dateStr}">${d}</div>`;
  }
};

const highlightLeaves = (leaves) => {
  leaves.filter(l => l.status === 'approved').forEach(l => {
    const cur = new Date(l.start_date);
    const end = new Date(l.end_date);
    while (cur <= end) {
      const ds = cur.toISOString().split('T')[0];
      const el = document.getElementById(`d-${ds}`);
      if (el) { el.classList.add('on-leave'); el.title = l.employee_name || 'On leave'; }
      cur.setDate(cur.getDate() + 1);
    }
  });
};

const prevMonth = () => { currentDate.setMonth(currentDate.getMonth() - 1); renderCalendar(); };
const nextMonth = () => { currentDate.setMonth(currentDate.getMonth() + 1); renderCalendar(); };
