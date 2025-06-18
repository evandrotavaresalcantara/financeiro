import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    safelist: [
        { pattern: /^gap-/ },
        {
            pattern: /^grid-cols-/,
            variants: ['sm', 'md', 'lg', 'xl', '2xl'],
        },
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}
export default config
