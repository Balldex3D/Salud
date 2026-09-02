$port = 3000
$folder = Get-Location

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()

Write-Host "Servidor levantado en http://localhost:3000"

function Get-MimeType($path) {
    $ext = [System.IO.Path]::GetExtension($path).ToLower()
    switch ($ext) {
        ".html" { return "text/html; charset=utf-8" }
        ".js" { return "application/javascript; charset=utf-8" }
        ".css" { return "text/css; charset=utf-8" }
        ".json" { return "application/json" }
        ".webmanifest" { return "application/manifest+json" }
        ".svg" { return "image/svg+xml" }
        ".png" { return "image/png" }
        ".jpg" { return "image/jpeg" }
        ".gif" { return "image/gif" }
        default { return "application/octet-stream" }
    }
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $path = $request.Url.LocalPath
        if ($path -eq "/" -or $path -eq "") {
            $path = "/index.html"
        }

        $fullPath = Join-Path $folder $path.TrimStart("/")

        if (Test-Path $fullPath -PathType Leaf) {
            $file = Get-Item $fullPath
            $data = [System.IO.File]::ReadAllBytes($fullPath)

            $response.ContentType = Get-MimeType $fullPath
            $response.ContentLength64 = $data.Length

            try {
                $response.OutputStream.Write($data, 0, $data.Length)
                $response.OutputStream.Flush()
                Write-Host "OK: $path"
            } catch {
                Write-Host "ERROR writing $path : $_"
            }
        } else {
            $response.StatusCode = 404
            $response.ContentType = "text/html; charset=utf-8"
            $notFound = [System.Text.Encoding]::UTF8.GetBytes("<h1>404 - $path</h1>")
            $response.ContentLength64 = $notFound.Length

            try {
                $response.OutputStream.Write($notFound, 0, $notFound.Length)
                $response.OutputStream.Flush()
                Write-Host "NOT FOUND: $path"
            } catch {
                Write-Host "ERROR writing 404: $_"
            }
        }

        $response.Close()
    }
} finally {
    $listener.Stop()
    $listener.Close()
}
