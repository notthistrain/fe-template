FROM node:18.20-slim AS deps

ARG NPM_REGISTRY        # npm源
ARG PNPM_CACHE_DIR      # gitlab-runner pnpm缓存

WORKDIR /device-admin
COPY package.json pnpm-lock.yaml ./

RUN npm config set registry ${NPM_REGISTRY} && \
    npm i -g pnpm && \
    pnpm config set store-dir $PNPM_CACHE_DIR && \
    pnpm install --frozen-lockfile

COPY . .

# 第二阶段：代码静态检查
FROM deps AS linter
RUN pnpm lint || (echo "Lint failed!" && exit 1)

# 第三阶段：静态资源文件打包
FROM linter as builder
RUN pnpm build

# 第四阶段：nginx
FROM nginx:stable-alpine-slim AS nginx

ARG BUILD_VERSION       # 构建版本
ARG BUILD_TIME          # 构建时间

ENV BUILD_VERSION=${BUILD_VERSION}
ENV BUILD_TIME=${BUILD_TIME}

EXPOSE 80

COPY .config/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /device-admin/dist /usr/share/nginx/html
RUN echo "${BUILD_VERSION}-${BUILD_TIME}" > /usr/share/nginx/html/version.txt

CMD ["nginx", "-g", "daemon off;"]