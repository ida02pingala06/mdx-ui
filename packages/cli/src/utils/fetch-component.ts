import axios from "axios"
import fs from "fs-extra"
import path from "path"
import { fileURLToPath } from "url"

const REGISTRY_URL = "https://raw.githubusercontent.com/ida02pingala06/mdx-ui/main/registry/mdx"

export interface ComponentData {
  name: string
  files: Array<{
    path: string
    content: string
  }>
  dependencies?: string[]
  registryDependencies?: string[]
}

export async function fetchComponent(name: string): Promise<ComponentData> {
  // Try local registry first (for development)
  try {
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    // Try multiple possible paths for the registry
    const possiblePaths = [
      path.join(__dirname, "../../../../registry/mdx", `${name}.json`),
      path.join(__dirname, "../../../registry/mdx", `${name}.json`),
      path.join(__dirname, "../../registry/mdx", `${name}.json`),
    ]

    for (const registryPath of possiblePaths) {
      if (await fs.pathExists(registryPath)) {
        const data = await fs.readJSON(registryPath)
        return data
      }
    }
  } catch (error) {
    // Continue to remote fetch
  }

  // Fetch from remote registry
  try {
    const url = `${REGISTRY_URL}/${name}.json`
    const response = await axios.get(url)
    return response.data
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error(`Component "${name}" not found`)
    }
    throw new Error(`Failed to fetch component: ${error.message}`)
  }
}
