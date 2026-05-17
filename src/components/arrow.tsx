type Props = {
  size?: number;
  className?: string;
};

export function Arrow({ size = 12, className }: Props) {
  return (
    <svg
      viewBox="0 0 12 12"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M2 10 L10 2 M4 2 H10 V8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
