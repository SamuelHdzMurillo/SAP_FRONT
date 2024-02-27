echo "cambiando a rama main"

git checkout main

echo "creando aplicacion"

npm run build


echo "subiendo archivos al servidor" 

scp -r dist/* sam@146.190.47.61:/var/www/146.190.47.61/

echo "proceso terminado"