# NovaWave Fleet — Backend (Laravel + PHP-FPM)
FROM php:8.4-fpm

# Dependências de sistema + extensões PHP
#  - pdo_pgsql: PostgreSQL/PostGIS
#  - sodium: assinatura JWT (php-open-source-saver/jwt-auth)
#  - redis: cache/filas/sessão (Redis 8)
RUN apt-get update && apt-get install -y --no-install-recommends \
        git unzip libpq-dev libsodium-dev libzip-dev \
    && docker-php-ext-install pdo pdo_pgsql sodium zip bcmath pcntl \
    && pecl install redis \
    && docker-php-ext-enable redis \
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

# PHP-FPM escuta na porta 9000 (consumida pelo Nginx)
EXPOSE 9000

CMD ["php-fpm"]
