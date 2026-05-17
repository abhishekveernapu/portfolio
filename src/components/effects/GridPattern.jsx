export default function GridPattern({ className = "" }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none grid-pattern ${className}`}
      style={{
        maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
      }}
    />
  )
}
