### Veelvoorkomende Problemen

1.  ### Gebruikersnaam verifiëren mislukt

    **Probleem:** Sommige spelers melden problemen bij het inloggen op de server, waaronder een foutmelding "Gebruikersnaam verifiëren mislukt".

    **Oorzaak:** Dit heeft te maken met authenticatie, meestal met de instelling om proxyverbindingen te voorkomen.

    **Oplossing:** Schakel `prevent_proxy_connections` uit in `pumpkin.toml`

2.  ### Kan geen verbinding maken via 0.0.0.0

    **Probleem:** Spelers die verbinding proberen te maken met een server op hun eigen computer kunnen geen verbinding krijgen (bijv. foutmelding "Connection refused") bij het invoeren van `0.0.0.0` of `0.0.0.0:25565`.

    **Oorzaak:** In `pumpkin.toml` geeft `0.0.0.0` aan dat Pumpkin moet luisteren op alle netwerkinterfaces. Dit is een bind-adres voor de server, geen geldig doeladres waarmee een Minecraft-client verbinding kan maken.

    **Oplossing:**
    - Als je vanaf **dezelfde computer** verbindt, gebruik dan `localhost` of `127.0.0.1`.
    - Als je verbindt vanaf een **ander apparaat op hetzelfde lokale netwerk (LAN)**, gebruik dan het lokale IP-adres van de host (bijv. `192.168.x.x`).
    - Als spelers via het **internet** verbinden, moeten ze je openbare IP-adres of domeinnaam gebruiken (met poortdoorschakeling/port forwarding ingeschakeld op de router).
