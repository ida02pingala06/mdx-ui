import { Command } from "commander"
import prompts from "prompts"
import chalk from "chalk"
import ora from "ora"
import fs from "fs-extra"
import path from "path"
import { fileURLToPath } from "url"
import { getConfig } from "../utils/get-config.js"
import { fetchComponent, type ComponentData } from "../utils/fetch-component.js"
import { installDependencies } from "../utils/install-deps.js"
import { writeComponent } from "../utils/write-component.js"

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
    // Fallback
  }

  return {
    components: [
      { name: "blockquote", type: "mdx", description: "Styled quote blocks", files: [] },
      { name: "callout", type: "mdx", description: "Alert boxes", files: [] },
      { name: "code-block", type: "mdx", description: "Code blocks", files: [] },
      { name: "emphasis", type: "mdx", description: "Bold/italic", files: [] },
      { name: "headings", type: "mdx", description: "Headings", files: [] },
      { name: "horizontal-rule", type: "mdx", description: "Dividers", files: [] },
      { name: "image", type: "mdx", description: "Images", files: [] },
      { name: "inline-code", type: "mdx", description: "Inline code", files: [] },
      { name: "list", type: "mdx", description: "Lists", files: [] },
      { name: "paragraph", type: "mdx", description: "Paragraphs", files: [] },
      { name: "steps", type: "mdx", description: "Step guides", files: [] },
      { name: "tabs", type: "mdx", description: "Tabs", files: [] },
    ],
  }
}

export const add = new Command()
  .name("add")
  .description("Add components to your project")
  .argument("[components...]", "components to add")
  .action(async (components: string[]) => {
    console.log()

    // Get project config
    const config = await getConfig()

    if (!config) {
      console.log(chalk.red("✗ No mdx-ui.json found"))
      console.log(chalk.yellow("Run 'npx mdx-ui init' first"))
      process.exit(1)
    }

    // If no components specified, show selection
    if (components.length === 0) {
      // Load registry to get available components
      const registry = await loadRegistry()
      const mdxComponents = registry.components.filter((c: RegistryComponent) => c.type === "mdx")

      const { selected } = await prompts({
        type: "multiselect",
        name: "selected",
        message: "Which components would you like to add?",
        choices: mdxComponents.map((c: RegistryComponent) => ({
          title: c.name
            .split("-")
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
          value: c.name,
          description: c.description,
        })),
      })

      components = selected
    }

    if (!components || components.length === 0) {
      console.log(chalk.yellow("No components selected"))
      process.exit(0)
    }

    const spinner = ora("Fetching components...").start()

    try {
      // Fetch components and their registry dependencies recursively
      const componentsData: ComponentData[] = []
      const processedComponents = new Set<string>()

      async function fetchComponentRecursive(componentName: string) {
        if (processedComponents.has(componentName)) {
          return
        }

        processedComponents.add(componentName)
        const data = await fetchComponent(componentName)

        // Fetch registry dependencies first
        if (data.registryDependencies && data.registryDependencies.length > 0) {
          for (const depName of data.registryDependencies) {
            await fetchComponentRecursive(depName)
          }
        }

        componentsData.push(data)
      }

      for (const component of components) {
        await fetchComponentRecursive(component)
      }

      spinner.text = "Installing dependencies..."

      // Collect all dependencies
      const allDeps = new Set<string>()
      for (const data of componentsData) {
        data.dependencies?.forEach((dep: string) => allDeps.add(dep))
      }

      // Install dependencies
      if (allDeps.size > 0) {
        await installDependencies(Array.from(allDeps))
      }

      spinner.text = "Writing components..."

      // Write components to disk
      for (const data of componentsData) {
        await writeComponent(data, config)
      }

      spinner.succeed("Components added successfully!")

      console.log()
      for (const component of components) {
        console.log(chalk.green(`✓ ${component}`))
      }

      console.log()
      console.log(chalk.bold("Done! 🎉"))
      console.log()
    } catch (error: any) {
      spinner.fail("Failed to add components")
      console.error(chalk.red(error.message))
      process.exit(1)
    }
  })
