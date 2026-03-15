# ---- Builder: Chainguard Node (0 CVEs) ----
FROM cgr.dev/chainguard/node:latest AS builder

WORKDIR /app

# Dependencies cachen
COPY package*.json ./
RUN npm ci --prefer-offline || npm install

COPY . .

ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=4096"

RUN npm run build

# ─────────────────────────────────────────────
# Runtime: Distroless (Minimale Angriffsfläche, 0 CVEs)
FROM gcr.io/distroless/nodejs22-debian12 AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=4096"
ENV PORT=7860
EXPOSE 7860

# Relevante Dateien kopieren
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/server ./server

# Distroless nutzt standardmäßig UID 65532 (nonroot)
# Hugging Face Spaces unterstützen nonroot Users
USER nonroot

# Normaler Static-File Server (kein Stream-Server)
CMD ["server/server-prod.mjs"]
