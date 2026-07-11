import { Navigate, Outlet } from 'react-router-dom'
import { tokenValido } from '../service/http'

/** Libera as rotas filhas apenas com token válido; senão redireciona ao login. */
export function RotaProtegida() {
  return tokenValido() ? <Outlet /> : <Navigate to="/login" replace />
}
