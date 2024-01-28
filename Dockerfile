FROM node:16.18.1-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ADD . /usr/src/app

# 安装pnpm
# RUN npm install -g pnpm
# RUN pnpm install
CMD ["npm", "run", "build"]