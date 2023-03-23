<!-- <details open> -->
<details>
<summary>

# INHALTSVERZEICHNIS

</summary>
	<ol>
		<li><a href="#h0">Vorwort und Credits</a></li>
		<li><a href="#h1">Anleitung</a></li>
		<ol>
			<li><a href="#h1-1">Entwicklungsumgebung vorbereiten</a></li>
			<ol>
				<li><a href="#h1-1-1">Raspberry Pi OS</a></li>
				<li><a href="#h1-1-2">Windows 10, 11</a></li>
			</ol>
			<li><a href="#h1-2">Scratch ausführen</a></li>
			<ol>
				<li><a href="#h1-2-1">Scratch-Pakete installieren</a></li>
				<li><a href="#h1-2-2">Scratch-GUI starten</a></li>
				<li><a href="#h1-2-3">Scratch-GUI aufrufen</a></li>
				<li><a href="#h1-2-4">Scratch-GUI builden</a></li>
			</ol>
			<li><a href="#h1-3">Scratch-Erweiterung implementieren</a></li>
			<ol>
				<li><a href="#h1-3-1">Scratch-Block implementieren</a></li>
				<li><a href="#h1-3-2">Scratch-GUI implementieren</a></li>
			</ol>
		</ol>
		<li><a href="#h2">Beispiel</a></li>
		<ol>
			<li><a href="#h2-1">Scratch-Erweiterung implementieren</a></li>
			<ol>
				<li><a href="#h2-1-1">Scratch-Block implementieren</a></li>
				<li><a href="#h2-1-2">Scratch-GUI implementieren</a></li>
			</ol>
			<li><a href="#h2-2">Scratch-Erweiterung verwenden</a></li>
		</ol>
	<ol>
</details>


<details>
<summary>

# VORWORT UND CREDITS <a name="h0"></a>
		
</summary>

Da ich bei allen Anleitungen und Dokumentationen zur Erstellung von Scratch-3-Erweiterungen auf diverse Probleme und Fehler, meist aufgrund diverser Paket-Inkompatibilitäten und veralteten Anleitungen, gestoßen bin, habe ich nach Eigenrecherche die folgende Anleitung zur Erstellung von Scratch-3-Erweiterungen zusammengetragen. 
<br />
<br />
Den Großteil der Informationen zur Erstellung dieser Anleitung sind der folgenden Seite entnommen. <br />
https://medium.com/@hiroyuki.osaki/how-to-develop-your-own-block-for-scratch-3-0-1b5892026421
<br />
<br />
Folgendes Repository wurde als Grundlage der Pakete `scratch-vm` und `scratch-gui` sowie für Tests neuer Scratch-Erweiterungen verwendet. <br />
https://github.com/MrYsLab/s3onegpio
<br />
<br />
Die Informationen der folgenden offiziellen Anleitung zum Publishen der Scratch-GUI auf GitHub-Pages wurden für die Erstellung eines Builds, zum Ausführen von Scratch im Offline-Modus, verwendet. <br />
https://github.com/LLK/scratch-gui/wiki/Publishing-to-GitHub-Pages
	
</details>


<details open>
<summary>

# ANLEITUNG <a name="h1"></a>

</summary>

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

<br />

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

<br />

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

<br />

### 2.3. SCRATCH-GUI AUFRUFEN <a name="h1-2-3"></a>

- [ ] Aufrufen der Scratch-Oberfläche über folgende Adresse. <br />
http://localhost:8601

<br />

Die Adresse wird während des Kompilierens mit `Project is running at http://0.0.0.0:8601/` im Terminal ausgegeben.

Änderungen, wie neue Erweiterungen, werden in der Scratch-GUI nach erfolgreichem Kompilieren übernommen und dargestellt.

Speichern von Änderungen in `scratch-vm` oder `scratch-gui` löst einen Kompilierungsvorgang automatisch aus. <br />
(Solange der Scratch-Service auf `http://0.0.0.0:8601/` läuft.)

<br />
<br />

