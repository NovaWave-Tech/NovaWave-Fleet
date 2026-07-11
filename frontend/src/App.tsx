import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { itensMenu } from './components/layout/itensMenu'
import { LayoutApp } from './components/layout/LayoutApp'
import { RotaProtegida } from './components/RotaProtegida'
import { Toaster } from './components/Toaster'
import { queryClient } from './lib/queryClient'
import Cadastro from './pages/cadastrar/Index'
import Dashboard from './pages/dashboard/Index'
import EmConstrucao from './pages/EmConstrucao'
import Login from './pages/login/Index'
import { system } from './theme'

export default function App() {
  return (
    <ChakraProvider value={system}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/cadastrar" element={<Cadastro />} />
            <Route element={<RotaProtegida />}>
              <Route element={<LayoutApp />}>
                <Route path="/dashboard" element={<Dashboard />} />
                {itensMenu
                  .filter((item) => item.caminho !== '/dashboard')
                  .map((item) => (
                    <Route key={item.caminho} path={item.caminho} element={<EmConstrucao />} />
                  ))}
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </QueryClientProvider>
    </ChakraProvider>
  )
}
