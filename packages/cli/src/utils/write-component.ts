import fs from "fs-extra"
import path from "path"
import type { Config } from "./get-config.js"
import type { ComponentData } from "./fetch-component.js"

export async function writeComponent(
  component: ComponentData,
  config: Config
): Promise<void> {
  const cwd = process.cwd()

  for (const file of component.files) {
    const filePath = path.join(cwd, config.componentsDir, file.path)

    // Ensure directory exists
    await fs.ensureDir(path.dirname(filePath))

    // Write file
    await fs.writeFile(filePath, file.content, "utf-8")
  }
}
