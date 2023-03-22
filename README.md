# INHALTSVERZEICHNIS
[Vorwort und Credits](#h0) <br /> <br />
[Anleitung](#h1)
1. [Entwicklungsumgebung vorbereiten](#h1-1)
	1. [Raspberry Pi OS](#h1-1-1)
	
	2. [Windows 10, 11](#h1-1-2)

2. [Scratch ausführen](#h1-2)
	1. [Scratch-Pakete installieren](#h1-2-1)
	
	2. [Scratch-GUI starten](#h1-2-2)
	
	3. [Scratch-GUI aufrufen](#h1-2-3)

3. [Scratch-Erweiterung implementieren](#h1-3)
	1. [Scratch-Block implementieren](#h1-3-1)
	
	2. [Scratch-GUI implementieren](#h1-3-2)

[Beispiele](#h2)
1. [Scratch-Erweiterung implementieren](#h2-1)
	1. [Scratch-Block implementieren](#h2-1-1)

	3. jjhjh

# VORWORT UND CREDITS <a name="h0"></a>

Da ich bei allen Anleitungen und Dokumentationen zur Erstellung von Scratch-3-Erweiterungen auf diverse Probleme und Fehler, meist aufgrund diverser Paket-Inkompatibilitäten und veralteten Anleitungen, gestoßen bin, habe ich nach Eigenrecherche die folgende Anleitung zur Erstellung von Scratch-3-Erweiterungen zusammengetragen.

Den Großteil der Informationen zur Erstellung dieser Anleitung sind der folgenden Seite entnommen. <br />
https://medium.com/@hiroyuki.osaki/how-to-develop-your-own-block-for-scratch-3-0-1b5892026421


Folgendes Repository wurde als Grundlage der Pakete `scratch-vm` und `scratch-gui` sowie für Tests neuer Scratch-Erweiterungen verwendet. <br />
https://github.com/MrYsLab/s3onegpio

# ANLEITUNG <a name="h1"></a>

## 1. ENTWICKLUNGSUMGEBUNG VORBEREITEN <a name="h1-1"></a>

### – RASPBERRY-PI-OS – <a name="h1-1-1"></a>
	
- [ ] Optional: Bereinigen des `npm`-Cache und Entfernen von `NodeJS` und `npm` vom System.
```console
sudo npm cache clean --force
sudo apt remove nodejs npm
```

- [ ] Installieren des `npm`-Version-Managers, `n`, und damit Neuinstallieren von `NodeJS v16.0.0`.
```console
sudo npm install --global n
sudo n 16.0.0
```

- [ ] Optional: Überprüfen der `NodeJS`-Version. <br />
(Ausgabe sollte `v16.0.0` zurückgeben.)
```console
node --version
```

- [ ] Installiernen von `yarn`. <br />
(Viele Anleitungen verwenden `npm`; zuverlässig hat es bei mir mit `yarn` funktioniert.)
```console
sudo npm install --global yarn
```

- [ ] Herunterladen und Entpacken des GitHub-Repositories `scratch-extension`. <br />
https://github.com/Menersar/scratch-extensions

---

### – WINDOWS 10, 11 – <a name="h1-1-2"></a>

- [ ] Optional: Deinstallieren von `NodeJS`. <br />
```console
winget uninstall Node.js
```

- [ ] Installieren von `NodeJS v16.0.0`. <br />
```console
winget install OpenJS.NodeJS --version 16.0.0
```

- [ ] Optional: Überprüfen der `NodeJS`-Version. <br />
(Ausgabe sollte `v16.0.0` zurückgeben.)
```console
node --version
```

- [ ] Installieren von `yarn`. <br />
(Viele Anleitungen verwenden `npm`; zuverlässig hat es bei mir mit `yarn` funktioniert.)
```console
winget install Yarn.Yarn
```

- [ ] Installieren von `webpack` mit `yarn`. <br />
(Hauptsächlich verwendet, um JavaScript-Dateien für Browsernutzung zu bündeln.)
```console
yarn add webpack --dev
```

- [ ] Herunterladen und Entpacken des GitHub-Repositories `scratch-extension`. <br />
https://github.com/Menersar/scratch-extensions

## 2. SCRATCH AUSFÜHREN <a name="h1-2"></a>
### 2.1. SCRATCH-PAKETE INSTALLIEREN <a name="h1-2-1"></a>
		
Installieren und Verbinden von `scratch-vm` und `scratch-gui`, um sie zusammen zu modifizieren und kompilieren zu können. <br />
(scratch-gui wird als Parent-Projekt festgelegt, scratch-vm wird mit dem Parent verbunden.)

- [ ] Wechseln in den Ordner [scratch-vm](/scratch-vm).
```console
cd scratch-extensions
cd scratch-vm
```

- [ ] Installieren von `scratch-vm` und Festlegen als Ziel für das Verbinden.
```console
yarn install
yarn link
```

- [ ] Wechseln in den Ordner [scratch-gui](/scratch-gui).
```console
cd ..
cd scratch-gui 
```

- [ ] Verbinden und Installieren von `scratch-gui` mit `scratch-vm`.
```console
yarn link scratch-vm 
yarn install
```

### 2.2. SCRATCH-GUI STARTEN <a name="h1-2-2"></a>

- [ ] Wechseln in den Ordner [scratch-gui](/scratch-gui).
```console	
cd scratch-gui
```

- [ ] Starten der Scratch-GUI.
```console
yarn start
```

<br />

Bei erfolgreichem Kompilieren wird `Compiled successfully.` im Terminal ausgegeben und der Scratch-Service startet.

### 2.3. SCRATCH-GUI AUFRUFEN <a name="h1-2-3"></a>

- [ ] Aufrufen der Scratch-Oberfläche über folgende Adresse. <br />
http://localhost:8601

<br />

Die Adresse wird während des Kompilierens mit `Project is running at http://0.0.0.0:8601/` im Terminal ausgegeben.

Änderungen, wie neue Erweiterungen, werden in der Scratch-GUI nach erfolgreichem Kompilieren übernommen und dargestellt.

Speichern von Änderungen in `scratch-vm` oder `scratch-gui` löst einen Kompilierungsvorgang automatisch aus. <br />
(Solange der Scratch-Service auf `http://0.0.0.0:8601/` läuft.)

## 3. SCRATCH-ERWEITERUNG IMPLEMENTIEREN <a name="h1-3"></a>
### 3.1. SCRATCH-BLOCK IMPLEMENTIEREN <a name="h1-3-1"></a>
		
Jede Extension kann einen oder mehrere Blöcke besitzen.
	
- [ ] Hinzufügen des Ordners `scratch3_EXTENSION-NAME` dem folgenden [Pfad](/scratch-vm/src/extensions). <br />
(Statt `EXTENSION-NAME` den Namen der neuen Erweiterung angeben.)
```console
scratch-vm/src/extensions/scratch3_EXTENSION-NAME
```

- [ ] Anlegen der Datei `index.js` in dem Ordner. <br />
```console
scratch-vm/src/extensions/scratch3_EXTENSION-NAME/index.js
```

- [ ] Angeben und Definieren der Erweiterungs-Blöcke in der Datei.

- [ ] Öffnen der Datei [extension-manager.js](/scratch-vm/src/extension-support/extension-manager.js) zur Implementierung des Erweiterungsmenüs.
```console
scratch-vm/src/extension-support/extension-manager.js
```

- [ ] Hinzufügen der neuen Erweiterung, über die Zeile `EXTENSION-ID: () => require ('EXTENSION-RELATIVE-PATH')`, in der Datei. <br />
(Statt `EXTENSION-ID` die ID der neuen Extension (aus `index.js`) angeben.) <br />
(Statt `EXTENSION-RELATIVE-PATH` den Pfad zu `scratch3_EXTENSION-NAME` angeben.) <br />
(Statt `EXTENSION-NAME` den Namen der neuen Erweiterung angeben.)
```javascript
EXTENSION-ID: () => require('../extensions/scratch3_EXTENSION-NAME')
```

### 3.2. SCRATCH-GUI IMPLEMENTIEREN <a name="h1-3-2"></a>

Zur Nutzung der neu implementierten Scratch-Erweiterung muss sie der Erweiterungsbibliothek von Scratch hinzugefügt werden. <br />
Optional können Bilddateien, zur visuellen Darstellung der neuen Erweiterung in der Scratch-Bibliothek, eingebunden werden. <br />

- [ ] Optional: Hinzufügen des Ordners `EXTENSION-NAME` dem folgenden [Pfad](/scratch-gui/src/lib/libraries/extensions). <br />
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

- [ ] Öffnen der Datei [index.jsx](scratch-gui/src/lib/libraries/extensions/index.jsx).	
```console
scratch-gui/src/lib/libraries/extensions/index.jsx
```

- [ ] Angeben notwendiger Informationen und Referenzen in der Datei zur Darstellung der neuen Erweiterung in der Scratch-Bibliothek.
	
- [ ] [Starten der Scratch-GUI.](#h1-2-2)

# BEISPIELE <a name="h2"></a>
## 1. SCRATCH-ERWEITERUNG IMPLEMENTIEREN <a name="h2-1"></a>
Als Beispiel dient die folgende Implementierung eines Scratch-Moduls – `exampleExtension`.

Die implementierte Erweiterung ist in der Scratch-Erweiterungsbibliothek, inklusive Icons, aufgeführt.

Wird sie ausgewählt, erscheint sie in der Scratch-Oberfläche.

Der implementierte Block kann in die Scratch-Oberfläche gezogen und ein String angegeben werden.

Beim Ausführen des Blocks wird der mitgegebene String in der Konsole ausgegeben.

### 1.1. SCRATCH-BLOCK IMPLEMENTIEREN <a name="h2-1-1"></a>

- [ ] Hinzufügen: Ordner `scratch3_exampleExtension` in [/scratch-vm/src/extensions/](/scratch-vm/src/extensions).
![image](https://user-images.githubusercontent.com/48289383/226799195-760d72e3-45e9-455d-8805-a14ebfe8e8a7.png)

- [ ] Hinzufügen: Datei `index.js` in dem [Ordner](/scratch-vm/src/extensions/scratch3_exampleExtension). <br />

- [ ] Abändern: Erweiterungs-Blöcke angeben und definieren in der [Datei](/scratch-vm/src/extensions/scratch3_exampleExtension/index.js).

- [ ] Öffnen: Datei `extension-manager.js` in [/scratch-vm/src/extension-support](/scratch-vm/src/extension-support).

- [ ] Abändern: Erweiterung hinzufügen in der [Datei](/scratch-vm/src/extension-support/extension-manager.js). <br />

### 1.2. SCRATCH-GUI IMPLEMENTIEREN <a name="h2-1-1"></a>

- [ ] Optional: Hinzufügen: Ordner `exampleExtension` in [/scratch-gui/src/lib/libraries/extensions](/scratch-gui/src/lib/libraries/extensions). <br />

- [ ] Optional: Hinzufügen: Bilddateien `exampleExtension.png` und `exampleExtension-small.png` in dem [Ordner](scratch-gui/src/lib/libraries/extensions/exampleExtension). <br />
(Hintergrund: [exampleExtension.png](/scratch-gui/src/lib/libraries/extensions/exampleExtension/exampleExtension.png), `600 x 372`; Icon: [exampleExtension-small.png](/scratch-gui/src/lib/libraries/extensions/exampleExtension/exampleExtension-small.png), `180 x 180`.) <br />

- [ ] Öffnen: Datei `index.jsx` in [/scratch-gui/src/lib/libraries/extensions](/scratch-gui/src/lib/libraries/extensions).	

- [ ] Abändern: Angaben zur Darstellung der Erweiterung in der Scratch-Bibliothek hinzufügen in der [Datei](scratch-gui/src/lib/libraries/extensions/index.jsx).

- [ ] [Starten der Scratch-GUI.](#h1-2-2)
