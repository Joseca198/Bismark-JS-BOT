# /ping

> **Descripción:** Muestra la latencia actual del bot (tiempo de respuesta) y la latencia del WebSocket con la API de Discord.

## 📋 Información General

|**Requisito**|**Detalle**|
|---|---|
|**Permisos del Usuario**|Ninguno (Comando de uso general).|
|**Permisos del Bot**|Permisos básicos para visualizar canales y enviar mensajes.|
|**Jerarquía**|No aplica.|

## ⚙️ Parámetros

|**Parámetro**|**Tipo**|**Obligatorio**|**Descripción**|
|---|---|---|---|
|_Ninguno_|-|-|Este comando no requiere ningún parámetro para funcionar.|

## 🚀 Uso y Ejemplos

### Sintaxis

`/ping`

### Ejemplos

> [!EXAMPLE] Ejecución básica `/ping`

## ⚠️ Lógica de Funcionamiento

> [!IMPORTANT] Medición de Latencia Al ejecutar el comando, el bot realiza las siguientes mediciones:
> 
> 1. **Latencia del Cliente (Client Ping):** El bot retrasa la respuesta intencionalmente (`deferReply`), luego obtiene el mensaje de respuesta y calcula la diferencia de tiempo en milisegundos entre el momento en que se creó la interacción y el momento en que se envió la respuesta (`reply.createdTimestamp - interaction.createdTimestamp`).
>     
> 2. **Latencia de la API (WebSocket Ping):** Se obtiene directamente la latencia de la conexión activa entre el bot y los servidores de Discord (`client.ws.ping`).
>     
> 3. **Respuesta:** El bot edita su respuesta inicial para mostrar ambas mediciones en un solo mensaje (ej. `Pong! Client 150ms | Websocket: 45ms`).
>     

## 🔗 Relacionados

- [[Tirar Dados|Comando /tirar-dados]]