// Service Worker para Evangelismo Prático PWA
// Versão com Network-First para evitar tela branca em novos deploys
const CACHE_NAME = 'evangelismo-pratico-v' + Date.now();

self.addEventListener('install', (event) => {
  // Ativar imediatamente sem esperar fechar abas
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      // Limpar todos os caches antigos imediatamente
      return Promise.all(
        keys.map((key) => {
          console.log('[SW] Deletando cache antigo:', key);
          return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  // Ignorar áudios para não estourar o cache do navegador
  if (event.request.url.includes('/audios/')) {
    return;
  }

  // 1. Páginas HTML e Navegações: SEMPRE Network-First (busca do servidor para pegar index.html atualizado)
  if (event.request.mode === 'navigate' || event.request.destination === 'document') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          return response;
        })
        .catch(() => {
          return caches.match(event.request) || caches.match('/index.html');
        })
    );
    return;
  }

  // 2. Scripts e Estilos (/assets/): Network-First para garantir que os hashes novos do Vite venham direto do servidor
  if (
    event.request.destination === 'script' || 
    event.request.destination === 'style' || 
    event.request.url.includes('/assets/')
  ) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          return networkResponse;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
    return;
  }

  // 3. Imagens e fontes estáticas: Stale-While-Revalidate
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
