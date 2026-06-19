function Button({ className, variant = "primary", ...props }: React.ComponentProps<"button"> & { variant?: "primary" | "outline" | "accent" }) {
  const cls = variant === "primary" ? "btn-primary" : variant === "outline" ? "btn-outline" : "btn-accent"
  return <button className={`${cls}${className ? ` ${className}` : ""}`} {...props} />
}

export { Button }
