# XOLIT_FrontendTechnicalTest (Sistema de Reservas de Espacios Compartidos)

Prueba técnica para el Frontend. Este proyecto es un desarrollo en Angular, para consumir las APIs creadas en .Net 8

---

## Requisitos Previos

Antes de comenzar, asegúrese de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) (versión 16 o superior)
- [Angular CLI](https://angular.io/cli) (versión 15 o superior)
- Un editor de texto o IDE como [Visual Studio Code](https://code.visualstudio.com/)
- Backend del sistema en ejecución (consulte el [README del backend](<URL_DE_REPOSITORIO_BACKEND>))

---

## Instalación

Siga estos pasos para configurar el proyecto localmente:

1. Clone este repositorio en su máquina local:

2. Instale las dependencias del proyecto:
   ```bash
   npm install
   ```

---

## Configuración

### Variables de Entorno

Cree un archivo `src/environments/environment.ts` con el siguiente contenido para configurar la URL base del backend:

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7085/api' // URL del backend
};
```
---

## Ejecución del Proyecto

Para ejecutar el proyecto en modo de desarrollo:

```bash
ng serve
```

Abra su navegador y acceda a: [http://localhost:4200](http://localhost:4200).

---

## Funcionalidades

- **Rservas**: Visualización general de las reservas existentes.
- **Crear Nueva Reserva**: Permite seleccionar un cliente, espacio compartido, y rango de fechas para crear una nueva reserva.
- **Editar Reserva**: Modifica las fechas de una reserva existente.
- **Eliminar Reserva**: Permite eliminar una reserva existente previa confirmación.

---

## Tecnologías Utilizadas

- **Angular**: Framework principal para el desarrollo del frontend.
- **Angular Material**: Librería de componentes de interfaz de usuario.
- **RxJS**: Para manejar la reactividad y las llamadas HTTP.

---

## Consideraciones

- Asegúrese de que el backend esté en ejecución antes de utilizar la aplicación.
- El frontend y el backend deben estar configurados para comunicarse mediante CORS si están en dominios diferentes.

---
