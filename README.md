# VORWORT UND CREDITS

Da ich bei allen Anleitungen und Dokumentationen zur Erstellung von Scratch-3-Erweiterungen auf diverse Probleme und Error, meist aufgrund diverser Paket-Inkompatibilitäten, gestoßen bin habe ich nach langer Eigenrecherche die folgende Anleitung zur Erstellung von Scratch-3-Erweiterungen zusammengetragen.

Informationen zur Erstellung der Anleitung sind zum Großteil der folgenden Seite entnommen. <br />
https://medium.com/@hiroyuki.osaki/how-to-develop-your-own-block-for-scratch-3-0-1b5892026421


Als Grundlage für die Projekte scratch-vm und scratch-gui sowie für Tests mit den enthaltenen Scratch-Erweiterungen hat das folgende GitHub-Repository gedient. <br />
https://github.com/MrYsLab/s3onegpio


# ANLEITUNG

## 1. ENTWICKLUNGSUMGEBUNG VORBEREITEN

### 1.1. RASPBERRY-PI-OS
	
- [ ] nvm-Verion-Manager installieren.	

	curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash

- [ ] Optional: npm-Cache bereinigen und NodeJS und npm vom Sytem entfernen.

	sudo npm cache clean --force
	sudo apt remove nodejs npm
	
- [ ] Node-Version-Manager und damit NodeJS-Version 16.0.0 und npm neu installieren.

	sudo npm install --global n
	sudo n 16.0.0

- [ ] NodeJS-Version überprüfen. <br />
(Ausgabe sollte nun v16.0.0 sein.)

	node --version

- [ ] yarn installieren. <br />
(Oft wird npm, anstelle von yarn, verwendet aber mit yarn hat es bei mir ohne Error funktioniert.)

	sudo npm install --global yarn

- [ ] GitHub-Repository über folgenden Link herunterladen und entpacken.

https://github.com/Menersar/scratch-extensions

### 1.2. WINDOWS 10, WINDOWS 11

1. Optional: NodeJS deinstallieren.
winget uninstall Node.js

2. NodeJS-Version 16.0.0 installieren.
winget install OpenJS.NodeJS --version 16.0.0

3. Yarn installieren.
winget install Yarn.Yarn

4.  Den Module-Bundler webpack mit yarn installieren.
(Hauptsächlich verwendet, um JavaScript-Dateien für Browsernutzung zu bündeln)
yarn add webpack --dev


cd scratch-gui && npm start




## 2. SCRATCH-PROJEKTE INSTALLIEREN
		
Die Projekte scratch-vm und scratch-gui müssen zusammen modifiziert und kompiliert werden, deshalb sollten sie, über folgende Terminal-Befehle, verbunden werden. <br />
(Das Projekt scratch-gui wird als Parent-Project festgelegt, scratch-vm wird mit dem Parent verbunden.)

	cd scratch-extensions
	cd scratch-vm 
	cd yarn install 
	cd yarn link
	cd ..
	cd scratch-gui 
	yarn link scratch-vm 
	yarn install
		
## 3. GUI STARTEN
		
- [ ] Wechseln in den scratch-gui-Ordner über folgende Terminal-Befehl.
	
	cd scratch-gui

- [ ] Starten der Scratch-GUI über folgende Terminal-Befehl.
	
	yarn start

Ist der Kompilierungsvorgang erfolgreich, wird folgendes im Terminal ausgegeben und der Scratch-Service startet.

	Compiled successfully.

Die Scratch-Oberfläche kann dann über folgende Adresse aufgerufen werden. <br />
http://localhost:8601

Die Adresse der Scratch-Oberfläche wird unter anderem während des Kompilierungsvorgangs im Terminal, wie folgt, ausgegeben.
	
	Project is running at http://0.0.0.0:8601/

Ist das Kompilieren erfolgreich, werden Änderungen, wie neue Erweiterungen, übernommen und in der Scratch-GUI dargestellt.

