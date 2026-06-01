# 5. Vista Previa de la Bienvenida

> **Descripción:** Permite probar y visualizar instantáneamente cómo lucen el mensaje Embed y la imagen Banner combinados. Simula un evento de entrada real sin necesidad de que un usuario nuevo se una al servidor.

## /preview-welcome

> **Descripción:** Genera y muestra una simulación exacta del mensaje de bienvenida actual utilizando tus configuraciones personalizadas (o los valores por defecto del bot).

### 📋 Información General

| **Requisito**            | **Detalle**                                                                                                                                               |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Permisos del Usuario** | `MANAGE_GUILD` (Gestionar Servidor)                                                                                                                       |
| **Estado del Comando**   | **Sólo Desarrolladores** (`devOnly: true`). _Al igual que el comando de textos de imagen, su uso está restringido al equipo de desarrollo._               |
| **Visibilidad**          | La respuesta del bot es efímera (`flags: MessageFlags.Ephemeral`), lo que significa que las pruebas no llenarán de spam el canal para los demás miembros. |

### ⚙️ Parámetros

|**Parámetro**|**Tipo**|**Obligatorio**|**Descripción**|
|---|---|---|---|
|`usuario`|`User`|No|El usuario de Discord que quieres usar para simular la entrada. Si se deja vacío, **el bot utilizará tus propios datos** (tu avatar, nombre y etiquetas).|

### 🚀 Uso y Ejemplos

**Sintaxis** `/preview-welcome [usuario:<mencion_o_id>]`

**Ejemplos**

> [!EXAMPLE] Probar con tus propios datos `/preview-welcome`

> [!EXAMPLE] Probar simulando a otro miembro del servidor `/preview-welcome usuario:@Juanito123`

## ⚠️ Lógica de Funcionamiento

> [!IMPORTANT] Clonación del Evento Real Este comando ejecuta de manera idéntica el motor del sistema de bienvenidas para garantizar que el resultado sea 100% fiel a la realidad:
> 
> 1. **Carga del Objetivo:** El bot verifica si proporcionaste un usuario. Si lo hiciste, intenta buscarlo dentro del servidor (`guild.members.fetch`) para poder extraer sus datos de miembro (como su apodo interno). Si no se encuentra, detiene el proceso con un mensaje de error.
>     
> 2. **Procesamiento de Fallbacks:** Lee las configuraciones de `customWelcomeMessage`. Si no has personalizado el título, la descripción, el footer o el color, jala los textos predeterminados idénticos a los del evento original (incluyendo la detección automática del canal de reglas `#rulesChannel`).
>     
> 3. **Renderizado de Plantillas:** Pasa los textos crudos por la función `replaceTemplates`, transformando variables como `{member-name}` o `{server-name}` en datos reales del usuario seleccionado.
>     
> 4. **Dibujo de la Imagen (Canvas):** Llama a `generateWelcomeImage`, pasándole el miembro y el color configurado para que dibuje el banner en segundo plano.
>     
> 5. **Entrega Segura:** Adjunta el buffer de la imagen generada, construye el Embed completo y edita la respuesta oculta (`editReply`) para mostrarte el resultado final en segundos.
>     

## 🔗 Relacionados

- [[04_personalizar_imagen|Paso anterior: Personalizar la Imagen (Banner)]]
    
- [[01_Funcionamiento|Volver al Inicio: Guía del Sistema de Bienvenidas]]