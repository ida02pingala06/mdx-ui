import * as React from "react"

export interface ImageProps {
  src: string
  alt: string
  caption?: string
  className?: string
  width?: number
  height?: number
}

export function Image({
  src,
  alt,
  caption,
  className = "",
  width,
  height
}: ImageProps) {
  return (
    <figure className={`my-6 ${className}`}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="rounded-lg border border-gray-200 dark:border-gray-800 w-full"
      />
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
