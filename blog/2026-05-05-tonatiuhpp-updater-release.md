---
slug: updater-release
title: Tonatiuh++ v0.1.8.18 – Introducing Cross-Platform Automatic Updates
authors: mblanco
tags: [release, updater, cross-platform, ifw]
---

![Tonatiuh++ updater release](/img/tonatiuhpp-updater-release.png)

I am pleased to announce a new release of **Tonatiuh++**, now including a **cross-platform automatic update system**.

This release builds upon the first binary distribution milestone and introduces a **robust, installer-based update mechanism** for **Windows, Linux, and macOS**.

<!-- truncate -->

---

## Release v0.1.8.18

The release is available here:  
[https://github.com/CST-Modelling-Tools/tonatiuhpp/releases/tag/v0.1.8.19](https://github.com/CST-Modelling-Tools/tonatiuhpp/releases/tag/v0.1.8.19)

This version introduces a **new installer-based distribution model** and a **built-in updater**, based on the Qt Installer Framework.

---

## What’s New

- Cross-platform installers for Windows, Linux, and macOS
- Integrated automatic update system
- Version checking at startup
- User-triggered update installation
- Unified packaging and deployment through CI

The application now includes a **MaintenanceTool**, which handles updates safely and consistently across platforms.

---

## Important Change

⚠️ Tonatiuh++ must now be installed using the provided installer to enable updates.

If you previously downloaded ZIP or TAR archives, please reinstall using the new installer.

---

## Installation Instructions

### 🔵 Windows

1. Download:
   `TonatiuhPP-0.1.8.18-windows-x64.exe`

2. Run the installer and follow the steps:
   - Next → Install → Finish   

When trying to run the executable file, you may see the Windows warning popup shown below.

![Tonatiuh++ Windows 11 warning popup](/img/tonatiuhpp-0p1p8p18-windows-warning.png)

To install the program click on the "Run anyway" button and follow the wizard instructions.

![Tonatiuh++ Windows 11 installation wizard](/img/tonatiuhpp-0p1p8p18-windows-installation-wizard.png)

3. Check if the update function works.

![Tonatiuh++ Windows update popup](/img/tonatiuhpp-0p1p8p18-windows-update-popup.png)

---

### 🐧 Linux

1. Download:
   `TonatiuhPP-0.1.8.18-linux-x64.run

2. Make it executable:
   ```bash
   chmod +x TonatiuhPP-<version>-linux-x64.run
   ```

3. Run the installer:
   ```bash
   ./TonatiuhPP-<version>-linux-x64.run
   ```

4. Follow the wizard instructions

![Tonatiuh++ Ubuntu Linux installation wizard](/img/tonatiuhpp-0p1p8p18-ubuntu-linux-installation-wizard.png)

5. Check if the update function works.

![Tonatiuh++ Ubuntu Linux update popup](/img/tonatiuhpp-0p1p8p18-ubuntu-linux-update-popup.png)

cd 
---

### 🍎 macOS

1. Download:
   `TonatiuhPP-0p1p8p18-macos-arm64.app`

2. Open the installer

3. If blocked by macOS:

   ![Tonatiuh++ MacOS warning popup](/img/tonatiuhpp-0p1p8p18-macos-warning.png)

   - Go to *Settings->Privacy & Security->Security*.
   - Click the button "Open Anyway", near the message: "TonatiuhPP-0.1.8.18-macos-arm64 was blocked to protect your Mac"
   - Click also the button "Open Anyway", near the popup dialog to run "TonatiuhPP-0.1.8.18-macos-arm64"

   ![Tonatiuh++ MacOS security dialog](/img/tonatiuhpp-0p1p8p18-macos-security-dialog.png)

4. Follow the installer steps

   ![Tonatiuh++ MacOS security dialog](/img/tonatiuhpp-0p1p8p18-macos-installation-wizard.png)

5. Launch from Applications and test the updater

   ![Tonatiuh++ MacOS security dialog](/img/tonatiuhpp-0p1p8p18-macos-update-popup.png)

---

## 🔄 Updating Tonatiuh++

Once installed:

1. Open Tonatiuh++
2. Go to:
   `Help → Updates`
3. If an update is available:
   - Click **Install Updates**
   - The updater will launch
4. Restart the application after the update completes

---

## Roadmap Context

This release completes another key step in the project roadmap:

> Providing a reliable and cross-platform update mechanism

With installers and updates now in place, Tonatiuh++ is significantly easier to maintain and distribute.

---

## 📣 Final Remarks

This release is a **major step forward in usability and maintainability**.

Tonatiuh++ is now:
- Easier to install
- Easier to update
- Easier to evolve

Feedback and issue reports are very welcome via GitHub or this blog.