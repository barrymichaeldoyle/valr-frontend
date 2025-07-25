import type { SVGProps } from 'react';

export function ETH(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        d="m10 20c5.5228 0 10-4.4772 10-10 0-5.52285-4.4772-10-10-10-5.52285 0-10 4.47715-10 10 0 5.5228 4.47715 10 10 10z"
        fill="#473bcb"
      />
      <g fill="#fff">
        <path d="m9.99975 3.75v4.62075l3.90545 1.74515z" />
        <path d="m9.99975 3.75-3.906 6.3659 3.906-1.74515z" />
        <path d="m9.99975 13.1103v3.1397l3.90815-5.4069z" />
        <path d="m9.99975 16.25v-3.1397l-3.906-2.2672z" />
        <path d="m9.99975 12.3836 3.90545-2.2677-3.90545-1.7441z" />
        <path d="m6.09375 10.1159 3.906 2.2677v-4.0118z" />
      </g>
    </svg>
  );
}