Das Speichern von Änderungen in den Projekten **scratch-vm** oder **scratch-gui** löst nun zudem automatisch einen erneute Kompilierungsvorgang aus. <br />
(Solange der Scratch-Service auf http://0.0.0.0:8601/ läuft.)


## 4. SCRATCH-BLOCK IMPLEMENTIEREN	
		
Jede Extension kann einen oder mehrere Blöcke haben
	
- [ ] Einen Ordner in folgendem Pfad hinzufügen.

(Den Ordner scratch3_EXTENSION-NAME benennen; statt EXTENSION-NAME den Namen der neuen Erweiterung angeben.)

	scratch-vm/src/extensions/scratch3_EXTENSION-NAME


- [ ] In dem Ordner eine neue Datei, wie folgt, anlegen.

(Die Datei index.js benennen.)

	scratch-vm/src/extensions/scratch3_EXTENSION-NAME/index.js

- [ ] In der Datei werden die Blöcke der Erweiterung angegeben und definiert.

- [ ] Die Datei, die der Implementierung des Erweiterungsmenüs dient, zu finden unter folgendem Pfad, öffnen.

	scratch-vm/src/extension-support/extension-manager.js

- [ ] In der Datei die neue Erweiterung, wie folgt, angeben und so dem Projekt als Erweiterung hinzufügen.
Die Zeile EXTENSION-ID: () => require ('EXTENSION-RELATIVE-PATH') in der Datei hinzufügen. <br />
(Statt EXTENSION-ID die ID der neuen Extension (aus index.js) angeben.) <br />
(Statt EXTENSION-RELATIVE-PATH den Pfad zu scratch3_EXTENSION-NAME angeben.)

	newblocks: () => require('../extensions/scratch3_EXTENSION-NAME')

## 5. GUI IMPLEMENTIEREN 

Der neu implementierte Scratch-Block muss noch in die Erweiterungsbibliothek von Scratch hinzugefügt werden.
	
- [ ] Um die Erweiterung mit einem Bild in der Erweiterungsbibliothek darzustellen einen Ordner wie folget, in dem angegebenen Pfad, hinzufügen.
Den Ordner EXTENSION-NAME bennennen. <br />
(Keine Pflicht, aber Erweiterung einfacher wiederzufinden.) <br />
(Statt EXTENSION-NAME entsprechend den Namen der neuen Erweiterung angeben.)

	scratch-gui/src/lib/libraries/extensions/EXTENSION-NAME

- [ ] In den Ordner zwei Bilder, für die Darstellung der Erweiterung in der Scratch-Bibliothek, wie folgt platzieren.
Die Größe der Bilddatei für den Hintergrund des Eintrags sollte 600 x 372, die Größe des Icons 180 x 180 betragen. <br />
(Als Format habe ich png, jpg und svg auf korrekte Funktionsweise getestet.) <br />

Die Bilddatei für den Hintergrund EXTENSION-NAME.IMAGE-FORMAT benennen, für das Icon EXTENSION-NAME-small.IMAGE-FORMAT. <br />
(Keine Pflicht, aber Assets der Erweiterung einfacher wiederzufinden.) <br /> 
(Statt EXTENSION-NAME den Namen der neuen Erweiterung angeben.) <br />
(Statt IMAGE-FORMAT das entsprechende Format der jeweiligen Bilddatei der neuen Erweiterung angeben.)

	scratch-gui/src/lib/libraries/extensions/EXTENSION-NAME/EXTENSION-NAME-small.IMAGE-FORMAT
	scratch-gui/src/lib/libraries/extensions/EXTENSION-NAME/EXTENSION-NAME.IMAGE-FORMAT

- [ ] Die Datei index.jsx, zu finden unter folgendem Pfad, öffnen.	
	
	scratch-gui/src/lib/libraries/extensions/index.jsx
	
- [ ] In der Datei alle notwendigen Informationen und Referenzen für die Darstellung der neuen Erweiterung in der Scratch-Bibliothek angeben.
	
- [ ] Die Scratch-GUI starten, siehe dazu 3 GUI starten.