- [ ] Optional: Aufrufen der Scratch-GUI über einen erstellten [Scratch-GUI-Build](#h1-2-4). <br />
(Über die erzeugte `index.html` in [/scratch-gui/build](/scratch-gui/build).)

<br />

### 2.4. SCRATCH-GUI BUILDEN <a name="h1-2-4"></a>

- [ ] Wechseln in den Ordner [scratch-gui](/scratch-gui).
```console	
cd scratch-gui
```

- [ ] Erstellen eines Builds für `github.io`. <br />
(Dieser ist zu finden unter `/scratch-gui/build`.) <br />
(Über die Datei `index.html` in dem [Ordner](/scratch-gui/build) ist Scratch mit den Erweiterungen offline aufrufbar.)
```console
yarn run build
```

<br />

- [ ] Optional: Erzeugen eines Commits und Pushs des Builds auf den eigenen GitHub-Pages-Branch. <br />
(Er sollte dann über `https://USER-NAME.github.io/scratch-gui/` einzusehen sein.) <br />
(Statt `USER-NAME` den Namen des GitHub-Benutzers des GitHub-Pages-Branchs angeben.)
```console
npm run deploy
```

- [ ] Alternativ, Optional: Publishen des Builds in ein bestimmtes Verzeichnis. <br />
(Er ist dann über `https://USER-NAME.github.io/scratch-gui/.BRANCH-NAME` aufrufbar.) <br />
(Statt `USER-NAME` den Namen des GitHub-Benutzers des GitHub-Pages-Branchs angeben.) <br />
(Statt `BRANCH-NAME` den Namen des Branches, auf dem gepublished werden soll, angeben.)
```console
npm run deploy -- -e BRANCH-NAME
```

<br />

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

<br />

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

</details>

	
<details open>
<summary>

# BEISPIEL <a name="h2"></a>

</summary>

Als Beispiel dient die folgende Implementierung und Verwendung des Scratch-Moduls `exampleExtension`.

Die implementierte Erweiterung soll in der Scratch-Erweiterungsbibliothek, inklusive Beispiel-Icons, aufgeführt werden.

Durch Ausgewählen soll sie mit einem implementieren Block in der Scratch-Oberfläche erscheinen.

Der Block soll in die Scratch-Oberfläche gezogen und ein String angegeben werden.

Durch Ausführen des Blocks soll der mitgegebene String in der Konsole ausgegeben werden.

## 1. SCRATCH-ERWEITERUNG IMPLEMENTIEREN <a name="h2-1"></a>

### 1.1. SCRATCH-BLOCK IMPLEMENTIEREN <a name="h2-1-1"></a>

- [ ] Hinzufügen: Ordner `scratch3_exampleExtension` in [/scratch-vm/src/extensions/](/scratch-vm/src/extensions).

- [ ] Hinzufügen: Datei `index.js` in dem [Ordner](/scratch-vm/src/extensions/scratch3_exampleExtension). <br />

- [ ] Abändern: Erweiterungs-Blöcke angeben und definieren in der [Datei](/scratch-vm/src/extensions/scratch3_exampleExtension/index.js).

- [ ] Öffnen: Datei `extension-manager.js` in [/scratch-vm/src/extension-support](/scratch-vm/src/extension-support).

- [ ] Abändern: Erweiterung hinzufügen in der [Datei](/scratch-vm/src/extension-support/extension-manager.js). <br />

### 1.2. SCRATCH-GUI IMPLEMENTIEREN <a name="h2-1-2"></a>

- [ ] Optional: Hinzufügen: Ordner `exampleExtension` in [/scratch-gui/src/lib/libraries/extensions](/scratch-gui/src/lib/libraries/extensions). <br />

- [ ] Optional: Hinzufügen: Bilddateien `exampleExtension.png` und `exampleExtension-small.png` in dem [Ordner](scratch-gui/src/lib/libraries/extensions/exampleExtension). <br />
(Hintergrund: [exampleExtension.png](/scratch-gui/src/lib/libraries/extensions/exampleExtension/exampleExtension.png), `600 x 372`; Icon: [exampleExtension-small.png](/scratch-gui/src/lib/libraries/extensions/exampleExtension/exampleExtension-small.png), `180 x 180`.) <br />

- [ ] Öffnen: Datei `index.jsx` in [/scratch-gui/src/lib/libraries/extensions](/scratch-gui/src/lib/libraries/extensions).	

- [ ] Abändern: Angaben zur Darstellung der Erweiterung in der Scratch-Bibliothek hinzufügen in der [Datei](scratch-gui/src/lib/libraries/extensions/index.jsx).

## 2. SCRATCH-ERWEITERUNG VERWENDEN <a name="h2-2"></a>
<details>
	<summary>
		<a href="#h1-2-2">Starten der Scratch-GUI.</a>
	</summary>
	<br>
	<p>
		Konsolen-Befehl: 
		<br>
		<img src="/images/exampleExtension-guiStartenCommand.png" style="width: 1920px" align="center">
		<br>
		<br>
		Erwartete Konsolen-Ausgabe: 
		<br>
		<img src="/images/exampleExtension-guiStartenOutput.png" style="width: 1920px" align="center">
	</p>
	<br>
</details>

<details>
	<summary>
		<a href="#h1-2-3">Aufrufen der Scratch-GUI.</a>
	</summary>
	<br>
	<p>
		Adresse der Scratch-Oberfläche: 
		<br>
		<img src="/images/exampleExtension-guiAufrufen.png" style="width: 1920px" align="center">
	</p>
	<br>
</details>

<details>
	<summary>
		Öffnen der Scratch-Erweiterungs-Bibliothek über den Button unten links in der Scratch-GUI.
	</summary>
	<br>
	<p  align="center">
		<img src="/images/exampleExtension-libraryButton.png" style="width: 10%">
	</p>
</details>

<details>
	<summary>
		Auswählen der Erweiterung in der Bibliothek.
	</summary>
	<br>
	<p  align="center">
		<img src="/images/exampleExtension-blockLibrary.png" style="width: 25%">
	</p>
</details>

<details>
	<summary>
		Ziehen des Blocks der Erweiterung auf die Scratch-Block-Oberfläche in der Scratch-GUI.
	</summary>
	<br>
	<p  align="center">
		<img src="/images/exampleExtension-blockGUI.png" style="width: 25%">
	</p>
</details>

<details>
	<summary>
		Optional: Eingeben eines alternativen String über das Textfeld des Blocks.
	</summary>
	<br>
	<p  align="center">
		<img src="/images/exampleExtension-blockImplementation.png" style="width: 25%">
	</p>
</details>

<details>
	<summary>
		Hinzufügen eines Ereignisses, um die Funktion des Blocks auszuführen.
	</summary>
	<br>
	<p  align="center">
		<img src="/images/exampleExtension-blockImplementationEvent.png" style="width: 25%">
	</p>
</details>

<details>
	<summary>
		Auslösen des Ereignisses.
	</summary>
	<br>
	<p  align="center">
		<img src="/images/exampleExtension-runButton.png" style="width: 25%">
	</p>
</details>

<details>
	<summary>
		Optional: Öffnen der Konsole und Überprüfen der Ausgabe.
	</summary>
	<br>
	<p  align="center">
		<img src="/images/exampleExtension-consoleOutput.png" style="width: 25%">
	</p>
</details>

</details>
