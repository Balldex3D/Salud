Set objFSO = CreateObject("Scripting.FileSystemObject")
Set objShell = CreateObject("WScript.Shell")

port = "8765"
folder = "C:\Users\clgar\OneDrive\Documentos\Claude\Salud"

WScript.Echo "Servidor HTTP en puerto " & port
WScript.Echo "Abre: http://localhost:" & port
WScript.Echo ""

' Limpiar firewall anterior (opcional)
objShell.Run "netsh advfirewall firewall delete rule name=""Recetario HTTP"" /y 2>nul", 0, True

' Agregar regla de firewall
objShell.Run "netsh advfirewall firewall add rule name=""Recetario HTTP"" dir=in action=allow protocol=tcp localport=" & port & " 2>nul", 0, True

' Usar Python si está disponible
On Error Resume Next
Set WshShell = CreateObject("WScript.Shell")
Set objExec = WshShell.Exec("cmd /c python --version 2>&1")
pythonAvailable = (objExec.Status = 0)
On Error GoTo 0

If pythonAvailable Then
    WScript.Echo "Python detectado, usando http.server"
    objShell.Run "cmd /k cd /d """ & folder & """ && python -m http.server " & port, 1, False
Else
    WScript.Echo "Python no disponible"
    WScript.Quit 1
End If
