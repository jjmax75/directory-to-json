docker rm jjmax-get-folder-list

docker run -d -it -p 9999:3000 --restart unless-stopped --name=jjmax-get-folder-list jjmax/directory-to-json npm run start