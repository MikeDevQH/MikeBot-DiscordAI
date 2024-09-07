# MikeBot-DiscordAI 🤖

MikeBot es un bot de Discord basado en inteligencia artificial, diseñado para interactuar de manera amigable y eficiente en servidores de Discord. Utiliza el modelo de lenguaje Gemini de Google Generative AI para proporcionar respuestas inteligentes y útiles en conversaciones.

## 🚀 Características

- **Interacción Inteligente**: Responde a mensajes en canales específicos con inteligencia artificial, manteniendo una personalidad amigable y profesional.
- **Personalidad Configurable**: La personalidad del bot puede ser ajustada mediante un archivo de texto para adaptar su estilo de respuesta.
- **Configuración de Canales**: Permite a los administradores del servidor configurar qué canales pueden interactuar con la IA.

## 🛠️ Instalación

Sigue estos pasos para instalar y configurar el bot en tu entorno local:

1. **Clona el repositorio**:
    ```bash
    git clone https://github.com/MikeDevQH/MikeBot-DiscordAI.git
    cd MikeBot-DiscordAI
    ```

2. **Instala las dependencias**:
    ```bash
    npm install
    ```

3. **Configura tus variables de entorno**:
   - Crea un archivo `.env` en la raíz del proyecto.
   - Agrega tus credenciales de API de [Google Generative AI API](https://ai.google.dev/gemini-api?hl=es-419) en el archivo `.env`:
     ```plaintext
     GEMINI_API_KEY=tu_clave_de_api
     ```

4. **Configura la base de datos**:
   - Asegúrate de tener MongoDB instalado y en ejecución.
   - Conéctate a tu base de datos MongoDB y asegúrate de que la URI esté correctamente configurada en tu archivo de configuración.

5. **Inicia el bot**:
    ```bash
    node index.js
    ```

## 🗨️ Uso

1. **Comando para Configurar Canales**:
   - Usa el comando `/setchannel-ia` para especificar en qué canales el bot debe responder.

2. **Personalización**:
   - Edita el archivo `personality.txt` para ajustar la personalidad del bot. La personalidad del bot se define en este archivo y se utilizará en las respuestas del bot.

## 🛠️ Contribuciones

Las contribuciones son bienvenidas. Por favor, sigue estos pasos para contribuir al proyecto:

1. Haz un fork del repositorio.
2. Crea una rama para tu funcionalidad o corrección de errores.
3. Realiza tus cambios y prueba el bot.
4. Envía un pull request con una descripción clara de tus cambios.

## 📜 Licencia

Este proyecto está licenciado bajo la [MIT License](LICENSE).

## 📧 Contacto

Si tienes alguna pregunta o necesitas ayuda adicional, no dudes en contactarme:

- **Nombre**: Michael
- **GitHub**: [MikeDevQH](https://github.com/MikeDevQH)
- **Discord**: [MichaelQhdez](https://discord.com/users/925933412710232105)

