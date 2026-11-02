import nodemailer from 'nodemailer';
import { getDb, saveDb } from '@/lib/db';

export interface OwnerAlertPayload {
  trigger: 'urgent_inquiry' | 'quote_request' | 'site_visit' | 'image_uploaded' | 'customer_phone';
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  city?: string;
  serviceCategory?: string;
  summary: string;
  fullConversation?: { sender: string; text: string }[];
  imageUrl?: string;
}

export async function sendOwnerAlertEmail(payload: OwnerAlertPayload): Promise<{ success: boolean; message: string }> {
  try {
    const db = getDb();
    const settings = db.settings;
    const recipientEmail = settings.email || 'hmm.ghym.sa@gmail.com';

    // 1. Always record in Admin Leads & Notifications database
    const alertId = 'alert-' + Date.now();
    const alertRecord = {
      id: alertId,
      trigger: payload.trigger,
      customerName: payload.customerName || 'عميل المحادثة الذكية',
      customerPhone: payload.customerPhone || 'غير مسجل',
      customerEmail: payload.customerEmail || '',
      city: payload.city || 'الرياض / المملكة',
      serviceCategory: payload.serviceCategory || 'عام',
      summary: payload.summary,
      imageUrl: payload.imageUrl || '',
      conversationSnippet: (payload.fullConversation || []).slice(-4),
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      read: false,
    };

    if (!db.knowledgeBase.chatAlerts) {
      db.knowledgeBase.chatAlerts = [];
    }
    db.knowledgeBase.chatAlerts = [alertRecord, ...db.knowledgeBase.chatAlerts].slice(0, 100);

    // If customer provided a phone number, automatically convert to Lead!
    if (payload.customerPhone && payload.customerPhone.length >= 8) {
      const existingLead = (db.leads || []).find((l) => l.phone === payload.customerPhone);
      if (!existingLead) {
        db.leads = [
          {
            id: 'lead-' + Date.now(),
            name: payload.customerName || 'عميل محادثة ذكية',
            phone: payload.customerPhone,
            email: payload.customerEmail || '',
            customerType: 'b2c',
            service: payload.serviceCategory || 'signage',
            requestType: payload.trigger === 'site_visit' ? 'site-visit' : 'quote',
            city: payload.city || 'الرياض',
            details: `[استفسار عبر المهندس همم]\nالملخص: ${payload.summary}`,
            source: 'ai_chatbot',
            status: 'new',
            createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
          },
          ...(db.leads || []),
        ];
      }
    }

    saveDb(db);

    // 2. Prepare HTML Email
    const smtpConfig = settings.emailNotifications;
    const smtpHost = process.env.SMTP_HOST || smtpConfig?.smtpHost;
    const smtpUser = process.env.SMTP_USER || smtpConfig?.smtpUser;
    const smtpPass = process.env.SMTP_PASS || smtpConfig?.smtpPass;
    const smtpPort = Number(process.env.SMTP_PORT || smtpConfig?.smtpPort || 587);

    const triggerLabels: Record<string, string> = {
      urgent_inquiry: '⚠️ استفسار عاجل يتطلب تدخل هندسي',
      quote_request: '💰 طلب تسعير مباشر من عميل',
      site_visit: '📍 طلب معاينة موقع ورفع مقاسات',
      image_uploaded: '📸 صورة موقع / واجهة مرفقة للاستشارة',
      customer_phone: '📞 رقم عميل جديد بانتظار الاتصال',
    };

    const subjectTitle = triggerLabels[payload.trigger] || 'تنبيه جديد من المهندس همم';

    const conversationHtml = (payload.fullConversation || [])
      .map(
        (m) =>
          `<div style="margin-bottom:8px;padding:8px 12px;border-radius:10px;background:${
            m.sender === 'user' ? '#e0f2fe' : '#f1f5f9'
          };font-size:13px;">
            <strong>${m.sender === 'user' ? 'العميل' : 'المهندس همم'}:</strong> ${m.text.replace(/\n/g, '<br/>')}
          </div>`
      )
      .join('');

    const htmlBody = `
      <div dir="rtl" style="font-family:'Segoe UI',Tahoma,Arial,sans-serif;color:#1e293b;max-width:620px;margin:auto;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;background:#ffffff;">
        <div style="background:#0F2544;color:#ffffff;padding:24px;text-align:center;">
          <h2 style="margin:0 0 6px 0;font-size:20px;">شركة همم غيم للدعاية والإعلان والمقاولات</h2>
          <p style="margin:0;font-size:14px;color:#38bdf8;">تنبيه فوري من المساعد الهندسي الذكي (المهندس همم)</p>
        </div>
        <div style="padding:24px;">
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px;margin-bottom:20px;">
            <h3 style="margin:0 0 12px 0;color:#0369a1;font-size:16px;">${subjectTitle}</h3>
            <p style="margin:6px 0;font-size:14px;"><strong>ملخص الاستفسار:</strong> ${payload.summary}</p>
            ${payload.customerPhone ? `<p style="margin:6px 0;font-size:15px;color:#059669;"><strong>رقم جوال العميل:</strong> <a href="tel:${payload.customerPhone}" style="color:#059669;font-weight:bold;">${payload.customerPhone}</a> (<a href="https://wa.me/${payload.customerPhone.replace(/[^0-9]/g, '')}" style="color:#2563eb;">فتح واتساب مباشر</a>)</p>` : ''}
            ${payload.customerEmail ? `<p style="margin:6px 0;font-size:14px;"><strong>البريد:</strong> ${payload.customerEmail}</p>` : ''}
            ${payload.city ? `<p style="margin:6px 0;font-size:14px;"><strong>المدينة / المنطقة:</strong> ${payload.city}</p>` : ''}
            ${payload.imageUrl ? `<p style="margin:10px 0;"><strong style="display:block;margin-bottom:6px;">الصورة المرفقة من العميل:</strong><img src="${payload.imageUrl}" style="max-width:100%;max-height:280px;border-radius:8px;border:1px solid #cbd5e1;" /></p>` : ''}
          </div>

          <h4 style="margin:16px 0 8px 0;color:#334155;font-size:14px;">سياق المحادثة الأخيرة:</h4>
          <div style="max-height:260px;overflow-y:auto;border:1px solid #f1f5f9;border-radius:10px;padding:12px;background:#fafafa;">
            ${conversationHtml || '<p style="color:#94a3b8;font-size:13px;">لا توجد رسائل سابقة.</p>'}
          </div>

          <div style="margin-top:24px;text-align:center;">
            <a href="https://hmm-ghym-sa--my-saudi-node.us-east4.hosted.app/admin" style="display:inline-block;padding:12px 28px;background:#208EC1;color:#ffffff;text-decoration:none;font-weight:bold;border-radius:10px;font-size:14px;">
              فتح لوحة التحكم ومتابعة الطلب
            </a>
          </div>
        </div>
        <div style="background:#f1f5f9;padding:14px;text-align:center;font-size:12px;color:#64748b;">
          تم إرسال هذا الإشعار الآلي لخدمة عملاء شركة همم غيم فورياً.
        </div>
      </div>
    `;

    // 3. Send email if SMTP is configured
    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"المهندس همم — همم غيم" <${smtpUser}>`,
        to: recipientEmail,
        subject: `[همم غيم] ${subjectTitle} — ${payload.customerPhone || payload.customerName || 'موقع همم غيم'}`,
        html: htmlBody,
      });

      return { success: true, message: 'Alert email dispatched successfully to ' + recipientEmail };
    } else {
      // SMTP not configured yet, but alert is securely recorded in db for the admin
      return { success: true, message: 'Alert recorded in Admin Notifications (SMTP pending configuration).' };
    }
  } catch (err: any) {
    console.error('Email alert dispatch error:', err.message);
    return { success: false, message: err.message };
  }
}
