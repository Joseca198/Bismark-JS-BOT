# 4. Personalizar la Imagen (Banner)

> **Descripción:** Estos comandos te permiten modificar los textos y colores que se dibujan directamente sobre la imagen de bienvenida generada por el bot (el Banner). Puedes ajustar el título, la descripción, el pie de página y los colores de cada elemento, incluyendo el borde del avatar del usuario.

## /set-custom-welcome-image-texts

> **Descripción:** Establece o actualiza los textos y colores de la imagen de bienvenida. Al igual que el Embed, puedes modificar uno o varios campos a la vez sin perder tu configuración anterior.

### 📋 Información General

|**Requisito**|**Detalle**|
|---|---|
|**Permisos del Usuario**|`MANAGE_GUILD` (Gestionar Servidor)|
|**Estado del Comando**|**Sólo Desarrolladores** (`devOnly: true`). _Actualmente, este comando solo puede ser ejecutado por los desarrolladores del bot._|
|**Visibilidad**|La respuesta del bot es efímera (solo la ve el usuario que ejecuta el comando).|

### ⚙️ Parámetros

> [!NOTE] Parámetros Opcionales Todos los parámetros son opcionales, pero **debes proporcionar al menos uno** para ejecutar el comando con éxito.

|**Parámetro**|**Tipo**|**Obligatorio**|**Descripción**|
|---|---|---|---|
|`title`|`String`|No|El texto grande que aparece encima del avatar.|
|`title-color`|`String`|No|Color del título en formato Hexadecimal (Ej: `#FF0000`).|
|`description`|`String`|No|El texto que aparece debajo del avatar.|
|`description-color`|`String`|No|Color de la descripción en formato Hexadecimal.|
|`footer`|`String`|No|El texto pequeño en la parte inferior de la imagen.|
|`footer-color`|`String`|No|Color del pie de página en formato Hexadecimal.|
|`avatar-border-color`|`String`|No|Color del anillo que rodea la foto de perfil del usuario.|

### 🚀 Uso y Ejemplos

**Sintaxis** `/set-custom-welcome-image-texts [title:<texto>] [title-color:<hex>] [description:<texto>] [description-color:<hex>] ...`

**Ejemplos**

> [!EXAMPLE] Configuración de textos `/set-custom-welcome-image-texts title:¡Nuevo Miembro! description:{username} se unió a la batalla`

> [!EXAMPLE] Cambiar solo los colores (Ej. a verde) `/set-custom-welcome-image-texts title-color:#00FF00 avatar-border-color:#00FF00`

### ⚠️ Lógica de Funcionamiento

> [!IMPORTANT] Verificaciones Automáticas Al ejecutar el comando, el bot realiza las siguientes validaciones:
> 
> 1. **Comprobación de Vacío:** Verifica que hayas llenado al menos un campo. Si todos están vacíos, rechaza el comando.
>     
> 2. **Validación Exhaustiva de Colores:** Revisa todos los colores proporcionados usando la expresión regular `/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/`. Esto permite tanto formatos hexadecimales largos (`#FF0000`) como cortos (`#F00`). Si alguno falla, el comando se detiene indicando qué color es inválido.
>     
> 3. **Fusión Inteligente (Merge):** Guarda los datos en `config.welcomeImageTexts`, sobrescribiendo solo los campos que ingresaste y manteniendo intactos los que ya habías configurado antes.
>     
> 4. **Confirmación Detallada:** Responde con una lista exacta de los campos que acaban de ser actualizados.
>     

## /reset-welcome-images-texts

> **Descripción:** Elimina tu configuración personalizada para los textos de la imagen, restaurando los valores por defecto del bot (Ej. "¡Bienvenido/a", "{username}", "{server-name}").

### 📋 Información General

|**Requisito**|**Detalle**|
|---|---|
|**Permisos del Usuario**|`MANAGE_GUILD` (Gestionar Servidor)|
|**Visibilidad**|La respuesta del bot es efímera.|

### ⚙️ Parámetros

_Este comando no requiere parámetros._

### 🚀 Uso y Ejemplos

**Sintaxis** `/reset-welcome-images-texts`

**Ejemplos**

> [!EXAMPLE] Restaurar valores por defecto `/reset-welcome-images-texts`

> [!IMPORTANT] Verificaciones Automáticas (Comportamiento esperado) Al ejecutar el comando:
> 
> 1. **Existencia Previa:** El bot verifica si hay textos de imagen guardados en la configuración.
>     
> 2. **Restablecimiento:** Si encuentra datos, elimina ese bloque específico, haciendo que el generador de imágenes `canvas` vuelva a utilizar sus colores blancos y textos genéricos de respaldo.
>     

## 🔗 Relacionados

- [[03_personalizar_mensaje|Paso anterior: Personalizar el Mensaje (Embed)]]
    
- [[05_vista_previa|Siguiente paso: Vista Previa de la Bienvenida]]