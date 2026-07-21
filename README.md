# CI/CD Demo con Jenkins y Docker

Este proyecto demuestra un pipeline de CI/CD que reconstruye y redeploya automáticamente una aplicación Node.js cuando se hace push a la rama main en GitHub.

## Requisitos previos
- Jenkins instalado y corriendo
- Docker instalado y corriendo
- Usuario jenkins con permisos en el grupo docker
- GitHub CLI (gh) configurado (opcional)

## Pasos para configurar

### 1. Subir el proyecto a GitHub
```bash
# Inicializar repositorio git
git init
git add .
git commit -m "Initial commit"

# Crear repositorio en GitHub (si tienes gh CLI)
gh repo create ci-cd-demo --public --source=. --remote=origin --push

# O manualmente:
# - Crear repositorio en GitHub
# - git remote add origin https://github.com/TU_USUARIO/ci-cd-demo.git
# - git push -u origin main
```

### 2. Dar permisos de Docker al usuario Jenkins
```bash
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
```

### 3. Crear Job en Jenkins
1. Ir a Jenkins > New Item
2. Nombre: `ci-cd-demo`
3. Seleccionar "Pipeline"
4. En Pipeline section:
   - Definition: "Pipeline script from SCM"
   - SCM: Git
   - Repository URL: https://github.com/TU_USUARIO/ci-cd-demo.git
   - Branch: `*/main`
   - Script Path: `Jenkinsfile`
5. Guardar

### 4. Probar el flujo
```bash
# Verificar que la aplicación está corriendo
curl http://localhost:3000

# Hacer un cambio y push para probar el pipeline
echo "Mensaje actualizado" > mensaje.txt
git add .
git commit -m "Test pipeline"
git push origin main
```

## Endpoints
- `GET /` - JSON con mensaje, versión y fecha
- `GET /health` - Health check (200 OK)

## Variables de entorno
- `PORT` - Puerto del servidor (default: 3000)
- `APP_VERSION` - Versión de la aplicación (default: 1.0.0)

## Troubleshooting
- Verificar que Docker está corriendo: `docker ps`
- Verificar permisos de jenkins: `groups jenkins`
- Ver logs de Jenkins: `journalctl -u jenkins`
- Ver logs del contenedor: `docker logs ci-cd-demo`

## Integrante
Ariel — Aporte: etapa de limpieza (Cleanup) de imágenes Docker en el pipeline.
