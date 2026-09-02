$folder = "C:\Users\clgar\OneDrive\Documentos\Claude\Salud"
$port = 8765

Write-Host "Servidor HTTP en puerto $port"
Write-Host ""

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Prefixes.Add("http://127.0.0.1:$port/")

try {
  $listener.Start()
  Write-Host "Servidor listo"

  while ($listener.IsListening) {
    try {
      $context = $listener.GetContext()
      $request = $context.Request
      $response = $context.Response

      $path = $request.Url.LocalPath
      if ($path -eq "/" -or $path -eq "") {
        $path = "/index.html"
      }

      $filePath = Join-Path $folder $path.TrimStart("/")

      if (Test-Path $filePath -PathType Leaf) {
        $content = [System.IO.File]::ReadAllBytes($filePath)
        $response.ContentLength64 = $content.Length

        # Set content type
        $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
        $contentTypes = @{
          ".html" = "text/html; charset=utf-8"
          ".js" = "application/javascript; charset=utf-8"
          ".css" = "text/css; charset=utf-8"
          ".json" = "application/json; charset=utf-8"
          ".png" = "image/png"
          ".jpg" = "image/jpeg"
          ".gif" = "image/gif"
          ".svg" = "image/svg+xml"
          ".woff" = "font/woff"
          ".woff2" = "font/woff2"
          ".manifest" = "application/manifest+json"
        }
        $response.ContentType = $contentTypes[$ext]
        if (-not $response.ContentType) {
          $response.ContentType = "application/octet-stream"
        }

        $response.OutputStream.Write($content, 0, $content.Length)
        Write-Host "OK: $path"
      } else {
        $response.StatusCode = 404
        $msg = "Not Found"
        $bytes = [System.Text.Encoding]::UTF8.GetBytes($msg)
        $response.ContentLength64 = $bytes.Length
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
        Write-Host "NOT FOUND: $path"
      }

      $response.OutputStream.Close()
    } catch {
      Write-Host "Request error: $_"
    }
  }
} catch {
  Write-Host "Server error: $_"
} finally {
  $listener.Stop()
  $listener.Close()
}
