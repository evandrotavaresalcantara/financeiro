    FROM node:20

    WORKDIR /app
    COPY . .  

    RUN npm install 

    WORKDIR /app/apps/api
    RUN npm run build
    
    EXPOSE 4000
    ENV NODE_ENV=production
    CMD ["npm", "start"]