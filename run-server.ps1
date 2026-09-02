$port = 8765
$folder = "C:\Users\clgar\OneDrive\Documentos\Claude\Salud"

Write-Host "Servidor en puerto $port"

$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Prefixes.Add("http://192.168.1.13:$port/")

$listener.Start()
Write-Host "Listo - Abre: http://192.168.1.13:$port"

while ($true) {
    $ctx = $listener.GetContext()
    $req = $ctx.Request
    $res = $ctx.Response
    $path = $req.Url.LocalPath
    if ($path -eq "/" -or $path -eq "") { $path = "/index.html" }
    $file = Join-Path $folder $path.TrimStart("/").Replace("/", "\")

    if (Test-Path $file) {
        $bytes = [System.IO.File]::ReadAllBytes($file)
        $res.ContentLength64 = $bytes.Length
        $res.OutputStream.Write($bytes, 0, $bytes.Length)
        Write-Host "OK: $path"
    } else {
        $res.StatusCode = 404
        Write-Host "NOT FOUND: $path"
    }

    $res.OutputStream.Close()
}
