/**
 * Gerador de Payload e QR Code PIX compatível com as normas do Banco Central do Brasil (BACEN)
 * Padrão EMV com cálculo de CRC-16 CCITT (0xFFFF / 0x1021)
 */

export function calculateCRC16(payload: string): string {
  let crc = 0xFFFF;
  for (let i = 0; i < payload.length; i++) {
    crc ^= (payload.charCodeAt(i) << 8);
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ 0x1021) & 0xFFFF;
      } else {
        crc = (crc << 1) & 0xFFFF;
      }
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

export interface PixPayloadParams {
  key: string;            // Ex: "+5568992393910" ou "68992393910"
  name: string;           // Ex: "ROBERTO RODRIGUES CASAS"
  city: string;           // Ex: "RIO BRANCO"
  amount?: number;        // Ex: 10.00 (opcional)
  txid?: string;          // Ex: "***"
}

export function generatePixPayload({
  key,
  name,
  city,
  amount,
  txid = '***'
}: PixPayloadParams): string {
  // Limpar nome e cidade (sem acentos para padrão bancário)
  const cleanName = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .slice(0, 25);

  const cleanCity = city
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .slice(0, 15);

  // Formato da chave de celular oficial BACEN (+55...)
  let formattedKey = key.trim().replace(/[()\s-]/g, '');
  if (/^\d{10,11}$/.test(formattedKey)) {
    formattedKey = `+55${formattedKey}`;
  }

  const merchantAccountInfo = `0014BR.GOV.BCB.PIX01${formattedKey.length.toString().padStart(2, '0')}${formattedKey}`;
  
  let payload = '000201'; // Payload Format Indicator
  payload += `26${merchantAccountInfo.length.toString().padStart(2, '0')}${merchantAccountInfo}`;
  payload += '52040000'; // Merchant Category Code
  payload += '5303986';  // Transaction Currency (986 = Real BRL)

  if (amount && amount > 0) {
    const amountStr = amount.toFixed(2);
    payload += `54${amountStr.length.toString().padStart(2, '0')}${amountStr}`;
  }

  payload += '5802BR'; // Country Code
  payload += `59${cleanName.length.toString().padStart(2, '0')}${cleanName}`;
  payload += `60${cleanCity.length.toString().padStart(2, '0')}${cleanCity}`;

  const cleanTxid = txid.slice(0, 25);
  const additionalData = `05${cleanTxid.length.toString().padStart(2, '0')}${cleanTxid}`;
  payload += `62${additionalData.length.toString().padStart(2, '0')}${additionalData}`;

  payload += '6304';
  const crc = calculateCRC16(payload);

  return `${payload}${crc}`;
}
