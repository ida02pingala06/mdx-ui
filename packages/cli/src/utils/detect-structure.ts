import fs from "fs-extra"
import path from "path"

export interface ProjectStructure {
  hasSrc: boolean
  componentsDir: string
  libDir: string
}

export async function detectProjectStructure(cwd: string = process.cwd()): Promise<ProjectStructure> {
  const srcExists = await fs.pathExists(path.join(cwd, "src"))

  if (srcExists) {
    return {
      hasSrc: true,
      componentsDir: "src/components/mdx-ui",
      libDir: "src/lib",
    }
  }

  return {
    hasSrc: false,
    componentsDir: "components/mdx-ui",
    libDir: "lib",
  }
}
