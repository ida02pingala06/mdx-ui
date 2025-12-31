import { Command } from "commander"
import prompts from "prompts"
import chalk from "chalk"
import ora from "ora"
import fs from "fs-extra"
import path from "path"

export const init = new Command()
  .name("init")
  .description("Initialize your project for mdx-ui")
  .action(async () => {
    console.log(chalk.bold("\n✨ Welcome to mdx-ui!\n"))

    const cwd = process.cwd()

    // Ask configuration questions
    const config = await prompts([
      {
        type: "text",
        name: "componentsDir",
        message: "Where should we put the components?",
        initial: "components/mdx",
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

      // Create lib directory for utils
      const libPath = path.join(cwd, path.dirname(config.componentsDir), "lib")
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
          `✓ Created ${path.dirname(config.componentsDir)}/lib/utils.${config.typescript ? "ts" : "js"}`
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
