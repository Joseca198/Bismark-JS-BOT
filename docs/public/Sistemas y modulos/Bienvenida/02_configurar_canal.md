# 2. Configurar Canal de Bienvenida

> **Descripción:** Estos comandos te permiten habilitar o deshabilitar el sistema de bienvenidas al asignar (o retirar) el canal específico donde el bot enviará los mensajes.

## /set-welcome-channel

> **Descripción:** Establece el canal de texto donde el bot publicará los mensajes e imágenes de bienvenida. **Al usar este comando, activas el sistema automáticamente.**

### 📋 Información General

|**Requisito**|**Detalle**|
|---|---|
|**Permisos del Usuario**|`MANAGE_GUILD` (Gestionar Servidor)|
|**Permisos del Bot**|`VIEW_CHANNEL` y `SEND_MESSAGES` en el canal seleccionado.|
|**Visibilidad**|La respuesta del bot es efímera (solo la ve el usuario que ejecuta el comando).|

### ⚙️ Parámetros

|**Parámetro**|**Tipo**|**Obligatorio**|**Descripción**|
|---|---|---|---|
|`channel`|`Channel`|**Sí**|El canal donde se enviarán las bienvenidas. Debe ser obligatoriamente un canal de texto.|

### 🚀 Uso y Ejemplos

**Sintaxis** `/set-welcome-channel channel:<#canal>`

**Ejemplos**

> [!EXAMPLE] Configuración estándar `/set-welcome-channel channel:#👋・bienvenidas`

### ⚠️ Lógica de Funcionamiento

> [!IMPORTANT] Verificaciones Automáticas Al ejecutar el comando, el bot realiza las siguientes validaciones:
> 
> 1. **Tipo de Canal:** Verifica que el canal seleccionado sea estrictamente de texto (`GuildText`). Si intentas poner un canal de voz, categorías o foros, el comando rechazará la solicitud.
>     
> 2. **Almacenamiento:** Una vez validado, la ID del canal se guarda en el archivo de configuración interno del bot (`config.welcomeChannel`).
>     

## /delete-welcome-channel

> **Descripción:** Elimina el canal de bienvenida actual de la configuración. **Esto desactiva por completo el sistema de bienvenidas** hasta que vuelvas a configurar un canal.

### 📋 Información General

|**Requisito**|**Detalle**|
|---|---|
|**Permisos del Usuario**|`MANAGE_GUILD` (Gestionar Servidor)|
|**Permisos del Bot**|Ninguno (Modificación interna).|
|**Visibilidad**|La respuesta del bot es efímera (solo la ve el usuario que ejecuta el comando).|

### ⚙️ Parámetros

_Este comando no requiere parámetros._

### 🚀 Uso y Ejemplos

**Sintaxis** `/delete-welcome-channel`

**Ejemplos**

> [!EXAMPLE] Desactivar el módulo `/delete-welcome-channel`

### ⚠️ Lógica de Funcionamiento

> [!IMPORTANT] Verificaciones Automáticas Al ejecutar el comando:
> 
> 1. **Existencia Previa:** El bot primero revisa si realmente hay un canal configurado. Si el sistema ya estaba desactivado, te avisará que no hay nada que eliminar.
>     
> 2. **Eliminación:** Si encuentra la configuración, borra el dato de la memoria, desactivando el evento para futuros ingresos.
>     

## 🔗 Relacionados

- [[01_Funcionamiento|Volver a: ¿Cómo funciona?]]
    
- [[03_personalizar_mensaje|Siguiente paso: Personalizar el texto del Mensaje (Embed)]]