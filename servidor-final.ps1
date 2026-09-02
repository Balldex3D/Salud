param($port = 8765)

$folder = "C:\Users\clgar\OneDrive\Documentos\Claude\Salud"

Write-Host "📱 Servidor en puerto $port"
Write-Host "🌐 Abre: http://localhost:$port"
Write-Host "📡 Red local: http://192.168.1.13:$port"
Write-Host ""

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")

try {
    $listener.Start()
    Write-Host "✓ Servidor listo"

    while ($listener.IsListening) {
        try {
            $context = $listener.GetContext()
            $request = $context.Request
            $response = $context.Response

            $path = $request.Url.LocalPath
            if ($path -eq "/" -or $path -eq "") { $path = "/index.html" }

            $filePath = Join-Path $folder $path.TrimStart("/").Replace("/", "\")

            if (Test-Path $filePath -PathType Leaf) {
                $bytes = [System.IO.File]::ReadAllBytes($filePath)
                $ext = [System.IO.Path]::GetExtension($filePath).ToLower()

                $mimeTypes = @{
                    ".html" = "text/html"
                    ".js" = "application/javascript"
                    ".css" = "text/css"
                    ".json" = "application/json"
                    ".png" = "image/png"
                    ".jpg" = "image/jpeg"
                    ".gif" = "image/gif"
                    ".svg" = "image/svg+xml"
                    ".woff" = "font/woff"
                    ".woff2" = "font/woff2"
                    ".manifest" = "application/manifest+json"
                }

                $response.ContentType = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
                $response.ContentLength64 = $bytes.Length
                $response.AddHeader("Cache-Control", "no-cache, no-store, must-revalidate")

                $response.OutputStream.Write($bytes, 0, $bytes.Length)
                Write-Host "OK: $path ($($bytes.Length) bytes)"
            } else {
                $response.StatusCode = 404
                $errorMsg = "404 Not Found: $path"
                $errorBytes = [System.Text.Encoding]::UTF8.GetBytes($errorMsg)
                $response.ContentLength64 = $errorBytes.Length
                $response.OutputStream.Write($errorBytes, 0, $errorBytes.Length)
                Write-Host "NOT FOUND: $path" -ForegroundColor Red
            }

            $response.OutputStream.Close()
        } catch {
            Write-Host "Error en solicitud: $_" -ForegroundColor Yellow
        }
    }
} catch {
    Write-Host "Error del servidor: $_" -ForegroundColor Red
} finally {
    if ($listener) { $listener.Close() }
}
