/**
 * Utilitário de Download de Áudios em MP3
 * Garante que o arquivo seja baixado diretamente como .mp3 com nome limpo e legível.
 */
export const downloadAudioFile = async (url: string, filename: string) => {
  const cleanFilename = filename.endsWith('.mp3') ? filename : `${filename}.mp3`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = cleanFilename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    
    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    }, 100);
  } catch (error) {
    console.warn('Fallback para download direto do áudio:', error);
    const link = document.createElement('a');
    link.href = url;
    link.download = cleanFilename;
    link.setAttribute('download', cleanFilename);
    link.target = '_blank';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
    }, 100);
  }
};
