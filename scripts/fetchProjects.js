const {createClient} = require('@sanity/client')
const fs = require('fs')
const path = require('path')

const OUTPUT_FILE = path.join(__dirname, '..', 'projects.json') // repo root, where the pages fetch it from

// Connects to your Sanity project. useCdn:false reads straight from the API —
// the CDN can lag a minute behind a publish, and the sync workflow runs right after one.
const client = createClient({
  projectId: '91e2aldw',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

// GROQ query: grabs every Project document, and for every media slot,
// expands the uploaded file's reference into a real, usable URL + its file type.
const PROJECTS_QUERY = `*[_type == "project"]{
  ...,
  coverImage{asset->{url, mimeType}},
  heroImage{asset->{url, mimeType}},
  content[]{
    ...,
    image1{asset->{url, mimeType}},
    mobileImage1{asset->{url, mimeType}},
    image2{asset->{url, mimeType}},
    mobileImage2{asset->{url, mimeType}}
  }
}`

// Fetches all projects from Sanity and returns them as a plain JS array.
async function fetchProjects() {
  return client.fetch(PROJECTS_QUERY)
}

// Runs the fetch, then saves the result to a local JSON file so your
// render scripts can read project data straight off disk, no internet call needed.
async function main() {
  const projects = await fetchProjects()
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(projects, null, 2))
  console.log(`Saved ${projects.length} project(s) to projects.json`)
}

main()