export default function CommunityPage() {
  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <div className="space-y-2">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Community</h1>
          <p className="text-lg text-muted-foreground">
            Join our growing community of developers building with MDX UI.
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <section>
            <h2 className="mb-4 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
              Get Involved
            </h2>
            <p className="leading-7">
              MDX UI is an open source project that welcomes contributions from everyone. Whether
              you want to fix a bug, add a feature, or improve documentation, we'd love your help.
            </p>
          </section>

          <section>
            <h2 className="mb-4 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
              Ways to Contribute
            </h2>
            <ul className="ml-6 list-disc space-y-2">
              <li>Report bugs and request features on GitHub</li>
              <li>Contribute code through pull requests</li>
              <li>Improve documentation and examples</li>
              <li>Help others in GitHub Discussions</li>
              <li>Share your projects built with MDX UI</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
              Community Resources
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href="https://github.com"
                className="rounded-lg border p-4 transition-colors hover:bg-accent"
              >
                <h3 className="mb-2 font-semibold">GitHub Discussions</h3>
                <p className="text-sm text-muted-foreground">
                  Ask questions and share ideas with the community.
                </p>
              </a>
              <a
                href="https://discord.gg"
                className="rounded-lg border p-4 transition-colors hover:bg-accent"
              >
                <h3 className="mb-2 font-semibold">Discord Server</h3>
                <p className="text-sm text-muted-foreground">
                  Chat with other developers in real-time.
                </p>
              </a>
            </div>
          </section>

          <section>
            <h2 className="mb-4 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
              Code of Conduct
            </h2>
            <p className="leading-7">
              We are committed to providing a welcoming and inclusive environment for everyone.
              Please read our Code of Conduct to understand our community standards.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
