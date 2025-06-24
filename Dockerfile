# Usa una imagen base de Node.js
FROM node:18
# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app
# Copia los archivos necesarios desde la carpeta Backend
COPY package*.json ./
RUN npm install

COPY . .
#COPY . .
# Expone el puerto que usa tu servidor
EXPOSE 3000
# Comando para iniciar el servidor
#CMD ["npm", "start"]
CMD ["node", "server.js"]