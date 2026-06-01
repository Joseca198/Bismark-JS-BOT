# 3. Personalizar el Mensaje de Bienvenida (Embed)

> **Descripción:** Estos comandos te permiten modificar los textos y el color del mensaje principal (Embed) que acompaña a la imagen de bienvenida. Puedes usar las variables de plantilla (como `{member-mention}` o `{server-name}`) para que el texto sea dinámico.

## /set-custom-welcome-message

> **Descripción:** Establece o actualiza las partes del mensaje de bienvenida. Puedes modificar un solo campo a la vez o varios al mismo tiempo sin perder tu configuración anterior.

### 📋 Información General

|**Requisito**|**Detalle**|
|---|---|
|**Permisos del Usuario**|`MANAGE_GUILD` (Gestionar Servidor)|
|**Permisos del Bot**|Ninguno (Modificación interna).|
|**Visibilidad**|La respuesta del bot es efímera (solo la ve el usuario que ejecuta el comando).|

### ⚙️ Parámetros

> [!NOTE] Parámetros Opcionales Ningún parámetro es estrictamente obligatorio por sí solo, pero **debes rellenar al menos uno** para que el comando funcione.

|**Parámetro**|**Tipo**|**Obligatorio**|**Descripción**|
|---|---|---|---|
|`title`|`String`|No|El título principal del Embed.|
|`description`|`String`|No|El texto principal o cuerpo del mensaje.|
|`footer`|`String`|No|El texto pequeño que aparece en la base del mensaje.|
|`color`|`String`|No|El color de la barra lateral del Embed (Obligatorio en formato Hexadecimal. Ej: `#FF0000`).|

### 🚀 Uso y Ejemplos

**Sintaxis** `/set-custom-welcome-message [title:<texto>] [description:<texto>] [footer:<texto>] [color:<hex>]`

**Ejemplos**

> [!EXAMPLE] Configurar todo el mensaje de una vez `/set-custom-welcome-message title:¡Hola {member-name}! description:Bienvenido a {server-name}. Lee las reglas en {channel:123456789} color:#00FF00`

> [!EXAMPLE] Actualizar solo un valor (ej. cambiar solo el color) `/set-custom-welcome-message color:#9922FF`

### ⚠️ Lógica de Funcionamiento

> [!IMPORTANT] Verificaciones Automáticas Al ejecutar el comando, el bot realiza las siguientes validaciones:
> 
> 1. **Comprobación de Vacío:** Si envías el comando sin rellenar ninguna opción, el bot lo rechazará y te mostrará un mensaje de ayuda recordando las variables (templates) disponibles.
>     
> 2. **Validación de Color:** Si decides ingresar un color, el bot verifica mediante una expresión regular (`/^#[0-9A-Fa-f]{6}$/`) que sea un formato hexadecimal válido. Si escribes "rojo" o "FF0000" sin el `#`, retornará un error.
>     
> 3. **Fusión Inteligente (Merge):** El bot toma tu configuración actual y solo sobrescribe los campos que hayas llenado en esta ejecución. Si ya tenías un título guardado y ahora solo envías una descripción, tu título anterior se mantendrá intacto.
>     
> 4. **Resumen:** Al finalizar, el bot te responde con una lista confirmando cómo quedó la configuración final de tu mensaje.
>     

## /reset-custom-welcome-message

> **Descripción:** Elimina por completo tu configuración personalizada del Embed y devuelve el mensaje a los textos y colores predeterminados del bot.

### 📋 Información General

|**Requisito**|**Detalle**|
|---|---|
|**Permisos del Usuario**|`MANAGE_GUILD` (Gestionar Servidor)|
|**Permisos del Bot**|Ninguno (Modificación interna).|
|**Visibilidad**|La respuesta del bot es efímera.|

### ⚙️ Parámetros


|**Parámetro**|**Tipo**|**Obligatorio**|**Descripción**|
|---|---|---|---|
|_Ninguno_|-|-|Este comando no requiere ningún parámetro para funcionar.|


### 🚀 Uso y Ejemplos

**Sintaxis** `/reset-custom-welcome-message`

**Ejemplos**

> [!EXAMPLE] Restaurar valores por defecto `/reset-custom-welcome-message`

### ⚠️ Lógica de Funcionamiento

> [!IMPORTANT] Verificaciones Automáticas Al ejecutar el comando:
> 
> 1. **Existencia Previa:** El bot verifica si tienes alguna configuración de texto guardada en `config.customWelcomeMessage`. Si nunca configuraste nada, te avisará que no hay nada que restablecer.
>     
> 2. **Restablecimiento:** Si encuentra datos, elimina ese bloque de la configuración y guarda los cambios, haciendo que el sistema vuelva a utilizar los valores _raw_ que están codificados en el evento (ej: `🎉 ¡Bienvenido/a {member-name} a {server-name}! 🎉`).
>     

## 🔗 Relacionados

- [[02_configurar_canal|Paso anterior: Configurar Canal]]
    
- [[04_personalizar_imagen|Siguiente paso: Personalizar la Imagen (Banner)]]