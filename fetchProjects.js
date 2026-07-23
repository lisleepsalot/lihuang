const {createClient} = require('@sanity/client')
const fs = require('fs')

// Connects to your Sanity project. useCdn:true serves cached (faster) data —
// fine for a build script, since we're not showing live edits second-by-second.
const client = createClient({
  projectId: '91e2aldw',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
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
  fs.writeFileSync('projects.json', JSON.stringify(projects, null, 2))
  console.log(`Saved ${projects.length} project(s) to projects.json`)
}

main()