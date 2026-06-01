# /tirar-dados

> **Descripción:** Simula una tirada de dados personalizable, permitiendo elegir el número de caras y la cantidad de dados a lanzar.

## 📋 Información General

|**Requisito**|**Detalle**|
|---|---|
|**Permisos del Usuario**|Ninguno (Comando de uso general).|
|**Permisos del Bot**|Permisos básicos para visualizar canales y enviar mensajes.|
|**Jerarquía**|No aplica.|

## ⚙️ Parámetros

|**Parámetro**|**Tipo**|**Obligatorio**|**Descripción**|
|---|---|---|---|
|`caras`|`Integer`|**Sí**|Las caras que tendrá el dado. El valor debe estar **entre 2 y 300**.|
|`cantidad`|`Integer`|No|Cantidad de dados que se van a tirar (**entre 1 y 12**). Por defecto: _1_.|

## 🚀 Uso y Ejemplos

### Sintaxis

`/tirar-dados caras:<numero> [cantidad:<numero>]`

### Ejemplos

> [!EXAMPLE] Un dado estándar de 6 caras (D6) `/tirar-dados caras:6`

> [!EXAMPLE] Tirada múltiple (ej. Daño de un arma en un juego de rol usando 3 D8) `/tirar-dados caras:8 cantidad:3`

## ⚠️ Lógica de Funcionamiento

> [!IMPORTANT] Procesamiento de la Tirada Al ejecutar el comando, el bot realiza las siguientes acciones:
> 
> 1. **Validación de Discord:** Discord bloquea automáticamente el envío del comando si el usuario intenta ingresar un número fuera de los límites establecidos (ej. menos de 2 caras o más de 12 dados), gracias a las propiedades `minValue` y `maxValue` configuradas en las opciones.
>     
> 2. **Generación Aleatoria:** El bot itera la cantidad de veces especificada, generando un número completamente aleatorio entre 1 y la cantidad de caras indicadas para cada dado.
>     
> 3. **Cálculo y Respuesta:** Se suman los resultados individuales de cada dado. El bot envía una respuesta que incluye un desglose con el resultado de cada dado lanzado y la suma total final.
>     

## 🔗 Relacionados

- [[ping|Comando /ping]]