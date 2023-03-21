# INHALTSVERZEICHNIS
1. [Vorwort und Credits](#h0)
2. [Anleitung](#h1)
	1. [Entwicklungsumgebung vorbereiten](#h1-1)
		1. [Raspberry Pi OS](#h1-1-1)
		2. [Windows 10, 11](#h1-1-2)
	2. [Scratch-Pakete installieren](#h2)
	3. [GUI starten](#h3)
	4. [GUI aufrufen](#h4)
	5. [Scratch-Block implementieren](#h5)
	6. [GUI implementieren](#h6)

# VORWORT UND CREDITS <a name="h0"></a>

Da ich bei allen Anleitungen und Dokumentationen zur Erstellung von Scratch-3-Erweiterungen auf diverse Probleme und Fehler, meist aufgrund diverser Paket-Inkompatibilitäten und veralteten Anleitungen, gestoßen bin, habe ich nach Eigenrecherche die folgende Anleitung zur Erstellung von Scratch-3-Erweiterungen zusammengetragen.

Den Großteil der Informationen zur Erstellung dieser Anleitung sind der folgenden Seite entnommen. <br />
https://medium.com/@hiroyuki.osaki/how-to-develop-your-own-block-for-scratch-3-0-1b5892026421


Folgendes Repository wurde als Grundlage der Pakete `scratch-vm` und `scratch-gui` sowie für Tests neuer Scratch-Erweiterungen verwendet. <br />
https://github.com/MrYsLab/s3onegpio

# ANLEITUNG <a name="h1"></a>

## 1. ENTWICKLUNGSUMGEBUNG VORBEREITEN <a name="h1-1"></a>

### – RASPBERRY-PI-OS – <a name="h1-1-1"></a>
	
- [ ] nvm-Verion-Manager installieren.	
```console
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

- [ ] Optional: npm-Cache bereinigen und NodeJS und npm vom Sytem entfernen.
```console
sudo npm cache clean --force
sudo apt remove nodejs npm
```

- [ ] Node-Version-Manager und damit NodeJS-Version 16.0.0 und npm neu installieren.
```console
sudo npm install --global n
sudo n 16.0.0
```

- [ ] Optional: NodeJS-Version überprüfen. <br />
(Ausgabe sollte `v16.0.0` sein.)
```console
node --version
```

- [ ] yarn installieren. <br />
(Viele Anleitungen verwenden `npm`; zuverlässig hat bei mir `yarn` funktioniert.)
```console
sudo npm install --global yarn
```

- [ ] GitHub-Repository über folgenden Link herunterladen und entpacken. <br />
https://github.com/Menersar/scratch-extensions

---

### – WINDOWS 10, 11 – <a name="h1-1-2"></a>

- [ ] Optional: NodeJS deinstallieren. <br />
```console
winget uninstall Node.js
```

- [ ] NodeJS-Version 16.0.0 installieren. <br />
```console
winget install OpenJS.NodeJS --version 16.0.0
```

- [ ] Optional: NodeJS-Version überprüfen. <br />
(Ausgabe sollte `v16.0.0` sein.)
```console
node --version
```

- [ ] yarn installieren. <br />
(In vielen Anleitungen wird auch npm verwendet; bei mir hat yarn zuverlässig funktioniert.)
```console
winget install Yarn.Yarn
```

- [ ] webpack mit yarn installieren. <br />
(Hauptsächlich verwendet, um JavaScript-Dateien für Browsernutzung zu bündeln.)
```console
yarn add webpack --dev
```

- [ ] GitHub-Repository über folgenden Link herunterladen und entpacken. <br />
https://github.com/Menersar/scratch-extensions

## 2. SCRATCH-PAKETE INSTALLIEREN <a name="h2"></a>
		
Installieren und Verbinden von `scratch-vm` und `scratch-gui`, um sie zusammen zu modifizieren und kompilieren zu können. <br />
(scratch-gui wird als Parent-Projekt festgelegt, scratch-vm wird mit dem Parent verbunden.)

- [ ] Wechseln in den scratch-vm-Ordner.
```console
cd scratch-extensions
cd scratch-vm
```

- [ ] scratch-vm installieren und als Ziel für das Verbinden festlegen.
```console
yarn install
yarn link
```

- [ ] Wechseln in den scratch-gui-Ordner.
```console
cd ..
cd scratch-gui 
```

- [ ] scratch-gui mit scratch-vm verbinden und installieren.
```console
yarn link scratch-vm 
yarn install
```

## 3. GUI STARTEN <a name="h3"></a>

- [ ] Wechseln in den scratch-gui-Ordner.
```console	
cd scratch-gui
```

- [ ] Starten der Scratch-GUI.
```console
yarn start
```

<br />

Bei erfolgreichem Kompilieren wird `Compiled successfully.` im Terminal ausgegeben und der Scratch-Service startet.

## 4. GUI AUFRUFEN <a name="h4"></a>

- [ ] Aufrufen der Scratch-Oberfläche über folgende Adresse. <br />
http://localhost:8601

<br />

Die Adresse wird während des Kompilierens mit `Project is running at http://0.0.0.0:8601/` im Terminal ausgegeben.

Änderungen, wie neue Erweiterungen, werden in der Scratch-GUI nach erfolgreichem Kompilieren übernommen und dargestellt.

Speichern von Änderungen in `scratch-vm` oder `scratch-gui` löst einen Kompilierungsvorgang automatisch aus. <br />
(Solange der Scratch-Service auf `http://0.0.0.0:8601/` läuft.)

## 5. SCRATCH-BLOCK IMPLEMENTIEREN <a name="h5"></a>
		
Jede Extension kann einen oder mehrere Blöcke besitzen.
	
- [ ] Neuen Ordner `scratch3_EXTENSION-NAME` in folgendem Pfad hinzufügen. <br />
(Statt `EXTENSION-NAME` den Namen der neuen Erweiterung angeben.)
```console
scratch-vm/src/extensions/scratch3_EXTENSION-NAME
```

- [ ] Neue Datei `index.js` in dem Ordner anlegen. <br />
```console
scratch-vm/src/extensions/scratch3_EXTENSION-NAME/index.js
```

- [ ] Angeben und Definieren der Erweiterungs-Blöcke in der Datei.

- [ ] Datei zur Implementierung des Erweiterungsmenüs öffnen.
```console
scratch-vm/src/extension-support/extension-manager.js
```

- [ ] In der Datei die neue Erweiterung, über `EXTENSION-ID: () => require ('EXTENSION-RELATIVE-PATH')`, dem Projekt hinzuzufügen. <br />
(Statt `EXTENSION-ID` die ID der neuen Extension (aus `index.js`) angeben.) <br />
(Statt `EXTENSION-RELATIVE-PATH` den Pfad zu `scratch3_EXTENSION-NAME` angeben.) <br />
(Statt `EXTENSION-NAME` den Namen der neuen Erweiterung angeben.)
```javascript
EXTENSION-ID: () => require('../extensions/scratch3_EXTENSION-NAME')
```

## 6. GUI IMPLEMENTIEREN <a name="h6"></a>

Zur Nutzung der neu implementierten Scratch-Erweiterung muss sie in die Erweiterungsbibliothek von Scratch hinzugefügt werden. <br />

- [ ] Optional: Zur visuellen Darstellung der neuen Erweiterung in der Scratch-Bibliothek, Anlegen des Ordners `EXTENSION-NAME`. <br />
(Statt `EXTENSION-NAME` den Namen der neuen Erweiterung angeben.) <br />
```console
scratch-gui/src/lib/libraries/extensions/EXTENSION-NAME
```

- [ ] Optional: Platzieren der Bilddateien `EXTENSION-NAME.IMAGE-FORMAT` und `EXTENSION-NAME-small.IMAGE-FORMAT` im neuen Ordner. <br />
(Hintergrund: `EXTENSION-NAME.IMAGE-FORMAT`, `600 x 372`; Icon: `EXTENSION-NAME-small.IMAGE-FORMAT`, `180 x 180`.) <br />
(Statt `EXTENSION-NAME` Namen der neuen Erweiterung angeben.) <br />
(Statt `IMAGE-FORMAT` Format der jeweiligen Bilddatei angeben; getestete Formate: `png`, `jpg` und `svg`.) <br />
```console
scratch-gui/src/lib/libraries/extensions/EXTENSION-NAME/EXTENSION-NAME-small.IMAGE-FORMAT
scratch-gui/src/lib/libraries/extensions/EXTENSION-NAME/EXTENSION-NAME.IMAGE-FORMAT
```

- [ ] Öffnen der Datei `index.jsx`.	
```console
scratch-gui/src/lib/libraries/extensions/index.jsx
```

- [ ] Angeben notwendiger Informationen und Referenzen in der Datei zur Darstellung der neuen Erweiterung in der Scratch-Bibliothek.
	
- [ ] [Starten der Scratch-GUI.](https://github.com/Menersar/scratch-extensions/edit/main/README.md#3-gui-starten)