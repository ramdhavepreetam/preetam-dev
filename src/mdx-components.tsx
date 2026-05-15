import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl font-serif italic mb-6 mt-12">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-serif italic mb-4 mt-10">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-serif italic mb-3 mt-8">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-mist leading-relaxed mb-6">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-outside ml-6 mb-6 space-y-2 text-mist">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-outside ml-6 mb-6 space-y-2 text-mist">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="pl-2">{children}</li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-cyan-electric pl-6 italic my-8 text-pearl/80">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-slate px-1.5 py-0.5 rounded text-code-green font-mono text-sm">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-slate p-6 rounded-lg overflow-x-auto mb-8 border border-white/5 cyan-glow">
        {children}
      </pre>
    ),
    img: (props) => (
      <Image
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
        {...(props as ImageProps)}
      />
    ),
    ...components,
  }
}
