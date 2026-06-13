export function Prism({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <rect width="32" height="32" rx="8" fill="#0B1220" />
      <path d="M16 7L25 23H7L16 7Z" fill="#35D3FF" fillOpacity="0.9" />
      <path d="M16 7L25 23H16V7Z" fill="#2EE6A6" fillOpacity="0.85" />
      <path d="M16 7L11.5 15L16 23V7Z" fill="#35D3FF" />
    </svg>
  )
}
