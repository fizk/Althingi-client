export const classVariants = (name: string, variants: string[] = []): string => {
    return [name, ...variants.map(v => `${name}--${v}`)].join(' ');
}
