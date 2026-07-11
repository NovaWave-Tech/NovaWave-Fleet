import {
  Box,
  Button,
  Field,
  IconButton,
  Input,
  InputGroup,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiBriefcase, FiEye, FiEyeOff, FiHash, FiLock, FiMail, FiUser } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { cadastrar } from '../../../service/cadastro'
import { esquemaCadastro, type DadosCadastro } from './esquema'

export function FormularioCadastro() {
  const navigate = useNavigate()
  const [mostrarSenha, setMostrarSenha] = useState(false)
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
    mutation.mutate({ ...dados, cnpj: dados.cnpj?.trim() || undefined })
  }

  return (
    <form onSubmit={handleSubmit(aoEnviar)} noValidate>
      <Stack gap="5">
        {erroApi && (
          <Box
            role="alert"
            bg="red.50"
            color="perigo"
            borderWidth="1px"
            borderColor="red.200"
            rounded="md"
            px="4"
            py="3"
            fontSize="sm"
          >
            {erroApi}
          </Box>
        )}

        <Field.Root invalid={!!errors.nome}>
          <Field.Label>Seu nome</Field.Label>
          <InputGroup startElement={<FiUser />}>
            <Input placeholder="Nome do responsável" {...register('nome')} />
          </InputGroup>
          <Field.ErrorText>{errors.nome?.message}</Field.ErrorText>
        </Field.Root>

        <SimpleGrid columns={{ base: 1, sm: 2 }} gap="4">
          <Field.Root invalid={!!errors.nome_empresa}>
            <Field.Label>Empresa</Field.Label>
            <InputGroup startElement={<FiBriefcase />}>
              <Input placeholder="Sua transportadora" {...register('nome_empresa')} />
            </InputGroup>
            <Field.ErrorText>{errors.nome_empresa?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.cnpj}>
            <Field.Label>
              CNPJ <Box as="span" color="gray.400">(opcional)</Box>
            </Field.Label>
            <InputGroup startElement={<FiHash />}>
              <Input placeholder="Somente números" {...register('cnpj')} />
            </InputGroup>
            <Field.ErrorText>{errors.cnpj?.message}</Field.ErrorText>
          </Field.Root>
        </SimpleGrid>

        <Field.Root invalid={!!errors.email}>
          <Field.Label>E-mail</Field.Label>
          <InputGroup startElement={<FiMail />}>
            <Input
              type="email"
              autoComplete="email"
              placeholder="voce@empresa.com"
              {...register('email')}
            />
          </InputGroup>
          <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
        </Field.Root>

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
                  onClick={() => setMostrarSenha((v) => !v)}
                >
                  {mostrarSenha ? <FiEyeOff /> : <FiEye />}
                </IconButton>
              }
            >
              <Input
                type={mostrarSenha ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="Mínimo 6 caracteres"
                {...register('senha')}
              />
            </InputGroup>
            <Field.ErrorText>{errors.senha?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.senha_confirmation}>
            <Field.Label>Confirmar senha</Field.Label>
            <InputGroup startElement={<FiLock />}>
              <Input
                type={mostrarSenha ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="Repita a senha"
                {...register('senha_confirmation')}
              />
            </InputGroup>
            <Field.ErrorText>{errors.senha_confirmation?.message}</Field.ErrorText>
          </Field.Root>
        </SimpleGrid>

        <Button
          type="submit"
          colorPalette="brand"
          size="lg"
          loading={mutation.isPending}
          loadingText="Criando conta..."
        >
          Criar conta
        </Button>
      </Stack>
    </form>
  )
}
