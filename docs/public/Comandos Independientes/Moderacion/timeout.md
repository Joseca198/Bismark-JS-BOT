# /timeout

> **Descripción:** Aísla a un usuario por un tiempo dado, restringiendo temporalmente su capacidad para enviar mensajes y conectar a canales de voz.

## 📋 Información General

|**Requisito**|**Detalle**|
|---|---|
|**Permisos del Usuario**|`MUTE_MEMBERS` (Aislar Miembros)|
|**Permisos del Bot**|`MUTE_MEMBERS` (Aislar Miembros)|
|**Jerarquía**|El objetivo debe tener un rol inferior al ejecutor y al bot. No aplica al dueño ni a bots.|

## ⚙️ Parámetros

|**Parámetro**|**Tipo**|**Obligatorio**|**Descripción**|
|---|---|---|---|
|`target-user`|`Mentionable / ID`|**Sí**|El usuario al que se quiere aislar.|
|`duracion`|`String`|**Sí**|Duración del aislamiento (ej. `5s`, `1m`, `1d`). Mínimo 5 segundos, máximo 28 días.|
|`razon`|`String`|No|El motivo del aislamiento. Por defecto: _Sin razón proveída._|

## 🚀 Uso y Ejemplos

### Sintaxis

`/timeout target-user:<mencion_o_id> duracion:<tiempo> [razon:<texto>]`

### Ejemplos

> [!EXAMPLE] Caso común `/timeout target-user:@Juanito duracion:1h razon:Hacer spam en canales generales.`

> [!EXAMPLE] Sin motivo `/timeout target-user:7823912038102 duracion:15m` (Uso mediante ID de usuario)

## ⚠️ Lógica de Funcionamiento

> [!IMPORTANT] Verificaciones Automáticas Antes de ejecutar la acción, el bot realiza las siguientes validaciones:
> 
> 1. **Presencia e Inmunidad:** ¿El usuario está en el servidor? ¿Es un bot o el dueño del servidor? (Retorna error si es así).
>     
> 2. **Formato de Tiempo:** ¿La duración es válida y se encuentra dentro de los límites de la API de Discord (entre 5 segundos y 28 días)?
>     
> 3. **Jerarquía de Roles:** ¿El objetivo está por encima o al mismo nivel que el autor o el bot en la lista de roles?
>     
> 4. **Actualización:** Si el usuario ya está aislado, en lugar de fallar, el comando modifica el tiempo de aislamiento actual y notifica el cambio.
>     
> 
> _Si alguna de las condiciones de validación falla, el comando retornará un mensaje de error detallado al ejecutor._

## 🔗 Relacionados

- [[ban|Comando /ban]]
    
- [[kick|Comando /kick]]