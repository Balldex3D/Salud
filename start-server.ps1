$port = 8000
$folder = Split-Path -Parent $MyInvocation.MyCommand.Path

# Crear el listener HTTP
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://+:$port/")
$listener.Start()
Write-Host "Servidor iniciado en http://localhost:$port"
Write-Host "Para acceder desde iPad: encuentra tu IP local y accede a http://TU_IP:$port"

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $filePath = $request.Url.LocalPath
        if ($filePath -eq "/" -or $filePath -eq "") {
            $filePath = "/index.html"
        }

        $fullPath = Join-Path $folder $filePath.TrimStart('/')

        if (Test-Path $fullPath -PathType Leaf) {
            $fileContent = [System.IO.File]::ReadAllBytes($fullPath)
            $response.ContentLength64 = $fileContent.Length

            # Detectar MIME type
            $extension = [System.IO.Path]::GetExtension($fullPath).ToLower()
            $mimeTypes = @{
                ".html" = "text/html; charset=utf-8"
                ".js"   = "application/javascript; charset=utf-8"
                ".css"  = "text/css; charset=utf-8"
                ".json" = "application/json"
                ".png"  = "image/png"
                ".jpg"  = "image/jpeg"
                ".gif"  = "image/gif"
                ".svg"  = "image/svg+xml"
                ".webmanifest" = "application/manifest+json"
            }
            $response.ContentType = $mimeTypes[$extension] -or "application/octet-stream"

            $response.OutputStream.Write($fileContent, 0, $fileContent.Length)
        } else {
            $response.StatusCode = 404
            $response.ContentType = "text/html; charset=utf-8"
            $notFound = [System.Text.Encoding]::UTF8.GetBytes("404 - Archivo no encontrado")
            $response.OutputStream.Write($notFound, 0, $notFound.Length)
        }

        $response.OutputStream.Close()
    }
} finally {
    $listener.Stop()
    $listener.Close()
}
