
# /kick

> **Descripción:** Sanciona a un miembro con una expulsión del servidor.
Parámetros:


## 📋 Información General

| **Requisito**            | **Detalle**                                                  |
| ------------------------ | ------------------------------------------------------------ |
| **Permisos del Usuario** | `KICK_MEMBERS` (Banear Miembros)                             |
| **Permisos del Bot**     | `KICK_MEMBERS` o `ADMINISTRATOR`                             |
| **Jerarquía**            | El objetivo debe tener un rol inferior al ejecutor y al bot. |

## ⚙️ Parámetros

| **Parámetro** | **Tipo**         | **Obligatorio** | **Descripción**                                                |
| ------------- | ---------------- | --------------- | -------------------------------------------------------------- |
| `usuario`     | `User / Mention` | **Sí**          | El usuario que será expulsado del servidor.                    |
| `razon`       | `String`         | No              | El motivo de la sanción. Por defecto: _Razón no especificada_. |
## 🚀 Uso y Ejemplos

### Sintaxis

`/kick usuario:<mencion_o_id> [razon:<texto>]`

### Ejemplos

> [!EXAMPLE] Caso común `/kick usuario:@Juanito razon:Incumplimiento reiterado de las normas.`

> [!EXAMPLE] Sin motivo `/kick usuario:7823912038102` (Uso mediante ID de usuario)

---

## ⚠️ Lógica de Funcionamiento

> [!IMPORTANT] Verificaciones Automáticas Antes de ejecutar la acción, el bot realiza las siguientes validaciones:
> 
> 1. **Permisos:** ¿El autor tiene capacidad de baneo?
>     
> 2. **Jerarquía de Roles:** ¿El objetivo está por encima del autor o del bot en la lista de roles?
>     
> 3. **Estado:** ¿El usuario ya se encuentra fuera del servidor?
>     
> 
> _Si alguna de estas condiciones falla, el comando retornará un mensaje de error detallado._


## 🔗 Relacionados

- [[ban|Comando /ban]]
    
- [[unban|Comando /unban]]

