export async function onRequestPost(context) {
  const jsonHeaders = {
    'Content-Type': 'application/json; charset=utf-8'
  };

  let body;
  try {
    body = await context.request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'INVALID_JSON' }), {
      status: 400,
      headers: jsonHeaders
    });
  }

  const honeypot = typeof body.website_url === 'string' ? body.website_url.trim() : '';
  if (honeypot.length > 0) {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: jsonHeaders
    });
  }

  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const tool = typeof body.tool === 'string' ? body.tool.trim() : '';
  const seats = typeof body.seats === 'string' ? body.seats.trim() : '';
  const silo = typeof body.silo === 'string' ? body.silo.trim() : 'N/A';
  const sourceUrl = typeof body.sourceUrl === 'string' ? body.sourceUrl.trim() : '';
  const consentPrivacy = Boolean(body.consentPrivacy);
  const consentPartnerShare = Boolean(body.consentPartnerShare);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email) || email.length > 180) {
    return new Response(JSON.stringify({ ok: false, error: 'INVALID_EMAIL' }), {
      status: 400,
      headers: jsonHeaders
    });
  }

  if (!tool || tool.length > 120 || !seats || seats.length > 80) {
    return new Response(JSON.stringify({ ok: false, error: 'INVALID_FIELDS' }), {
      status: 400,
      headers: jsonHeaders
    });
  }

  if (!consentPrivacy || typeof body.consentPartnerShare !== 'boolean') {
    return new Response(JSON.stringify({ ok: false, error: 'CONSENT_REQUIRED' }), {
      status: 400,
      headers: jsonHeaders
    });
  }

  const webhookUrl = context.env && context.env.DISCORD_WEBHOOK_URL ? String(context.env.DISCORD_WEBHOOK_URL).trim() : '';

  if (webhookUrl) {
    const partnerStatus = consentPartnerShare
      ? 'OUI (Opt-in mise en relation intégrateur/éditeur)'
      : 'NON (Téléchargement matrice PDF uniquement)';

    const discordPayload = {
      content: [
        '**[LEAD B2B NIS2 // STACK HUB]**',
        `- **Email Pro :** ${email}`,
        `- **Outil évalué :** ${tool}`,
        `- **Volume du parc :** ${seats}`,
        `- **Silo Article 21 :** ${silo}`,
        `- **Opt-in Partenaire B2B :** ${partnerStatus}`,
        `- **Page source :** ${sourceUrl || 'https://nis2-stack-hub.pages.dev'}`
      ].join('\n')
    };

    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(discordPayload)
      });
    } catch {}
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: jsonHeaders
  });
}
