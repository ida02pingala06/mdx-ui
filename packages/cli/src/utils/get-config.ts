import fs from "fs-extra"
import path from "path"

export interface Config {
  componentsDir: string
  typescript: boolean
  tailwind: boolean
}

export async function getConfig(): Promise<Config | null> {
  const cwd = process.cwd()
  const configPath = path.join(cwd, "mdx-ui.json")

  try {
    const exists = await fs.pathExists(configPath)
    if (!exists) {
      return null
    }

    const config = await fs.readJSON(configPath)
    return config
  } catch (error) {
    return null
  }
}
