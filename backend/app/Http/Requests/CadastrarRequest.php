<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CadastrarRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, array<int, mixed>>
     */
    public function rules(): array
    {
        return [
            'nome' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique('usuario', 'email')],
            'senha' => ['required', 'string', 'min:6', 'confirmed'],
            'nome_empresa' => ['required', 'string', 'max:255'],
            'cnpj' => ['nullable', 'string', 'size:14', Rule::unique('empresa', 'cnpj')],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'nome.required' => 'O nome é obrigatório.',
            'email.required' => 'O e-mail é obrigatório.',
            'email.email' => 'Informe um e-mail válido.',
            'email.unique' => 'Este e-mail já está cadastrado.',
            'senha.required' => 'A senha é obrigatória.',
            'senha.min' => 'A senha deve ter ao menos 6 caracteres.',
            'senha.confirmed' => 'A confirmação da senha não confere.',
            'nome_empresa.required' => 'O nome da empresa é obrigatório.',
            'cnpj.size' => 'O CNPJ deve ter 14 dígitos.',
            'cnpj.unique' => 'Este CNPJ já está cadastrado.',
        ];
    }
}
