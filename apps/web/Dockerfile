    FROM node:20

    WORKDIR /app
    COPY . .  
    
    RUN npm install 
    
    WORKDIR /app/apps/web
    RUN npm run build
    
    EXPOSE 3000
    ENV NODE_ENV=production
    CMD ["npm", "start"]