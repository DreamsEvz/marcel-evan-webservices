1) La différence entre un patch et un put réside dans la quantité de donnée que nous allons mettre à jour.
Un put sera utilisé pour update une grande quantité d'information sur notre donnée tandi que patch sera utilisé pour n'update qu'un champs

2) Même si la requête semble être la même le user-agent (donnée qui défini depuis quel outil notre requête est envoyé) peu être bloqué par le serveur web d'arrivé.

3) Les serveurs web sont très utile pour tout ce qui va être load balacing ou stabilité en général. Ils sont aussi essentiel pour la gestion de la sécurité
tel que pour la gestion des cors ou de certificats SSL (même si les cors peuvent être géré côté code ils le sont plus souvent côté serveur)
Il peuvent aussi gérer toute sorte de redirection sur notre application

4) La mise en cache des donnée est le premier axe d'optimisation. Optimisation et la limitation des requête en base de donnée (souvent une des actions les plus couteuse en temps dans une requête http)
et enfin la compression des données notamment avec Gzip