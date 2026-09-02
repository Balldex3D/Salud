netsh advfirewall firewall add rule name="Servidor-Recetario" dir=in action=allow protocol=tcp localport=8765 2>$null

Write-Host ""
Write-Host "SERVIDOR CORRIENDO EN PUERTO 8765"
Write-Host ""
Write-Host "EN iPad ABRE: http://192.168.1.13:8765"
Write-Host ""
Write-Host "NO CIERRES ESTA VENTANA"
Write-Host ""

$folder = "C:\Users\clgar\OneDrive\Documentos\Claude\Salud"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://+:8765/")

try {
  $listener.Start()
  Write-Host "Servidor listo."
  Write-Host ""

  while ($listener.IsListening) {
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
      $response.OutputStream.Write($content, 0, $content.Length)
      Write-Host ("OK: " + $path)
    } else {
      $response.StatusCode = 404
      Write-Host ("NOT FOUND: " + $path)
    }

    $response.OutputStream.Close()
  }
} catch {
  Write-Host ("ERROR: " + $_)
} finally {
  $listener.Stop()
}

pause
