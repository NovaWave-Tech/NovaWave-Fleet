import { Alert, Button, Field, IconButton, Input, InputGroup, Stack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiEye, FiEyeOff, FiLock, FiMail } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { logar } from '../../../service/auth'
import { esquemaLogin, type DadosLogin } from './esquema'

export function FormularioLogin() {
  const navigate = useNavigate()
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [erroApi, setErroApi] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DadosLogin>({
    resolver: zodResolver(esquemaLogin),
    defaultValues: { email: '', senha: '' },
  })

  const mutation = useMutation({
    mutationFn: logar,
    onSuccess: () => navigate('/dashboard', { replace: true }),
    onError: (erro) => {
      const mensagem =
        axios.isAxiosError(erro) && erro.response?.data?.mensagem
          ? String(erro.response.data.mensagem)
          : 'Não foi possível entrar. Tente novamente.'
      setErroApi(mensagem)
    },
  })

  const aoEnviar = (dados: DadosLogin) => {
    setErroApi(null)
    mutation.mutate(dados)
  }

  return (
    <form onSubmit={handleSubmit(aoEnviar)} noValidate>
      <Stack gap="5">
        {erroApi && (
          <Alert.Root status="error" variant="subtle" rounded="lg">
            <Alert.Indicator />
            <Alert.Title fontWeight="medium">{erroApi}</Alert.Title>
          </Alert.Root>
        )}

        <Field.Root invalid={!!errors.email}>
          <Field.Label>E-mail</Field.Label>
          <InputGroup startElement={<FiMail />}>
            <Input
              size="lg"
              type="email"
              autoComplete="email"
              placeholder="voce@empresa.com"
              {...register('email')}
            />
          </InputGroup>
          <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.senha}>
          <Field.Label>Senha</Field.Label>
          <InputGroup
            startElement={<FiLock />}
            endElement={
              <IconButton
                type="button"
                aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                variant="ghost"
                size="sm"
                color="gray.500"
                onClick={() => setMostrarSenha((v) => !v)}
              >
                {mostrarSenha ? <FiEyeOff /> : <FiEye />}
              </IconButton>
            }
          >
            <Input
              size="lg"
              type={mostrarSenha ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="Sua senha"
              {...register('senha')}
            />
          </InputGroup>
          <Field.ErrorText>{errors.senha?.message}</Field.ErrorText>
        </Field.Root>

        <Button
          type="submit"
          colorPalette="brand"
          size="lg"
          fontWeight="semibold"
          mt="1"
          loading={mutation.isPending}
          loadingText="Entrando..."
        >
          Entrar
        </Button>
      </Stack>
    </form>
  )
}
