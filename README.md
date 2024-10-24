PixelArt RPG Battle System 🎮

Benvenuto nel progetto PixelArt RPG Battle System! 🚀
Si tratta di un semplice ma avvincente Gioco di Ruolo (GDR) in stile Pixel Art, con un sistema di scontri automatici tra personaggi, sviluppato con Laravel.
Descrizione del Progetto

In questo GDR, i giocatori possono esplorare una sezione dedicata ai Personaggi (Characters), visualizzando le loro statistiche e dettagli tramite card interattive. Ogni personaggio ha delle statistiche dinamiche (Forza, Intelletto, Difesa, Velocità e Vita) che influenzano il sistema di combattimento. Le loro classi determinano il colore dinamico del nome per una migliore esperienza visiva.
Funzionalità principali

    Sezione Characters: Visualizzazione dei personaggi sotto forma di card, contenenti:
        Nome (colorato dinamicamente in base alla classe)
        Descrizione del personaggio
        Statistiche principali (Forza, Intelletto, Difesa, Velocità, Vita)

    Show Character: Possibilità di approfondire i dettagli del personaggio in una vista dedicata.

    Scontro tra Personaggi: Avvio di un combattimento automatico tra il personaggio scelto e un avversario casuale.
        Il personaggio con velocità maggiore attacca per primo.
        Se la velocità di un personaggio è almeno il doppio dell'avversario, può attaccare due volte in un turno.
        Il danno inflitto è calcolato come:
        Forza + Intelletto - Difesa dell'avversario.
        Sistema bilanciato per garantire equità tra classi con attacchi a distanza e corpo a corpo.

    Probabilità di Miss e Critici: Ogni attacco ha una probabilità del 20% di mancare (Miss) e una probabilità del 20% di infliggere un colpo critico.

    Combact Log: Durante lo scontro, un registro visualizza i danni inflitti, i Miss e altre informazioni rilevanti.

    Condizione di Vittoria: Il combattimento termina quando uno dei due personaggi perde tutta la sua vita.

Tecnologie Utilizzate

    Laravel: Framework PHP per lo sviluppo del backend e delle funzionalità di gioco.
    Pixel Art: Grafica retrò per i personaggi e l'interfaccia utente.
    Blade: Motore di template utilizzato per creare le viste dinamiche del gioco.
    MySQL: Database per la gestione dei personaggi e delle battaglie.
