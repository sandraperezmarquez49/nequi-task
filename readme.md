# Nequi - task: node v18.20.4
# Instalacion npm i y luego ionic serve parta correr en local
 
 # Compilar:
 # android:
ionic build --prod --release
npx cap add android        
npx capacitor-resources -p android,ios
ionic cap build android --prod
npx cap open android

carpeta con apk y key: tienda-Android
llave: keyStorePath
key alias: nequi01 
key pass: nequi01

tambien el apk esta en la carpeta: https://drive.google.com/file/d/1Eqhi4tG3TI3m-h2UTmpWHzYrh1lvipkA/view

# Ios:
npx cap sync ios
npx cap open ios


# Notas: en el correo se especifican la creacion de esta app, se envian fotos de como compilo para Ios.