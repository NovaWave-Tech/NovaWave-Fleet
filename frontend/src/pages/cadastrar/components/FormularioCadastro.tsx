import {
  Alert,
  Box,
  Button,
  Field,
  IconButton,
  Input,
  InputGroup,
  Separator,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiBriefcase, FiEye, FiEyeOff, FiHash, FiLock, FiMail, FiUser } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { cadastrar } from '../../../service/cadastro'
import { esquemaCadastro, formatarCnpj, type DadosCadastro } from './esquema'

function TituloSecao({ children }: { children: string }) {
  return (
    <Text
      fontSize="xs"
      fontWeight="semibold"
      color="gray.400"
      textTransform="uppercase"
      letterSpacing="0.08em"
    >
      {children}
    </Text>
  )
}

export function FormularioCadastro() {
  const navigate = useNavigate()
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false)
  const [erroApi, setErroApi] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DadosCadastro>({
    resolver: zodResolver(esquemaCadastro),
    defaultValues: {
      nome: '',
      nome_empresa: '',
      cnpj: '',
      email: '',
      senha: '',
      senha_confirmation: '',
    },
  })

  const mutation = useMutation({
    mutationFn: cadastrar,
    onSuccess: () => navigate('/dashboard', { replace: true }),
    onError: (erro) => {
      const mensagem =
        axios.isAxiosError(erro) && erro.response?.data?.mensagem
          ? String(erro.response.data.mensagem)
          : 'Não foi possível concluir o cadastro. Tente novamente.'
      setErroApi(mensagem)
    },
  })

  const aoEnviar = (dados: DadosCadastro) => {
    setErroApi(null)
    const cnpj = dados.cnpj?.replace(/\D/g, '')
    mutation.mutate({ ...dados, cnpj: cnpj || undefined })
  }

  const registroCnpj = register('cnpj')

  return (
    <form onSubmit={handleSubmit(aoEnviar)} noValidate>
      <Stack gap="6">
        {erroApi && (
          <Alert.Root status="error" variant="subtle" rounded="lg">
            <Alert.Indicator />
            <Alert.Title fontWeight="medium">{erroApi}</Alert.Title>
          </Alert.Root>
        )}

        <Stack gap="4">
          <TituloSecao>Responsável</TituloSecao>

          <Field.Root invalid={!!errors.nome}>
            <Field.Label>Nome completo</Field.Label>
            <InputGroup startElement={<FiUser />}>
              <Input
                size="lg"
                autoComplete="name"
                placeholder="Quem vai administrar a conta"
                {...register('nome')}
              />
            </InputGroup>
            <Field.ErrorText>{errors.nome?.message}</Field.ErrorText>
          </Field.Root>

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
        </Stack>

        <Separator />

        <Stack gap="4">
          <TituloSecao>Transportadora</TituloSecao>

          <SimpleGrid columns={{ base: 1, sm: 2 }} gap="4">
            <Field.Root invalid={!!errors.nome_empresa}>
              <Field.Label>Nome da empresa</Field.Label>
              <InputGroup startElement={<FiBriefcase />}>
                <Input
                  size="lg"
                  autoComplete="organization"
                  placeholder="Sua transportadora"
                  {...register('nome_empresa')}
                />
              </InputGroup>
              <Field.ErrorText>{errors.nome_empresa?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.cnpj}>
              <Field.Label>
                CNPJ{' '}
                <Box as="span" color="gray.400" fontWeight="normal">
                  (opcional)
                </Box>
              </Field.Label>
              <InputGroup startElement={<FiHash />}>
                <Input
                  size="lg"
                  inputMode="numeric"
                  maxLength={18}
                  placeholder="00.000.000/0000-00"
                  {...registroCnpj}
                  onChange={(e) => {
                    e.target.value = formatarCnpj(e.target.value)
                    void registroCnpj.onChange(e)
                  }}
                />
              </InputGroup>
              <Field.ErrorText>{errors.cnpj?.message}</Field.ErrorText>
            </Field.Root>
          </SimpleGrid>
        </Stack>

        <Separator />

        <Stack gap="4">
          <TituloSecao>Acesso</TituloSecao>

          <SimpleGrid columns={{ base: 1, sm: 2 }} gap="4">
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
                  autoComplete="new-password"
                  placeholder="••••••••"
                  {...register('senha')}
                />
              </InputGroup>
              {!errors.senha && <Field.HelperText>Mínimo de 6 caracteres.</Field.HelperText>}
              <Field.ErrorText>{errors.senha?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.senha_confirmation}>
              <Field.Label>Confirmar senha</Field.Label>
              <InputGroup
                startElement={<FiLock />}
                endElement={
                  <IconButton
                    type="button"
                    aria-label={mostrarConfirmacao ? 'Ocultar senha' : 'Mostrar senha'}
                    variant="ghost"
                    size="sm"
                    color="gray.500"
                    onClick={() => setMostrarConfirmacao((v) => !v)}
                  >
                    {mostrarConfirmacao ? <FiEyeOff /> : <FiEye />}
                  </IconButton>
                }
              >
                <Input
                  size="lg"
                  type={mostrarConfirmacao ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Repita a senha"
                  {...register('senha_confirmation')}
                />
              </InputGroup>
              <Field.ErrorText>{errors.senha_confirmation?.message}</Field.ErrorText>
            </Field.Root>
          </SimpleGrid>
        </Stack>

        <Button
          type="submit"
          colorPalette="brand"
          size="lg"
          fontWeight="semibold"
          loading={mutation.isPending}
          loadingText="Criando conta..."
        >
          Criar conta
        </Button>
      </Stack>
    </form>
  )
}
