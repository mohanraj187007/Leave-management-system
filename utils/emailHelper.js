const nodemailer = require('nodemailer');
require('dotenv').config({ path: './config/.env' });

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendNotificationEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: `"Leave Management" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });
    console.log(`📧 Email sent to ${to}`);
  } catch (err) {
    console.error('Email error:', err.message);
  }
};

const leaveStatusTemplate = (employeeName, status, leaveType, startDate, endDate, comment) => `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;border:1px solid #eee;border-radius:8px">
  <h2 style="color:#2563eb">Leave Request ${status.toUpperCase()}</h2>
  <p>Dear <strong>${employeeName}</strong>,</p>
  <p>Your leave request has been <strong style="color:${status==='approved'?'green':'red'}">${status}</strong>.</p>
  <table style="width:100%;border-collapse:collapse;margin:16px 0">
    <tr><td style="padding:8px;border:1px solid #eee"><strong>Leave Type</strong></td><td style="padding:8px;border:1px solid #eee">${leaveType}</td></tr>
    <tr><td style="padding:8px;border:1px solid #eee"><strong>From</strong></td><td style="padding:8px;border:1px solid #eee">${startDate}</td></tr>
    <tr><td style="padding:8px;border:1px solid #eee"><strong>To</strong></td><td style="padding:8px;border:1px solid #eee">${endDate}</td></tr>
    ${comment ? `<tr><td style="padding:8px;border:1px solid #eee"><strong>Comment</strong></td><td style="padding:8px;border:1px solid #eee">${comment}</td></tr>` : ''}
  </table>
  <p style="color:#888;font-size:12px">This is an automated message from Leave Management System.</p>
</div>`;

module.exports = { sendNotificationEmail, leaveStatusTemplate };
