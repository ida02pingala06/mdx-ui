import { execa } from "execa"

export async function installDependencies(deps: string[]): Promise<void> {
  if (deps.length === 0) return

  // Detect package manager
  const packageManager = await detectPackageManager()

  const args =
    packageManager === "npm"
      ? ["install", ...deps]
      : ["add", ...deps]

  await execa(packageManager, args, {
    cwd: process.cwd(),
  })
}

async function detectPackageManager(): Promise<string> {
  const { stdout } = await execa("which", ["pnpm"], {
    reject: false,
  })

  if (stdout) return "pnpm"

  const { stdout: yarnStdout } = await execa("which", ["yarn"], {
    reject: false,
  })

  if (yarnStdout) return "yarn"

  return "npm"
}
