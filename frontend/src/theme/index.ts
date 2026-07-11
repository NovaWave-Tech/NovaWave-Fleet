import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

/**
 * Tema do NovaWave Fleet — paleta e tipografia da identidade da marca.
 * Cores em português como tokens semânticos; a escala "brand" habilita
 * `colorPalette="brand"` nos componentes do Chakra.
 */
const config = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: { value: "'Inter', system-ui, sans-serif" },
        body: { value: "'Inter', system-ui, sans-serif" },
      },
      colors: {
        brand: {
          50: { value: '#eef3ff' },
          100: { value: '#d9e4ff' },
          200: { value: '#bccfff' },
          300: { value: '#8eabff' },
          400: { value: '#5a7dff' },
          500: { value: '#0f62fe' }, // primária
          600: { value: '#0b4ed6' },
          700: { value: '#0d43ad' },
          800: { value: '#123a8a' },
          900: { value: '#16346f' },
          950: { value: '#0f2147' },
        },
        // Cores de apoio da identidade
        secundaria: { value: '#2563eb' },
        destaque: { value: '#38bdf8' },
        sucesso: { value: '#22c55e' },
        atencao: { value: '#f59e0b' },
        perigo: { value: '#ef4444' },
        borda: { value: '#e2e8f0' },
        fundo: { value: '#f8fafc' },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          solid: { value: '{colors.brand.500}' },
          contrast: { value: 'white' },
          fg: { value: '{colors.brand.600}' },
          muted: { value: '{colors.brand.100}' },
          subtle: { value: '{colors.brand.50}' },
          emphasized: { value: '{colors.brand.200}' },
          focusRing: { value: '{colors.brand.500}' },
        },
      },
    },
  },
  globalCss: {
    'html, body': {
      backgroundColor: 'fundo',
      color: 'gray.900',
    },
  },
})

export const system = createSystem(defaultConfig, config)
