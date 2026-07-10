# NovaWave ERP — Backend (Laravel + PHP)
FROM php:8.3-cli

# Dependências de sistema + extensões PHP (PostgreSQL/PDO, sodium para JWT, etc.)
RUN apt-get update && apt-get install -y --no-install-recommends \
        git unzip libpq-dev libsodium-dev libzip-dev \
    && docker-php-ext-install pdo pdo_pgsql sodium zip bcmath \
    && rm -rf /var/lib/apt/lists/*

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Instala dependências primeiro (aproveita cache de camadas)
COPY composer.json composer.lock ./
RUN composer install --no-interaction --no-progress --prefer-dist --no-scripts

# Código da aplicação
COPY . .
RUN composer dump-autoload --optimize

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
