import { Navigate, Outlet } from 'react-router-dom'
import { obterToken } from '../lib/api'

/** Libera as rotas filhas apenas com token; senão redireciona ao login. */
export function RotaProtegida() {
  return obterToken() ? <Outlet /> : <Navigate to="/login" replace />
}
