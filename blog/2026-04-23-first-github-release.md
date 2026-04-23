---
slug: first-binary-release
title: First Official Binary Release of Tonatiuh++ (Windows, Linux, macOS)
authors: mblanco
tags: [release, binaries, cross-platform, development]
---

![Tonatiuh++ first GitHub release](/img/tonatiuhpp-first-release.png)

I am pleased to announce the **first official binary release of Tonatiuh++**, now available for **Windows, Linux, and macOS**.

This marks an important milestone in the roadmap outlined in this blog. Until now, using Tonatiuh++ required building the code from source. With this release, it is now possible to **download and run the application directly**, without going through the build process.

This step has been carried out within the framework of the **AI-HPC4CST ATRAE project of the IEA**:  
[https://cst-modelling-tools.github.io/ai-hpc4cst/](https://cst-modelling-tools.github.io/ai-hpc4cst/)

<!-- truncate -->

---

## Release v0.1.8.17

The release is available here:  
[https://github.com/CST-Modelling-Tools/tonatiuhpp/releases/tag/v0.1.8.17](https://github.com/CST-Modelling-Tools/tonatiuhpp/releases/tag/v0.1.8.17)

This is the first time that Tonatiuh++ is distributed as **ready-to-run binaries for all major operating systems**, with packaging validated through CI and aligned across platforms.

---

## Roadmap Context

This release completes one of the key steps in that roadmap:

> Making Tonatiuh++ usable without requiring users to build it from source

With this in place, the project is now in a much stronger position for testing, feedback, and incremental improvement.

---

## Installation Instructions

### 🔵 Windows

1. Download:
   `Tonatiuh++-Windows.zip`

2. Extract the contents to a folder

3. Run:
   `Tonatiuh++.exe`

On first launch, Windows may display a security warning (SmartScreen). If that happens:

- Click **“More info”**
- Then click **“Run anyway”**

No installation is required. All necessary dependencies (Qt, Coin3D, SoQt, plugins, and VC++ runtime) are bundled with the application.

---

### Linux

1. Download:
   `Tonatiuh++-Linux.tar.gz`

2. Extract:
   ```bash
   tar -xzf Tonatiuh++-Linux.tar.gz
   cd Tonatiuh++
   ```

3. Run:
   ```bash
   ./Tonatiuh++
   ```

It is important to launch the application using the provided executable/script, as this ensures that the **bundled Qt (6.6.3)** is used instead of any system installation.

The bundle is fully portable and should work across most modern Linux distributions.

---

### macOS

1. Download:
   `Tonatiuh++-macOS.zip`

2. Extract and move:
   Drag `Tonatiuh++.app` into the `Applications` folder

3. Launch the application

On first launch, macOS may block execution. If that happens:

- Go to **System Settings → Privacy & Security**  
- Click **“Open Anyway”**

The application is packaged as a standard `.app` bundle with all required Qt frameworks included.

---

## 🔜 Next Steps

The next phase will focus on:

- Repairing the software update mechanism
- Introducing benchmarking capabilities  

The development will proceed incrementally, preserving what already works while avoiding unnecessary disruption.

---

## 📣 Final Remarks

This release is not a final product, but it is a **foundational step**.

It makes Tonatiuh++ easier to use, easier to test, and easier to evolve.

Feedback and issue reports are very welcome, both via GitHub and through this blog.