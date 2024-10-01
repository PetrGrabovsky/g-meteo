interface LogoProps {
  className: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 273 125" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_i_432_2)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M146.085 0H50C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100H121.086L96.0855 75H73.0428C59.2356 75 48.0428 63.8071 48.0428 50C48.0428 36.1929 59.2356 25 73.0428 25H146.086L121.086 2.18557e-06L146.085 0Z"
          fill="#F6F6F6"
        />
      </g>
      <g filter="url(#filter1_i_432_2)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M121.086 75L96.0855 50H121.086L146.086 50L146.086 75L146.086 100L146.085 125L121.086 100L121.086 75Z"
          fill="#84BF61"
        />
      </g>
      <g filter="url(#filter2_i_432_2)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M171.086 25L146.086 2.18557e-06L171.086 0H234.543H236.086V0.0311624C256.081 0.840337 272.043 17.3061 272.043 37.5C272.043 57.6939 256.081 74.1597 236.086 74.9688V75H234.543H196.086L221.086 75L246.085 100L271.564 100V125H221.086L196.086 100L171.086 75V50H221.564C228.468 50 234.064 44.4036 234.064 37.5C234.064 30.5964 228.468 25 221.564 25H171.086Z"
          fill="#F6F6F6"
        />
      </g>
      <defs>
        <filter
          id="filter0_i_432_2"
          x="-3"
          y="0"
          width="149.086"
          height="103"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-3" dy="3" />
          <feGaussianBlur stdDeviation="2.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_432_2" />
        </filter>
        <filter
          id="filter1_i_432_2"
          x="93.0855"
          y="50"
          width="53"
          height="78"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-3" dy="3" />
          <feGaussianBlur stdDeviation="2.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_432_2" />
        </filter>
        <filter
          id="filter2_i_432_2"
          x="143.086"
          y="0"
          width="128.957"
          height="128"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-3" dy="3" />
          <feGaussianBlur stdDeviation="2.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_432_2" />
        </filter>
      </defs>
    </svg>
  );
}
