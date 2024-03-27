// Define files to cache
var filesToCache = [
    '/pages/index.html',
    '/styles/style.css',
    '/images/Work.png',
    '/manifest.json',
    '/offline.html', // Add the offline page to be cached
    // Add other files and routes you want to cache here
];

// Function to cache files during installation
var preLoad = function() {
    return caches.open("ecommerce-app").then(function(cache) {
        return cache.addAll(filesToCache);
    });
};

// Service Worker installation event
self.addEventListener("install", function(event) {
    event.waitUntil(preLoad());
});

// Service Worker fetch event// Service Worker fetch event
self.addEventListener("fetch", function(event) {
    event.respondWith(
        // Check if request is in cache
        caches.match(event.request).then(function(response) {
            // If request is found in cache, return it
            if (response) {
                return response;
            }
            // If request is not found in cache, fetch it from the network
            return fetch(event.request).then(function(response) {
                // Check if the request URL scheme is supported for caching
                if (!event.request.url.startsWith('http')) {
                    return response;
                }
                // Clone the response to cache it
                var responseToCache = response.clone();
                // Cache the fetched response for future use
                caches.open("ecommerce-app").then(function(cache) {
                    cache.put(event.request, responseToCache);
                });
                return response;
            }).catch(function() {
                // If fetching from network fails, return the offline page
                return caches.match("/offline.html");
            });
        })
    );
});


// Service Worker sync event
self.addEventListener('sync', function(event) {
    if (event.tag === 'syncData') {
        event.waitUntil(syncData());
    }
});

// Function to synchronize data in the background
function syncData() {
    // Implement data synchronization logic here
    // For example, send pending orders to the server
}

// Service Worker push event
// Service Worker push event
self.addEventListener('push', function(event) {
    if (event && event.data) {
        var data = event.data.json();
        if (data.method === "pushMessage") {
            console.log("Push notification sent");
            // Request permission to show notifications
            self.registration.showNotification("Abhishek's MBAKAro", { 
                body: data.message 
            });
        }
    }
});

