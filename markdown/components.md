# Características del Banner
Color: #3AAFA9
Titulo: "Ventas y contacto: 554389897"
ColorTexto: #FFFFFF

# Instrucciones de generación del Banner
Genera un banner con las siguientes características:
- El título debe ser [Titulo]. Pero antes del número de contacto, debe haber un ícono de WhatsApp de color con fondo de color [Color].
- El Titulo debe ser un parámetro con nombre title para que se pueda cambiar fácilmente.
- Color del banner debe ser un parámetro con nombre colorpara que se pueda cambiar fácilmente.
- Al hacer un clic en el número de contacto debe abrir WhatsApp en una nueva pestaña con el número de contacto. Instala la librería react-whatsapp para esto.
- El banner debe ser responsive y verse bien en dispositivos móviles y de escritorio. Debe ocupar todo el ancho de la pantalla.
- El banner debe tener un padding de 10px en dispositivos móviles y 20px en dispositivos de escritorio.
- El banner debe tener un margen inferior de 10px.
- El texto debe estar centrado verticalmente y horizontalmente y debe ser de color [ColorTexto].
- El banner debe tener un borde redondeado de 5px.
- El banner debe tener una alto de 33px en dispositivos móviles y 30px en dispositivos de escritorio.
-El componente del banner debe estar guardado en la carpeta src/components/Banner.js
-El código javascript que se utilice debe crearse como un custo hook en la carpeta src/hooks/useBanner.js y debes importar su referencia y uso dentro del componente del banner.
 - Dentro de la carpeta examples crea un archivo llamado BannerExample.js donde se importe y use el componente del banner.

# Instrucciones de generación del Banner

EL componente del banner debe estar guardado en la carpeta src/components/Banner.jsx debe colocarse hasta arriba y ocupar todo el ancho de la pantalla. El código javascript que se utilice debe crearse como un custo hook en la carpeta src/hooks/useBanner.jsx y debes importar su referencia y uso dentro del componente del banner. Dentro de la carpeta examples crea un archivo llamado BannerExample.jsx donde se importe y use el componente del banner. Finalmente importa y usa el componente Banner dentro del archivo App.jsx

# Colocar banner arriba del archivo portal
- Coloca el componente Banner dentro del archivo portal.jsx pero hasta arriga y que ocupe todo el ancho de la pantalla y no se vea afectado por los margenes del contenedor padre. El valor del texto será Ventas y contacto: 5543899897

# Baner de productos
Crea un banner llamado BannerProducts parecido al banner como el que esta guardado en src/components/Banner.jsx pero que a la derecha deje un espacio para un logo que diga ALIN en letras blancas y sin fondo(Asegurate de crear este logo con un tipo de letra adecuado y grueso). De lado de la derecha que tenga las opciones Papeleria, Regalos, Fiestas, Accesorios de Telefonia y Accesorios de computo, cada una con un icono representativo. Cada que se coloque el puntero del mouse sobre cada opción debe agrandarse el icono y el texto de forma parecida al componente que esta components/Banner.jsx. El texto cuando se enfoque debe cambiar de color a #3fb4e6ff. Es importante que cuando se enfoque en el banner el puntero este no se degrade. Por ultimo debes colocar este banner debajo del banner de contacto que ya creaste en el archivo portal.jsx. Deben estar pegados y no debe haber espacio entre ellos. El código javascript que se utilice debe crearse como un custom hook en la carpeta como src/hooks/useProductBanner.jsx y debes importar su referencia y uso dentro del componente BannerProducts. Dentro de la carpeta examples crea un archivo llamado ProductBannerExample.jsx donde se importe y use el componente del banner.