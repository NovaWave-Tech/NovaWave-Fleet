import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: { value: "'Inter', system-ui, sans-serif" },
        body: { value: "'Inter', system-ui, sans-serif" },
      },
      colors: {
        // Azul institucional (marca)
        brand: {
          50: { value: '#eef2f6' },
          100: { value: '#d5dfe9' },
          200: { value: '#aec0d2' },
          300: { value: '#7e99b4' },
          400: { value: '#4c6f95' },
          500: { value: '#1e3a5f' },
          600: { value: '#1a3252' },
          700: { value: '#152840' },
          800: { value: '#101e30' },
          900: { value: '#0b1522' },
          950: { value: '#06101c' },
        },
        secundaria: { value: '#2c5282' },
        // Azul operacional — apenas elementos ativos/foco
        operacional: { value: '#3b82f6' },
        // Status operacionais
        sucesso: { value: '#2f855a' },
        atencao: { value: '#dd6b20' },
        perigo: { value: '#c53030' },
        // Neutros corporativos
        borda: { value: '#d9e2ec' },
        fundo: { value: '#f5f7fa' },
        tinta: { value: '#1a202c' },
        tintaSuave: { value: '#4a5568' },
      },
      shadows: {
        cartao: { value: '0 1px 2px rgba(16, 24, 40, 0.04), 0 1px 3px rgba(16, 24, 40, 0.06)' },
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
          focusRing: { value: '{colors.operacional}' },
        },
      },
    },
  },
  globalCss: {
    'html, body': {
      backgroundColor: 'fundo',
      color: 'tinta',
      fontWeight: '400',
    },
  },
})

export const system = createSystem(defaultConfig, config)
