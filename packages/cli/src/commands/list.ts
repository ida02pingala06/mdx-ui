import { Command } from "commander"
import chalk from "chalk"
import fs from "fs-extra"
import path from "path"
import { fileURLToPath } from "url"

interface RegistryComponent {
  name: string
  type: string
  description: string
  files: string[]
  registryDependencies?: string[]
}

interface Registry {
  components: RegistryComponent[]
}

async function loadRegistry(): Promise<Registry> {
  try {
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    // Try multiple possible paths for the registry
    const possiblePaths = [
      path.join(__dirname, "../../../../registry/registry.json"),
      path.join(__dirname, "../../../registry/registry.json"),
      path.join(__dirname, "../../registry/registry.json"),
    ]

    for (const registryPath of possiblePaths) {
      if (await fs.pathExists(registryPath)) {
        return await fs.readJSON(registryPath)
      }
    }
  } catch (error) {
    // Fallback to hardcoded list
  }

  // Fallback if registry.json not found
  return {
    components: [
      { name: "blockquote", type: "mdx", description: "Styled quote blocks with optional citation", files: [] },
      { name: "callout", type: "mdx", description: "Alert boxes for important information", files: [] },
      { name: "code-block", type: "mdx", description: "Syntax highlighted code blocks", files: [] },
      { name: "emphasis", type: "mdx", description: "Text emphasis (bold/italic)", files: [] },
      { name: "headings", type: "mdx", description: "Headings with anchor links", files: [] },
      { name: "horizontal-rule", type: "mdx", description: "Divider lines with multiple styles", files: [] },
      { name: "image", type: "mdx", description: "Images with optional captions", files: [] },
      { name: "inline-code", type: "mdx", description: "Inline code snippets", files: [] },
      { name: "list", type: "mdx", description: "Styled ordered and unordered lists", files: [] },
      { name: "paragraph", type: "mdx", description: "Text paragraphs", files: [] },
      { name: "steps", type: "mdx", description: "Numbered step-by-step guides", files: [] },
      { name: "tabs", type: "mdx", description: "Tabbed content sections", files: [] },
      { name: "utils", type: "utility", description: "Utility functions (cn)", files: [] },
    ],
  }
}

export const list = new Command()
  .name("list")
  .description("List all available components")
  .action(async () => {
    console.log()
    console.log(chalk.bold("Available components:\n"))

    const registry = await loadRegistry()

    // Group by type
    const mdxComponents = registry.components.filter(c => c.type === "mdx")
    const utilityComponents = registry.components.filter(c => c.type === "utility")

    if (mdxComponents.length > 0) {
      console.log(chalk.bold("  MDX Components:"))
      for (const component of mdxComponents) {
        const deps = component.registryDependencies?.length
          ? chalk.dim(` (requires: ${component.registryDependencies.join(", ")})`)
          : ""
        console.log(chalk.cyan(`    ${component.name.padEnd(18)}`), component.description + deps)
      }
      console.log()
    }

    if (utilityComponents.length > 0) {
      console.log(chalk.bold("  Utilities:"))
      for (const component of utilityComponents) {
        console.log(chalk.cyan(`    ${component.name.padEnd(18)}`), component.description)
      }
      console.log()
    }

    console.log(chalk.dim("Usage:"))
    console.log(chalk.dim("  npx mdx-ui add <component>"))
    console.log()
  })
