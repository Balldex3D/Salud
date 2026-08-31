# Servidor local para testing (localhost:8080)
# Uso: powershell -File tools/serve.ps1

$port = 8080
$root = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)

Write-Host "🚀 Iniciando servidor en http://localhost:$port"
Write-Host "📁 Sirviendo: $root"
Write-Host "⏹️  Presiona Ctrl+C para detener"
Write-Host ""

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()

try {
  while ($true) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    $path = $request.Url.LocalPath
    if ($path -eq "/") { $path = "/index.html" }

    $filePath = Join-Path $root $path.TrimStart("/")

    # Normalizar rutas (windows to posix)
    $filePath = $filePath.Replace("\", "/")

    if (Test-Path $filePath -PathType Leaf) {
      $content = [System.IO.File]::ReadAllBytes($filePath)

      # MIME types
      $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
      $mimeTypes = @{
        ".html" = "text/html"
        ".js"   = "application/javascript"
        ".json" = "application/json"
        ".css"  = "text/css"
        ".png"  = "image/png"
        ".jpg"  = "image/jpeg"
        ".svg"  = "image/svg+xml"
        ".webmanifest" = "application/manifest+json"
      }

      $contentType = $mimeTypes[$ext]
      if (-not $contentType) { $contentType = "application/octet-stream" }

      $response.ContentType = $contentType
      $response.ContentLength64 = $content.Length
      $response.OutputStream.Write($content, 0, $content.Length)

      Write-Host "✓ $path ($ext) - $([System.IO.FileInfo]$filePath).Length bytes"
    } else {
      $response.StatusCode = 404
      $response.ContentType = "text/html"
      $errorContent = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $path")
      $response.OutputStream.Write($errorContent, 0, $errorContent.Length)
      Write-Host "✗ $path - 404"
    }

    $response.OutputStream.Close()
  }
} finally {
  $listener.Stop()
  $listener.Close()
  Write-Host "`n⏹️  Servidor detenido."
}
