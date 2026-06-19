function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return <span className={`badge-tag${className ? ` ${className}` : ""}`} {...props} />
}

export { Badge }
