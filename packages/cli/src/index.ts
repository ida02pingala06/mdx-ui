#!/usr/bin/env node

import { Command } from "commander"
import { readFileSync } from "fs"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import { add } from "./commands/add.js"
import { init } from "./commands/init.js"
import { list } from "./commands/list.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const packageJson = JSON.parse(
  readFileSync(join(__dirname, "..", "package.json"), "utf-8")
)

process.on("SIGINT", () => process.exit(0))
process.on("SIGTERM", () => process.exit(0))

async function main() {
  const program = new Command()
    .name("mdx-ui")
    .description("Add beautiful MDX components to your project")
    .version(
      packageJson.version || "0.0.1",
      "-v, --version",
      "display the version number"
    )

  program.addCommand(init).addCommand(add).addCommand(list)

  program.parse()
}

main()
