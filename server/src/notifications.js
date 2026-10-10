import nodemailer from 'nodemailer';

// No mail is sent until a real sender and recipient have been explicitly configured.
export function startNotifications(app) {
  if (!process.env.SMTP_HOST || !process.env.SMTP_FROM || !process.env.ENQUIRY_TO) return;
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 587), secure: process.env.SMTP_SECURE === 'true',
    requireTLS: process.env.SMTP_SECURE !== 'true', connectionTimeout: 10000, socketTimeout: 15000,
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD } : undefined
  });
  let running = false;
  async function tick() {
    if (running) return; running = true;
    try {
      const job = app.db.prepare("SELECT n.id AS job_id,n.attempts,e.* FROM notification_jobs n JOIN enquiries e ON e.id=n.enquiry_id WHERE n.status='pending' AND n.retry_at<=? ORDER BY n.id LIMIT 1").get(Date.now());
      if (!job) return;
      try {
        await transport.sendMail({ from: process.env.SMTP_FROM, to: process.env.ENQUIRY_TO, replyTo: job.email, subject: `Website enquiry: ${job.discipline.replace(/[\r\n]/g, ' ')}`, text: `Name: ${job.name}\nEmail: ${job.email}\nDiscipline: ${job.discipline}\n\n${job.message}\n\nSaved enquiry #${job.id}` });
        app.db.prepare("UPDATE notification_jobs SET status='sent',attempts=attempts+1 WHERE id=?").run(job.job_id);
      } catch (error) {
        const attempts = job.attempts + 1;
        app.db.prepare('UPDATE notification_jobs SET attempts=?,status=?,retry_at=? WHERE id=?').run(attempts, attempts >= 5 ? 'failed' : 'pending', Date.now() + Math.min(3600000, 60000 * 2 ** attempts), job.job_id);
        app.log.warn({ jobId: job.job_id }, 'Enquiry notification failed; inspect email configuration');
      }
    } finally { running = false; }
  }
  let pending;
  const timer = setInterval(() => { if (!running) pending = tick().catch(() => app.log.error('Notification worker failed')); }, 10000); timer.unref();
  app.addHook('onClose', async () => { clearInterval(timer); transport.close(); await pending; });
}
