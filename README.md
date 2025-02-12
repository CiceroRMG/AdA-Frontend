# AdA-frontend

Este projeto é construído com Vite, React, Tailwind CSS e TypeScript.

## Pré-requisitos

- Docker instalado e funcionando
- (Recomendado) Docker Compose

## Como rodar o projeto

### Configure as variáveis de ambiente
- Crie o arquivo .env
- Copie o conteúdo de .env.example e cole em .env

### Usando Docker

1. Navegue até a pasta do projeto:
   ```
   cd ./AdA-frontend
   ```
2. Construa a imagem Docker:
   ```
   docker build -t adafrontend .
   ```
3. Execute o container mapeando a porta 4173:
   ```
   docker run -it --rm -p 4173:4173 adafrontend
   ```

### Usando Docker Compose

1. Na raiz do projeto, execute:
   ```
   docker-compose up --build
   ```
   Isso irá construir a imagem e iniciar o container automaticamente.

### Rodando localmente com Vite

1. Instale as dependências:
   ```
   npm install
   ```
2. Rode o servidor de desenvolvimento:
   ```
   npm run dev
   ```
3. Acesse a aplicação no navegador pelo endereço que aparecer no terminal.
