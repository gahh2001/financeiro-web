# Usar uma imagem base do Node.js
FROM node:16-alpine

# Definir o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copiar o package.json e package-lock.json para instalar as dependências
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install --legacy-peer-deps

# Copiar o código fonte para o container
COPY . .

# Expor a porta onde o React vai rodar
EXPOSE 3000

# Comando para rodar a aplicação React
CMD ["npm", "start"]
