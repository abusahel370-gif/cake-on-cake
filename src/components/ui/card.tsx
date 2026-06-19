function Card({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={`card-product${className ? ` ${className}` : ""}`} {...props} />
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={`${className ? ` ${className}` : ""}`} {...props} />
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={`text-lg font-bold tracking-tight${className ? ` ${className}` : ""}`} {...props} />
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={`text-sm text-[var(--muted-fg)]${className ? ` ${className}` : ""}`} {...props} />
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={className} {...props} />
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={`flex items-center justify-between${className ? ` ${className}` : ""}`} {...props} />
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
