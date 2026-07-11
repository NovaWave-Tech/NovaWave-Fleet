import { Navigate, Outlet } from 'react-router-dom'
import { tokenValido } from '../service/http'

export function RotaProtegida() {
  return tokenValido() ? <Outlet /> : <Navigate to="/login" replace />
}
