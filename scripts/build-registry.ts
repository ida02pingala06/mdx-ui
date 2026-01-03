#!/usr/bin/env node

import fs from "fs-extra"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Component metadata - describes each component
const componentsMetadata: Record<string, {
  description: string
  dependencies?: string[]
  registryDependencies?: string[]
}> = {
  "badge": {
    description: "Status badges with multiple variants (default, success, warning, info, destructive)",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
    registryDependencies: ["utils"]
  },
  "blockquote": {
    description: "Styled quote blocks with optional citation",
    dependencies: []
  },
  "callout": {
    description: "Alert boxes for important information with variants",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
    registryDependencies: ["utils"]
  },
  "code-block": {
    description: "Syntax highlighted code blocks with title and line numbers",
    dependencies: [],
    registryDependencies: ["utils"]
  },
  "emphasis": {
    description: "Text emphasis components for bold (strong) and italic (em) styling",
    dependencies: [],
    registryDependencies: ["utils"]
  },
  "file-tree": {
    description: "Simple string-based file/folder tree structure with minimal syntax",
    dependencies: [],
    registryDependencies: ["utils"]
  },
  "heading": {
    description: "Flexible and reusable heading component with variant support",
    dependencies: [],
    registryDependencies: ["utils"]
  },
  "headings": {
    description: "Markdown headings (H1-H6) with auto-generated anchor links for navigation",
    dependencies: [],
    registryDependencies: ["utils"]
  },
  "horizontal-rule": {
    description: "Divider lines with multiple styles (default, dashed, dotted, gradient)",
    dependencies: []
  },
  "image": {
    description: "Images with optional captions",
    dependencies: []
  },
  "inline-code": {
    description: "Inline code component for displaying code snippets within text",
    dependencies: [],
    registryDependencies: ["utils"]
  },
  "list": {
    description: "Styled ordered and unordered lists with list items",
    dependencies: []
  },
  "paragraph": {
    description: "Standard text paragraph component with proper spacing and typography",
    dependencies: [],
    registryDependencies: ["utils"]
  },
  "steps": {
    description: "Numbered step-by-step guides with visual indicators",
    dependencies: [],
    registryDependencies: ["utils"]
  },
  "tabs": {
    description: "Tabbed content sections with state management",
    dependencies: [],
    registryDependencies: ["utils"]
  },
  "tree": {
    description: "Interactive file/folder tree structure for displaying project organization",
    dependencies: [],
    registryDependencies: ["utils"]
  },
  "utils": {
    description: "Utility functions for className merging (cn)",
    dependencies: ["clsx", "tailwind-merge"]
  }
}

async function buildRegistry() {
  console.log("🔨 Building registry from packages/registry/src...\n")

  const srcDir = path.join(__dirname, "../packages/registry/src")
  const registryDir = path.join(__dirname, "../registry")
  const mdxDir = path.join(registryDir, "mdx")

  // Ensure directories exist
  await fs.ensureDir(mdxDir)

  // Get all .tsx files from src
  const files = await fs.readdir(srcDir)
  const tsxFiles = files.filter(f => f.endsWith(".tsx"))

  const components: any[] = []

  for (const file of tsxFiles) {
    const componentName = file.replace(".tsx", "")
    const filePath = path.join(srcDir, file)
    const content = await fs.readFile(filePath, "utf-8")

    const metadata = componentsMetadata[componentName]
    if (!metadata) {
      console.warn(`⚠️  No metadata found for ${componentName}, skipping...`)
      continue
    }

    // Create component JSON
    const componentJson = {
      name: componentName,
      type: componentName === "utils" ? "utility" : "component",
      description: metadata.description,
      dependencies: metadata.dependencies || [],
      registryDependencies: metadata.registryDependencies || [],
      files: [
        {
          path: file,
          content: content
        }
      ]
    }

    // Write individual component JSON
    const outputPath = path.join(mdxDir, `${componentName}.json`)
    await fs.writeJSON(outputPath, componentJson, { spaces: 2 })
    console.log(`✅ Generated ${componentName}.json`)

    // Add to registry
    components.push({
      name: componentName,
      type: componentName === "utils" ? "utility" : "mdx",
      description: metadata.description,
      files: [`mdx/${componentName}.json`],
      ...(metadata.registryDependencies && metadata.registryDependencies.length > 0
        ? { registryDependencies: metadata.registryDependencies }
        : {})
    })
  }

  // Check for lib/utils.ts
  const utilsPath = path.join(srcDir, "lib/utils.ts")
  if (await fs.pathExists(utilsPath)) {
    const content = await fs.readFile(utilsPath, "utf-8")
    const utilsMetadata = componentsMetadata["utils"]
    const componentJson = {
      name: "utils",
      type: "utility",
      description: utilsMetadata?.description || "Utility functions for className merging (cn)",
      dependencies: utilsMetadata?.dependencies || [],
      files: [
        {
          path: "lib/utils.ts",
          content: content
        }
      ]
    }

    const outputPath = path.join(mdxDir, "utils.json")
    await fs.writeJSON(outputPath, componentJson, { spaces: 2 })
    console.log(`✅ Generated utils.json`)

    components.push({
      name: "utils",
      type: "utility",
      description: "Utility functions for className merging (cn)",
      files: ["mdx/utils.json"]
    })
  }

  // Generate main registry.json
  const registryJson = {
    $schema: "./schema.json",
    components: components.sort((a, b) => a.name.localeCompare(b.name))
  }

  await fs.writeJSON(path.join(registryDir, "registry.json"), registryJson, { spaces: 2 })
  console.log(`✅ Generated registry.json`)

  console.log(`\n🎉 Registry built successfully! Generated ${components.length} components.`)
}

buildRegistry().catch(console.error)
