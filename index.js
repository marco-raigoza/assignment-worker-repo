var arrayOfLinkObjects = [
  { "name" : "A basic link", "url": "https://abasiclink.com"},
  { "name" : "Another basic link", "url": "https://anotherbasiclink.com"},
  { "name" : "Basically a link", "url": "https://basicallyalink.com"},
  { "name" : "Basic link", "url": "https://basiclink.com"}
]

addEventListener('fetch', event => {
  let url = new URL(event.request.url);
  if (url.pathname == '/links'){
    event.respondWith(getStringLinks());
  } else {
    event.respondWith(getStaticHTML(), {
    headers: { "Content-Type" : "text/html"},
    status: 200
  });
  }
})
/**
 * Respond with links as strings
 */
async function getStringLinks() {
  return new Response(JSON.stringify(arrayOfLinkObjects), {
      headers: { "Content-Type": "application/json" },
      status: 200
  });
}

/**
 * Respond with links as static HTML page
 */
class LinksTransformer {
  constructor(arrayOfLinkObjects) {
    this.arrayOfLinkObjects = arrayOfLinkObjects;
  }

  element(element) {
    //Make each link into an element
    for (let i = 0; i < arrayOfLinkObjects.length; i++) {
      var newElement = "<a href=\"" + arrayOfLinkObjects[i].url + "\">" + arrayOfLinkObjects[i].name + "</a>\n";
      element.append(newElement, { html: true });
    }
  }
}

async function getStaticHTML() {
  const res = await fetch("https://static-links-page.signalnerve.workers.dev");

  return ( new HTMLRewriter().on("#links",
    new LinksTransformer(arrayOfLinkObjects)).transform(res));
}