import { Command } from "commander"
import prompts from "prompts"
import chalk from "chalk"
import ora from "ora"
import fs from "fs-extra"
import path from "path"
import { detectProjectStructure } from "../utils/detect-structure.js"

export const init = new Command()
  .name("init")
  .description("Initialize your project for mdx-ui")
  .action(async () => {
    console.log(chalk.bold("\n✨ Welcome to mdx-ui!\n"))

    const cwd = process.cwd()

    // Detect project structure
    const structure = await detectProjectStructure(cwd)

    console.log(
      chalk.dim(
        `Detected ${structure.hasSrc ? "src/" : "root-level"} project structure\n`
      )
    )

    // Ask configuration questions
    const config = await prompts([
      {
        type: "text",
        name: "componentsDir",
        message: "Where should we put the components?",
        initial: structure.componentsDir,
      },
      {
        type: "confirm",
        name: "typescript",
        message: "Are you using TypeScript?",
        initial: true,
      },
      {
        type: "confirm",
        name: "tailwind",
        message: "Are you using Tailwind CSS?",
        initial: true,
      },
    ])

    const spinner = ora("Initializing project...").start()

    try {
      // Create components directory
      const componentsPath = path.join(cwd, config.componentsDir)
      await fs.ensureDir(componentsPath)

      // Determine lib path based on project structure
      const libPath = path.join(cwd, structure.libDir)
      await fs.ensureDir(libPath)

      // Create utils.ts file
      const utilsContent = config.typescript
        ? `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`
        : `import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
`

      await fs.writeFile(
        path.join(libPath, config.typescript ? "utils.ts" : "utils.js"),
        utilsContent
      )

      // Create config file
      const configFile = {
        $schema: "https://mdx-ui.com/schema.json",
        componentsDir: config.componentsDir,
        typescript: config.typescript,
        tailwind: config.tailwind,
      }

      await fs.writeJSON(path.join(cwd, "mdx-ui.json"), configFile, {
        spaces: 2,
      })

      spinner.succeed("Project initialized!")

      console.log(chalk.green("\n✓ Created mdx-ui.json"))
      console.log(chalk.green(`✓ Created ${config.componentsDir}/`))
      console.log(
        chalk.green(
          `✓ Created ${structure.libDir}/utils.${config.typescript ? "ts" : "js"}`
        )
      )

      console.log(chalk.bold("\n🎉 You're all set!\n"))
      console.log("Next steps:")
      console.log(chalk.cyan("  npx mdx-ui add callout"))
      console.log(chalk.cyan("  npx mdx-ui list"))
      console.log()
    } catch (error) {
      spinner.fail("Failed to initialize project")
      console.error(error)
      process.exit(1)
    }
  })
