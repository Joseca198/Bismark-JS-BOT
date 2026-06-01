# 1. Sistema de Bienvenidas: ¿Cómo funciona?

> **Descripción:** El sistema de bienvenidas de Bismark JS detecta automáticamente cuando un nuevo usuario se une a tu servidor (a través del evento `guildMemberAdd`) y envía un mensaje personalizado al canal que hayas configurado.

## ⚙️ Estructura de la Bienvenida

Cuando un usuario entra al servidor, el bot genera una respuesta compuesta por dos elementos principales que puedes personalizar completamente:

1. **El Mensaje Embed:** Un mensaje enriquecido que contiene un Título, una Descripción, un Color temático y un Pie de página (Footer).
    
2. **La Imagen de Bienvenida (Banner):** Una imagen generada en tiempo real (con `canvas`) que incluye el avatar del usuario, un fondo aleatorio (obtenido de los _assets_ del bot) y textos sobrepuestos personalizables (Título, Nombre de usuario, etc.).
    

> [!IMPORTANT] Requisito Previo Para que el bot envíe el mensaje, **es obligatorio configurar un canal de bienvenida**. Si un usuario se une y no hay un canal guardado en la configuración, el bot simplemente ignorará el evento.

## 🧩 Variables de Personalización (Templates)

Para que tus mensajes sean dinámicos (que cambien según el usuario que entra), Bismark JS utiliza un sistema de "Templates" o etiquetas. Puedes escribir estas etiquetas al configurar tus textos (tanto en el Embed como en la Imagen), y el bot las reemplazará automáticamente con la información real.

|Etiqueta|Lo que muestra el bot|Ejemplo|
|---|---|---|
|`{member-name}`|El nombre de usuario en el servidor (Apodo/Display Name).|`Juanito123`|
|`{username}`|El nombre de usuario global de Discord de la persona.|`juanito_gamer`|
|`{member-mention}`|Menciona directamente al usuario que acaba de entrar.|`@Juanito123`|
|`{server-name}`|El nombre de tu servidor de Discord.|`Mi Servidor Genial`|
|`{member-count}`|El número total de miembros tras la llegada del nuevo usuario.|`154`|
|`{channel:ID_DEL_CANAL}`|Menciona un canal específico del servidor utilizando su ID numérica.|`#reglas`|

## 🖼️ Generación de la Imagen de Bienvenida

La imagen adjunta en el mensaje funciona de la siguiente manera:

- **Fondo Dinámico:** El bot selecciona aleatoriamente una imagen (formato png, jpg o webp) de su carpeta interna de _assets_ para usarla como fondo. Si no encuentra ninguna imagen disponible, pintará el fondo con el color hexadecimal que hayas configurado para tu Embed.
    
- **Diseño Central:** Se extrae el avatar de Discord del nuevo usuario, se recorta en forma circular y se le aplica un borde (cuyo color es personalizable).
    
- **Textos:** Se añaden textos personalizables (usando las Variables de arriba) en la parte superior, inferior y al final de la imagen. Todos los textos tienen una sombra oscura (`shadowColor`) predeterminada para asegurar que sean legibles sin importar la imagen de fondo.
    

## 🛠️ Flujo de Configuración

Para poner en marcha este sistema, deberás usar los comandos de configuración en el siguiente orden sugerido.

> _Haz clic en los enlaces para ver la documentación de cada comando:_

1. **[[02_configurar_canal|Comandos de Canal]]:** Activar o desactivar el módulo asignando el canal donde se enviarán los mensajes.
    
2. **[[03_personalizar_mensaje|Comandos de Texto (Embed)]]:** Cambiar el título, la descripción, el color del borde lateral y el pie de página del mensaje principal.
    
3. **[[04_personalizar_imagen|Comandos de Imagen]]:** Cambiar los textos que aparecen dibujados directamente sobre el Banner generado, además de los colores de la fuente y del borde del avatar.
    
4. **[[05_vista_previa|Comando de Vista Previa]]:** Simular una entrada para ver cómo luce tu configuración actual sin necesidad de que alguien entre al servidor.