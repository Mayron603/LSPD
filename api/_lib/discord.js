export async function enviarWebhookDiscord(url, embed) {
  if (!url) {
    console.log("❌ [DISCORD] O Link do Webhook está vazio!");
    return;
  }

  console.log("⏳ [DISCORD] A tentar enviar notificação para o Discord...");

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embeds: [embed] })
    });

    if (!res.ok) {
      // Se o Discord rejeitar, ele vai mostrar o erro no terminal!
      const erroDiscord = await res.text();
      console.error("❌ [DISCORD] ERRO! O Discord rejeitou a mensagem. Motivo:", res.status, erroDiscord);
    } else {
      console.log("✅ [DISCORD] Notificação enviada com sucesso!");
    }
  } catch (error) {
    console.error("❌ [DISCORD] Erro de rede ao tentar contactar o Discord:", error);
  }
}