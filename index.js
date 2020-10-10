var arrayOfLinkObjects = [
  { "name" : "A basic link", "url": "https://abasiclink.com"},
  { "name" : "Another basic link", "url": "https://anotherbasiclink.com"},
  { "name" : "Basically a link", "url": "https://basicallyalink.com"},
  { "name" : "Basic link", "url": "https://basiclink.com"}
]

addEventListener('fetch', event => {
  if (event.request.url == "http://localhost:8000/links"){
    event.respondWith(returnLinkObjects())
  } else {
    event.respondWith(incorrectRequest())
  }
})
/**
 * Respond with link objects
 */
async function returnLinkObjects() {
  return new Response(JSON.stringify(arrayOfLinkObjects), {
      headers: { "Content-Type": "application/json" },
      status: 200
  })
}

/**
 * Respond with static HTML page
 */
// async function incorrectRequest() {
//   return new Response("Please send a request to http://localhost:8000/links", {
//       status: 200
//   })
// }
class LinksTransformer {
  constructor(arrayOfLinkObjects) {
    this.arrayOfLinkObjects = arrayOfLinkObjects
  }

  async element(element) {  
    element.append(arrayOfLinkObjects);
  }
}

async function incorrectRequest() {
  const res = await fetch("https://static-links-page.signalnerve.workers.dev")

  return new Response( new HTMLRewriter().on("div", new LinksTransformer(arrayOfLinkObjects)).transform(res), {
    headers: { "Content-Type" : "text/html; charset=UTF-8"}
  });
}